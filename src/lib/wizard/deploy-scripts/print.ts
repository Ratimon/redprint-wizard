// import 'array.prototype.flatmap/auto';

import type { ReferencedContract, DeployContract, Parent, ContractFunction, FunctionArgument, Value, NatspecTag, ImportContract } from './contract';
import type { Options, Helpers }from './options';
import { withHelpers } from './options';

import type { Lines} from '../utils/format-lines';
import { formatLines, spaceBetween } from '../utils/format-lines';
import { mapValues } from '../utils/map-values';
import SOLIDITY_VERSION from './solidity-version.json' assert { type: "json" };

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

      // contract.dependencies.map(p => `import {${p.name}} from "${helpers.transformImport(p).path}";`),

      printImports(contract.imports, helpers),

      [
        ...printNatspecTags(contract.natspecTags),
        [`contract ${contract.name}`, ...printInheritance(contract, helpers), '{'].join(' '),
        contract.usings.map(p => `using ${p.library.name} for ${p.usingFor} ;`),
        spaceBetween(
          contract.variables,
          // printConstructor(contract, helpers),
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
      fn.comments,
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
function printFunction2(comments: string[], kindedName: string, args: string[], modifiers: string[], code: Lines[]): Lines[] {
  const fn: Lines[] = [...comments];

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
