import 'array.prototype.flatmap/auto';

import type { ReferencedContract, DeployContract, Parent, ContractFunction, FunctionArgument, Value, NatspecTag } from './contract';
import type { Options, Helpers }from './options';
import { withHelpers } from './options';

import type { Lines} from '../utils/format-lines';
import { formatLines, spaceBetween } from '../utils/format-lines';
import { mapValues } from '../utils/map-values';
import SOLIDITY_VERSION from './solidity-version.json';
import { inferTranspiled } from './infer-transpiled';
import { compatibleContractsSemver } from '../utils/version';

export function printDeployContract(contract: DeployContract, opts?: Options): string {
  const helpers = withHelpers(opts);

  const fns = mapValues(
    sortedFunctions(contract),
    fns => fns.map(fn => printFunction(fn)),
  );

  const hasOverrides = fns.override.some(l => l.length > 0);

  return formatLines(
    ...spaceBetween(
      [
        `// SPDX-License-Identifier: ${contract.license}`,
        `pragma solidity ^${SOLIDITY_VERSION};`,
      ],

      contract.imports.map(p => `import "${helpers.transformImport(p).path}";`),

      [
        ...printNatspecTags(contract.natspecTags),
        [`contract ${contract.name}`, ...printInheritance(contract, helpers), '{'].join(' '),
        contract.usings.map(p => `using ${p.library.name} for ${p.usingFor} ;`),
        spaceBetween(
          contract.variables,
          printConstructor(contract, helpers),
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

function printInheritance(contract: DeployContract, { transformName }: Helpers): [] | [string] {
  if (contract.parents.length > 0) {
    return ['is ' + contract.parents.map(p => transformName(p.contract)).join(', ')];
  } else {
    return [];
  }
}

function printConstructor(contract: DeployContract, helpers: Helpers): Lines[] {
  const hasParentParams = contract.parents.some(p => p.params.length > 0);
  const hasConstructorCode = contract.constructorCode.length > 0;
  // const parentsWithInitializers = contract.parents.filter(hasInitializer);
  if (hasParentParams || hasConstructorCode) {
    // const parents = parentsWithInitializers
    //   .flatMap(p => printParentConstructor(p, helpers));
    const parents = contract.parents.flatMap(p => printParentConstructor(p))
    // const parents = contract.parents
    // const modifiers = helpers.upgradeable ? ['initializer public'] : parents;
    const modifiers = parents;
    const args = contract.constructorArgs.map(a =>  printArgument(a));
    const body = contract.constructorCode;
    // const body = helpers.upgradeable
    //   ? spaceBetween(
    //     parents.map(p => p + ';'),
    //     contract.constructorCode,
    //   )
    //   : contract.constructorCode;
    const head = 'constructor';
    // const head = helpers.upgradeable ? 'function initialize' : 'constructor';
    const constructor = printFunction2(
      head,
      args,
      modifiers,
      body,
    );

    return constructor;

    // if (!helpers.upgradeable) {
    //   return constructor;
    // } else {
    //   return spaceBetween(
    //     DISABLE_INITIALIZERS,
    //     constructor,
    //   );
    // }

  // } else if (!helpers.upgradeable) {
  //   return [];
  } else {
    return [];
  }
}

// const DISABLE_INITIALIZERS = 
// [
//   '/// @custom:oz-upgrades-unsafe-allow constructor',
//   'constructor() {',
//   [
//     '_disableInitializers();'
//   ],
//   '}'
// ];

function hasInitializer(parent: Parent) {
  // CAUTION
  // This list is validated by compilation of SafetyCheck.sol.
  // Always keep this list and that file in sync.
  return !['Initializable'].includes(parent.contract.name);
}

type SortedFunctions = Record<'code' | 'modifiers' | 'override', ContractFunction[]>;

// Functions with code first, then those with modifiers, then the rest
function sortedFunctions(contract: DeployContract): SortedFunctions {
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

function printParentConstructor({ contract, params }: Parent): [] | [string] {
  // const useTranspiled = inferTranspiled(contract);
  // const fn = useTranspiled ? `__${contract.name}_init` : contract.name;
  const fn = contract.name;
  if (params.length > 0) {
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

function printFunction(fn: ContractFunction): Lines[] {
  // const { transformName } = helpers;

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
    modifiers.push(`override(${[...fn.override].join(', ')})`);
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
      'function ' + fn.name,
      fn.args.map(a => printArgument(a)),
      modifiers,
      code,
    );
  } else {
    return [];
  }
}

// generic for functions and constructors
// kindedName = 'function foo' or 'constructor'
function printFunction2(kindedName: string, args: string[], modifiers: string[], code: Lines[]): Lines[] {
  const fn = [];

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

function printArgument(arg: FunctionArgument): string {
  let type: string | ReferencedContract;
  // todo remove below line
  if (typeof arg.type === 'string') {
    if (/^[A-Z]/.test(arg.type)) {
      `Type ${arg.type} is not a primitive type. Define it as a ContractReference`;
    }
    type = arg.type;
  } else {
    type = arg.type;;
  }

  return [type, arg.name].join(' ');
}

function printNatspecTags(tags: NatspecTag[]): string[] {
  return tags.map(({ key, value }) => `/// ${key} ${value}`);
}
