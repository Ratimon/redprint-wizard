import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedL1CrossDomainMessengerProxyOptions } from '../../shared/4-opchain-proxies/1D-option-l1-crossdomain-messenger-proxy';
import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-proxies/1D-option-l1-crossdomain-messenger-proxy';

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedL1CrossDomainMessengerProxyOptions): Required<SharedL1CrossDomainMessengerProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployL1CrossDomainMessengerProxy(opts: SharedL1CrossDomainMessengerProxyOptions = commonDefaults): string {
  return printDeployContract(buildDeployL1CrossDomainMessengerProxy(opts));
}

export function buildDeployL1CrossDomainMessengerProxy(opts: SharedL1CrossDomainMessengerProxyOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c);

  setInfo(c, allOpts.deployInfo);

  return c;
}

function addBase(c: DeployBuilder) {
  const DeployFunctions = {
    name: 'DeployerFunctions',
    path: '@redprint-deploy/deployer/DeployerFunctions.sol',
  };
  c.addLibrary(DeployFunctions, `IDeployer`);
  const IDeployer = {
    name: 'IDeployer',
    path: '@redprint-deploy/deployer/DeployerFunctions.sol',
  };
  c.addImportOnly(IDeployer);

  const DeployScript = {
    name: 'DeployScript',
    path: '@redprint-deploy/deployer/DeployScript.sol',
  };
  c.addParent(DeployScript, []);

  const AddressManager = {
    name: 'AddressManager',
    path: '@redprint-core/legacy/AddressManager.sol',
  };
  c.addImportOnly(AddressManager);

  const ResolvedDelegateProxy = {
    name: 'ResolvedDelegateProxy',
    path: '@redprint-core/legacy/ResolvedDelegateProxy.sol',
  };
  c.addImportOnly(ResolvedDelegateProxy);

  // deploy
  c.addFunctionCode(`address addressManager = deployer.mustGetAddress("AddressManager");

        return ResolvedDelegateProxy(deployer.deploy_ResolvedDelegateProxy("L1CrossDomainMessengerProxy", addressManager, "OVM_L1CrossDomainMessenger" ));`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['ResolvedDelegateProxy'],
  },

});