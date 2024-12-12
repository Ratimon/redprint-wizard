import type { DeployContract, BaseFunction} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedSafeOptions, OpSec} from '../../shared/1-governance/1-option-safe';
import { withCommonDefaults, defaults } from "../../shared/1-governance/1-option-safe";

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

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
    path: '@redprint-deploy/deployer/DeployerFunctions.sol',
  };
  c.addLibrary(DeployFunctions, `IDeployer`);
  const IDeployer = {
    name: 'IDeployer',
    path: '@redprint-deploy/deployer/DeployerFunctions.sol',
  };
  c.addImportOnly(IDeployer);

  const DeployScript = {
    name: 'DeployScript',
    path: '@redprint-deploy/deployer/DeployScript.sol',
  };
  c.addParent(DeployScript, []);

  const SafeProxyFactory = {
    name: 'SafeProxyFactory',
    path: '@redprint-safe-contracts/contracts/proxies/SafeProxyFactory.sol',
  };
  c.addImportOnly(SafeProxyFactory);

  const Safe = {
    name: 'Safe',
    path: '@redprint-safe-contracts/contracts/Safe.sol',
  };
  c.addImportOnly(Safe);

  const SafeProxy = {
    name: 'SafeProxy',
    path: '@redprint-safe-contracts/contracts/proxies/SafeProxy.sol',
  };
  c.addImportOnly(SafeProxy);

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

  setOpsec(c, allOpts.opSec);

  c.addFunctionCode(`console.log("Setup Governance ... ");
        address safeProxyFactory = ${safeProxyFactory.address};
        address safeSingleton = ${safeSingleton.address};
        safeProxyFactory.code.length == 0
            ? safeSingleton_ = Safe(deployer.deploy_Safe("SafeSingleton"))
            : safeSingleton_ = Safe(payable(safeSingleton));
        safeProxy_ = SafeProxy(deployer.deploy_SystemOwnerSafe("SystemOwnerSafe", "SafeProxyFactory", "SafeSingleton", address(owner)));`, fn);

}

function setOpsec(c: DeployBuilder, opsec: OpSec) {
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