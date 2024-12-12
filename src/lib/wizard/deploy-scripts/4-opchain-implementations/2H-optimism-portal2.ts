import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedOptimismPortal2Options } from '../../shared/4-opchain-implementations/2H-option-optimism-portal2';
import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2H-option-optimism-portal2';

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedOptimismPortal2Options): Required<SharedOptimismPortal2Options> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployOptimismPortal2(opts: SharedOptimismPortal2Options = commonDefaults): string {
  return printDeployContract(buildDeployOptimismPortal2(opts));
}

export function buildDeployOptimismPortal2(opts: SharedOptimismPortal2Options): DeployContract {
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

  const OptimismPortal2 = {
    name: 'OptimismPortal2',
    path: '@redprint-core/L1/OptimismPortal2.sol',
  };
  c.addImportOnly(OptimismPortal2);

  c.addVariable(`OptimismPortal2 optimismPortal;`);

  // deploy
  c.addFunctionCode(`DeployConfig cfg = deployer.getConfig();
        // Could also verify this inside DeployConfig but doing it here is a bit more reliable.
        require(
            uint32(cfg.respectedGameType()) == cfg.respectedGameType(), "Deploy: respectedGameType must fit into uint32"
        );

        bytes32 _salt = DeployScript.implSalt();
        DeployOptions memory options = DeployOptions({salt:_salt});

        optimismPortal = deployer.deploy_OptimismPortal2("OptimismPortal2", cfg.proofMaturityDelaySeconds(), cfg.disputeGameFinalityDelaySeconds(), options);

        Types.ContractSet memory contracts =  deployer.getProxiesUnstrict();
       
        contracts.OptimismPortal2 = address(optimismPortal);
        ChainAssertions.checkOptimismPortal2({ _contracts: contracts, _cfg: cfg, _isProxy: false });

        return optimismPortal;`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['OptimismPortal2'],
  },

});