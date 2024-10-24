import type { DeployContract} from './contract';
import { DeployBuilder } from "./contract";

import type { SharedOptimismMintableERC20FactoryProxyOptions } from '../shared/4-opchain/option-optimism-mintable-ERC20-factory-proxy';
import { withCommonDefaults, defaults as commonDefaults } from '../shared/4-opchain/option-optimism-mintable-ERC20-factory-proxy';

import { printDeployContract } from "./print";
import { setInfo } from "./set-info";

import { defineFunctions } from '../utils/define-functions';

function withDeployDefaults(opts: SharedOptimismMintableERC20FactoryProxyOptions): Required<SharedOptimismMintableERC20FactoryProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployOptimismMintableERC20FactoryProxy(opts: SharedOptimismMintableERC20FactoryProxyOptions = commonDefaults): string {
  return printDeployContract(buildDeployOptimismMintableERC20FactoryProxy(opts));
}

export function buildDeployOptimismMintableERC20FactoryProxy(opts: SharedOptimismMintableERC20FactoryProxyOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c);

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

  const Proxy = {
    name: 'Proxy',
    path: '@redprint-core/universal/Proxy.sol',
  };
  c.addModule(Proxy);

  // deploy
  c.addFunctionCode(`address proxyOwner = deployer.mustGetAddress("ProxyAdmin");

        return Proxy(deployer.deploy_ERC1967Proxy("OptimismMintableERC20FactoryProxy", proxyOwner));`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['Proxy'],
  },

});