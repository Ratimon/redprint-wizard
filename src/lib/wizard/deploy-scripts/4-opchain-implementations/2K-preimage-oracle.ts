import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedPreimageOracleOptions } from '../../shared/4-opchain-implementations/2K-option-preimage-oracle';
import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2K-option-preimage-oracle';

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedPreimageOracleOptions): Required<SharedPreimageOracleOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployPreimageOracle(opts: SharedPreimageOracleOptions = commonDefaults): string {
  return printDeployContract(buildDeployPreimageOracle(opts));
}

export function buildDeployPreimageOracle(opts: SharedPreimageOracleOptions): DeployContract {
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

  const PreimageOracle = {
    name: 'PreimageOracle',
    path: '@redprint-core/cannon/PreimageOracle.sol',
  };
  c.addImportOnly(PreimageOracle);

  c.addVariable(`PreimageOracle preimageOracle;`);

  // deploy
  c.addFunctionCode(`DeployConfig cfg = deployer.getConfig();

        bytes32 _salt = DeployScript.implSalt();
        DeployOptions memory options = DeployOptions({salt:_salt});

        preimageOracle = deployer.deploy_PreimageOracle("PreimageOracle", cfg.preimageOracleMinProposalSize(), cfg.preimageOracleChallengePeriod(), options);

        return preimageOracle;`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['PreimageOracle'],
  },

});