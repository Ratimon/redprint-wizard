import type { DeployContract, BaseFunction} from '../contract';
import { DeployBuilder } from "../contract";

import type {  SharedStepTwoAllSubOptions } from '../../shared/2-superchain/option-all-sub';
import {  defaults } from '../../shared/2-superchain/option-all';

import { defaults as infoDefaults } from "../set-info";

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

function withDeployDefaults(opts: SharedStepTwoAllSubOptions): Required<SharedStepTwoAllSubOptions> {
  return {
    ...opts,
    deployInfo: infoDefaults
  };
}

export function printDeployStepTwoAllSub(opts: SharedStepTwoAllSubOptions = defaults): string {
  return printDeployContract(buildDeployStepTwoAllSub(opts));
}

export function buildDeployStepTwoAllSub(opts: SharedStepTwoAllSubOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c);
  const fn : BaseFunction = getDeployFunction();
  
  setSuperchainDeployment(c, fn);

  setInfo(c, allOpts.deployInfo);

  return c;
}

function addBase(c: DeployBuilder) {

    const console = {
        name: 'console',
        path: '@redprint-forge-std/console.sol',
    };
    c.addImportOnly(console);

    const Script = {
        name: 'Script',
        path: '@redprint-forge-std/Script.sol',
    };
    c.addParent(Script, []);
      
    const IDeployer = {
        name: 'IDeployer',
        path: '@redprint-deploy/deployer/DeployScript.sol',
    };
    c.addImportOnly(IDeployer);
    const getDeployer = {
      name: 'getDeployer',
      path: '@redprint-deploy/deployer/DeployScript.sol',
    };
    c.addImportOnly(getDeployer);

    c.addVariable(`IDeployer deployerProcedue;`);

}

function setSuperchainDeployment(c: DeployBuilder, fn: BaseFunction) {

    const DeployAddressManagerScript = {
        name: 'DeployAddressManagerScript',
        path: '@script/201A_DeployAddressManagerScript.s.sol',
    };
    c.addImportOnly(DeployAddressManagerScript);

    const DeployAndSetupProxyAdminScript = {
        name: 'DeployAndSetupProxyAdminScript',
        path: '@script/201B_DeployAndSetupProxyAdminScript.s.sol',
    };
    c.addImportOnly(DeployAndSetupProxyAdminScript);

    const DeploySuperchainConfigProxyScript = {
        name: 'DeploySuperchainConfigProxyScript',
        path: '@script/202A_DeploySuperchainConfigProxyScript.s.sol',
    };
    c.addImportOnly(DeploySuperchainConfigProxyScript);

    const DeployAndInitializeSuperchainConfig = {
        name: 'DeployAndInitializeSuperchainConfigScript',
        path: '@script/202B_DeployAndInitializeSuperchainConfigScript.s.sol',
    };
    c.addImportOnly(DeployAndInitializeSuperchainConfig);

    const DeployProtocolVersionsProxyScript = {
        name: 'DeployProtocolVersionsProxyScript',
        path: '@script/203A_DeployProtocolVersionsProxyScript.s.sol',
    };
    c.addImportOnly(DeployProtocolVersionsProxyScript);

    const DeployAndInitializeProtocolVersionsScript = {
        name: 'DeployAndInitializeProtocolVersionsScript',
        path: '@script/203B_DeployAndInitializeProtocolVersionsScript.s.sol',
    };
    c.addImportOnly(DeployAndInitializeProtocolVersionsScript);

    c.addFunctionCode(`deployerProcedue = getDeployer();
        deployerProcedue.setAutoSave(true);
        console.log("Setup Superchain ... ");
      
        DeployAddressManagerScript addressManagerDeployments = new DeployAddressManagerScript();
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
        protocolVersionsDeployments.initialize();

        console.log("AddressManager at: ", deployerProcedue.getAddress("AddressManager"));
        console.log("ProxyAdmin at: ", deployerProcedue.getAddress("ProxyAdmin"));
        console.log("SuperchainConfigProxy at: ", deployerProcedue.getAddress("SuperchainConfigProxy"));
        console.log("SuperchainConfig at: ", deployerProcedue.getAddress("SuperchainConfig"));
        console.log("ProtocolVersionsProxy at: ", deployerProcedue.getAddress("ProtocolVersionsProxy"));`, fn);

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