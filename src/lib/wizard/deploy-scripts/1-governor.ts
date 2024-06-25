import type { DeployContract, BaseFunction} from './contract';
import { DeployBuilder } from "./contract";

import type { SharedGovernerOptions} from '../shared/1-shared-governor-option';
import { withCommonDefaults, defaults as commonDefaults } from "../shared/1-shared-governor-option";

import { printDeployContract } from "./print";
import { setInfo } from "./set-info";

export const timelockOptions = [false, 'openzeppelin', 'compound'] as const;
export type TimelockOptions = typeof timelockOptions[number];


function withDeloyDefaults(opts: SharedGovernerOptions): Required<SharedGovernerOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
    timelock: opts.timelock ?? commonDefaults.timelock
  };
}

export function printDeployGovernor(opts: SharedGovernerOptions = commonDefaults): string {
  return printDeployContract(buildDeployGoverner(opts));
}
  
export function buildDeployGoverner(opts: SharedGovernerOptions): DeployContract {
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

  const Script = {
    name: 'Script',
    path: '@forge-std/Script.sol',
  };
  c.addParent(Script, []);

  const MyGovernor = {
    name: 'MyGovernor',
    path: '@main/governer/MyGovernor.sol',
  };
  c.addModule(MyGovernor);
  
  const IVotes = {
    name: 'IVotes',
    path: '@main/governer/MyGovernor.sol',
  };
  c.addModule(IVotes);


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
    timelockParent: {
      path: `@main/governer/MyGovernor.sol`,
    }
  },
  compound: {
    timelockType: {
      name: 'ICompoundTimelock',
    },
    timelockParent: {
      path: `@main/governer/MyGovernor.sol`,
    }
  },
} as const;
  


function addTimelock(c: DeployBuilder, fn: BaseFunction, { timelock }: Required<SharedGovernerOptions>) {
  if (timelock === false) {
    return;
  }

  const { timelockType } = timelockModules[timelock];

  c.addVariable('address timelock;');
  c.addFunctionCode(`${timelockType.name} _timelock = ${timelockType.name}(payable(timelock));`, fn);

}

function addDeployLogic(c: DeployBuilder, fn: BaseFunction, { timelock }: Required<SharedGovernerOptions>) {

  if (timelock === false) {
    return;
  }

  const { timelockType, timelockParent } = timelockModules[timelock];

  const TimelockController = {
    name: timelockType.name,
    path: timelockParent.path,
  };

  c.addModule(TimelockController);

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
