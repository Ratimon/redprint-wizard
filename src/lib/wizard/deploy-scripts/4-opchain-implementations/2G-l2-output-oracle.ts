import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedL2OutputOracleOptions } from '../../shared/4-opchain-implementations/2G-option-l2-output-oracle';
import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2G-option-l2-output-oracle';

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedL2OutputOracleOptions): Required<SharedL2OutputOracleOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployL2OutputOracle(opts: SharedL2OutputOracleOptions = commonDefaults): string {
  return printDeployContract(buildDeployL2OutputOracle(opts));
}

export function buildDeployL2OutputOracle(opts: SharedL2OutputOracleOptions): DeployContract {
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

  const L2OutputOracle = {
    name: 'L2OutputOracle',
    path: '@redprint-core/L1/L2OutputOracle.sol',
  };
  c.addModule(L2OutputOracle);

  c.addVariable(`L2OutputOracle l2OutputOracle;`);

  // deploy
  c.addFunctionCode(`DeployConfig cfg = deployer.getConfig();

        bytes32 _salt = DeployScript.implSalt();
        DeployOptions memory options = DeployOptions({salt:_salt});

        l2OutputOracle = deployer.deploy_L2OutputOracle("L2OutputOracle", options);

        Types.ContractSet memory contracts =  deployer.getProxiesUnstrict();
       
        contracts.L2OutputOracle = address(l2OutputOracle);
        ChainAssertions.checkL2OutputOracle({ _contracts: contracts, _cfg: cfg, _l2OutputOracleStartingTimestamp: 0, _isProxy: false });

        return l2OutputOracle;`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['L2OutputOracle'],
  },

});