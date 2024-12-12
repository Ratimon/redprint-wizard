import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedAnchorStateRegistryOptions } from '../../shared/4-opchain-implementations/2M-option-anchor-state-registry';
import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2M-option-anchor-state-registry';

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedAnchorStateRegistryOptions): Required<SharedAnchorStateRegistryOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployAnchorStateRegistry(opts: SharedAnchorStateRegistryOptions = commonDefaults): string {
  return printDeployContract(buildDeployAnchorStateRegistry(opts));
}

export function buildDeployAnchorStateRegistry(opts: SharedAnchorStateRegistryOptions): DeployContract {
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

  const DeployOptions = {
    name: 'DeployOptions',
    path: '@redprint-deploy/deployer/DeployerFunctions.sol',
  };
  c.addImportOnly(DeployOptions);

  const IDisputeGameFactory = {
    name: 'IDisputeGameFactory',
    path: '@redprint-core/dispute/interfaces/IDisputeGameFactory.sol',
  };
  c.addImportOnly(IDisputeGameFactory);

  const AnchorStateRegistry = {
    name: 'AnchorStateRegistry',
    path: '@redprint-core/dispute/AnchorStateRegistry.sol',
  };
  c.addImportOnly(AnchorStateRegistry);

  c.addVariable(`AnchorStateRegistry anchorStateRegistry;`);

  // deploy
  c.addFunctionCode(`address disputeGameFactory = deployer.mustGetAddress("DisputeGameFactory");

        bytes32 _salt = DeployScript.implSalt();
        DeployOptions memory options = DeployOptions({salt:_salt});

        anchorStateRegistry = deployer.deploy_AnchorStateRegistry("AnchorStateRegistry", IDisputeGameFactory(disputeGameFactory), options);

        return anchorStateRegistry;`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['AnchorStateRegistry'],
  },

});