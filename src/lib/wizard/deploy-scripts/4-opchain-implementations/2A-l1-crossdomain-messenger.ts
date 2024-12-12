import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedL1CrossDomainMessengerOptions } from '../../shared/4-opchain-implementations/2A-option-l1-crossdomain-messenger';
import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2A-option-l1-crossdomain-messenger';

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedL1CrossDomainMessengerOptions): Required<SharedL1CrossDomainMessengerOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployL1CrossDomainMessenger(opts: SharedL1CrossDomainMessengerOptions = commonDefaults): string {
  return printDeployContract(buildDeployL1CrossDomainMessenger(opts));
}

export function buildDeployL1CrossDomainMessenger(opts: SharedL1CrossDomainMessengerOptions): DeployContract {
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

  const L1CrossDomainMessenger = {
    name: 'L1CrossDomainMessenger',
    path: '@redprint-core/L1/L1CrossDomainMessenger.sol',
  };
  c.addImportOnly(L1CrossDomainMessenger);

  c.addVariable(`L1CrossDomainMessenger l1CrossDomainMessenger;`);


  // deploy
  c.addFunctionCode(`bytes32 _salt = DeployScript.implSalt();

        DeployOptions memory options = DeployOptions({salt:_salt});
        l1CrossDomainMessenger = deployer.deploy_L1CrossDomainMessenger("L1CrossDomainMessenger", options);
        Types.ContractSet memory contracts =  deployer.getProxiesUnstrict();
       
        contracts.L1CrossDomainMessenger = address(l1CrossDomainMessenger);
        ChainAssertions.checkL1CrossDomainMessenger({ _contracts: contracts, _vm: vm, _isProxy: false });

        return l1CrossDomainMessenger;`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['L1CrossDomainMessenger'],
  },

});