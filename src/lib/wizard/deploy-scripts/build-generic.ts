import type { SharedSafeOptions} from '../shared/1-governance/1-option-safe';
import { buildDeploySafe } from './1-governance/1-safe';

import type { SharedGovernerOptions} from '../shared/1-governance/1-option-governor';
import { buildDeployGovernor } from './1-governance/1-governor';

import type { SharedStepOneAllOptions} from '../shared/1-governance/option-all';
import { buildDeployStepOneAll } from './1-governance/all';

import type { SharedAddressManagerOptions } from '../shared/2-superchain/1A-option-address-manager';
import { buildDeployAddressManager } from './2-superchain/1A-address-manager';

import type { SharedProxyAdminOptions } from '../shared/2-superchain/1B-option-proxy-admin';
import { buildDeployProxyAdmin } from './2-superchain/1B-proxy-admin'

import type { SharedSuperchainConfigProxyOptions } from '../shared/2-superchain/2A-option-superchain-config-proxy';
import { buildDeploySuperchainConfigProxy } from './2-superchain/2A-superchain-config-proxy';

import type { SharedSuperchainConfigOptions } from '../shared/2-superchain/2B-option-superchain-config';
import { buildDeploySuperchainConfig } from './2-superchain/2B-superchain-config';

import type { SharedProtocolVersionsProxyOptions } from '../shared/2-superchain/3A-option-versions-proxy';
import { buildDeployProtocolVersionsProxy } from './2-superchain/3A-versions-proxy';

import type { SharedProtocolVersionsOptions } from '../shared/2-superchain/3B-option-versions';
import { buildDeployProtocolVersions } from './2-superchain/3B-versions';

import type { SharedStepTwoAllSubOptions } from '../shared/2-superchain/option-all-sub';
import { buildDeployStepTwoAllSub } from './2-superchain/all-sub';

import type { SharedStepTwoAllOptions} from '../shared/2-superchain/option-all';
import { buildDeployStepTwoAll } from './2-superchain/all';

import type { SharedDataAvailabilityChallengeProxyOptions } from '../shared/3-alt-da/1A-option-data-availability-challenge-proxy';
import { buildDeployDataAvailabilityChallengeProxy } from './3-alt-da/1A-data-availability-challenge-proxy';

import type { SharedDataAvailabilityChallengeOptions } from '../shared/3-alt-da/1B-option-data-availability-challenge';
import { buildDeployDataAvailabilityChallenge } from './3-alt-da/1B-data-availability-challenge';

import type { SharedStepThreeAllSubOptions } from '../shared/3-alt-da/option-all-sub';
import { buildDeployStepThreeAllSub } from './3-alt-da/all-sub';

import type { SharedStepThreeAllOptions } from '../shared/3-alt-da/option-all';
import { buildDeployStepThreeAll } from './3-alt-da/all';

import type { SharedOptimismPortalProxyOptions} from '../shared/4-opchain-proxies/1A-option-optimism-portal-proxy';
import { buildDeployOptimismPortalProxy } from './4-opchain-proxies/1A-optimism-portal-proxy';

import type { SharedSystemConfigProxyOptions} from '../shared/4-opchain-proxies/1B-option-system-config-proxy';
import { buildDeploySystemConfigProxy } from './4-opchain-proxies/1B-system-config-proxy';

import type { SharedL1StandardBridgeProxyOptions } from '../shared/4-opchain-proxies/1C-option-l1-standard-bridge-proxy';
import { buildDeployL1StandardBridgeProxy } from './4-opchain-proxies/1C-l1-standard-bridge-proxy';

import type { SharedL1CrossDomainMessengerProxyOptions } from '../shared/4-opchain-proxies/1D-option-l1-crossdomain-messenger-proxy';
import { buildDeployL1CrossDomainMessengerProxy } from './4-opchain-proxies/1D-l1-crossdomain-messenger-proxy';

import type { SharedOptimismMintableERC20FactoryProxyOptions } from '../shared/4-opchain-proxies/1E-option-optimism-mintable-ERC20-factory-proxy';
import { buildDeployOptimismMintableERC20FactoryProxy } from './4-opchain-proxies/1E-optimism-mintable-ERC20-factory-proxy';

import type { SharedL1ERC721BridgeProxyOptions } from '../shared/4-opchain-proxies/1F-option-l1-ERC721-bridge-proxy';
import { buildDeployL1ERC721BridgeProxy } from './4-opchain-proxies/1F-l1-ERC721-bridge-proxy';

import type { SharedDisputeGameFactoryProxyOptions } from '../shared/4-opchain-proxies/1G-option-dispute-game-factory-proxy';
import { buildDeployDisputeGameFactoryProxy } from './4-opchain-proxies/1G-dispute-game-factory-proxy';

import type { SharedL2OutputOracleProxyOptions } from '../shared/4-opchain-proxies/1H-option-l2-output-oracle-proxy';
import { buildDeployL2OutputOracleProxy } from './4-opchain-proxies/1H-l2-output-oracle-proxy';

import type { SharedDelayedWETHProxyOptions } from '../shared/4-opchain-proxies/1I-option-delayed-WETH-proxy';
import { buildDeployDelayedWETHProxy } from './4-opchain-proxies/1I-delayed-WETH-proxy';

import type { SharedPermissionedDelayedWETHProxyOptions } from '../shared/4-opchain-proxies/1J-option-permissioned-delayed-WETH-proxy';
import { buildDeployPermissionedDelayedWETHProxy } from './4-opchain-proxies/1J-permissioned-delayed-WETH-proxy';

import type { SharedAnchorStateRegistryProxyOptions } from '../shared/4-opchain-proxies/1K-option-anchor-state-registry-proxy';
import { buildDeployAnchorStateRegistryProxy } from './4-opchain-proxies/1K-anchor-state-registry-proxy';

import type { SharedTransferAddressManagerOwnershipOptions } from '../shared/4-opchain-proxies/1L-option-transfer-address-manager-ownership';
import { buildTransferAddressManagerOwnership } from './4-opchain-proxies/1L-transfer-address-manager-ownership';

import type { SharedStepFourPointOneAllSubOptions } from '../shared/4-opchain-proxies/option-all-sub';
import { buildDeployStepFourPointOneAllSub } from './4-opchain-proxies/all-sub';

import type { SharedStepFourPointOneAllOptions } from '../shared/4-opchain-proxies/option-all';
import { buildDeployStepFourPointOneAll } from './4-opchain-proxies/all';

import type { SharedL1CrossDomainMessengerOptions } from '../shared/4-opchain-implementations/2A-option-l1-crossdomain-messenger';
import { buildDeployL1CrossDomainMessenger } from './4-opchain-implementations/2A-l1-crossdomain-messenger';

import type { SharedOptimismMintableERC20FactoryOptions } from '../shared/4-opchain-implementations/2B-option-optimism-mintable-ERC20-factory';
import { buildDeployOptimismMintableERC20Factory } from './4-opchain-implementations/2B-optimism-mintable-ERC20-factory';

import type { SharedSystemConfigOptions } from '../shared/4-opchain-implementations/2C-option-system-config';
import { buildDeploySystemConfig } from './4-opchain-implementations/2C-system-config';

import type { SharedSystemConfigInteropOptions } from '../shared/4-opchain-implementations/2C-option-system-config-interop';
import { buildDeploySystemConfigInterop } from './4-opchain-implementations/2C-system-config-interop';

import type { SharedL1StandardBridgeOptions } from '../shared/4-opchain-implementations/2D-option-l1-standard-bridge';
import { buildDeployL1StandardBridge } from './4-opchain-implementations/2D-l1-standard-bridge';

import type { SharedL1ERC721BridgeOptions } from '../shared/4-opchain-implementations/2E-option-l1-ERC721-bridge';
import { buildDeployL1ERC721Bridge } from './4-opchain-implementations/2E-l1-ERC721-bridge';

import type { SharedOptimismPortalOptions } from '../shared/4-opchain-implementations/2F-option-optimism-portal';
import { buildDeployOptimismPortal } from './4-opchain-implementations/2F-optimism-portal';

import type { SharedL2OutputOracleOptions } from '../shared/4-opchain-implementations/2G-option-l2-output-oracle';
import { buildDeployL2OutputOracle } from './4-opchain-implementations/2G-l2-output-oracle';

import type { SharedOptimismPortal2Options } from '../shared/4-opchain-implementations/2H-option-optimism-portal2';
import { buildDeployOptimismPortal2 } from './4-opchain-implementations/2H-optimism-portal2';

import type { SharedOptimismPortalInteropOptions } from '../shared/4-opchain-implementations/2H-option-optimism-portal-interop';
import { buildDeployOptimismPortalInterop } from './4-opchain-implementations/2H-optimism-portal-interop';

import type { SharedDisputeGameFactoryOptions } from '../shared/4-opchain-implementations/2I-option-dispute-game-factory';
import { buildDeployDisputeGameFactory } from './4-opchain-implementations/2I-dispute-game-factory';

import type { SharedDelayedWETHOptions } from '../shared/4-opchain-implementations/2J-option-delayed-WETH';
import { buildDeployDelayedWETH } from './4-opchain-implementations/2J-delayed-WETH';

import type { SharedPreimageOracleOptions } from '../shared/4-opchain-implementations/2K-option-preimage-oracle';
import { buildDeployPreimageOracle } from './4-opchain-implementations/2K-preimage-oracle'

import type { SharedMIPSOptions } from '../shared/4-opchain-implementations/2L-option-mips';
import { buildDeployMIPS } from './4-opchain-implementations/2L-mips';

import type { SharedAnchorStateRegistryOptions } from '../shared/4-opchain-implementations/2M-option-anchor-state-registry';
import { buildDeployAnchorStateRegistry } from './4-opchain-implementations/2M-anchor-state-registry';

import type { SharedInitializeImplementationsOptions } from '../shared/4-opchain-implementations/2N-option-initialize-implementations';
import { buildDeployInitializeImplementations } from './4-opchain-implementations/2N-initialize-implementations';

import type { SharedSetFaultGameImplementationOptions } from '../shared/4-opchain-implementations/2O-option-set-fault-game-implementation';
import { buildDeploySetFaultGameImplementation } from './4-opchain-implementations/2O-set-fault-game-implementation';

import type { SharedStepFourPointTwoAllSubOptions } from '../shared/4-opchain-implementations/option-all-sub';
import { buildDeployStepFourPointTwoAllSub } from './4-opchain-implementations/all-sub';

import type { SharedStepFourPointTwoAllOptions } from '../shared/4-opchain-implementations/option-all';
import { buildDeployStepFourPointTwoAll } from './4-opchain-implementations/all';

export interface DeployKindedOptions {
  Safe: { kind: 'Safe' } & SharedSafeOptions;
  Governor: { kind: 'Governor' } & SharedGovernerOptions;
  StepOneAll: {kind: 'StepOneAll'} & SharedStepOneAllOptions;

  AddressManager: {kind: 'AddressManager'} & SharedAddressManagerOptions;
  ProxyAdmin: {kind: 'ProxyAdmin'} & SharedProxyAdminOptions;
  SuperchainConfigProxy: {kind: 'SuperchainConfigProxy'} & SharedSuperchainConfigProxyOptions;
  SuperchainConfig: {kind: 'SuperchainConfig'} & SharedSuperchainConfigOptions;
  ProtocolVersionsProxy : {kind: 'ProtocolVersionsProxy'} & SharedProtocolVersionsProxyOptions;
  ProtocolVersions : {kind: 'ProtocolVersions'} & SharedProtocolVersionsOptions;
  StepTwoAllSub: {kind: 'StepTwoAllSub'} & SharedStepTwoAllSubOptions;
  StepTwoAll: {kind: 'StepTwoAll'} & SharedStepTwoAllOptions;

  DataAvailabilityChallengeProxy: {kind: 'DataAvailabilityChallengeProxy'} & SharedDataAvailabilityChallengeProxyOptions;
  DataAvailabilityChallenge: {kind: 'DataAvailabilityChallenge'} & SharedDataAvailabilityChallengeOptions;
  StepThreeAllSub: {kind: 'StepThreeAllSub'} & SharedStepThreeAllSubOptions;
  StepThreeAll: {kind: 'StepThreeAll'} & SharedStepThreeAllOptions;

  OptimismPortalProxy: {kind: 'OptimismPortalProxy'} & SharedOptimismPortalProxyOptions;
  SystemConfigProxy : {kind: 'SystemConfigProxy'} & SharedSystemConfigProxyOptions;
  L1StandardBridgeProxy: {kind: 'L1StandardBridgeProxy'} & SharedL1StandardBridgeProxyOptions;
  L1CrossDomainMessengerProxy: {kind: 'L1CrossDomainMessengerProxy'} & SharedL1CrossDomainMessengerProxyOptions;
  OptimismMintableERC20FactoryProxy: {kind: 'OptimismMintableERC20FactoryProxy'} & SharedOptimismMintableERC20FactoryProxyOptions;
  L1ERC721BridgeProxy: {kind: 'L1ERC721BridgeProxy'} & SharedL1ERC721BridgeProxyOptions;
  DisputeGameFactoryProxy: {kind: 'DisputeGameFactoryProxy'} & SharedDisputeGameFactoryProxyOptions;
  L2OutputOracleProxy: {kind: 'L2OutputOracleProxy'} & SharedL2OutputOracleProxyOptions;
  DelayedWETHProxy: {kind: 'DelayedWETHProxy'} & SharedDelayedWETHProxyOptions;
  PermissionedDelayedWETHProxy: {kind: 'PermissionedDelayedWETHProxy'} & SharedPermissionedDelayedWETHProxyOptions;
  AnchorStateRegistryProxy: {kind: 'AnchorStateRegistryProxy'} & SharedAnchorStateRegistryProxyOptions;
  TransferAddressManagerOwnership: {kind: 'TransferAddressManagerOwnership'} & SharedTransferAddressManagerOwnershipOptions;
  StepFourPointOneAllSub: {kind: 'StepFourPointOneAllSub'} & SharedStepFourPointOneAllSubOptions;
  StepFourPointOneAll: {kind: 'StepFourPointOneAll'} & SharedStepFourPointOneAllOptions;

  L1CrossDomainMessenger: {kind: 'L1CrossDomainMessenger'} & SharedL1CrossDomainMessengerOptions;
  OptimismMintableERC20Factory: {kind: 'OptimismMintableERC20Factory'} & SharedOptimismMintableERC20FactoryOptions;
  SystemConfig: {kind: 'SystemConfig'} & SharedSystemConfigOptions;
  SystemConfigInterop: {kind: 'SystemConfigInterop'} & SharedSystemConfigInteropOptions;
  L1StandardBridge: {kind: 'L1StandardBridge'} & SharedL1StandardBridgeOptions;
  L1ERC721Bridge: {kind: 'L1ERC721Bridge'} & SharedL1ERC721BridgeOptions;
  OptimismPortal: {kind: 'OptimismPortal'} & SharedOptimismPortalOptions;
  L2OutputOracle: {kind: 'L2OutputOracle'} & SharedL2OutputOracleOptions;
  OptimismPortal2: {kind: 'OptimismPortal2'} & SharedOptimismPortal2Options;
  OptimismPortalInterop: {kind: 'OptimismPortalInterop'} & SharedOptimismPortalInteropOptions;
  DisputeGameFactory: {kind: 'DisputeGameFactory'} & SharedDisputeGameFactoryOptions;
  DelayedWETH: {kind: 'DelayedWETH'} & SharedDelayedWETHOptions;
  PreimageOracle: {kind: 'PreimageOracle'} & SharedPreimageOracleOptions;
  MIPS: {kind: 'MIPS'} & SharedMIPSOptions;
  AnchorStateRegistry: {kind: 'AnchorStateRegistry'} & SharedAnchorStateRegistryOptions;
  InitializeImplementations: {kind: 'InitializeImplementations'} & SharedInitializeImplementationsOptions;
  SetFaultGameImplementation: {kind: 'SetFaultGameImplementation'} & SharedSetFaultGameImplementationOptions;
  StepFourPointTwoAllSub: {kind: 'StepFourPointTwoAllSub'} & SharedStepFourPointTwoAllSubOptions;
  StepFourPointTwoAll: {kind: 'StepFourPointTwoAll'} & SharedStepFourPointTwoAllOptions;
}

export type DeployGenericOptions = DeployKindedOptions[keyof DeployKindedOptions];

export function buildDeployGeneric(opts: DeployGenericOptions) {
  switch (opts.kind) {

    case 'Safe':
      return buildDeploySafe(opts);

    case 'Governor':
      return buildDeployGovernor(opts);

    case 'StepOneAll':
      return buildDeployStepOneAll(opts);

    case 'AddressManager':
      return  buildDeployAddressManager(opts);

    case 'ProxyAdmin':
      return  buildDeployProxyAdmin(opts);

    case 'SuperchainConfigProxy':
      return  buildDeploySuperchainConfigProxy(opts);

    case 'SuperchainConfig':
      return  buildDeploySuperchainConfig(opts);

    case 'ProtocolVersionsProxy':
      return  buildDeployProtocolVersionsProxy(opts);

    case 'ProtocolVersions':
      return  buildDeployProtocolVersions(opts);

    case 'StepTwoAllSub':
      return  buildDeployStepTwoAllSub(opts);

    case 'StepTwoAll':
      return  buildDeployStepTwoAll(opts);

    case 'DataAvailabilityChallengeProxy':
      return  buildDeployDataAvailabilityChallengeProxy(opts);

    case 'DataAvailabilityChallenge':
      return  buildDeployDataAvailabilityChallenge(opts);

    case 'StepThreeAllSub':
      return  buildDeployStepThreeAllSub(opts);

    case 'StepThreeAll':
      return  buildDeployStepThreeAll(opts);
   
    case 'OptimismPortalProxy':
      return  buildDeployOptimismPortalProxy(opts);

    case 'SystemConfigProxy':
      return  buildDeploySystemConfigProxy(opts);
    
    case 'L1StandardBridgeProxy':
      return  buildDeployL1StandardBridgeProxy(opts);

    case 'L1CrossDomainMessengerProxy':
      return  buildDeployL1CrossDomainMessengerProxy(opts);

    case 'OptimismMintableERC20FactoryProxy':
      return  buildDeployOptimismMintableERC20FactoryProxy(opts);

    case 'L1ERC721BridgeProxy':
      return  buildDeployL1ERC721BridgeProxy(opts);

    case 'DisputeGameFactoryProxy':
      return  buildDeployDisputeGameFactoryProxy(opts);
    
    case 'L2OutputOracleProxy':
      return  buildDeployL2OutputOracleProxy(opts);

    case 'DelayedWETHProxy':
      return  buildDeployDelayedWETHProxy(opts);

    case 'PermissionedDelayedWETHProxy':
      return  buildDeployPermissionedDelayedWETHProxy(opts);

    case 'AnchorStateRegistryProxy':
      return  buildDeployAnchorStateRegistryProxy(opts);

    case 'TransferAddressManagerOwnership':
      return  buildTransferAddressManagerOwnership(opts);

    case 'StepFourPointOneAllSub':
      return  buildDeployStepFourPointOneAllSub(opts);

    case 'StepFourPointOneAll':
      return  buildDeployStepFourPointOneAll(opts);

    case 'L1CrossDomainMessenger':
      return  buildDeployL1CrossDomainMessenger(opts);

    case 'OptimismMintableERC20Factory':
      return  buildDeployOptimismMintableERC20Factory(opts);
    
    case 'SystemConfig':
      return  buildDeploySystemConfig(opts);

    case 'SystemConfigInterop':
      return  buildDeploySystemConfigInterop(opts);

    case 'L1StandardBridge':
      return  buildDeployL1StandardBridge(opts);

    case 'L1ERC721Bridge':
      return  buildDeployL1ERC721Bridge(opts);

    case 'OptimismPortal':
      return  buildDeployOptimismPortal(opts);

    case 'L2OutputOracle':
      return  buildDeployL2OutputOracle(opts);

    case 'OptimismPortal2':
      return  buildDeployOptimismPortal2(opts);

    case 'OptimismPortalInterop':
      return  buildDeployOptimismPortalInterop(opts);

    case 'DisputeGameFactory':
      return  buildDeployDisputeGameFactory(opts);

    case 'DelayedWETH':
      return  buildDeployDelayedWETH(opts);

    case 'PreimageOracle':
      return  buildDeployPreimageOracle(opts);

    case 'MIPS':
      return  buildDeployMIPS(opts);

    case 'AnchorStateRegistry':
      return  buildDeployAnchorStateRegistry(opts);

    case 'InitializeImplementations':
      return  buildDeployInitializeImplementations(opts);

    case 'SetFaultGameImplementation':
      return  buildDeploySetFaultGameImplementation(opts);

    case 'StepFourPointTwoAllSub':
      return  buildDeployStepFourPointTwoAllSub(opts);

    case 'StepFourPointTwoAll':
      return  buildDeployStepFourPointTwoAll(opts);

    default:
      const _: never = opts;
      throw new Error('Unknown Contract');
  }
}
