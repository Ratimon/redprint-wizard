
import type { CommonOptions} from './common-options';

import type { Contract} from './contract';
import { withCommonDefaults, defaults as commonDefaults } from "./common-options";

import { ContractBuilder } from "./contract";

import { printNote } from "./print";


export function printSafe(): string {
    return printNote("www");
  }