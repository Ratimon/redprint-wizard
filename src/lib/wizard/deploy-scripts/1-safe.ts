import type { DeployContract} from './contract';
import { DeployBuilder } from "./contract";

import type { CommonOptions} from './common-options';
import { withCommonDefaults, defaults as commonDefaults } from "./common-options";

import { printDeployContract } from "./print";
import { setInfo } from "./set-info";

export const chainOptions = [false, 'ethereum', 'optimism'] as const;
export type ChainOptions = typeof chainOptions[number];

export interface DeploySafeOptions extends CommonOptions {
    deployName: string;

    chain: ChainOptions;
    // chain: string;

  }

export const defaults: Required<DeploySafeOptions> = {
  deployName: 'DeploySafeProxy',
  chain: 'ethereum',

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
  
  addBase(c, allOpts);


  if (allOpts.chain) {
    addChain(c, allOpts);
  }



  setInfo(c, allOpts.deployInfo);

  return c;
}


function addBase(c: DeployBuilder, { deployName }: DeploySafeOptions) {

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


function addChain(c: DeployBuilder ,  { chain } : Required<DeploySafeOptions> , mnemonic = true,) {

  if (chain === false) {
    return;
  }

  const { safeProxyFactory, safeSingleton } = chainModules[chain];

  const fn = getDeployFunction();

  c.addVariable('address owner;');
    
  c.addFunctionCode(`address safeProxyFactory = ${safeProxyFactory.address};`, fn);
  c.addFunctionCode(`address safeSingleton = ${safeSingleton.address};`, fn);

  c.addFunctionCode(`safeProxyFactory.code.length == 0`, fn);
  c.addFunctionCode(`    ? safeSingleton_ = Safe(deployer.deploy_Safe("SafeSingleton"))`, fn);
  c.addFunctionCode(`    : safeSingleton_ = Safe(payable(safeSingleton));`, fn);

  if (mnemonic) {
    c.addFunctionCode(`string memory mnemonic = vm.envString("MNEMONIC");`, fn);
    c.addFunctionCode(`uint256 ownerPrivateKey = vm.deriveKey(mnemonic, "m/44'/60'/0'/0/", 1);`, fn);
    c.addFunctionCode(`owner = vm.envOr("DEPLOYER", vm.addr(ownerPrivateKey));`, fn);
  } else {

    // to do add option for privatekey & address

  }

  c.addFunctionCode(`safeProxy_ = SafeProxy(deployer.deploy_SystemOwnerSafe("SystemOwnerSafe", "SafeProxyFactory", "SafeSingleton", address(owner)));`, fn);

}

// export interface BaseFunction {
//   name: string;
//   args: FunctionArgument[];
//   returns?: string[];
//   kind: FunctionKind;
//   mutability?: FunctionMutability;
// }

function getDeployFunction() {
  const fn = {
    name: 'deploy',
    args: [],
    returns: ['SafeProxyFactory safeProxyFactory_', 'Safe safeSingleton_, SafeProxy safeProxy_' ] , 
    kind: 'external' as const,
  };

  // if (!incremental) {
  //   fn.args.push({ name: '', type: '' });
  // }

  // if (uriStorage) {
  //   fn.args.push({ name: '', type: 'string memory' });
  // }

  return fn;
}