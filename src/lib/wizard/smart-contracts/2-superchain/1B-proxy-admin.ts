import type { Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from "../../shared/2-superchain/1B-option-proxy-admin";
import type { SharedProxyAdminOptions } from '../../shared/2-superchain/1B-option-proxy-admin';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

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
    c.addParent(Ownable, [{ lit: '' }]);

    const Constants = {
      name: 'Constants',
      path: '@redprint-core/libraries/Constants.sol',
    };
    c.addImportOnly(Constants);

    const IAddressManager = {
      name: 'IAddressManager',
      path: '@redprint-core/legacy/interfaces/IAddressManager.sol',
    };
    c.addImportOnly(IAddressManager);

    const IL1ChugSplashProxy = {
      name: 'IL1ChugSplashProxy',
      path: '@redprint-core/legacy/interfaces/IL1ChugSplashProxy.sol',
    };
    c.addImportOnly(IL1ChugSplashProxy);

    const IStaticL1ChugSplashProxy = {
      name: 'IStaticL1ChugSplashProxy',
      path: '@redprint-core/legacy/interfaces/IL1ChugSplashProxy.sol',
    };
    c.addImportOnly(IStaticL1ChugSplashProxy);

    const IStaticERC1967Proxy = {
      name: 'IStaticERC1967Proxy',
      path: '@redprint-core/universal/interfaces/IStaticERC1967Proxy.sol',
    };
    c.addImportOnly(IStaticERC1967Proxy);


    const IProxy = {
      name: 'IProxy',
      path: '@redprint-core/universal/interfaces/IProxy.sol',
    };
    c.addImportOnly(IProxy);


    c.addVariable(`enum ProxyType {
        ERC1967,
        CHUGSPLASH,
        RESOLVED
    }`);
    
    c.addVariable(` /// @notice A mapping of proxy types, used for backwards compatibility.
    mapping(address => ProxyType) public proxyType;`);
    c.addVariable(`/// @notice A reverse mapping of addresses to names held in the AddressManager. This must be
    ///         manually kept up to date with changes in the AddressManager for this contract
    ///         to be able to work as an admin for the ResolvedDelegateProxy type.
    mapping(address => string) public implementationName;`);
    c.addVariable(`/// @notice The address of the address manager, this is required to manage the
    ///         ResolvedDelegateProxy type.
    IAddressManager public addressManager;`);
    c.addVariable(`bool internal upgrading;`);

    c.addConstructorArgument({
      type: 'address',
      name: '_owner'
    });
    c.addConstructorCode('_transferOwnership(_owner);');

    // setProxyType
    c.addModifier('onlyOwner', functions.setProxyType);
    c.addFunctionCode(`proxyType[_address] = _type;`, functions.setProxyType);

    // setImplementationName
    c.addModifier('onlyOwner', functions.setImplementationName);
    c.addFunctionCode(`implementationName[_address] = _name;`, functions.setImplementationName);

    // setAddressManager
    c.addModifier('onlyOwner', functions.setAddressManager);
    c.addFunctionCode(`addressManager = _address;`, functions.setAddressManager);

    // setAddress
    c.addModifier('onlyOwner', functions.setAddress);
    c.addFunctionCode(`addressManager.setAddress(_name, _address);`, functions.setAddress);

    // setUpgrading
    c.addModifier('onlyOwner', functions.setUpgrading);
    c.addFunctionCode(`upgrading = _upgrading;`, functions.setUpgrading);

    // isUpgrading
    c.addFunctionCode(`return upgrading;`, functions.isUpgrading);

    // getProxyImplementation
    c.addFunctionCode(`ProxyType ptype = proxyType[_proxy];
        if (ptype == ProxyType.ERC1967) {
            return IStaticERC1967Proxy(_proxy).implementation();
        } else if (ptype == ProxyType.CHUGSPLASH) {
            return IStaticL1ChugSplashProxy(_proxy).getImplementation();
        } else if (ptype == ProxyType.RESOLVED) {
            return addressManager.getAddress(implementationName[_proxy]);
        } else {
            revert("ProxyAdmin: unknown proxy type");
        }`, functions.getProxyImplementation);

    // getProxyAdmin
    c.addFunctionCode(`ProxyType ptype = proxyType[_proxy];
        if (ptype == ProxyType.ERC1967) {
            return IStaticERC1967Proxy(_proxy).admin();
        } else if (ptype == ProxyType.CHUGSPLASH) {
            return IStaticL1ChugSplashProxy(_proxy).getOwner();
        } else if (ptype == ProxyType.RESOLVED) {
            return addressManager.owner();
        } else {
            revert("ProxyAdmin: unknown proxy type");
        }`, functions.getProxyAdmin);

    // changeProxyAdmin
    c.addModifier('onlyOwner', functions.changeProxyAdmin);
    c.addFunctionCode(`ProxyType ptype = proxyType[_proxy];
        if (ptype == ProxyType.ERC1967) {
            IProxy(_proxy).changeAdmin(_newAdmin);
        } else if (ptype == ProxyType.CHUGSPLASH) {
            IL1ChugSplashProxy(_proxy).setOwner(_newAdmin);
        } else if (ptype == ProxyType.RESOLVED) {
            addressManager.transferOwnership(_newAdmin);
        } else {
            revert("ProxyAdmin: unknown proxy type");
        }`, functions.changeProxyAdmin);

    // upgrade
    c.addModifier('onlyOwner', functions.upgrade);
    c.addFunctionCode(`ProxyType ptype = proxyType[_proxy];
        if (ptype == ProxyType.ERC1967) {
            IProxy(_proxy).upgradeTo(_implementation);
        } else if (ptype == ProxyType.CHUGSPLASH) {
            IL1ChugSplashProxy(_proxy).setStorage(
                Constants.PROXY_IMPLEMENTATION_ADDRESS, bytes32(uint256(uint160(_implementation)))
            );
        } else if (ptype == ProxyType.RESOLVED) {
            string memory name = implementationName[_proxy];
            addressManager.setAddress(name, _implementation);
        } else {
            // It should not be possible to retrieve a ProxyType value which is not matched by
            // one of the previous conditions.
            assert(false);
        }`, functions.upgrade);

    // upgradeAndCall
    c.addModifier('onlyOwner', functions.upgradeAndCall);
    c.addFunctionCode(`ProxyType ptype = proxyType[_proxy];
        if (ptype == ProxyType.ERC1967) {
            IProxy(_proxy).upgradeToAndCall{ value: msg.value }(_implementation, _data);
        } else {
            // reverts if proxy type is unknown
            upgrade(_proxy, _implementation);
            (bool success,) = _proxy.call{ value: msg.value }(_data);
            require(success, "ProxyAdmin: call to proxy after upgrade failed");
        }`, functions.upgradeAndCall);

    setInfo(c, allOpts.contractInfo);
    return c;
}

const functions = defineFunctions({
  setProxyType: {
      kind: 'external' as const,
      args: [
          { name: '_address', type: 'address' },
          { name: '_type', type: 'ProxyType' },
        ],
  },

  setImplementationName: {
    kind: 'external' as const,
    args: [
      { name: '_address', type: 'address' },
      { name: '_name', type: 'string memory' },
      ],
  },

  setAddressManager: {
    kind: 'external' as const,
    args: [
      { name: '_address', type: 'IAddressManager' },
      ],
  },

  setAddress: {
    kind: 'external' as const,
    args: [
      { name: '_name', type: 'string memory' },
      { name: '_address', type: 'address' },
    ],
  },

  setUpgrading: {
    kind: 'external' as const,
    args: [
      { name: '_upgrading', type: 'bool' },
    ],
  },

  isUpgrading: {
    kind: 'external' as const,
    args: [
    ],
    returns: ['bool'],
    mutability: 'view',
  },

  getProxyImplementation: {
    kind: 'external' as const,
    args: [
      { name: '_proxy', type: 'address' },
    ],
    returns: ['address'],
    mutability: 'view',
  },

  getProxyAdmin: {
    kind: 'external' as const,
    args: [
      { name: '_proxy', type: 'address payable' },
    ],
    returns: ['address'],
    mutability: 'view',
  },

  changeProxyAdmin: {
    kind: 'external' as const,
    args: [
      { name: '_proxy', type: 'address payable' },
      { name: '_newAdmin', type: 'address' },
    ],
    returns: [],
  },

  upgrade: {
    kind: 'public' as const,
    args: [
      { name: '_proxy', type: 'address payable' },
      { name: '_implementation', type: 'address' },
    ],
    returns: [],
  },

  upgradeAndCall: {
    kind: 'external payable' as const,
    args: [
      { name: '_proxy', type: 'address payable' },
      { name: '_implementation', type: 'address' },
      { name: '_data', type: 'bytes memory' },
    ],
    returns: [],
  },

});