
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export type Action =
                    'copy-contract-Safe'| 'copy-script-Safe' | 'download-contract-Safe' | 'download-script-Safe' |
                    'copy-contract-Governor'| 'copy-script-Governor' | 'download-contract-Governor' | 'download-script-Governor' |
                    'copy-contract-AllStepOne'| 'copy-script-AllStepOne' | 'download-contract-AllStepOne' | 'download-script-AllStepOne' |

                    'copy-contract-AddressManager'| 'copy-script-AddressManager' | 'download-contract-AddressManager' | 'download-script-AddressManager' |
                    'copy-contract-ProxyAdmin'| 'copy-script-ProxyAdmin' | 'download-contract-ProxyAdmin' | 'download-script-ProxyAdmin' |
                    'copy-contract-SuperchainConfigProxy'| 'copy-script-SuperchainConfigProxy' | 'download-contract-SuperchainConfigProxy' | 'download-script-SuperchainConfigProxy' |
                    'copy-contract-SuperchainConfig'| 'copy-script-SuperchainConfig' | 'download-contract-SuperchainConfig' | 'download-script-SuperchainConfig' |
                    'copy-contract-ProtocolVersionsProxy'| 'copy-script-ProtocolVersionsProxy' | 'download-contract-ProtocolVersionsProxy' | 'download-script-ProtocolVersionsProxy' |
                    'copy-contract-ProtocolVersions'| 'copy-script-ProtocolVersions' | 'download-contract-ProtocolVersions' | 'download-script-ProtocolVersions' |
                    'copy-contract-StepTwoAllSub'| 'copy-script-StepTwoAllSub' | 'download-contract-StepTwoAllSub' | 'download-script-StepTwoAllSub' |
                    'copy-contract-StepTwoAll'| 'copy-script-StepTwoAll' | 'download-contract-StepTwoAll' | 'download-script-StepTwoAll' |

                    'copy-contract-OptimismPortalProxy'| 'copy-script-OptimismPortalProxy' | 'download-contract-OptimismPortalProxy' | 'download-script-OptimismPortalProxy' |
                    'copy-contract-SystemConfigProxy'| 'copy-script-SystemConfigProxy' | 'download-contract-SystemConfigProxy' | 'download-script-SystemConfigProxy' |
                    'copy-contract-L1StandardBridgeProxy'| 'copy-script-L1StandardBridgeProxy' | 'download-contract-L1StandardBridgeProxy' | 'download-script-L1StandardBridgeProxy' |
                    'copy-contract-L1CrossDomainMessengerProxy'| 'copy-script-L1CrossDomainMessengerProxy' | 'download-contract-L1CrossDomainMessengerProxy' | 'download-script-L1CrossDomainMessengerProxy' |
                    'copy-contract-OptimismMintableERC20FactoryProxy'| 'copy-script-OptimismMintableERC20FactoryProxy' | 'download-contract-OptimismMintableERC20FactoryProxy' | 'download-script-OptimismMintableERC20FactoryProxy' |
                    'copy-contract-L1ERC721BridgeProxy'| 'copy-script-L1ERC721BridgeProxy' | 'download-contract-L1ERC721BridgeProxy' | 'download-script-L1ERC721BridgeProxy' |
                    'copy-contract-DisputeGameFactoryProxy'| 'copy-script-DisputeGameFactoryProxy' | 'download-contract-DisputeGameFactoryProxy' | 'download-script-DisputeGameFactoryProxy' |
                    'copy-contract-L2OutputOracleProxy'| 'copy-script-L2OutputOracleProxy' | 'download-contract-L2OutputOracleProxy' | 'download-script-L2OutputOracleProxy' |
                    'copy-contract-DelayedWETHProxy'| 'copy-script-DelayedWETHProxy' | 'download-contract-DelayedWETHProxy' | 'download-script-DelayedWETHProxy' |
                    'copy-contract-PermissionedDelayedWETHProxy'| 'copy-script-PermissionedDelayedWETHProxy' | 'download-contract-PermissionedDelayedWETHProxy' | 'download-script-PermissionedDelayedWETHProxy' |
                    'copy-contract-AnchorStateRegistryProxy'| 'copy-script-AnchorStateRegistryProxy' | 'download-contract-AnchorStateRegistryProxy' | 'download-script-AnchorStateRegistryProxy' |
                    'copy-contract-StepFourAllSub'| 'copy-script-StepFourAllSub' | 'download-contract-StepFourAllSub' | 'download-script-StepFourAllSub' |
                    'copy-contract-StepFourAll'| 'copy-script-StepFourAll' | 'download-contract-StepFourAll' | 'download-script-StepFourAll'
                    
export type GaEvent = {
    id: string;
    data: any;
    event: Action;
    type: string;
};

let initialAnalytics: GaEvent[] = [];

export const analyticsStore : Writable<GaEvent[]>  = writable(initialAnalytics);