
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
                    'copy-contract-AllStepTwo'| 'copy-script-AllStepTwo' | 'download-contract-AllStepTwo' | 'download-script-AllStepTwo' |
                    
                    'copy-contract-OptimismPortalProxy'| 'copy-script-OptimismPortalProxy' | 'download-contract-OptimismPortalProxy' | 'download-script-OptimismPortalProxy' |
                    'copy-contract-SystemConfigProxy'| 'copy-script-SystemConfigProxy' | 'download-contract-SystemConfigProxy' | 'download-script-SystemConfigProxy' |
                    'copy-contract-L1StandardBridgeProxy'| 'copy-script-L1StandardBridgeProxy' | 'download-contract-L1StandardBridgeProxy' | 'download-script-L1StandardBridgeProxy' |
                    'copy-contract-L1CrossDomainMessengerProxy'| 'copy-script-L1CrossDomainMessengerProxy' | 'download-contract-L1CrossDomainMessengerProxy' | 'download-script-L1CrossDomainMessengerProxy' |
                    'copy-contract-OptimismMintableERC20FactoryProxy'| 'copy-script-OptimismMintableERC20FactoryProxy' | 'download-contract-OptimismMintableERC20FactoryProxy' | 'download-script-OptimismMintableERC20FactoryProxy'

export type GaEvent = {
    id: string;
    data: any;
    event: Action;
    type: string;
};

let initialAnalytics: GaEvent[] = [];

export const analyticsStore : Writable<GaEvent[]>  = writable(initialAnalytics);