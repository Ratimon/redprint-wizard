import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedOptimismPortalInteropOptions } from '../../shared/4-opchain-implementations/2H-option-optimism-portal-interop';
import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2H-option-optimism-portal-interop';

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedOptimismPortalInteropOptions): Required<SharedOptimismPortalInteropOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployOptimismPortalInterop(opts: SharedOptimismPortalInteropOptions = commonDefaults): string {
  return printDeployContract(buildDeployOptimismPortalInterop(opts));
}

export function buildDeployOptimismPortalInterop(opts: SharedOptimismPortalInteropOptions): DeployContract {
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

  const OptimismPortalInterop = {
    name: 'OptimismPortalInterop',
    path: '@redprint-core/L1/OptimismPortalInterop.sol',
  };
  c.addModule(OptimismPortalInterop);

  c.addVariable(`OptimismPortalInterop optimismPortal;`);

  // deploy
  c.addFunctionCode(`DeployConfig cfg = deployer.getConfig();
        // Could also verify this inside DeployConfig but doing it here is a bit more reliable.
        require(
            uint32(cfg.respectedGameType()) == cfg.respectedGameType(), "Deploy: respectedGameType must fit into uint32"
        );

        bytes32 _salt = DeployScript.implSalt();
        DeployOptions memory options = DeployOptions({salt:_salt});

        optimismPortal = deployer.deploy_OptimismPortalInterop("OptimismPortal2", cfg.proofMaturityDelaySeconds(), cfg.disputeGameFinalityDelaySeconds(), options);

        Types.ContractSet memory contracts =  deployer.getProxiesUnstrict();
       
        contracts.OptimismPortal2 = address(optimismPortal);
        ChainAssertions.checkOptimismPortal2({ _contracts: contracts, _cfg: cfg, _isProxy: false });

        return optimismPortal;`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['OptimismPortalInterop'],
  },

});