import type { DeployContract, BaseFunction} from './contract';
import { DeployBuilder } from "./contract";

import type { CommonOptions} from './common-options';
import { withCommonDefaults, defaults as commonDefaults } from "./common-options";

import { printDeployContract } from "./print";
import { setInfo } from "./set-info";

export const timelockOptions = [false, 'openzeppelin', 'compound'] as const;
export type TimelockOptions = typeof timelockOptions[number];

export const defaults: Required<DeployGovernerOptions> = {
  deployName: 'DeployGovernerScript',
  timelock: 'openzeppelin',
  deployInfo: commonDefaults.deployInfo
} as const;


export interface DeployGovernerOptions extends CommonOptions {
  deployName: string;

  timelock?: TimelockOptions;
}

function withDeloyDefaults(opts: DeployGovernerOptions): Required<DeployGovernerOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
    timelock: opts.timelock ?? defaults.timelock
  };
}

export function printDeployGovernor(opts: DeployGovernerOptions = defaults): string {
  return printDeployContract(buildDeployGoverner(opts));
}
  
export function buildDeployGoverner(opts: DeployGovernerOptions): DeployContract {
    const allOpts = withDeloyDefaults(opts);
  
    const c = new DeployBuilder(allOpts.deployName);

    addBase(c);

    const fn : BaseFunction = getDeployFunction();

    c.addFunctionCode(`vm.startBroadcast();`, fn);

    addVotes(c, fn);

    if (allOpts.timelock) {
      addTimelock(c, fn, allOpts);
    }

    addDeployLogic(c, fn, allOpts);

    c.addFunctionCode(`vm.stopBroadcast();`, fn);

    setInfo(c, allOpts.deployInfo);
  
    return c;
}

function addBase(c: DeployBuilder) {

  const MyGovernor = {
    name: 'MyGovernor',
    path: '@main/MyGovernor.sol',
  };
  c.addModule(MyGovernor);
  
  const IVotes = {
    name: 'IVotes',
    path: '@openzeppelin/contracts/governance/extensions/GovernorVotes.sol',
  };
  c.addModule(IVotes);

  const TimelockController = {
    name: 'TimelockController',
    path: '@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol',
  };
  c.addModule(TimelockController);
  

  const DeployFunctions = {
    name: 'DeployerFunctions',
    path: '@script-5_0_2/deployer/DeployerFunctions.sol',
  };
  c.addLibrary(DeployFunctions, `IDeployer`);

  const DeployScript = {
    name: 'DeployScript',
    path: '@redprint-core/deployer/DeployScript.sol',
  };
  c.addParent(DeployScript, []);


  c.addVariable('address token;');
  

}

function addVotes(c: DeployBuilder, fn : BaseFunction) {

  c.addVariable('address token;');
  c.addFunctionCode(`IVotes _token = IVotes(token);`, fn);

}

const timelockModules = {
  openzeppelin: {
    timelockType: {
      name: 'TimelockController',
    },
  },
  compound: {
    timelockType: {
      name: 'ICompoundTimelock',
    },
  },
} as const;
  


function addTimelock(c: DeployBuilder, fn: BaseFunction, { timelock }: Required<DeployGovernerOptions>) {
  if (timelock === false) {
    return;
  }

  const { timelockType } = timelockModules[timelock];

  c.addVariable('address timelock;');
  c.addFunctionCode(`${timelockType.name} _timelock = ${timelockType.name}(payable(timelock));`, fn);

}

function addDeployLogic(c: DeployBuilder, fn: BaseFunction, { timelock }: Required<DeployGovernerOptions>) {
  if (timelock ) {
    c.addFunctionCode(`MyGovernor governer = new MyGovernor(_token, _timelock);`, fn);

  } else {
    c.addFunctionCode(`MyGovernor governer = new MyGovernor(_token);`, fn);

  }


}

function getDeployFunction() {
  const fn = {
    name: 'run',
    args: [],
    returns: [ ] , 
    kind: 'external' as const,
  };

  return fn;
}
