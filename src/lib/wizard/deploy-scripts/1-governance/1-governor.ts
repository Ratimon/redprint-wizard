import type { DeployContract, BaseFunction} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedGovernerOptions} from '../../shared/1-governance/1-option-governor';
import { withCommonDefaults, defaults as commonDefaults } from "../../shared/1-governance/1-option-governor";

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

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
  return printDeployContract(buildDeployGovernor(opts));
}
  
export function buildDeployGovernor(opts: SharedGovernerOptions): DeployContract {
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

    // to do : refactor to internal function
    if (allOpts.upgradeable) {
      const Upgrades = {
        name: 'Upgrades',
        path: '@openzeppelin-foundry-upgrades/Upgrades.sol',
      };
      c.addImportOnly(Upgrades);
    }

    c.addFunctionCode(`vm.stopBroadcast();
        // DONT forget to save the address of the governace layer
        deployerProcedue.save("SystemOwnerSafe", address(governer));`, fn);

    setInfo(c, allOpts.deployInfo);
  
    return c;
}

function addBase(c: DeployBuilder) {

  const Script = {
    name: 'Script',
    path: '@redprint-forge-std/Script.sol',
  };
  c.addParent(Script, []);

  const MyGovernor = {
    name: 'MyGovernor',
    path: '@main/governer/MyGovernor.sol',
  };
  c.addImportOnly(MyGovernor);
  
  const IVotes = {
    name: 'IVotes',
    path: '@main/governer/MyGovernor.sol',
  };
  c.addImportOnly(IVotes);

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


function addDeployLogic(c: DeployBuilder, fn: BaseFunction, { timelock, upgradeable }: Required<SharedGovernerOptions>) {

  if (timelock === false) {

    // to do : refactor to use `case`
    if (upgradeable == 'transparent' ) {
      c.addFunctionCode(`address proxy = Upgrades.deployTransparentProxy("MyGovernor.sol", abi.encodeCall(MyGovernor.initialize, ( _token)));`, fn);
    } else if (upgradeable == 'uups') {
      c.addFunctionCode(`address proxy = Upgrades.deployUUPSProxy("MyGovernor.sol", abi.encodeCall(MyGovernor.initialize, ( _token)));`, fn);
    } else {
      c.addFunctionCode(`MyGovernor governer = new MyGovernor(_token);`, fn);
    }
    return '';
  }

  const { timelockType, timelockParent } = timelockModules[timelock];

  const TimelockController = {
    name: timelockType.name,
    path: timelockParent.path,
  };

  c.addImportOnly(TimelockController);

  if (upgradeable == 'transparent' ) {
    c.addFunctionCode(`address proxy = Upgrades.deployTransparentProxy("MyGovernor.sol", abi.encodeCall(MyGovernor.initialize, ( _token, _timelock)));`, fn);
  } else if (upgradeable == 'uups') {
    c.addFunctionCode(`address proxy = Upgrades.deployUUPSProxy("MyGovernor.sol", abi.encodeCall(MyGovernor.initialize, ( _token, _timelock)));`, fn);
  } else {
    c.addFunctionCode(`MyGovernor governer = new MyGovernor(_token, _timelock);`, fn);
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
