import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedL2OutputOracleProxyOptions } from '../../shared/4-opchain-proxies/1H-option-l2-output-oracle-proxy';
import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-proxies/1H-option-l2-output-oracle-proxy';

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedL2OutputOracleProxyOptions): Required<SharedL2OutputOracleProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployL2OutputOracleProxy(opts: SharedL2OutputOracleProxyOptions = commonDefaults): string {
  return printDeployContract(buildDeployL2OutputOracleProxy(opts));
}

export function buildDeployL2OutputOracleProxy(opts: SharedL2OutputOracleProxyOptions): DeployContract {
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

        return Proxy(deployer.deploy_ERC1967Proxy("L2OutputOracleProxy", proxyOwner));`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['Proxy'],
  },

});