import type { CommonOptions } from '../shared/common-options';

import type { SharedGovernerOptions} from '../shared/1-governance/1-option-governor';
import { defaults as governorDefaults } from '../shared/1-governance/1-option-governor';
import { printDeployGovernor} from './1-governance/1-governor';

import type {  SharedSafeOptions } from '../shared/1-governance/1-option-safe';
import {  defaults as safeDefaults } from '../shared/1-governance/1-option-safe';
import { printDeploySafe } from './1-governance/1-safe';

import type {  SharedStepOneAllOptions } from '../shared/1-governance/option-all';
import {  defaults as stepOneAllDefaults } from '../shared/1-governance/option-all';
import { printDeployStepOneAll } from './1-governance/all';

import type { SharedAddressManagerOptions } from '../shared/2-superchain/1A-option-address-manager';
import {  defaults as addressManagerDefaults } from '../shared/2-superchain/1A-option-address-manager';
import { printDeployAddressManager } from './2-superchain/1A-address-manager';

import type { SharedProxyAdminOptions } from '../shared/2-superchain/1B-option-proxy-admin';
import {  defaults as proxyAdminDefaults } from '../shared/2-superchain/1B-option-proxy-admin';
import { printDeployProxyAdmin } from './2-superchain/1B-proxy-admin';

import type { SharedSuperchainConfigProxyOptions } from '../shared/2-superchain/2A-option-superchain-config-proxy';
import {  defaults as superchainConfigProxyDefaults } from '../shared/2-superchain/2A-option-superchain-config-proxy';
import { printDeploySuperchainConfigProxy } from './2-superchain/2A-superchain-config-proxy';

import type { SharedSuperchainConfigOptions } from '../shared/2-superchain/2B-option-superchain-config';
import {  defaults as superchainConfigDefaults } from '../shared/2-superchain/2B-option-superchain-config';
import { printDeploySuperchainConfig } from './2-superchain/2B-superchain-config';

import type { SharedProtocolVersionsProxyOptions } from '../shared/2-superchain/3A-option-versions-proxy';
import {  defaults as protocolVersionsProxyDefaults } from '../shared/2-superchain/3A-option-versions-proxy';
import { printDeployProtocolVersionsProxy } from './2-superchain/3A-versions-proxy';

import type { SharedProtocolVersionsOptions } from '../shared/2-superchain/3B-option-versions';
import {  defaults as protocolVersionsDefaults } from '../shared/2-superchain/3B-option-versions';
import { printDeployProtocolVersions } from './2-superchain/3B-versions';

import type {  SharedStepTwoAllSubOptions } from '../shared/2-superchain/option-all-sub';
import {  defaults as stepTwoAllSubDefaults } from '../shared/2-superchain/option-all-sub';
import { printDeployStepTwoAllSub } from './2-superchain/all-sub';

import type {  SharedStepTwoAllOptions } from '../shared/2-superchain/option-all';
import {  defaults as stepTwoAllDefaults } from '../shared/2-superchain/option-all';
import { printDeployStepTwoAll } from './2-superchain/all';

import type {  SharedStepThreeAllSubOptions } from '../shared/3-plasmachain/option-all-sub';
import {  defaults as stepThreeAllSubDefaults } from '../shared/3-plasmachain/option-all-sub';
import { printDeployStepThreeAllSub } from './3-plasmachain/all-sub';

import type {  SharedStepThreeAllOptions } from '../shared/3-plasmachain/option-all';
import {  defaults as stepThreeAllDefaults } from '../shared/3-plasmachain/option-all';
import { printDeployStepThreeAll } from './3-plasmachain/all';

import type {  SharedOptimismPortalProxyOptions } from '../shared/4-opchain-proxies/1A-option-optimism-portal-proxy';
import {  defaults as optimismPortalProxyDefaults } from '../shared/4-opchain-proxies/1A-option-optimism-portal-proxy';
import { printDeployOptimismPortalProxy } from './4-opchain-proxies/1A-optimism-portal-proxy';

import type {  SharedSystemConfigProxyOptions } from '../shared/4-opchain-proxies/1B-option-system-config-proxy';
import {  defaults as systemConfigProxyDefaults } from '../shared/4-opchain-proxies/1B-option-system-config-proxy';
import { printDeploySystemConfigProxy } from './4-opchain-proxies/1B-system-config-proxy';

import type {  SharedL1StandardBridgeProxyOptions } from '../shared/4-opchain-proxies/1C-option-l1-standard-bridge-proxy';
import {  defaults as l1StandardBridgeProxyDefaults } from '../shared/4-opchain-proxies/1C-option-l1-standard-bridge-proxy';
import { printDeployL1StandardBridgeProxy } from './4-opchain-proxies/1C-l1-standard-bridge-proxy';

import type {  SharedL1CrossDomainMessengerProxyOptions } from '../shared/4-opchain-proxies/1D-option-l1-crossdomain-messenger-proxy';
import {  defaults as l1CrossDomainMessengerProxyDefaults } from '../shared/4-opchain-proxies/1D-option-l1-crossdomain-messenger-proxy';
import { printDeployL1CrossDomainMessengerProxy } from './4-opchain-proxies/1D-l1-crossdomain-messenger-proxy';

import type {  SharedOptimismMintableERC20FactoryProxyOptions } from '../shared/4-opchain-proxies/1E-option-optimism-mintable-ERC20-factory-proxy';
import {  defaults as optimismMintableERC20FactoryProxyDefaults } from '../shared/4-opchain-proxies/1E-option-optimism-mintable-ERC20-factory-proxy';
import { printDeployOptimismMintableERC20FactoryProxy } from './4-opchain-proxies/1E-optimism-mintable-ERC20-factory-proxy';

import type {  SharedL1ERC721BridgeProxyOptions } from '../shared/4-opchain-proxies/1F-option-l1-ERC721-bridge-proxy';
import {  defaults as l1ERC721BridgeProxyDefaults } from '../shared/4-opchain-proxies/1F-option-l1-ERC721-bridge-proxy';
import { printDeployL1ERC721BridgeProxy } from './4-opchain-proxies/1F-l1-ERC721-bridge-proxy';

import type {  SharedDisputeGameFactoryProxyOptions } from '../shared/4-opchain-proxies/1G-option-dispute-game-factory-proxy';
import {  defaults as disputeGameFactoryProxyDefaults } from '../shared/4-opchain-proxies/1G-option-dispute-game-factory-proxy';
import { printDeployDisputeGameFactoryProxy } from './4-opchain-proxies/1G-dispute-game-factory-proxy';

import type {  SharedL2OutputOracleProxyOptions } from '../shared/4-opchain-proxies/1H-option-l2-output-oracle-proxy';
import {  defaults as l2OutputOracleProxyDefaults } from '../shared/4-opchain-proxies/1H-option-l2-output-oracle-proxy';
import { printDeployL2OutputOracleProxy } from './4-opchain-proxies/1H-l2-output-oracle-proxy';

import type {  SharedDelayedWETHProxyOptions } from '../shared/4-opchain-proxies/1I-option-delayed-WETH-proxy';
import {  defaults as delayedWETHProxyDefaults } from '../shared/4-opchain-proxies/1I-option-delayed-WETH-proxy';
import { printDeployDelayedWETHProxy } from './4-opchain-proxies/1I-delayed-WETH-proxy';

import type {  SharedPermissionedDelayedWETHProxyOptions } from '../shared/4-opchain-proxies/1J-option-permissioned-delayed-WETH-proxy';
import {  defaults as permissionedDelayedWETHProxyDefaults } from '../shared/4-opchain-proxies/1J-option-permissioned-delayed-WETH-proxy';
import { printDeployPermissionedDelayedWETHProxy } from './4-opchain-proxies/1J-permissioned-delayed-WETH-proxy';

import type {  SharedAnchorStateRegistryProxyOptions } from '../shared/4-opchain-proxies/1K-option-anchor-state-registry-proxy';
import {  defaults as anchorStateRegistryProxyDefaults } from '../shared/4-opchain-proxies/1K-option-anchor-state-registry-proxy';
import { printDeployAnchorStateRegistryProxy } from './4-opchain-proxies/1K-anchor-state-registry-proxy';

import type {  SharedTransferAddressManagerOwnershipOptions } from '../shared/4-opchain-proxies/1L-option-transfer-address-manager-ownership';
import {  defaults as transferAddressManagerOwnershipDefaults } from '../shared/4-opchain-proxies/1L-option-transfer-address-manager-ownership';
import { printTransferAddressManagerOwnership } from './4-opchain-proxies/1L-transfer-address-manager-ownership';

import type {  SharedStepFourPointOneAllSubOptions } from '../shared/4-opchain-proxies/option-all-sub';
import {  defaults as stepFourPointOneAllSubDefaults } from '../shared/4-opchain-proxies/option-all-sub';
import { printDeployStepFourPointOneAllSub } from './4-opchain-proxies/all-sub';

import type {  SharedStepFourPointOneAllOptions } from '../shared/4-opchain-proxies/option-all';
import {  defaults as stepFourPointOneAllDefaults } from '../shared/4-opchain-proxies/option-all';
import { printDeployStepFourPointOneAll } from './4-opchain-proxies/all';

import type {  SharedL1CrossDomainMessengerOptions } from '../shared/4-opchain-implementations/2A-option-l1-crossdomain-messenger';
import {  defaults as l1CrossDomainMessengerDefaults } from '../shared/4-opchain-implementations/2A-option-l1-crossdomain-messenger';
import { printDeployL1CrossDomainMessenger } from './4-opchain-implementations/2A-l1-crossdomain-messenger';

import type { SharedOptimismMintableERC20FactoryOptions } from '../shared/4-opchain-implementations/2B-option-optimism-mintable-ERC20-factory';
import {  defaults as optimismMintableERC20FactoryDefaults } from '../shared/4-opchain-implementations/2B-option-optimism-mintable-ERC20-factory';
import { printDeployOptimismMintableERC20Factory } from './4-opchain-implementations/2B-optimism-mintable-ERC20-factory';

import type { SharedSystemConfigOptions } from '../shared/4-opchain-implementations/2C-option-system-config';
import {  defaults as systemConfigDefaults } from '../shared/4-opchain-implementations/2C-option-system-config';
import { printDeploySystemConfig } from './4-opchain-implementations/2C-system-config';

import type { SharedSystemConfigInteropOptions } from '../shared/4-opchain-implementations/2C-option-system-config-interop';
import {  defaults as systemConfigInteropDefaults } from '../shared/4-opchain-implementations/2C-option-system-config-interop';
import { printDeploySystemConfigInterop } from './4-opchain-implementations/2C-system-config-interop';

import type { SharedL1StandardBridgeOptions } from '../shared/4-opchain-implementations/2D-option-l1-standard-bridge';
import {  defaults as l1StandardBridgeDefaults } from '../shared/4-opchain-implementations/2D-option-l1-standard-bridge';
import { printDeployL1StandardBridge } from './4-opchain-implementations/2D-l1-standard-bridge';

import type { SharedL1ERC721BridgeOptions } from '../shared/4-opchain-implementations/2E-option-l1-ERC721-bridge';
import {  defaults as l1ERC721BridgeDefaults } from '../shared/4-opchain-implementations/2E-option-l1-ERC721-bridge';
import { printDeployL1ERC721Bridge } from './4-opchain-implementations/2E-l1-ERC721-bridge';

import type { SharedOptimismPortalOptions } from '../shared/4-opchain-implementations/2F-option-optimism-portal';
import {  defaults as optimismPortalDefaults } from '../shared/4-opchain-implementations/2F-option-optimism-portal';
import { printDeployOptimismPortal } from './4-opchain-implementations/2F-optimism-portal';

import type { SharedL2OutputOracleOptions } from '../shared/4-opchain-implementations/2G-option-l2-output-oracle';
import {  defaults as l2OutputOracleDefaults } from '../shared/4-opchain-implementations/2G-option-l2-output-oracle';
import { printDeployL2OutputOracle } from './4-opchain-implementations/2G-l2-output-oracle';

import type { SharedOptimismPortal2Options } from '../shared/4-opchain-implementations/2H-option-optimism-portal2';
import {  defaults as optimismPortal2Defaults } from '../shared/4-opchain-implementations/2H-option-optimism-portal2';
import { printDeployOptimismPortal2 } from './4-opchain-implementations/2H-optimism-portal2';

import type { SharedOptimismPortalInteropOptions } from '../shared/4-opchain-implementations/2H-option-optimism-portal-interop';
import {  defaults as optimismPortalInteropDefaults } from '../shared/4-opchain-implementations/2H-option-optimism-portal-interop';
import { printDeployOptimismPortalInterop } from './4-opchain-implementations/2H-optimism-portal-interop';

import type { SharedDisputeGameFactoryOptions } from '../shared/4-opchain-implementations/2I-option-dispute-game-factory';
import {  defaults as disputeGameFactoryDefaults } from '../shared/4-opchain-implementations/2I-option-dispute-game-factory';
import { printDeployDisputeGameFactory } from './4-opchain-implementations/2I-dispute-game-factory';

import type { SharedDelayedWETHOptions } from '../shared/4-opchain-implementations/2J-option-delayed-WETH';
import {  defaults as delayedWETHDefaults } from '../shared/4-opchain-implementations/2J-option-delayed-WETH';
import { printDeployDelayedWETH } from './4-opchain-implementations/2J-delayed-WETH';

import type { SharedPreimageOracleOptions } from '../shared/4-opchain-implementations/2K-option-preimage-oracle';
import {  defaults as preimageOracleDefaults } from '../shared/4-opchain-implementations/2K-option-preimage-oracle';
import { printDeployPreimageOracle } from './4-opchain-implementations/2K-preimage-oracle';

import type { SharedMIPSOptions } from '../shared/4-opchain-implementations/2L-option-mips';
import {  defaults as mipsDefaults } from '../shared/4-opchain-implementations/2L-option-mips';
import { printDeployMIPS } from './4-opchain-implementations/2L-mips';

import type { SharedAnchorStateRegistryOptions } from '../shared/4-opchain-implementations/2M-option-anchor-state-registry';
import {  defaults as anchorStateRegistryDefaults } from '../shared/4-opchain-implementations/2M-option-anchor-state-registry';
import { printDeployAnchorStateRegistry } from './4-opchain-implementations/2M-anchor-state-registry';

import type { SharedInitializeImplementationsOptions } from '../shared/4-opchain-implementations/2N-option-initialize-implementations';
import {  defaults as initializeImplementationsDefaults } from '../shared/4-opchain-implementations/2N-option-initialize-implementations';
import { printDeployInitializeImplementations } from './4-opchain-implementations/2N-initialize-implementations';

import type { SharedSetFaultGameImplementationOptions } from '../shared/4-opchain-implementations/2O-option-set-fault-game-implementation';
import {  defaults as setFaultGameImplementationDefaults } from '../shared/4-opchain-implementations/2O-option-set-fault-game-implementation';
import { printDeploySetFaultGameImplementation } from './4-opchain-implementations/2O-set-fault-game-implementation';

import type { SharedStepFourPointTwoAllSubOptions } from '../shared/4-opchain-implementations/option-all-sub';
import {  defaults as stepFourPointTwoAllSubDefaults } from '../shared/4-opchain-implementations/option-all-sub';
import { printDeployStepFourPointTwoAllSub } from './4-opchain-implementations/all-sub';

import type { SharedStepFourPointTwoAllOptions } from '../shared/4-opchain-implementations/option-all';
import {  defaults as stepFourPointTwoAllDefaults } from '../shared/4-opchain-implementations/option-all';
import { printDeployStepFourPointTwoAll } from './4-opchain-implementations/all';

export interface WizardContractAPI<Options extends CommonOptions> {
  /**
   * Returns a string representation of a contract generated using the provided options. If opts is not provided, uses `defaults`.
   */
  print: (opts?: Options) => string,
  /**
   * The default options that are used for `print`.
   */
  defaults: Required<Options>;

}

export interface WizardAllAPI<Options> {
  print: (opts?: Options) => string,
  defaults: Required<Options>;
}

export type DeploySafe = WizardContractAPI<SharedSafeOptions>;
export const deploySafe: DeploySafe = {
  print: printDeploySafe,
  defaults: safeDefaults,
}

export type DeployGovernor = WizardContractAPI<SharedGovernerOptions>;
export const deployGovernor: DeployGovernor = {
  print: printDeployGovernor,
  defaults: governorDefaults,
}

export type DeployStepOneAll = WizardAllAPI<SharedStepOneAllOptions>;
export const deployStepOneAll: DeployStepOneAll = {
  print: printDeployStepOneAll,
  defaults: stepOneAllDefaults,
}

export type DeployAddressManager = WizardAllAPI<SharedAddressManagerOptions>;
export const deployAddressManager: DeployAddressManager = {
  print: printDeployAddressManager,
  defaults: addressManagerDefaults,
}

export type DeployProxyAdmin = WizardAllAPI<SharedProxyAdminOptions>;
export const deployProxyAdmin: DeployProxyAdmin = {
  print: printDeployProxyAdmin,
  defaults: proxyAdminDefaults,
}

export type DeploySuperchainConfigProxy = WizardAllAPI<SharedSuperchainConfigProxyOptions>;
export const deploySuperchainConfigProxy: DeploySuperchainConfigProxy = {
  print: printDeploySuperchainConfigProxy,
  defaults: superchainConfigProxyDefaults,
}

export type DeploySuperchainConfig = WizardAllAPI<SharedSuperchainConfigOptions>;
export const deploySuperchainConfig: DeploySuperchainConfig = {
  print: printDeploySuperchainConfig,
  defaults: superchainConfigDefaults,
}

export type DeployProtocolVersionsProxy = WizardAllAPI<SharedProtocolVersionsProxyOptions>;
export const deployProtocolVersionsProxy: DeployProtocolVersionsProxy = {
  print: printDeployProtocolVersionsProxy,
  defaults: protocolVersionsProxyDefaults,
}

export type DeployProtocolVersions = WizardAllAPI<SharedProtocolVersionsOptions>;
export const deployProtocolVersions: DeployProtocolVersions = {
  print: printDeployProtocolVersions,
  defaults: protocolVersionsDefaults,
}

export type DeployStepTwoAllSub = WizardAllAPI<SharedStepTwoAllSubOptions>;
export const deployStepTwoAllSub: DeployStepTwoAllSub = {
  print: printDeployStepTwoAllSub,
  defaults: stepTwoAllSubDefaults,
}

export type DeployStepTwoAll = WizardAllAPI<SharedStepTwoAllOptions>;
export const deployStepTwoAll: DeployStepTwoAll = {
  print: printDeployStepTwoAll,
  defaults: stepTwoAllDefaults,
}

export type DeployStepThreeAllSub = WizardAllAPI<SharedStepThreeAllSubOptions>;
export const deployStepThreeAllSub: DeployStepThreeAllSub = {
  print: printDeployStepThreeAllSub,
  defaults: stepThreeAllSubDefaults,
}

export type DeployStepThreeAll = WizardAllAPI<SharedStepThreeAllOptions>;
export const deployStepThreeAll: DeployStepThreeAll = {
  print: printDeployStepThreeAll,
  defaults: stepThreeAllDefaults,
}

export type DeployOptimismPortalProxy = WizardAllAPI<SharedOptimismPortalProxyOptions>;
export const deployOptimismPortalProxy: DeployOptimismPortalProxy = {
  print: printDeployOptimismPortalProxy,
  defaults: optimismPortalProxyDefaults,
}

export type DeploySystemConfigProxy = WizardAllAPI<SharedSystemConfigProxyOptions>;
export const deploySystemConfigProxy: DeploySystemConfigProxy = {
  print: printDeploySystemConfigProxy,
  defaults: systemConfigProxyDefaults,
}

export type DeployL1StandardBridgeProxy = WizardAllAPI<SharedL1StandardBridgeProxyOptions>;
export const deployL1StandardBridgeProxy: DeployL1StandardBridgeProxy = {
  print: printDeployL1StandardBridgeProxy,
  defaults: l1StandardBridgeProxyDefaults,
}

export type DeployL1CrossDomainMessengerProxy = WizardAllAPI<SharedL1CrossDomainMessengerProxyOptions>;
export const deployL1CrossDomainMessengerProxy: DeployL1CrossDomainMessengerProxy = {
  print: printDeployL1CrossDomainMessengerProxy,
  defaults: l1CrossDomainMessengerProxyDefaults,
}

export type DeployOptimismMintableERC20FactoryProxy = WizardAllAPI<SharedOptimismMintableERC20FactoryProxyOptions>;
export const deployOptimismMintableERC20FactoryProxy: DeployOptimismMintableERC20FactoryProxy = {
  print: printDeployOptimismMintableERC20FactoryProxy,
  defaults: optimismMintableERC20FactoryProxyDefaults,
}

export type DeployL1ERC721BridgeProxy = WizardAllAPI<SharedL1ERC721BridgeProxyOptions>;
export const deployL1ERC721BridgeProxy: DeployL1ERC721BridgeProxy = {
  print: printDeployL1ERC721BridgeProxy,
  defaults: l1ERC721BridgeProxyDefaults,
}

export type DeployDisputeGameFactoryProxy = WizardAllAPI<SharedDisputeGameFactoryProxyOptions>;
export const deployDisputeGameFactoryProxy: DeployDisputeGameFactoryProxy = {
  print: printDeployDisputeGameFactoryProxy,
  defaults: disputeGameFactoryProxyDefaults,
}

export type DeployL2OutputOracleProxy = WizardAllAPI<SharedL2OutputOracleProxyOptions>;
export const deployL2OutputOracleProxy: DeployL2OutputOracleProxy = {
  print: printDeployL2OutputOracleProxy,
  defaults: l2OutputOracleProxyDefaults,
}

export type DeployDelayedWETHProxy = WizardAllAPI<SharedDelayedWETHProxyOptions>;
export const deployDelayedWETHProxy: DeployDelayedWETHProxy = {
  print: printDeployDelayedWETHProxy,
  defaults: delayedWETHProxyDefaults,
}

export type DeployPermissionedDelayedWETHProxy = WizardAllAPI<SharedPermissionedDelayedWETHProxyOptions>;
export const deployPermissionedDelayedWETHProxy: DeployPermissionedDelayedWETHProxy = {
  print: printDeployPermissionedDelayedWETHProxy,
  defaults: permissionedDelayedWETHProxyDefaults,
}

export type DeployAnchorStateRegistryProxy = WizardAllAPI<SharedAnchorStateRegistryProxyOptions>;
export const deployAnchorStateRegistryProxy: DeployAnchorStateRegistryProxy = {
  print: printDeployAnchorStateRegistryProxy,
  defaults: anchorStateRegistryProxyDefaults,
}

export type DeployTransferAddressManagerOwnership = WizardAllAPI<SharedTransferAddressManagerOwnershipOptions>;
export const deployTransferAddressManagerOwnership: DeployTransferAddressManagerOwnership = {
  print: printTransferAddressManagerOwnership,
  defaults: transferAddressManagerOwnershipDefaults,
}

export type DeployStepFourPointOneAllSub = WizardAllAPI<SharedStepFourPointOneAllSubOptions>;
export const deployStepFourPointOneAllSub: DeployStepFourPointOneAllSub = {
  print: printDeployStepFourPointOneAllSub,
  defaults: stepFourPointOneAllSubDefaults,
}

export type DeployStepFourPointOneAll = WizardAllAPI<SharedStepFourPointOneAllOptions>;
export const deployStepFourPointOneAll: DeployStepFourPointOneAll = {
  print: printDeployStepFourPointOneAll,
  defaults: stepFourPointOneAllDefaults,
}

export type DeployL1CrossDomainMessenger = WizardAllAPI<SharedL1CrossDomainMessengerOptions>;
export const deployL1CrossDomainMessenger: DeployL1CrossDomainMessenger = {
  print: printDeployL1CrossDomainMessenger,
  defaults: l1CrossDomainMessengerDefaults,
}

export type DeployOptimismMintableERC20Factory = WizardAllAPI<SharedOptimismMintableERC20FactoryOptions>;
export const deployOptimismMintableERC20Factory: DeployOptimismMintableERC20Factory = {
  print: printDeployOptimismMintableERC20Factory,
  defaults: optimismMintableERC20FactoryDefaults,
}

export type DeploySystemConfig = WizardAllAPI<SharedSystemConfigOptions>;
export const deploySystemConfig: DeploySystemConfig = {
  print: printDeploySystemConfig,
  defaults: systemConfigDefaults,
}

export type DeploySystemConfigInterop = WizardAllAPI<SharedSystemConfigInteropOptions>;
export const deploySystemConfigInterop: DeploySystemConfigInterop = {
  print: printDeploySystemConfigInterop,
  defaults: systemConfigInteropDefaults,
}

export type DeployL1StandardBridge = WizardAllAPI<SharedL1StandardBridgeOptions>;
export const deployL1StandardBridge: DeployL1StandardBridge = {
  print: printDeployL1StandardBridge,
  defaults: l1StandardBridgeDefaults,
}

export type DeployL1ERC721Bridge = WizardAllAPI<SharedL1ERC721BridgeOptions>;
export const deployL1ERC721Bridge: DeployL1ERC721Bridge = {
  print: printDeployL1ERC721Bridge,
  defaults: l1ERC721BridgeDefaults,
}

export type DeployOptimismPortal = WizardAllAPI<SharedOptimismPortalOptions>;
export const deployOptimismPortal: DeployOptimismPortal = {
  print: printDeployOptimismPortal,
  defaults: optimismPortalDefaults,
}

export type DeployL2OutputOracle = WizardAllAPI<SharedL2OutputOracleOptions>;
export const deployL2OutputOracle: DeployL2OutputOracle = {
  print: printDeployL2OutputOracle,
  defaults: l2OutputOracleDefaults,
}

export type DeployOptimismPortal2 = WizardAllAPI<SharedOptimismPortal2Options>;
export const deployOptimismPortal2: DeployOptimismPortal2 = {
  print: printDeployOptimismPortal2,
  defaults: optimismPortal2Defaults,
}

export type DeployOptimismPortalInterop = WizardAllAPI<SharedOptimismPortalInteropOptions>;
export const deployOptimismPortalInterop: DeployOptimismPortalInterop = {
  print: printDeployOptimismPortalInterop,
  defaults: optimismPortalInteropDefaults,
}

export type DeployDisputeGameFactory = WizardAllAPI<SharedDisputeGameFactoryOptions>;
export const deployDisputeGameFactory: DeployDisputeGameFactory = {
  print: printDeployDisputeGameFactory,
  defaults: disputeGameFactoryDefaults,
}

export type DeployDelayedWETH = WizardAllAPI<SharedDelayedWETHOptions>;
export const deployDelayedWETH: DeployDelayedWETH = {
  print: printDeployDelayedWETH,
  defaults: delayedWETHDefaults,
}

export type DeployPreimageOracle = WizardAllAPI<SharedPreimageOracleOptions>;
export const deployPreimageOracle: DeployPreimageOracle = {
  print: printDeployPreimageOracle,
  defaults: preimageOracleDefaults,
}

export type DeployMIPS = WizardAllAPI<SharedMIPSOptions>;
export const deployMIPS: DeployMIPS = {
  print: printDeployMIPS,
  defaults: mipsDefaults,
}

export type DeployAnchorStateRegistry = WizardAllAPI<SharedAnchorStateRegistryOptions>;
export const deployAnchorStateRegistry: DeployAnchorStateRegistry = {
  print: printDeployAnchorStateRegistry,
  defaults: anchorStateRegistryDefaults,
}

export type DeployInitializeImplementations = WizardAllAPI<SharedInitializeImplementationsOptions>;
export const deployInitializeImplementations: DeployInitializeImplementations = {
  print: printDeployInitializeImplementations,
  defaults: initializeImplementationsDefaults,
}

export type DeploySetFaultGameImplementation = WizardAllAPI<SharedSetFaultGameImplementationOptions>;
export const deploySetFaultGameImplementation: DeploySetFaultGameImplementation = {
  print: printDeploySetFaultGameImplementation,
  defaults: setFaultGameImplementationDefaults,
}

export type DeployStepFourPointTwoAllSub = WizardAllAPI<SharedStepFourPointTwoAllSubOptions>;
export const deployStepFourPointTwoAllSub: DeployStepFourPointTwoAllSub = {
  print: printDeployStepFourPointTwoAllSub,
  defaults: stepFourPointTwoAllSubDefaults,
}

export type DeployStepFourPointTwoAll = WizardAllAPI<SharedStepFourPointTwoAllOptions>;
export const deployStepFourPointTwoAll: DeployStepFourPointTwoAll = {
  print: printDeployStepFourPointTwoAll,
  defaults: stepFourPointTwoAllDefaults,
}
