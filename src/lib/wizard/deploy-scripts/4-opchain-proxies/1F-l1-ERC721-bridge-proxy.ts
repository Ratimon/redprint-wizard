import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedL1ERC721BridgeProxyOptions } from '../../shared/4-opchain-proxies/1F-option-l1-ERC721-bridge-proxy';
import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-proxies/1F-option-l1-ERC721-bridge-proxy';

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedL1ERC721BridgeProxyOptions): Required<SharedL1ERC721BridgeProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployL1ERC721BridgeProxy(opts: SharedL1ERC721BridgeProxyOptions = commonDefaults): string {
  return printDeployContract(buildDeployL1ERC721BridgeProxy(opts));
}

export function buildDeployL1ERC721BridgeProxy(opts: SharedL1ERC721BridgeProxyOptions): DeployContract {
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

        return Proxy(deployer.deploy_ERC1967Proxy("L1ERC721BridgeProxy", proxyOwner));`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['Proxy'],
  },

});