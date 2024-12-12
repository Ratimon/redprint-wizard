import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedL1ERC721BridgeOptions } from '../../shared/4-opchain-implementations/2E-option-l1-ERC721-bridge';
import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2E-option-l1-ERC721-bridge';

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedL1ERC721BridgeOptions): Required<SharedL1ERC721BridgeOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployL1ERC721Bridge(opts: SharedL1ERC721BridgeOptions = commonDefaults): string {
  return printDeployContract(buildDeployL1ERC721Bridge(opts));
}

export function buildDeployL1ERC721Bridge(opts: SharedL1ERC721BridgeOptions): DeployContract {
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

  const L1ERC721Bridge = {
    name: 'L1ERC721Bridge',
    path: '@redprint-core/L1/L1ERC721Bridge.sol',
  };
  c.addImportOnly(L1ERC721Bridge);

  c.addVariable(`L1ERC721Bridge l1ERC721Bridge;`);


  // deploy
  c.addFunctionCode(`bytes32 _salt = DeployScript.implSalt();
        DeployOptions memory options = DeployOptions({salt:_salt});

        l1ERC721Bridge = deployer.deploy_L1ERC721Bridge("L1ERC721Bridge", options);

        Types.ContractSet memory contracts =  deployer.getProxiesUnstrict();
       
        contracts.L1ERC721Bridge = address(l1ERC721Bridge);
        ChainAssertions.checkL1ERC721Bridge({ _contracts: contracts, _isProxy: false });

        return l1ERC721Bridge;`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['L1ERC721Bridge'],
  },

});