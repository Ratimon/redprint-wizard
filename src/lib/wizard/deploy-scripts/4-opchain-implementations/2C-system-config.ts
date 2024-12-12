import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedSystemConfigOptions } from '../../shared/4-opchain-implementations/2C-option-system-config';
import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2C-option-system-config';

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedSystemConfigOptions): Required<SharedSystemConfigOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeploySystemConfig(opts: SharedSystemConfigOptions = commonDefaults): string {
  return printDeployContract(buildDeploySystemConfig(opts));
}

export function buildDeploySystemConfig(opts: SharedSystemConfigOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c);

  setInfo(c, allOpts.deployInfo);

  return c;
}

function addBase(c: DeployBuilder) {

  const DeployScript = {
    name: 'DeployScript',
    path: '@redprint-deploy/deployer/DeployScript.sol',
  };
  c.addParent(DeployScript, []);
  const IDeployer = {
    name: 'IDeployer',
    path: '@redprint-deploy/deployer/DeployScript.sol',
    };
  c.addImportOnly(IDeployer);

  const DeployerFunctions = {
    name: 'DeployerFunctions',
    path: '@redprint-deploy/deployer/DeployerFunctions.sol',
  };
  c.addLibrary(DeployerFunctions, `IDeployer`);

  const DeployConfig = {
    name: 'DeployConfig',
    path: '@redprint-deploy/deployer/DeployConfig.s.sol',
  };
  c.addImportOnly(DeployConfig);

  const DeployOptions = {
    name: 'DeployOptions',
    path: '@redprint-deploy/deployer/DeployerFunctions.sol',
  };
  c.addImportOnly(DeployOptions);

  const Types = {
    name: 'Types',
    path: '@redprint-deploy/optimism/Types.sol',
  };
  c.addImportOnly(Types);

  const ChainAssertions = {
    name: 'ChainAssertions',
    path: '@redprint-deploy/optimism/ChainAssertions.sol',
  };
  c.addImportOnly(ChainAssertions);

  const SystemConfig = {
    name: 'SystemConfig',
    path: '@redprint-core/L1/SystemConfig.sol',
  };
  c.addImportOnly(SystemConfig);

  c.addVariable(`SystemConfig systemConfig;`);

  // deploy
  c.addFunctionCode(`DeployConfig cfg = deployer.getConfig();

        bytes32 _salt = DeployScript.implSalt();
        DeployOptions memory options = DeployOptions({salt:_salt});

        systemConfig = deployer.deploy_SystemConfig("SystemConfig", options);
        Types.ContractSet memory contracts =  deployer.getProxiesUnstrict();
        contracts.SystemConfig = address(systemConfig);
        ChainAssertions.checkSystemConfig({ _contracts: contracts, _cfg: cfg, _isProxy: false });

        return systemConfig;`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['SystemConfig'],
  },

});