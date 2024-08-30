import type { Contract, BaseFunction} from './contract';
import {  ContractBuilder } from './contract';

import { withCommonDefaults, defaults as commonDefaults } from "../shared/2-option-proxy-admin";
import type { SharedProxyAdminOptions } from '../shared/2-option-proxy-admin';

import { printContract } from "./print";
import { setInfo  } from "./set-info";

import { defineFunctions } from '../utils/define-functions';

function withDefaults(opts: SharedProxyAdminOptions): Required<SharedProxyAdminOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printProxyAdmin(opts: SharedProxyAdminOptions = commonDefaults): string {
  return printContract(buildProxyAdmin(opts));
}

export function buildProxyAdmin(opts: SharedProxyAdminOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    const Ownable = {
        name: 'Ownable',
        path: '@redprint-openzeppelin/access/Ownable.sol',
    };

    c.addParent(Ownable, []);
    
    c.addVariable(`mapping(bytes32 => address) private addresses;`);
    c.addVariable(`event AddressSet(string indexed name, address newAddress, address oldAddress);`);

    // setAddress
    c.addModifier('whenNotPaused', functions.setAddress);
    c.addFunctionCode(`bytes32 nameHash = _getNameHash(_name);`, functions.setAddress);
    c.addFunctionCode(`address oldAddress = addresses[nameHash];`, functions.setAddress);
    c.addFunctionCode(`addresses[nameHash] = _address;`, functions.setAddress);
    c.addFunctionCode(`emit AddressSet(_name, _address, oldAddress);`, functions.setAddress);

    // getAddress
    c.addFunctionCode(`return addresses[_getNameHash(_name)];`, functions.getAddress);

    // _getNameHash
    c.addFunctionCode(`return keccak256(abi.encodePacked(_name));`, functions._getNameHash);


    setInfo(c, allOpts.contractInfo);
    return c;
}

const functions = defineFunctions({
    setAddress: {
        kind: 'external' as const,
        args: [
            { name: '_name', type: 'string memory' },
            { name: '_address', type: 'with' },
          ],
    },
  
    getAddress: {
      kind: 'external' as const,
      args: [
        { name: '_name', type: 'string memory' },
      ],
      returns: ['address'],
      mutability: 'view',
    },

    _getNameHash: {
        kind: 'internal' as const,
        args: [
          { name: '_name', type: 'string memory' },
        ],
        returns: ['bytes32'],
        mutability: 'pure',
      },


  });