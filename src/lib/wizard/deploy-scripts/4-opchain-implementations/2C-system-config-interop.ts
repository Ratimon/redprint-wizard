import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedSystemConfigInteropOptions } from '../../shared/4-opchain-implementations/2C-option-system-config-interop';
import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2C-option-system-config-interop';

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedSystemConfigInteropOptions): Required<SharedSystemConfigInteropOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeploySystemConfigInterop(opts: SharedSystemConfigInteropOptions = commonDefaults): string {
  return printDeployContract(buildDeploySystemConfigInterop(opts));
}

export function buildDeploySystemConfigInterop(opts: SharedSystemConfigInteropOptions): DeployContract {
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
  c.addModule(IDeployer);

  const DeployerFunctions = {
    name: 'DeployerFunctions',
    path: '@redprint-deploy/deployer/DeployerFunctions.sol',
  };
  c.addLibrary(DeployerFunctions, `IDeployer`);

  const DeployConfig = {
    name: 'DeployConfig',
    path: '@redprint-deploy/deployer/DeployConfig.s.sol',
  };
  c.addModule(DeployConfig);

  const DeployOptions = {
    name: 'DeployOptions',
    path: '@redprint-deploy/deployer/DeployerFunctions.sol',
  };
  c.addModule(DeployOptions);

  const Types = {
    name: 'Types',
    path: '@redprint-deploy/optimism/Types.sol',
  };
  c.addModule(Types);

  const ChainAssertions = {
    name: 'ChainAssertions',
    path: '@redprint-deploy/optimism/ChainAssertions.sol',
  };
  c.addModule(ChainAssertions);

  const SystemConfigInterop = {
    name: 'SystemConfigInterop',
    path: '@redprint-core/L1/SystemConfigInterop.sol',
  };
  c.addModule(SystemConfigInterop);

  c.addVariable(`SystemConfigInterop systemConfigInterop;`);


  // deploy
  c.addFunctionCode(`DeployConfig cfg = deployer.getConfig();

        bytes32 _salt = DeployScript.implSalt();
        DeployOptions memory options = DeployOptions({salt:_salt});

        systemConfigInterop = deployer.deploy_SystemConfigInterop("SystemConfig", options);

        Types.ContractSet memory contracts =  deployer.getProxiesUnstrict();
       
        contracts.SystemConfig = address(systemConfigInterop);
        ChainAssertions.checkSystemConfig({ _contracts: contracts, _cfg: cfg, _isProxy: false });

        return systemConfigInterop;`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['SystemConfigInterop'],
  },

});