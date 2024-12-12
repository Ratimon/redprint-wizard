import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedDisputeGameFactoryOptions } from '../../shared/4-opchain-implementations/2I-option-dispute-game-factory';
import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2I-option-dispute-game-factory';

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedDisputeGameFactoryOptions): Required<SharedDisputeGameFactoryOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployDisputeGameFactory(opts: SharedDisputeGameFactoryOptions = commonDefaults): string {
  return printDeployContract(buildDeployDisputeGameFactory(opts));
}

export function buildDeployDisputeGameFactory(opts: SharedDisputeGameFactoryOptions): DeployContract {
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

  const DisputeGameFactory = {
    name: 'DisputeGameFactory',
    path: '@redprint-core/dispute/DisputeGameFactory.sol',
  };
  c.addImportOnly(DisputeGameFactory);

  c.addVariable(`DisputeGameFactory disputeGameFactory;`);


  // deploy
  c.addFunctionCode(`bytes32 _salt = DeployScript.implSalt();

        DeployOptions memory options = DeployOptions({salt:_salt});
        disputeGameFactory = deployer.deploy_DisputeGameFactory("DisputeGameFactory", options);

        Types.ContractSet memory contracts =  deployer.getProxiesUnstrict();
       
        contracts.DisputeGameFactory = address(disputeGameFactory);
        ChainAssertions.checkDisputeGameFactory({ _contracts: contracts, _expectedOwner: address(0), _isProxy: false });

        return disputeGameFactory;`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['DisputeGameFactory'],
  },

});