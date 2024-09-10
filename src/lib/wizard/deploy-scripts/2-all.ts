import type { DeployContract, BaseFunction} from './contract';
import { DeployBuilder } from "./contract";

import type {  SharedAllStepTwoOptions, Governance } from '../shared/2-option-all';
import {  defaults } from '../shared/1-option-all';

import { defaults as infoDefaults } from "./set-info";

import { printDeployContract } from "./print";
import { setInfo } from "./set-info";

function withDeployDefaults(opts: SharedAllStepTwoOptions): Required<SharedAllStepTwoOptions> {
  return {
    ...opts,
    deployInfo: infoDefaults
  };
}

export function printDeployAllStepTwo(opts: SharedAllStepTwoOptions = defaults): string {
  return printDeployContract(buildDeployAllStepTwo(opts));
}

export function buildDeployAllStepTwo(opts: SharedAllStepTwoOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c);
  const fn : BaseFunction = getDeployFunction();
  c.addFunctionCode(`deployerProcedue = getDeployer();
        deployerProcedue.setAutoSave(true);`, fn);
  
  setSafeDeployment(c, fn, allOpts.governance);

  setSuperchainDeployment(c, fn);

  setInfo(c, allOpts.deployInfo);

  return c;
}

function addBase(c: DeployBuilder) {

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

function setSafeDeployment(c: DeployBuilder, fn: BaseFunction, gov: Governance) {

    switch (gov) {
      case 'safe-multisig': {

        const DeploySafeProxyScript = {
            name: 'DeploySafeProxyScript',
            path: '@script/101_DeploySafeProxyScript.s.sol',
        };
        c.addModule(DeploySafeProxyScript);

        c.addFunctionCode(`DeploySafeProxyScript safeDeployments = new DeploySafeProxyScript();
        //1) set up Safe Multisig
        safeDeployments.deploy();`, fn);

        break;
      }
      case 'governor': {

        const DeployGovernerScript = {
            name: 'DeployGovernerScript',
            path: '@script/100_DeployGovernerScript.s.sol',
        };

        c.addModule(DeployGovernerScript);
        c.addFunctionCode(`DeployGovernerScript govDeployments = new DeployGovernerScript();
        //1) set up Governer
        govDeployments.deploy();`, fn);
        break;
      }
    }
}

function setSuperchainDeployment(c: DeployBuilder, fn: BaseFunction) {

    const DeployAddressManagerScript = {
        name: 'DeployAddressManagerScript',
        path: '@script/201A_DeployAddressManagerScript.s.sol',
    };
    c.addModule(DeployAddressManagerScript);

    const DeployAndSetupProxyAdminScript = {
        name: 'DeployAndSetupProxyAdminScript',
        path: '@script/201B_DeployAndSetupProxyAdminScript.s.sol',
    };
    c.addModule(DeployAndSetupProxyAdminScript);

    const DeploySuperchainConfigProxyScript = {
        name: 'DeploySuperchainConfigProxyScript',
        path: '@script/202A_DeploySuperchainConfigProxyScript.s.sol',
    };
    c.addModule(DeploySuperchainConfigProxyScript);

    const DeployAndInitializeSuperchainConfig = {
        name: 'DeployAndInitializeSuperchainConfigScript',
        path: '@script/202B_DeployAndInitializeSuperchainConfigScript.s.sol',
    };
    c.addModule(DeployAndInitializeSuperchainConfig);

    const DeployProtocolVersionsProxyScript = {
        name: 'DeployProtocolVersionsProxyScript',
        path: '@script/203A_DeployProtocolVersionsProxyScript.s.sol',
    };
    c.addModule(DeployProtocolVersionsProxyScript);

    const DeployAndInitializeProtocolVersionsScript = {
        name: 'DeployAndInitializeProtocolVersionsScript',
        path: '@script/203B_DeployAndInitializeProtocolVersionsScript.s.sol',
    };
    c.addModule(DeployAndInitializeProtocolVersionsScript);

    c.addFunctionCode(`DeployAddressManagerScript addressManagerDeployments = new DeployAddressManagerScript();
        DeployAndSetupProxyAdminScript proxyAdminDeployments = new DeployAndSetupProxyAdminScript();

        DeploySuperchainConfigProxyScript superchainConfigProxyDeployments = new DeploySuperchainConfigProxyScript();
        DeployAndInitializeSuperchainConfigScript superchainConfigDeployments = new DeployAndInitializeSuperchainConfigScript();

        DeployProtocolVersionsProxyScript protocolVersionsProxyDeployments = new DeployProtocolVersionsProxyScript();
        DeployAndInitializeProtocolVersionsScript protocolVersionsDeployments = new DeployAndInitializeProtocolVersionsScript();

        // Deploy a new ProxyAdmin and AddressManager
        addressManagerDeployments.deploy();
        proxyAdminDeployments.deploy();
        proxyAdminDeployments.initialize();

        // Deploy the SuperchainConfigProxy
        superchainConfigProxyDeployments.deploy();
        superchainConfigDeployments.deploy();
        superchainConfigDeployments.initialize();

        // Deploy the ProtocolVersionsProxy
        protocolVersionsProxyDeployments.deploy();
        protocolVersionsDeployments.deploy();
        protocolVersionsDeployments.initialize();`, fn);

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