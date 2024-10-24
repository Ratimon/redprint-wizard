import type { DeployContract} from './contract';
import { DeployBuilder } from "./contract";

import type { SharedAnchorStateRegistryProxyOptions } from '../shared/4-opchain/option-anchor-state-registry-proxy';
import { withCommonDefaults, defaults as commonDefaults } from '../shared/4-opchain/option-anchor-state-registry-proxy';

import { printDeployContract } from "./print";
import { setInfo } from "./set-info";

import { defineFunctions } from '../utils/define-functions';

function withDeployDefaults(opts: SharedAnchorStateRegistryProxyOptions): Required<SharedAnchorStateRegistryProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployAnchorStateRegistryProxy(opts: SharedAnchorStateRegistryProxyOptions = commonDefaults): string {
  return printDeployContract(buildDeployAnchorStateRegistryProxy(opts));
}

export function buildDeployAnchorStateRegistryProxy(opts: SharedAnchorStateRegistryProxyOptions): DeployContract {
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

        return Proxy(deployer.deploy_ERC1967Proxy("AnchorStateRegistryProxy", proxyOwner));`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['Proxy'],
  },

});