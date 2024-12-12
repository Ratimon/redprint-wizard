import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedMIPSOptions } from '../../shared/4-opchain-implementations/2L-option-mips';
import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2L-option-mips';

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedMIPSOptions): Required<SharedMIPSOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployMIPS(opts: SharedMIPSOptions = commonDefaults): string {
  return printDeployContract(buildDeployMIPS(opts));
}

export function buildDeployMIPS(opts: SharedMIPSOptions): DeployContract {
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

  const IPreimageOracle = {
    name: 'IPreimageOracle',
    path: '@redprint-core/cannon/interfaces/IPreimageOracle.sol',
  };
  c.addImportOnly(IPreimageOracle);

  const MIPS = {
    name: 'MIPS',
    path: '@redprint-core/cannon/MIPS.sol',
  };
  c.addImportOnly(MIPS);

  c.addVariable(`MIPS mips;`);

  // deploy
  c.addFunctionCode(`address preimageOracle = deployer.mustGetAddress("PreimageOracle");

        bytes32 _salt = DeployScript.implSalt();
        DeployOptions memory options = DeployOptions({salt:_salt});

        mips = deployer.deploy_MIPS("Mips", IPreimageOracle(preimageOracle), options);

        return mips;`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['MIPS'],
  },

});