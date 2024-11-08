import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedL1StandardBridgeOptions } from '../../shared/4-opchain-implementations/2D-option-l1-standard-bridge';
import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2D-option-l1-standard-bridge';

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedL1StandardBridgeOptions): Required<SharedL1StandardBridgeOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployL1StandardBridge(opts: SharedL1StandardBridgeOptions = commonDefaults): string {
  return printDeployContract(buildDeployL1StandardBridge(opts));
}

export function buildDeployL1StandardBridge(opts: SharedL1StandardBridgeOptions): DeployContract {
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

  const L1StandardBridge = {
    name: 'L1StandardBridge',
    path: '@redprint-core/L1/L1StandardBridge.sol',
  };
  c.addModule(L1StandardBridge);

  c.addVariable(`L1StandardBridge l1StandardBridge;`);


  // deploy
  c.addFunctionCode(`bytes32 _salt = DeployScript.implSalt();
        DeployOptions memory options = DeployOptions({salt:_salt});

        l1StandardBridge = deployer.deploy_L1StandardBridge("L1StandardBridge", options);

        Types.ContractSet memory contracts =  deployer.getProxiesUnstrict();
       
        contracts.L1StandardBridge = address(l1StandardBridge);
        ChainAssertions.checkL1StandardBridge({ _contracts: contracts, _isProxy: false });

        return l1StandardBridge;`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['L1StandardBridge'],
  },

});