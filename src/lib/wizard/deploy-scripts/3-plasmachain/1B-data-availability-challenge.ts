import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import { withCommonDefaults, defaults as commonDefaults } from "../../shared/3-plasmachain/1B-option-data-availability-challenge";
import type { SharedDataAvailabilityChallengeOptions } from '../../shared/3-plasmachain/1B-option-data-availability-challenge';

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedDataAvailabilityChallengeOptions): Required<SharedDataAvailabilityChallengeOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployDataAvailabilityChallenge(opts: SharedDataAvailabilityChallengeOptions = commonDefaults): string {
  return printDeployContract(buildDeployDataAvailabilityChallenge(opts));
}

export function buildDeployDataAvailabilityChallenge(opts: SharedDataAvailabilityChallengeOptions): DeployContract {
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
  

  
    const DataAvailabilityChallenge = {
      name: 'DataAvailabilityChallenge',
      path: '@redprint-core/L1/DataAvailabilityChallenge.sol',
    };
    c.addModule(DataAvailabilityChallenge);
    
    // deploy
    c.addFunctionCode(`bytes32 _salt = DeployScript.implSalt();
        DeployOptions memory options = DeployOptions({salt:_salt});

        return DataAvailabilityChallenge(deployer.deploy_DataAvailabilityChallenge("DataAvailabilityChallenge", options));`, functions.deploy);
  }

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['DataAvailabilityChallenge'],
  },

});