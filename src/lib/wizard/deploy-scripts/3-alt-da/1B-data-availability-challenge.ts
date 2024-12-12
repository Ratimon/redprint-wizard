import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedDataAvailabilityChallengeOptions, OpSec, } from '../../shared/3-alt-da/1B-option-data-availability-challenge';
import { withCommonDefaults, defaults as commonDefaults } from "../../shared/3-alt-da/1B-option-data-availability-challenge";

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
  setOpsec(c, allOpts.opSec);
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
  
    const DeployConfig = {
      name: 'DeployConfig',
      path: '@redprint-deploy/deployer/DeployConfig.s.sol',
    };
    c.addImportOnly(DeployConfig);
  
    const DeployOptions = {
      name: 'DeployOptions',
      path: '@redprint-deploy/deployer/DeployerFunctions.sol',
    };
    c.addImportOnly(DeployOptions);

    const SafeScript = {
      name: 'SafeScript',
      path: '@redprint-deploy/safe-management/SafeScript.sol',
    };
    c.addParent(SafeScript, []);

    const console = {
      name: 'console',
      path: '@redprint-forge-std/console.sol',
    };
    c.addImportOnly(console);

    const Vm = {
      name: 'Vm',
      path: '@redprint-forge-std/Vm.sol',
    };
    c.addImportOnly(Vm);
    const VmSafe = {
      name: 'VmSafe',
      path: '@redprint-forge-std/Vm.sol',
    };
    c.addImportOnly(VmSafe);
  
    const DataAvailabilityChallenge = {
      name: 'DataAvailabilityChallenge',
      path: '@redprint-core/L1/DataAvailabilityChallenge.sol',
    };
    c.addImportOnly(DataAvailabilityChallenge);

    c.addVariable('DataAvailabilityChallenge dataAvailabilityChallenge;');
    
    // deploy
    c.addFunctionCode(`bytes32 _salt = DeployScript.implSalt();
        DeployOptions memory options = DeployOptions({salt:_salt});

        dataAvailabilityChallenge = deployer.deploy_DataAvailabilityChallenge("DataAvailabilityChallenge", options);

        return dataAvailabilityChallenge;`, functions.deploy);

      // initialize
    c.addFunctionCode(`(VmSafe.CallerMode mode ,address msgSender, ) = vm.readCallers();
        if(mode != VmSafe.CallerMode.Broadcast && msgSender != owner) {
            console.log("Pranking owner ...");
            vm.startPrank(owner);
            initializeDataAvailabilityChallenge();
            vm.stopPrank();
        } else {
            console.log("Broadcasting ...");
            vm.startBroadcast(owner);

            initializeDataAvailabilityChallenge();
            console.log("DataAvailabilityChallenge setted to : %s", address(dataAvailabilityChallenge));

            vm.stopBroadcast();
        }`, functions.initialize);

    // initializeDataAvailabilityChallenge
    c.addFunctionCode(`console.log("Upgrading and initializing DataAvailabilityChallenge proxy");

        address proxyAdmin = deployer.mustGetAddress("ProxyAdmin");
        address safe = deployer.mustGetAddress("SystemOwnerSafe");

        address dataAvailabilityChallengeProxy = deployer.mustGetAddress("DataAvailabilityChallengeProxy");

        DeployConfig cfg = deployer.getConfig();

        address finalSystemOwner = cfg.finalSystemOwner();
        uint256 daChallengeWindow = cfg.daChallengeWindow();
        uint256 daResolveWindow = cfg.daResolveWindow();
        uint256 daBondSize = cfg.daBondSize();
        uint256 daResolverRefundPercentage = cfg.daResolverRefundPercentage();

        _upgradeAndCallViaSafe({
            _proxyAdmin: proxyAdmin,
            _safe: safe,
            _owner: owner,
            _proxy: payable(dataAvailabilityChallengeProxy),
            _implementation: address(dataAvailabilityChallenge),
            _innerCallData: abi.encodeCall(
                DataAvailabilityChallenge.initialize,
                (finalSystemOwner, daChallengeWindow, daResolveWindow, daBondSize, daResolverRefundPercentage)
            )
        });

        DataAvailabilityChallenge dac = DataAvailabilityChallenge(payable(dataAvailabilityChallengeProxy));
        string memory version = dac.version();
        console.log("DataAvailabilityChallenge version: %s", version);

        require(dac.owner() == finalSystemOwner);
        require(dac.challengeWindow() == daChallengeWindow);
        require(dac.resolveWindow() == daResolveWindow);
        require(dac.bondSize() == daBondSize);
        require(dac.resolverRefundPercentage() == daResolverRefundPercentage);`, functions.initializeDataAvailabilityChallenge);
}

function setOpsec(c: DeployBuilder, opsec: OpSec) {
  switch (opsec) {
    case 'address': {
      c.addVariable(`address owner = vm.envAddress("DEPLOYER_ADDRESS");`);

      break;
    }
    case 'key': {
      c.addVariable(`uint256 ownerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");`);
      c.addVariable(`address owner = vm.envOr("DEPLOYER_ADDRESS", vm.addr(ownerPrivateKey));`);

      break;
    }
    case 'mnemonic': {
      c.addVariable(`string mnemonic = vm.envString("MNEMONIC");`);
      c.addVariable(`uint256 ownerPrivateKey = vm.deriveKey(mnemonic, "m/44'/60'/0'/0/", 1);`);
      c.addVariable(`address owner = vm.envOr("DEPLOYER_ADDRESS", vm.addr(ownerPrivateKey));`);
      
      break;
    }
  }
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['DataAvailabilityChallenge'],
  },
  initialize: {
    kind: 'external' as const,
    args: [],
  },
  initializeDataAvailabilityChallenge: {
    kind: 'public' as const,
    args: [],
  },

});