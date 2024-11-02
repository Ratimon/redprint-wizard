import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedOptimismMintableERC20FactoryOptions } from '../../shared/4-opchain-implementations/2B-option-optimism-mintable-ERC20-factory';
import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2B-option-optimism-mintable-ERC20-factory';

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedOptimismMintableERC20FactoryOptions): Required<SharedOptimismMintableERC20FactoryOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployOptimismMintableERC20Factory(opts: SharedOptimismMintableERC20FactoryOptions = commonDefaults): string {
  return printDeployContract(buildDeployOptimismMintableERC20Factory(opts));
}

export function buildDeployOptimismMintableERC20Factory(opts: SharedOptimismMintableERC20FactoryOptions): DeployContract {
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

  const OptimismMintableERC20Factory = {
    name: 'OptimismMintableERC20Factory',
    path: '@redprint-core/universal/OptimismMintableERC20Factory.sol',
  };
  c.addModule(OptimismMintableERC20Factory);

  c.addVariable(`OptimismMintableERC20Factory factory;`);


  // deploy
  c.addFunctionCode(`bytes32 _salt = DeployScript.implSalt();

        DeployOptions memory options = DeployOptions({salt:_salt});
        factory = deployer.deploy_OptimismMintableERC20Factory("OptimismMintableERC20Factory", options);
        Types.ContractSet memory contracts =  deployer.getProxiesUnstrict();
       
        contracts.OptimismMintableERC20Factory = address(factory);
        ChainAssertions.checkOptimismMintableERC20Factory({ _contracts: contracts, _isProxy: false });

        return factory;`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['OptimismMintableERC20Factory'],
  },

});