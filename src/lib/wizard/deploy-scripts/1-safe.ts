import type { DeployContract, BaseFunction} from './contract';
import { DeployBuilder } from "./contract";

import type { SharedSafeOptions} from '../shared/1-shared-safe-option';
import { withCommonDefaults, defaults } from "../shared/1-shared-safe-option";

import { printDeployContract } from "./print";
import { setInfo } from "./set-info";

export const chainOptions = [false, 'ethereum', 'optimism'] as const;
export type Chain = typeof chainOptions[number];

export const opSecOptions = [false, 'address', 'key', 'mnemonic'] as const;
export type OpSec = typeof opSecOptions[number];

function withDeployDefaults(opts: SharedSafeOptions): Required<SharedSafeOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}


export function printDeploySafe(opts: SharedSafeOptions = defaults): string {
  return printDeployContract(buildDeploySafe(opts));
}

export function buildDeploySafe(opts: SharedSafeOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c);
  const fn : BaseFunction = getDeployFunction();

  if (allOpts.chain) {
    addChain(c, fn, allOpts);
  }
  setInfo(c, allOpts.deployInfo);

  return c;
}

function addBase(c: DeployBuilder) {
  const DeployFunctions = {
    name: 'DeployerFunctions',
    path: '@redprint-core/deployer/DeployerFunctions.sol',
  };
  c.addLibrary(DeployFunctions, `IDeployer`);

  const DeployScript = {
    name: 'DeployScript',
    path: '@redprint-core/deployer/DeployScript.sol',
  };
  c.addParent(DeployScript, []);

  const SafeProxyFactory = {
    name: 'SafeProxyFactory',
    path: 'safe-smart-account/contracts/proxies/SafeProxyFactory.sol',
  };
  c.addModule(SafeProxyFactory);

  const Safe = {
    name: 'Safe',
    path: 'safe-smart-account/contracts/Safe.sol',
  };
  c.addModule(Safe);

  const SafeProxy = {
    name: 'SafeProxy',
    path: 'safe-smart-account/contracts/proxies/SafeProxy.sol',
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


function addChain(c: DeployBuilder, fn: BaseFunction,  allOpts : Required<SharedSafeOptions> , mnemonic = true,) {
  const chain = allOpts.chain;

  if (chain === false) {
    return;
  }
  const { safeProxyFactory, safeSingleton } = chainModules[chain];

  // to do : abstract into 2 functions ?
  setOpsec(c, fn, allOpts.opSec);
    
  c.addFunctionCode(`address safeProxyFactory = ${safeProxyFactory.address};`, fn);
  c.addFunctionCode(`address safeSingleton = ${safeSingleton.address};`, fn);

  c.addFunctionCode(`safeProxyFactory.code.length == 0`, fn);
  c.addFunctionCode(`    ? safeSingleton_ = Safe(deployer.deploy_Safe("SafeSingleton"))`, fn);
  c.addFunctionCode(`    : safeSingleton_ = Safe(payable(safeSingleton));`, fn);

  c.addFunctionCode(`safeProxy_ = SafeProxy(deployer.deploy_SystemOwnerSafe("SystemOwnerSafe", "SafeProxyFactory", "SafeSingleton", address(owner)));`, fn);

}

function setOpsec(c: DeployBuilder, fn: BaseFunction, opsec: OpSec) {

  switch (opsec) {
    case 'address': {
      c.addVariable(`address owner = vm.envAddress("DEPLOYER_ADDRESS");`);
      break;
    }
    case 'key': {
      c.addVariable(`uint256 ownerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");`);
      c.addVariable(`address owner = vm.envOr("DEPLOYER_ADDRESS", vm.addr(ownerPrivateKey));`);

      break;
    }
    case 'mnemonic': {
      c.addVariable(`string mnemonic = vm.envString("MNEMONIC");`);
      c.addVariable(`uint256 ownerPrivateKey = vm.deriveKey(mnemonic, "m/44'/60'/0'/0/", 1);`);
      c.addVariable(`address owner = vm.envOr("DEPLOYER_ADDRESS", vm.addr(ownerPrivateKey));`);
      break;
    }
  }
}

function getDeployFunction() {
  const fn = {
    name: 'deploy',
    args: [],
    returns: ['SafeProxyFactory safeProxyFactory_', 'Safe safeSingleton_, SafeProxy safeProxy_' ] , 
    kind: 'external' as const,
  };

  return fn;
}