import type { DeployContract} from './contract';
import { DeployBuilder } from "./contract";

import type { SharedL1StandardBridgeProxyOptions } from '../shared/4-opchain/option-l1-standard-bridge-proxy';
import { withCommonDefaults, defaults as commonDefaults } from '../shared/4-opchain/option-l1-standard-bridge-proxy';

import { printDeployContract } from "./print";
import { setInfo } from "./set-info";

import { defineFunctions } from '../utils/define-functions';

function withDeployDefaults(opts: SharedL1StandardBridgeProxyOptions): Required<SharedL1StandardBridgeProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployL1StandardBridgeProxy(opts: SharedL1StandardBridgeProxyOptions = commonDefaults): string {
  return printDeployContract(buildDeployL1StandardBridgeProxy(opts));
}

export function buildDeployL1StandardBridgeProxy(opts: SharedL1StandardBridgeProxyOptions): DeployContract {
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

  const L1ChugSplashProxy = {
    name: 'L1ChugSplashProxy',
    path: '@redprint-core/legacy/L1ChugSplashProxy.sol',
  };
  c.addModule(L1ChugSplashProxy);

  // deploy
  c.addFunctionCode(`address proxyOwner = deployer.mustGetAddress("ProxyAdmin");

        return L1ChugSplashProxy(deployer.deploy_L1ChugSplashProxy("L1StandardBridgeProxy", proxyOwner ));`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['L1ChugSplashProxy'],
  },

});