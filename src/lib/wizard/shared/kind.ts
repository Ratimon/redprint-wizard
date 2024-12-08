import type { GenericOptions} from './build-generic';

export type Kind = GenericOptions['kind'];

export function sanitizeKind(kind: unknown): Kind {
  if (typeof kind === 'string') {
    if (isKind(kind)) {
      return kind;
    }
  }
  return 'Safe';
}

function isKind<T>(value: Kind | T): value is Kind {
  switch (value) {
    case 'Safe':
      return true;
    case 'Governor':
      return true;
    case 'StepOneAll':
        return true;
    case 'AddressManager':
      return true;
    case 'ProxyAdmin':
        return true;
    case 'SuperchainConfigProxy':
      return true;
    case 'SuperchainConfig':
      return true;
    case 'ProtocolVersionsProxy':
      return true;
    case 'ProtocolVersions':
      return true;
    case 'StepTwoAll':
      return true;
    case 'StepTwoAllSub':
      return true;
    case 'StepThreeAll':
      return true;
    case 'StepThreeAllSub':
      return true;
    case 'OptimismPortalProxy':
      return true;
    case 'SystemConfigProxy':
      return true;
    case 'L1StandardBridgeProxy':
      return true;
    case 'L1CrossDomainMessengerProxy':
      return true;
    case 'OptimismMintableERC20FactoryProxy':
      return true;
    case 'L1ERC721BridgeProxy':
      return true;
    case 'DisputeGameFactoryProxy':
      return true;
    case 'L2OutputOracleProxy':
      return true;
    case 'DelayedWETHProxy':
      return true;
    case 'PermissionedDelayedWETHProxy':
      return true;
    case 'AnchorStateRegistryProxy':
      return true;
    case 'TransferAddressManagerOwnership':
      return true;
    case 'StepFourPointOneAll':
      return true;
    case 'StepFourPointOneAllSub':
      return true;
    case 'L1CrossDomainMessenger':
      return true;
    case 'OptimismMintableERC20Factory':
      return true;
    case 'SystemConfig':
      return true;
    case 'SystemConfigInterop':
      return true;
    case 'L1StandardBridge':
      return true;
    case 'L1ERC721Bridge':
      return true;
    case 'OptimismPortal':
      return true;
    case 'L2OutputOracle':
      return true;
    case 'OptimismPortal2':
      return true;
    case 'OptimismPortalInterop':
      return true;
    case 'DisputeGameFactory':
      return true;
    case 'DelayedWETH':
      return true;
    case 'PreimageOracle':
      return true;
    case 'MIPS':
      return true;
    case 'AnchorStateRegistry':
      return true;
    case 'InitializeImplementations':
      return true;
    case 'SetFaultGameImplementation':
      return true;
    case 'StepFourPointTwoAll':
      return true;
    case 'StepFourPointTwoAllSub':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}