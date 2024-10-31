import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedProtocolVersionsOptions, OpSec  } from '../../shared/2-superchain/3B-option-versions';
import { withCommonDefaults, defaults as commonDefaults } from "../../shared/2-superchain/3B-option-versions";

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedProtocolVersionsOptions): Required<SharedProtocolVersionsOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployProtocolVersions(opts: SharedProtocolVersionsOptions = commonDefaults): string {
  return printDeployContract(buildDeployProtocolVersions(opts));
}

export function buildDeployProtocolVersions(opts: SharedProtocolVersionsOptions): DeployContract {
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
  const DeployOptions = {
    name: 'DeployOptions',
    path: '@redprint-deploy/deployer/DeployerFunctions.sol',
  };
  c.addModule(DeployOptions);


  const SafeScript = {
    name: 'SafeScript',
    path: '@redprint-deploy/safe-management/SafeScript.sol',
  };
  c.addParent(SafeScript, []);

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
  

  const ProtocolVersions = {
    name: 'ProtocolVersions',
    path: '@redprint-core/L1/ProtocolVersions.sol',
  };
  c.addModule(ProtocolVersions);

  const ProtocolVersion = {
    name: 'ProtocolVersion',
    path: '@redprint-core/L1/ProtocolVersions.sol',
  };
  c.addModule(ProtocolVersion);

  c.addVariable(`ProtocolVersions versions;`);

  // deploy
  c.addFunctionCode(`bytes32 _salt = DeployScript.implSalt();

        DeployOptions memory options = DeployOptions({salt:_salt});

        versions = deployer.deploy_ProtocolVersions("ProtocolVersions", options);

        Types.ContractSet memory contracts = deployer.getProxiesUnstrict();
        contracts.ProtocolVersions = address(versions);
        ChainAssertions.checkProtocolVersions({ _contracts: contracts, _cfg: deployer.getConfig(), _isProxy: false });

        return versions;`, functions.deploy);

  // initialize
  c.addFunctionCode(`(VmSafe.CallerMode mode ,address msgSender, ) = vm.readCallers();
        if(mode != VmSafe.CallerMode.Broadcast && msgSender != owner) {
            console.log("Pranking owner ...");
            vm.startPrank(owner);
            initializeProtocolVersions();
            vm.stopPrank();
        } else {
            console.log("Broadcasting ...");
            vm.startBroadcast(owner);

            initializeProtocolVersions();
            console.log("ProtocolVersions setted to : %s", address(versions));

            vm.stopBroadcast();
        }`, functions.initialize);

  // initializeProtocolVersions
  c.addFunctionCode(`console.log("Upgrading and initializing ProtocolVersions proxy");

        address proxyAdmin = deployer.mustGetAddress("ProxyAdmin");
        address safe = deployer.mustGetAddress("SystemOwnerSafe");

        address protocolVersionsProxy = deployer.mustGetAddress("ProtocolVersionsProxy");
        address protocolVersions = deployer.mustGetAddress("ProtocolVersions");

        address finalSystemOwner = deployer.getConfig().finalSystemOwner();
        uint256 requiredProtocolVersion = deployer.getConfig().requiredProtocolVersion();
        uint256 recommendedProtocolVersion = deployer.getConfig().recommendedProtocolVersion();

        _upgradeAndCallViaSafe({
            _proxyAdmin: proxyAdmin,
            _safe: safe,
            _owner: owner,
            _proxy: payable(protocolVersionsProxy),
            _implementation: protocolVersions,
            _innerCallData: abi.encodeCall(
                ProtocolVersions.initialize,
                (
                    finalSystemOwner,
                    ProtocolVersion.wrap(requiredProtocolVersion),
                    ProtocolVersion.wrap(recommendedProtocolVersion)
                )
            )
        });

        ProtocolVersions _versions = ProtocolVersions(protocolVersionsProxy);
        string memory version = _versions.version();
        console.log("ProtocolVersions version: %s", version);

        ChainAssertions.checkProtocolVersions({ _contracts: deployer.getProxiesUnstrict(), _cfg: deployer.getConfig(), _isProxy: true });`, functions.initializeProtocolVersions);


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
      returns: ['ProtocolVersions'],
  },
  initialize: {
    kind: 'external' as const,
    args: [],
  },
  initializeProtocolVersions: {
    kind: 'public' as const,
    args: [],
  },

  
});