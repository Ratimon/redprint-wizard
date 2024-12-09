import type { DeployContract, BaseFunction} from '../contract';
import { DeployBuilder } from "../contract";

import type {  SharedStepThreeAllSubOptions } from '../../shared/3-plasmachain/option-all-sub';
import {  defaults } from '../../shared/3-plasmachain/option-all';

import { defaults as infoDefaults } from "../set-info";

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

function withDeployDefaults(opts: SharedStepThreeAllSubOptions): Required<SharedStepThreeAllSubOptions> {
  return {
    ...opts,
    deployInfo: infoDefaults
  };
}

export function printDeployStepThreeAllSub(opts: SharedStepThreeAllSubOptions = defaults): string {
  return printDeployContract(buildDeployStepThreeAllSub(opts));
}

export function buildDeployStepThreeAllSub(opts: SharedStepThreeAllSubOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c);
  const fn : BaseFunction = getDeployFunction();
  
  setPlasmachainDeployment(c, fn);

  setInfo(c, allOpts.deployInfo);

  return c;
}

function addBase(c: DeployBuilder) {

    const console = {
        name: 'console',
        path: '@redprint-forge-std/console.sol',
    };
    c.addModule(console);

    const Script = {
        name: 'Script',
        path: '@redprint-forge-std/Script.sol',
    };
    c.addParent(Script, []);
      
    const IDeployer = {
        name: 'IDeployer',
        path: '@redprint-deploy/deployer/DeployScript.sol',
    };
    c.addModule(IDeployer);
    const getDeployer = {
      name: 'getDeployer',
      path: '@redprint-deploy/deployer/DeployScript.sol',
    };
    c.addModule(getDeployer);

    c.addVariable(`IDeployer deployerProcedue;`);

}

function setPlasmachainDeployment(c: DeployBuilder, fn: BaseFunction) {

    const DeployDataAvailabilityChallengeProxyScript = {
        name: 'DeployDataAvailabilityChallengeProxyScript',
        path: '@script/301A_DeployDataAvailabilityChallengeProxyScript.s.sol',
    };
    c.addModule(DeployDataAvailabilityChallengeProxyScript);

    const DeployDataAvailabilityChallengeScript = {
      name: 'DeployDataAvailabilityChallengeScript',
      path: '@script/301B_DeployDataAvailabilityChallengeScript.s.sol',
    };
    c.addModule(DeployDataAvailabilityChallengeScript);

    c.addFunctionCode(`deployerProcedue = getDeployer();
        deployerProcedue.setAutoSave(true);

        console.log("Setup Op Alt DA ... ");

        DeployDataAvailabilityChallengeProxyScript dataAvailabilityChallengeProxyDeployments = new DeployDataAvailabilityChallengeProxyScript();
        DeployDataAvailabilityChallengeScript dataAvailabilityChallengeDeployments = new DeployDataAvailabilityChallengeScript();

        dataAvailabilityChallengeProxyDeployments.deploy();
        dataAvailabilityChallengeDeployments.deploy();


        console.log("DataAvailabilityChallengeProxy at: ", deployerProcedue.getAddress("DataAvailabilityChallengeProxy"));
        console.log("DataAvailabilityChallenge at: ", deployerProcedue.getAddress("DataAvailabilityChallenge"));`, fn);

}

function getDeployFunction() {
  const fn = {
    name: 'run',
    args: [],
    returns: [] , 
    kind: 'public' as const,
  };

  return fn;
}