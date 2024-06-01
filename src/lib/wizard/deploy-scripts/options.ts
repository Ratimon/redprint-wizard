import * as path from 'path-browserify';

import type { DeployContract, ReferencedContract, ParentContract } from './contract';

export interface Options {
  transformImport?: (parent: ParentContract) => ParentContract;
}

export interface Helpers extends Required<Options> {
  transformName: (name: ReferencedContract) => string;
}

export function withHelpers(opts: Options = {}): Helpers {
  const transformName = (n: ReferencedContract) =>  n.name;
  return {
    transformName,
    transformImport: p1 => {
      return opts.transformImport?.(p1) ?? p1;
    },
  };
}
