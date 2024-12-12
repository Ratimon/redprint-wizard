import type { Contract, ReferencedContract,  Parent, ContractFunction, FunctionArgument, Value, NatspecTag, ImportContract, ContractModifier } from './contract';

import type { Options, Helpers }from './options';
import { withHelpers } from './options';

import type { Lines} from '../utils/format-lines';
import { formatLines, spaceBetween } from '../utils/format-lines';
import { mapValues } from '../utils/map-values';
import SOLIDITY_VERSION from './solidity-version.json' assert { type: "json" };
import { inferTranspiled } from './infer-transpiled';

export function printContract(contract: Contract, opts?: Options): string {
  const helpers = withHelpers(contract, opts);

  const fns = mapValues(
    sortedFunctions(contract),
    fns => fns.map(fn => printFunction(fn, helpers)),
  );

  const mods = mapValues(
    sortedModifiers(contract),
    mods => mods.map(mod => printModifier(mod, helpers)),
  );

  const hasOverrides = fns.override.some(l => l.length > 0);

  return formatLines(
    ...spaceBetween(
      [
        `// SPDX-License-Identifier: ${contract.license}`,
        `pragma solidity ^${SOLIDITY_VERSION};`,
      ],

      // contract.imports.map(p => {
      //   const names = p.name.split(', ').map(name => ({ name } as ReferencedContract));
      //   const transformedNames = helpers.transformNames(names).join(', ');
      //   return transformedNames === '' ? `import "${helpers.transformImport(p).path}";` : `import {${transformedNames}} from "${helpers.transformImport(p).path}";`;
      // }),

      printImports(contract.imports, helpers),

      contract.outsideCode,

      contract.userDefinedTypes.map(p => `type ${p.newType} is ${p.underlyingType};`),

      [
        ...printNatspecTags(contract.natspecTags),
        [`contract ${contract.name}`, ...printInheritance(contract, helpers), '{'].join(' '),
        contract.usings.map(p => `using ${p.library.name} for ${p.usingFor} ;`),
        spaceBetween(
          contract.variables,
          ...mods.code,
          printConstructor(contract, helpers),
          printReceive(contract),
          printFallback(contract),
          ...fns.code,
          ...fns.modifiers,
          hasOverrides ? [`// The following functions are overrides required by Solidity.`] : [],
          ...fns.override,
        ),

        `}`,
      ],
    ),
  );
}

function printInheritance(contract: Contract, { transformName }: Helpers): [] | [string] {
  if (contract.parents.length > 0) {
    return ['is ' + contract.parents.map(p => transformName(p.contract)).join(', ')];
  } else {
    return [];
  }
}

function printImports(imports: ImportContract[], helpers: Helpers): string[] {
  // Sort imports by name
  imports.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  const lines: string[] = [];
  imports.map(p => {
    const importContract = helpers.transformImport(p);

    if (importContract.name === ''){
      lines.push(`import "${importContract.path}";`);
    } else{
      lines.push(`import {${importContract.name}} from "${importContract.path}";`);
    }
  });
  return lines;
}


function printConstructor(contract: Contract, helpers: Helpers): Lines[] {
  const hasParentParams = contract.parents.some(p => p.params.length > 0);
  const hasConstructorCode = contract.constructorCode.length > 0;
  const parentsWithInitializers = contract.parents.filter(hasInitializer);
  if (hasParentParams || hasConstructorCode || (helpers.upgradeable && parentsWithInitializers.length > 0)) {
    const parents = parentsWithInitializers
      .flatMap(p => printParentConstructor(p, helpers));
    const modifiers = helpers.upgradeable ? ['initializer public'] : parents;
    const args = contract.constructorArgs.map(a =>  printArgument(a, helpers));
    const body = helpers.upgradeable
      ? spaceBetween(
        parents.map(p => p + ';'),
        contract.constructorCode,
      )
      : contract.constructorCode;
    const head = helpers.upgradeable ? 'function initialize' : 'constructor';
    const constructor = printFunction2(
      [],
      head,
      args,
      modifiers,
      body,
    );
    if (!helpers.upgradeable) {
      return constructor;
    } else {
      return spaceBetween(
        DISABLE_INITIALIZERS,
        constructor,
      );
    }
  } else if (!helpers.upgradeable) {
    return [];
  } else {
    return DISABLE_INITIALIZERS;
  }
}

const DISABLE_INITIALIZERS = 
[
  '/// @custom:oz-upgrades-unsafe-allow constructor',
  'constructor() {',
  [
    '_disableInitializers();'
  ],
  '}'
];

function hasInitializer(parent: Parent) {
  // CAUTION
  // This list is validated by compilation of SafetyCheck.sol.
  // Always keep this list and that file in sync.
  return !['Initializable'].includes(parent.contract.name);
}

type SortedModifiers = Record<'code', ContractModifier[]>;

function sortedModifiers(contract: Contract): SortedModifiers {
  const mods: SortedModifiers = { code: [] };

  for (const mod of contract.modifiers) {
    if (mod.code.length > 0) {
      mods.code.push(mod);
    } 
  }
  return mods;
}

type SortedFunctions = Record<'code' | 'modifiers' | 'override', ContractFunction[]>;

// Functions with code first, then those with modifiers, then the rest
function sortedFunctions(contract: Contract): SortedFunctions {
  const fns: SortedFunctions = { code: [], modifiers: [], override: [] };

  for (const fn of contract.functions) {
    if (fn.code.length > 0) {
      fns.code.push(fn);
    } else if (fn.modifiers.length > 0) {
      fns.modifiers.push(fn);
    } else {
      fns.override.push(fn);
    }
  }

  return fns;
}

function printParentConstructor({ contract, params }: Parent, helpers: Helpers): [] | [string] {
  const useTranspiled = helpers.upgradeable && inferTranspiled(contract);
  const fn = useTranspiled ? `__${contract.name}_init` : contract.name;
  if (useTranspiled || params.length > 0) {
    return [
      fn + '(' + params.map(printValue).join(', ') + ')',
    ];
  } else {
    return [];
  }
}

export function printValue(value: Value): string {
  if (typeof value === 'object') {
    if ('lit' in value) {
      return value.lit;
    } else if ('note' in value) {
      return `${printValue(value.value)} /* ${value.note} */`;
    } else {
      throw Error('Unknown value type');
    }
  } else if (typeof value === 'number') {
    if (Number.isSafeInteger(value)) {
      return value.toFixed(0);
    } else {
      throw new Error(`Number not representable (${value})`);
    }
  } else {
    return JSON.stringify(value);
  }
}

function printReceive(contract: Contract): Lines[] {
  // const hasParentParams = contract.parents.some(p => p.params.length > 0);
  const hasReceiveCodeCode = contract.receiveCode.length > 0;
  // const parentsWithInitializers = contract.parents.filter(hasInitializer);
  if (hasReceiveCodeCode ) {
    // const parents = parentsWithInitializers
    //   .flatMap(p => printParentConstructor(p, helpers));

    const modifiers: string[] = ['external payable', ...contract.receiveModifiers];

    const args: string[] = [];
    const body = contract.receiveCode;
    const head = 'receive'
    const receive = printFunction2(
      [],
      head,
      args,
      modifiers,
      body,
    );
    return receive;
  } else {
    return [];
  }
}

function printFallback(contract: Contract): Lines[] {
  const hasFallbackCode = contract.fallbackCode.length > 0;
  if (hasFallbackCode ) {
    const modifiers = ['external payable'];
    const args: string[] = [];
    const body = contract.fallbackCode;
    const head = 'fallback'
    const fallback = printFunction2(
      [],
      head,
      args,
      modifiers,
      body,
    );
    return fallback;
  } else {
    return [];
  }
}

function printModifier(mod: ContractModifier, helpers: Helpers): Lines[] {

  const modifiers: string[] = [];
  const code = [...mod.code];

  if (mod.code.length >= 1) {

    return printFunction2(
      [],
      'modifier ' + mod.name,
      mod.args.map(a => printArgument(a, helpers)),
      modifiers,
      code,
    );
  } else {
    return [];
  }
}

function printFunction(fn: ContractFunction, helpers: Helpers): Lines[] {
  const { transformName } = helpers;

  if (fn.override.size <= 1 && fn.modifiers.length === 0 && fn.code.length === 0 && !fn.final) {
    return []
  }

  const modifiers: string[] = [fn.kind, ...fn.modifiers];

  if (fn.mutability !== 'nonpayable') {
    modifiers.splice(1, 0, fn.mutability);
  }

  if (fn.override.size === 1) {
    modifiers.push(`override`);
  } else if (fn.override.size > 1) {
    modifiers.push(`override(${[...fn.override].map(transformName).join(', ')})`);
  }

  if (fn.returns?.length) {
    modifiers.push(`returns (${fn.returns.join(', ')})`);
  }

  const code = [...fn.code];

  if (fn.override.size > 0 && !fn.final) {
    const superCall = `super.${fn.name}(${fn.args.map(a => a.name).join(', ')});`;
    code.push(fn.returns?.length ? 'return ' + superCall : superCall);
  }

  if (modifiers.length + fn.code.length > 1) {
    return printFunction2(
      fn.comments,
      'function ' + fn.name,
      fn.args.map(a => printArgument(a, helpers)),
      modifiers,
      code,
    );
  } else {
    return [];
  }
}

// generic for functions and constructors
// kindedName = 'function foo' or 'constructor'
function printFunction2(comments: string[],kindedName: string, args: string[], modifiers: string[], code: Lines[]): Lines[] {
  const fn: Lines[] = [ ...comments ];

  const headingLength = [kindedName, ...args, ...modifiers]
    .map(s => s.length)
    .reduce((a, b) => a + b);

  const braces = code.length > 0 ? '{' : '{}';

  if (headingLength <= 72) {
    fn.push([`${kindedName}(${args.join(', ')})`, ...modifiers, braces].join(' '));
  } else {
    fn.push(`${kindedName}(${args.join(', ')})`, modifiers, braces);
  }

  if (code.length > 0) {
    fn.push(code, '}');
  }

  return fn;
}

function printArgument(arg: FunctionArgument, { transformName }: Helpers): string {
  let type: string;
  if (typeof arg.type === 'string') {
    if (/^[A-Z]/.test(arg.type)) {
      `Type ${arg.type} is not a primitive type. Define it as a ContractReference`;
    }
    type = arg.type;
  } else {
    type = transformName(arg.type);
  }

  return [type, arg.name].join(' ');
}

function printNatspecTags(tags: NatspecTag[]): string[] {
  return tags.map(({ key, value }) => `/// ${key} ${value}`);
}
