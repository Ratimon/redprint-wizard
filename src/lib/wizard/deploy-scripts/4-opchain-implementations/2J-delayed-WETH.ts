import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedDelayedWETHOptions } from '../../shared/4-opchain-implementations/2J-option-delayed-WETH';
import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2J-option-delayed-WETH';

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedDelayedWETHOptions): Required<SharedDelayedWETHOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployDelayedWETH(opts: SharedDelayedWETHOptions = commonDefaults): string {
  return printDeployContract(buildDeployDelayedWETH(opts));
}

export function buildDeployDelayedWETH(opts: SharedDelayedWETHOptions): DeployContract {
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

  const DelayedWETH = {
    name: 'DelayedWETH',
    path: '@redprint-core/dispute/DelayedWETH.sol',
  };
  c.addModule(DelayedWETH);

  c.addVariable(`DelayedWETH delayedWETH;`);

  // deploy
  c.addFunctionCode(`DeployConfig cfg = deployer.getConfig();

        bytes32 _salt = DeployScript.implSalt();
        DeployOptions memory options = DeployOptions({salt:_salt});

        delayedWETH = deployer.deploy_DelayedWETH("DelayedWETH", cfg.faultGameWithdrawalDelay(), options);

        Types.ContractSet memory contracts =  deployer.getProxiesUnstrict();
       
        contracts.DelayedWETH = address(delayedWETH);
        ChainAssertions.checkDelayedWETH({ _contracts: contracts, _cfg: cfg, _isProxy: false, _expectedOwner: address(0) });

        return delayedWETH;`, functions.deploy);
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['DelayedWETH'],
  },

});