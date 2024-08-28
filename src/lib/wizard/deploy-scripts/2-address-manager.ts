import type { DeployContract, BaseFunction} from './contract';
import { DeployBuilder } from "./contract";

import type { SharedAddressManagerOptions } from '../shared/2-shared-address-manager-option';
import { withCommonDefaults, defaults } from "../shared/2-shared-address-manager-option";

import { printDeployContract } from "./print";
import { setInfo } from "./set-info";

function withDeployDefaults(opts: SharedAddressManagerOptions): Required<SharedAddressManagerOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployAddressManager(opts: SharedAddressManagerOptions = defaults): string {
  return printDeployContract(buildDeployAddressManager(opts));
}

export function buildDeployAddressManager(opts: SharedAddressManagerOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c);
  const fn : BaseFunction = getDeployFunction();

  setInfo(c, allOpts.deployInfo);

  return c;
}

function addBase(c: DeployBuilder) {
  const DeployFunctions = {
    name: 'DeployerFunctions',
    path: '@redprint-deploy/deployer/DeployerFunctions.sol',
  };
  c.addLibrary(DeployFunctions, `IDeployer`);
  const IDeployer = {
    name: 'IDeployer',
    path: '@redprint-deploy/deployer/DeployerFunctions.sol',
  };
  c.addModule(IDeployer);

  const DeployScript = {
    name: 'DeployScript',
    path: '@redprint-deploy/deployer/DeployScript.sol',
  };
  c.addParent(DeployScript, []);

  const SafeProxyFactory = {
    name: 'SafeProxyFactory',
    path: '@redprint-safe-contracts/contracts/proxies/SafeProxyFactory.sol',
  };
  c.addModule(SafeProxyFactory);

  const Safe = {
    name: 'Safe',
    path: '@redprint-safe-contracts/contracts/Safe.sol',
  };
  c.addModule(Safe);

  const SafeProxy = {
    name: 'SafeProxy',
    path: '@redprint-safe-contracts/contracts/proxies/SafeProxy.sol',
  };
  c.addModule(SafeProxy);

}

const chainModules = {
  ethereum: {
    safeProxyFactory: {
      address: '0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2',
    },
    safeSingleton: {
      address: '0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552',
    }
  },
  optimism: {
    safeProxyFactory: {
      address: '0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2',
    },
    safeSingleton: {
      address: '0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552',
    }
  },
} as const;


function getDeployFunction() {
  const fn = {
    name: 'deploy',
    args: [],
    returns: ['SafeProxyFactory safeProxyFactory_', 'Safe safeSingleton_, SafeProxy safeProxy_' ] , 
    kind: 'external' as const,
  };

  return fn;
}