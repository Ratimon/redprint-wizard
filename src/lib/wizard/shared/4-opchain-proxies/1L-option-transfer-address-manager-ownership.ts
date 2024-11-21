import type { Info } from "../set-info";
import { defaults as infoDefaults } from "../set-info";


export const defaults: Required<SharedTransferAddressManagerOwnershipOptions> = {
  deployName: 'TransferAddressManagerOwnershipScript',
  deployInfo: infoDefaults,

} as const;

export interface SharedTransferAddressManagerOwnershipOptions  {
  deployName: string;
  deployInfo?: Info;

}
