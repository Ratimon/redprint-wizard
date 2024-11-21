import type { GenericTransferAddressManagerOwnershipOptions } from '../build-generic';

export type KindTransferAddressManagerOwnership = GenericTransferAddressManagerOwnershipOptions['kind'];

export function sanitizeKindTransferAddressManagerOwnership(kind: unknown): KindTransferAddressManagerOwnership {
  if (typeof kind === 'string') {
    if (isKindTransferAddressManagerOwnership(kind)) {
      return kind;
    }
  }
  return 'TransferAddressManagerOwnership';
}

function isKindTransferAddressManagerOwnership<T>(value: KindTransferAddressManagerOwnership | T): value is KindTransferAddressManagerOwnership {
  switch (value) {
    case 'TransferAddressManagerOwnership':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}