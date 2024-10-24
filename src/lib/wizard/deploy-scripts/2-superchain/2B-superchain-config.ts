import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedSuperchainConfigOptions, OpSec } from '../../shared/2-superchain/2B-option-superchain-config';
import { withCommonDefaults, defaults as commonDefaults } from "../../shared/2-superchain/2B-option-superchain-config";

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedSuperchainConfigOptions): Required<SharedSuperchainConfigOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeploySuperchainConfig(opts: SharedSuperchainConfigOptions = commonDefaults): string {
  return printDeployContract(buildDeploySuperchainConfig(opts));
}

export function buildDeploySuperchainConfig(opts: SharedSuperchainConfigOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c);
  setOpsec(c, allOpts.opSec);
  setInfo(c, allOpts.deployInfo);

  return c;
}

function addBase(c: DeployBuilder) {

  const console = {
    name: 'console',
    path: '@redprint-forge-std/console.sol',
  };
  c.addModule(console);

  const Vm = {
    name: 'Vm',
    path: '@redprint-forge-std/Vm.sol',
  };
  c.addModule(Vm);
  const VmSafe = {
    name: 'VmSafe',
    path: '@redprint-forge-std/Vm.sol',
  };
  c.addModule(VmSafe);

  const DeployerFunctions = {
    name: 'DeployerFunctions',
    path: '@redprint-deploy/deployer/DeployerFunctions.sol',
  };
  c.addLibrary(DeployerFunctions, `IDeployer`);
  const DeployOptions = {
    name: 'DeployOptions',
    path: '@redprint-deploy/deployer/DeployerFunctions.sol',
  };
  c.addModule(DeployOptions);
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

  const SafeScript = {
    name: 'SafeScript',
    path: '@redprint-deploy/safe-management/SafeScript.sol',
  };
  c.addParent(SafeScript, []);

  const ChainAssertions = {
    name: 'ChainAssertions',
    path: '@redprint-deploy/optimism/ChainAssertions.sol',
  };
  c.addModule(ChainAssertions);
  

  const Proxy = {
    name: 'Proxy',
    path: '@redprint-core/universal/Proxy.sol',
  };
  c.addModule(Proxy);

  const SuperchainConfig = {
    name: 'SuperchainConfig',
    path: '@redprint-core/L1/SuperchainConfig.sol',
  };
  c.addModule(SuperchainConfig);

  c.addVariable(`SuperchainConfig superchainConfig;`);

  // deploy
  c.addFunctionCode(`bytes32 _salt = DeployScript.implSalt();

        DeployOptions memory options = DeployOptions({salt:_salt});

        superchainConfig = deployer.deploy_SuperchainConfig("SuperchainConfig", options);
        return superchainConfig;`, functions.deploy);

  // initialize
  c.addFunctionCode(`(VmSafe.CallerMode mode ,address msgSender, ) = vm.readCallers();
        if(mode != VmSafe.CallerMode.Broadcast && msgSender != owner) {
            console.log("Pranking owner ...");
            vm.startPrank(owner);
            initializeSuperchainConfig();
            vm.stopPrank();
        } else {
            console.log("Broadcasting ...");
            vm.startBroadcast(owner);

            initializeSuperchainConfig();
            console.log("SuperchainConfig setted to : %s", address(superchainConfig));

            vm.stopBroadcast();
        }`, functions.initialize);

  // initializeSuperchainConfig
  c.addFunctionCode(`console.log("Upgrading and initializing SuperchainConfig");

        address payable superchainConfigProxy = deployer.mustGetAddress("SuperchainConfigProxy");
        address proxyAdmin = deployer.mustGetAddress("ProxyAdmin");
        address safe = deployer.mustGetAddress("SystemOwnerSafe");

        _upgradeAndCallViaSafe({
            _proxyAdmin: proxyAdmin,
            _safe: safe,
            _owner: owner,
            _proxy: superchainConfigProxy,
            _implementation:  address(superchainConfig),
            _innerCallData: abi.encodeCall(SuperchainConfig.initialize, ( deployer.getConfig().superchainConfigGuardian(), false))
        });

        ChainAssertions.checkSuperchainConfig({ _contracts: deployer.getProxiesUnstrict(), _cfg: deployer.getConfig(), _isPaused: false });`, functions.initializeSuperchainConfig);

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
      returns: ['SuperchainConfig'],
  },
  initialize: {
    kind: 'external' as const,
    args: [],
  },
  initializeSuperchainConfig: {
    kind: 'public' as const,
    args: [],
  },
});