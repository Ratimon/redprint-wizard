import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedDataAvailabilityChallengeProxyOptions } from '../../shared/3-alt-da/1A-option-data-availability-challenge-proxy';
import { withCommonDefaults, defaults as commonDefaults } from "../../shared/3-alt-da/1A-option-data-availability-challenge-proxy";

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedDataAvailabilityChallengeProxyOptions): Required<SharedDataAvailabilityChallengeProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployDataAvailabilityChallengeProxy(opts: SharedDataAvailabilityChallengeProxyOptions = commonDefaults): string {
  return printDeployContract(buildDeployDataAvailabilityChallengeProxy(opts));
}

export function buildDeployDataAvailabilityChallengeProxy(opts: SharedDataAvailabilityChallengeProxyOptions): DeployContract {
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
  c.addImportOnly(IDeployer);

  const DeployScript = {
    name: 'DeployScript',
    path: '@redprint-deploy/deployer/DeployScript.sol',
  };
  c.addParent(DeployScript, []);

  const Proxy = {
    name: 'Proxy',
    path: '@redprint-core/universal/Proxy.sol',
  };
  c.addImportOnly(Proxy);

  // deploy
  c.addFunctionCode(`address proxyOwner = deployer.mustGetAddress("ProxyAdmin");

        return Proxy(deployer.deploy_ERC1967Proxy("DataAvailabilityChallengeProxy", proxyOwner));`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['Proxy'],
  },

});