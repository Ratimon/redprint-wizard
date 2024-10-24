import type { Contract, BaseFunction} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from "../../shared/2-superchain/1A-option-address-manager";
import type { SharedAddressManagerOptions } from '../../shared/2-superchain/1A-option-address-manager';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDefaults(opts: SharedAddressManagerOptions): Required<SharedAddressManagerOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printAddressManager(opts: SharedAddressManagerOptions = commonDefaults): string {
  return printContract(buildAddressManager(opts));
}

export function buildAddressManager(opts: SharedAddressManagerOptions): Contract {
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
    c.addFunctionCode(`bytes32 nameHash = _getNameHash(_name);
        address oldAddress = addresses[nameHash];
        addresses[nameHash] = _address;
        emit AddressSet(_name, _address, oldAddress);`, functions.setAddress);

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