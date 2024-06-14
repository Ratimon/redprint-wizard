import type { DeployContract, BaseFunction} from './contract';
import { DeployBuilder } from "./contract";

import type { CommonOptions} from './common-options';
import { withCommonDefaults, defaults as commonDefaults } from "./common-options";

import { printDeployContract } from "./print";
import { setInfo } from "./set-info";

export const chainOptions = [false, 'ethereum', 'optimism'] as const;
export type Chain = typeof chainOptions[number];

export const opSecOptions = [false, 'address', 'key', 'mnemonic'] as const;
export type OpSec = typeof opSecOptions[number];

export interface DeploySafeOptions extends CommonOptions {
    deployName: string;
    chain: Chain;
    opSec: OpSec;
  }

export const defaults: Required<DeploySafeOptions> = {
  deployName: 'DeploySafeProxy',
  chain: 'ethereum',
  opSec: 'mnemonic',

  deployInfo: commonDefaults.deployInfo
} as const;

function withDeployDefaults(opts: DeploySafeOptions): Required<DeploySafeOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeploySafe(opts: DeploySafeOptions = defaults): string {
  return printDeployContract(buildDeploySafe(opts));
}

export function buildDeploySafe(opts: DeploySafeOptions): DeployContract {
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
    path: '@script-5_0_2/deployer/DeployerFunctions.sol',
  };
  c.addLibrary(DeployFunctions, `IDeployer`);

  const DeployScript = {
    name: 'DeployScript',
    path: '@redprint-core/deployer/DeployScript.sol',
  };
  c.addParent(DeployScript, []);
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


function addChain(c: DeployBuilder, fn: BaseFunction,  allOpts : Required<DeploySafeOptions> , mnemonic = true,) {
  const chain = allOpts.chain;

  if (chain === false) {
    return;
  }
  const { safeProxyFactory, safeSingleton } = chainModules[chain];

  c.addVariable('address owner;');
    
  c.addFunctionCode(`address safeProxyFactory = ${safeProxyFactory.address};`, fn);
  c.addFunctionCode(`address safeSingleton = ${safeSingleton.address};`, fn);

  c.addFunctionCode(`safeProxyFactory.code.length == 0`, fn);
  c.addFunctionCode(`    ? safeSingleton_ = Safe(deployer.deploy_Safe("SafeSingleton"))`, fn);
  c.addFunctionCode(`    : safeSingleton_ = Safe(payable(safeSingleton));`, fn);

  setOpsec(c, fn, allOpts.opSec);

  c.addFunctionCode(`safeProxy_ = SafeProxy(deployer.deploy_SystemOwnerSafe("SystemOwnerSafe", "SafeProxyFactory", "SafeSingleton", address(owner)));`, fn);

}

function setOpsec(c: DeployBuilder, fn: BaseFunction, opsec: OpSec) {

  switch (opsec) {
    case 'address': {
      console.log('address')
      c.addFunctionCode(`owner = vm.envAddress("DEPLOYER_ADDRESS");`, fn);
      break;
    }
    case 'key': {
      c.addFunctionCode(`uint256 ownerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");`, fn);
      c.addFunctionCode(`owner = vm.envOr("DEPLOYER_ADDRESS", vm.addr(ownerPrivateKey));`, fn);

      c.addFunctionCode(`owner = vm.envAddress("DEPLOYER_ADDRESS");`, fn);
      break;
    }
    case 'mnemonic': {
      console.log('mnemonic')
      c.addFunctionCode(`string memory mnemonic = vm.envString("MNEMONIC");`, fn);
      c.addFunctionCode(`uint256 ownerPrivateKey = vm.deriveKey(mnemonic, "m/44'/60'/0'/0/", 1);`, fn);
      c.addFunctionCode(`owner = vm.envOr("DEPLOYER_ADDRESS", vm.addr(ownerPrivateKey));`, fn);
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