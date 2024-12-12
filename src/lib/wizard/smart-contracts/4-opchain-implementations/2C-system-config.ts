import type {  Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2C-option-system-config';
import type { SharedSystemConfigOptions } from '../../shared/4-opchain-implementations/2C-option-system-config';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDefaults(opts: SharedSystemConfigOptions): Required<SharedSystemConfigOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printSystemConfig(opts: SharedSystemConfigOptions = commonDefaults): string {
  return printContract(buildSystemConfig(opts));
}

export function buildSystemConfig(opts: SharedSystemConfigOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    const OwnableUpgradeable = {
      name: 'OwnableUpgradeable',
      path: '@redprint-openzeppelin-upgradeable/access/OwnableUpgradeable.sol',
    };
    c.addParent(OwnableUpgradeable);
    const ERC20 = {
      name: 'ERC20',
      path: '@redprint-openzeppelin/token/ERC20/ERC20.sol',
    };
    c.addImportOnly(ERC20);


    const Storage = {
      name: 'Storage',
      path: '@redprint-core/libraries/Storage.sol',
    };
    c.addImportOnly(Storage);
    const Constants = {
      name: 'Constants',
      path: '@redprint-core/libraries/Constants.sol',
    };
    c.addImportOnly(Constants);
    const GasPayingToken = {
      name: 'GasPayingToken',
      path: '@redprint-core/libraries/GasPayingToken.sol',
    };
    c.addImportOnly(GasPayingToken);
    const IGasToken = {
      name: 'IGasToken',
      path: '@redprint-core/libraries/GasPayingToken.sol',
    };
    c.addParent(IGasToken);

    const ISemver = {
        name: 'ISemver',
        path: '@redprint-core/universal/interfaces/ISemver.sol',
    };
    c.addParent(ISemver);
    const IOptimismPortal = {
      name: 'IOptimismPortal',
      path: '@redprint-core/L1/interfaces/IOptimismPortal.sol',
    };
    c.addImportOnly(IOptimismPortal);

    const IResourceMetering = {
      name: 'IResourceMetering',
      path: '@redprint-core/L1/interfaces/IResourceMetering.sol',
    };
    c.addImportOnly(IResourceMetering);


    c.addVariable(`/// @notice Enum representing different types of updates.
    /// @custom:value BATCHER              Represents an update to the batcher hash.
    /// @custom:value FEE_SCALARS          Represents an update to l1 data fee scalars.
    /// @custom:value GAS_LIMIT            Represents an update to gas limit on L2.
    /// @custom:value UNSAFE_BLOCK_SIGNER  Represents an update to the signer key for unsafe
    ///                                    block distrubution.
    enum UpdateType {
        BATCHER,
        FEE_SCALARS,
        GAS_LIMIT,
        UNSAFE_BLOCK_SIGNER,
        EIP_1559_PARAMS
    }`);
    
    c.addVariable(`/// @notice Struct representing the addresses of L1 system contracts. These should be the
    ///         contracts that users interact with (not implementations for proxied contracts)
    ///         and are network specific.
    struct Addresses {
        address l1CrossDomainMessenger;
        address l1ERC721Bridge;
        address l1StandardBridge;
        address disputeGameFactory;
        address optimismPortal;
        address optimismMintableERC20Factory;
        address gasPayingToken;
    }`);

    c.addVariable(`/// @notice Version identifier, used for upgrades.
    uint256 public constant VERSION = 0;`);

    c.addVariable(`/// @notice Storage slot that the unsafe block signer is stored at.
    ///         Storing it at this deterministic storage slot allows for decoupling the storage
    ///         layout from the way that "solc" lays out storage. The "op-node" uses a storage
    ///         proof to fetch this value.
    /// @dev    NOTE: this value will be migrated to another storage slot in a future version.
    ///         User input should not be placed in storage in this contract until this migration
    ///         happens. It is unlikely that keccak second preimage resistance will be broken,
    ///         but it is better to be safe than sorry.
    bytes32 public constant UNSAFE_BLOCK_SIGNER_SLOT = keccak256("systemconfig.unsafeblocksigner");`);

    c.addVariable(`/// @notice Storage slot that the L1CrossDomainMessenger address is stored at.
    bytes32 public constant L1_CROSS_DOMAIN_MESSENGER_SLOT =
        bytes32(uint256(keccak256("systemconfig.l1crossdomainmessenger")) - 1);`);

    c.addVariable(`/// @notice Storage slot that the L1ERC721Bridge address is stored at.
    bytes32 public constant L1_ERC_721_BRIDGE_SLOT = bytes32(uint256(keccak256("systemconfig.l1erc721bridge")) - 1);`);

    c.addVariable(`/// @notice Storage slot that the L1StandardBridge address is stored at.
    bytes32 public constant L1_STANDARD_BRIDGE_SLOT = bytes32(uint256(keccak256("systemconfig.l1standardbridge")) - 1);`);

    c.addVariable(`/// @notice Storage slot that the OptimismPortal address is stored at.
    bytes32 public constant OPTIMISM_PORTAL_SLOT = bytes32(uint256(keccak256("systemconfig.optimismportal")) - 1);`);

    c.addVariable(`/// @notice Storage slot that the OptimismMintableERC20Factory address is stored at.
    bytes32 public constant OPTIMISM_MINTABLE_ERC20_FACTORY_SLOT =
        bytes32(uint256(keccak256("systemconfig.optimismmintableerc20factory")) - 1);`);

    c.addVariable(`/// @notice Storage slot that the batch inbox address is stored at.
    bytes32 public constant BATCH_INBOX_SLOT = bytes32(uint256(keccak256("systemconfig.batchinbox")) - 1);`);

    c.addVariable(`/// @notice Storage slot for block at which the op-node can start searching for logs from.
    bytes32 public constant START_BLOCK_SLOT = bytes32(uint256(keccak256("systemconfig.startBlock")) - 1);`);

    c.addVariable(`/// @notice Storage slot for the DisputeGameFactory address.
    bytes32 public constant DISPUTE_GAME_FACTORY_SLOT =
        bytes32(uint256(keccak256("systemconfig.disputegamefactory")) - 1);`);

    c.addVariable(`/// @notice The number of decimals that the gas paying token has.
    uint8 internal constant GAS_PAYING_TOKEN_DECIMALS = 18;`);

    c.addVariable(`/// @notice The maximum gas limit that can be set for L2 blocks. This limit is used to enforce that the blocks
    ///         on L2 are not too large to process and prove. Over time, this value can be increased as various
    ///         optimizations and improvements are made to the system at large.
    uint64 internal constant MAX_GAS_LIMIT = 200_000_000;`);

    c.addVariable(`/// @notice Fixed L2 gas overhead. Used as part of the L2 fee calculation.
    ///         Deprecated since the Ecotone network upgrade
    uint256 public overhead;`);

    c.addVariable(`/// @notice Dynamic L2 gas overhead. Used as part of the L2 fee calculation.
    ///         The most significant byte is used to determine the version since the
    ///         Ecotone network upgrade.
    uint256 public scalar;`);

    c.addVariable(`/// @notice Identifier for the batcher.
    ///         For version 1 of this configuration, this is represented as an address left-padded
    ///         with zeros to 32 bytes.
    bytes32 public batcherHash;`);

    c.addVariable(`/// @notice L2 block gas limit.
    uint64 public gasLimit;`);

    c.addVariable(`/// @notice Basefee scalar value. Part of the L2 fee calculation since the Ecotone network upgrade.
    uint32 public basefeeScalar;`);

    c.addVariable(`/// @notice Blobbasefee scalar value. Part of the L2 fee calculation since the Ecotone network upgrade.
    uint32 public blobbasefeeScalar;`);

    c.addVariable(`/// @notice The configuration for the deposit fee market.
    ///         Used by the OptimismPortal to meter the cost of buying L2 gas on L1.
    ///         Set as internal with a getter so that the struct is returned instead of a tuple.
    IResourceMetering.ResourceConfig internal _resourceConfig;`);

    c.addVariable(`/// @notice The EIP-1559 base fee max change denominator.
    uint32 public eip1559Denominator;`);

    c.addVariable(`/// @notice The EIP-1559 elasticity multiplier.
    uint32 public eip1559Elasticity;`);

    c.addVariable(`/// @notice Emitted when configuration is updated.
    /// @param version    SystemConfig version.
    /// @param updateType Type of update.
    /// @param data       Encoded update data.
    event ConfigUpdate(uint256 indexed version, UpdateType indexed updateType, bytes data);`);

    // version
    c.addModifier('virtual', functions.version);
    c.addFunctionCode(`return "2.3.0-beta.5";`, functions.version);
  

    c.addConstructorCode(`Storage.setUint(START_BLOCK_SLOT, type(uint256).max);
        initialize({
            _owner: address(0xdEaD),
            _basefeeScalar: 0,
            _blobbasefeeScalar: 0,
            _batcherHash: bytes32(0),
            _gasLimit: 1,
            _unsafeBlockSigner: address(0),
            _config: IResourceMetering.ResourceConfig({
                maxResourceLimit: 1,
                elasticityMultiplier: 1,
                baseFeeMaxChangeDenominator: 2,
                minimumBaseFee: 0,
                systemTxMaxGas: 0,
                maximumBaseFee: 0
            }),
            _batchInbox: address(0),
            _addresses: SystemConfig.Addresses({
                l1CrossDomainMessenger: address(0),
                l1ERC721Bridge: address(0),
                l1StandardBridge: address(0),
                disputeGameFactory: address(0),
                optimismPortal: address(0),
                optimismMintableERC20Factory: address(0),
                gasPayingToken: address(0)
            })
        });`);

    // initialize
    c.addModifier('initializer', functions.initialize);
    c.addFunctionCode(`__Ownable_init();
        transferOwnership(_owner);

        // These are set in ascending order of their UpdateTypes.
        _setBatcherHash(_batcherHash);
        _setGasConfigEcotone({ _basefeeScalar: _basefeeScalar, _blobbasefeeScalar: _blobbasefeeScalar });
        _setGasLimit(_gasLimit);

        Storage.setAddress(UNSAFE_BLOCK_SIGNER_SLOT, _unsafeBlockSigner);
        Storage.setAddress(BATCH_INBOX_SLOT, _batchInbox);
        Storage.setAddress(L1_CROSS_DOMAIN_MESSENGER_SLOT, _addresses.l1CrossDomainMessenger);
        Storage.setAddress(L1_ERC_721_BRIDGE_SLOT, _addresses.l1ERC721Bridge);
        Storage.setAddress(L1_STANDARD_BRIDGE_SLOT, _addresses.l1StandardBridge);
        Storage.setAddress(DISPUTE_GAME_FACTORY_SLOT, _addresses.disputeGameFactory);
        Storage.setAddress(OPTIMISM_PORTAL_SLOT, _addresses.optimismPortal);
        Storage.setAddress(OPTIMISM_MINTABLE_ERC20_FACTORY_SLOT, _addresses.optimismMintableERC20Factory);

        _setStartBlock();
        _setGasPayingToken(_addresses.gasPayingToken);

        _setResourceConfig(_config);
        require(_gasLimit >= minimumGasLimit(), "SystemConfig: gas limit too low");`, functions.initialize);

    // minimumGasLimit
    c.addFunctionCode(`return uint64(_resourceConfig.maxResourceLimit) + uint64(_resourceConfig.systemTxMaxGas);`, functions.minimumGasLimit);

    // maximumGasLimit
    c.addFunctionCode(` return MAX_GAS_LIMIT;`, functions.maximumGasLimit);

    // unsafeBlockSigner
    c.addFunctionCode(`addr_ = Storage.getAddress(UNSAFE_BLOCK_SIGNER_SLOT);`, functions.unsafeBlockSigner);

    // l1CrossDomainMessenger
    c.addFunctionCode(`addr_ = Storage.getAddress(L1_CROSS_DOMAIN_MESSENGER_SLOT);`, functions.l1CrossDomainMessenger);

    // l1ERC721Bridge
    c.addFunctionCode(`addr_ = Storage.getAddress(L1_ERC_721_BRIDGE_SLOT);`, functions.l1ERC721Bridge);

    // l1StandardBridge
    c.addFunctionCode(`addr_ = Storage.getAddress(L1_STANDARD_BRIDGE_SLOT);`, functions.l1StandardBridge);

    // disputeGameFactory
    c.addFunctionCode(`addr_ = Storage.getAddress(DISPUTE_GAME_FACTORY_SLOT);`, functions.disputeGameFactory);

    // optimismPortal
    c.addFunctionCode(`addr_ = Storage.getAddress(OPTIMISM_PORTAL_SLOT);`, functions.optimismPortal);

    // optimismMintableERC20Factory
    c.addFunctionCode(`addr_ = Storage.getAddress(OPTIMISM_MINTABLE_ERC20_FACTORY_SLOT);`, functions.optimismMintableERC20Factory);

    // batchInbox
    c.addFunctionCode(`addr_ = Storage.getAddress(BATCH_INBOX_SLOT);`, functions.batchInbox);

    // startBlock
    c.addFunctionCode(`return Storage.getUint(START_BLOCK_SLOT);`, functions.startBlock);

    // gasPayingToken
    c.addFunctionCode(`(addr_, decimals_) = GasPayingToken.getToken();`, functions.gasPayingToken);

    // isCustomGasToken
    c.addFunctionCode(`(address token,) = gasPayingToken();
        return token != Constants.ETHER;`, functions.isCustomGasToken);

    // gasPayingTokenName
    c.addFunctionCode(`name_ = GasPayingToken.getName();`, functions.gasPayingTokenName);

    // gasPayingTokenSymbol
    c.addFunctionCode(`symbol_ = GasPayingToken.getSymbol();`, functions.gasPayingTokenSymbol);

    // _setGasPayingToken
    c.addModifier('virtual', functions._setGasPayingToken);
    c.addFunctionCode(`if (_token != address(0) && _token != Constants.ETHER && !isCustomGasToken()) {
            require(
                ERC20(_token).decimals() == GAS_PAYING_TOKEN_DECIMALS, "SystemConfig: bad decimals of gas paying token"
            );
            bytes32 name = GasPayingToken.sanitize(ERC20(_token).name());
            bytes32 symbol = GasPayingToken.sanitize(ERC20(_token).symbol());

            // Set the gas paying token in storage and in the OptimismPortal.
            GasPayingToken.set({ _token: _token, _decimals: GAS_PAYING_TOKEN_DECIMALS, _name: name, _symbol: symbol });
            IOptimismPortal(payable(optimismPortal())).setGasPayingToken({
                _token: _token,
                _decimals: GAS_PAYING_TOKEN_DECIMALS,
                _name: name,
                _symbol: symbol
            });
        }`, functions._setGasPayingToken);

    // setUnsafeBlockSigner
    c.addModifier('onlyOwner', functions.setUnsafeBlockSigner);
    c.addFunctionCode(`_setUnsafeBlockSigner(_unsafeBlockSigner);`, functions.setUnsafeBlockSigner);

    // _setUnsafeBlockSigner
    c.addFunctionCode(`Storage.setAddress(UNSAFE_BLOCK_SIGNER_SLOT, _unsafeBlockSigner);

        bytes memory data = abi.encode(_unsafeBlockSigner);
        emit ConfigUpdate(VERSION, UpdateType.UNSAFE_BLOCK_SIGNER, data);`, functions._setUnsafeBlockSigner);

    // setBatcherHash
    c.addModifier('onlyOwner', functions.setBatcherHash);
    c.addFunctionCode(`_setBatcherHash(_batcherHash);`, functions.setBatcherHash);

    // _setBatcherHash
    c.addFunctionCode(`batcherHash = _batcherHash;

        bytes memory data = abi.encode(_batcherHash);
        emit ConfigUpdate(VERSION, UpdateType.BATCHER, data);`, functions._setBatcherHash);

    // setGasConfig
    c.addModifier('onlyOwner', functions.setGasConfig);
    c.addFunctionCode(`_setGasConfig(_overhead, _scalar);`, functions.setGasConfig);

    // _setGasConfig
    c.addFunctionCode(`require((uint256(0xff) << 248) & _scalar == 0, "SystemConfig: scalar exceeds max.");

        overhead = _overhead;
        scalar = _scalar;

        bytes memory data = abi.encode(_overhead, _scalar);
        emit ConfigUpdate(VERSION, UpdateType.FEE_SCALARS, data);`, functions._setGasConfig);

    // setGasConfigEcotone
    c.addModifier('onlyOwner', functions.setGasConfigEcotone);
    c.addFunctionCode(`_setGasConfigEcotone(_basefeeScalar, _blobbasefeeScalar);`, functions.setGasConfigEcotone);

    // _setGasConfigEcotone
    c.addFunctionCode(`basefeeScalar = _basefeeScalar;
        blobbasefeeScalar = _blobbasefeeScalar;

        scalar = (uint256(0x01) << 248) | (uint256(_blobbasefeeScalar) << 32) | _basefeeScalar;

        bytes memory data = abi.encode(overhead, scalar);
        emit ConfigUpdate(VERSION, UpdateType.FEE_SCALARS, data);`, functions._setGasConfigEcotone);

    // setGasLimit
    c.addModifier('onlyOwner', functions.setGasLimit);
    c.addFunctionCode(`_setGasLimit(_gasLimit);`, functions.setGasLimit);

    // _setGasLimit
    c.addFunctionCode(`require(_gasLimit >= minimumGasLimit(), "SystemConfig: gas limit too low");
        require(_gasLimit <= maximumGasLimit(), "SystemConfig: gas limit too high");
        gasLimit = _gasLimit;

        bytes memory data = abi.encode(_gasLimit);
        emit ConfigUpdate(VERSION, UpdateType.GAS_LIMIT, data);`, functions._setGasLimit);

    // setEIP1559Params
    c.addModifier('onlyOwner', functions.setEIP1559Params);
    c.addFunctionCode(`_setEIP1559Params(_denominator, _elasticity);`, functions.setEIP1559Params);

    // _setEIP1559Params
    c.addFunctionCode(`// require the parameters have sane values:
        require(_denominator >= 1, "SystemConfig: denominator must be >= 1");
        require(_elasticity >= 1, "SystemConfig: elasticity must be >= 1");
        eip1559Denominator = _denominator;
        eip1559Elasticity = _elasticity;

        bytes memory data = abi.encode(uint256(_denominator) << 32 | uint64(_elasticity));
        emit ConfigUpdate(VERSION, UpdateType.EIP_1559_PARAMS, data);`, functions._setEIP1559Params);

    // _setStartBlock
    c.addFunctionCode(`if (Storage.getUint(START_BLOCK_SLOT) == 0) {
            Storage.setUint(START_BLOCK_SLOT, block.number);
        }`, functions._setStartBlock);

    // resourceConfig
    c.addFunctionCode(`return _resourceConfig;`, functions.resourceConfig);

    // _setResourceConfig
    c.addFunctionCode(`// Min base fee must be less than or equal to max base fee.
        require(
            _config.minimumBaseFee <= _config.maximumBaseFee, "SystemConfig: min base fee must be less than max base"
        );
        // Base fee change denominator must be greater than 1.
        require(_config.baseFeeMaxChangeDenominator > 1, "SystemConfig: denominator must be larger than 1");
        // Max resource limit plus system tx gas must be less than or equal to the L2 gas limit.
        // The gas limit must be increased before these values can be increased.
        require(_config.maxResourceLimit + _config.systemTxMaxGas <= gasLimit, "SystemConfig: gas limit too low");
        // Elasticity multiplier must be greater than 0.
        require(_config.elasticityMultiplier > 0, "SystemConfig: elasticity multiplier cannot be 0");
        // No precision loss when computing target resource limit.
        require(
            ((_config.maxResourceLimit / _config.elasticityMultiplier) * _config.elasticityMultiplier)
                == _config.maxResourceLimit,
            "SystemConfig: precision loss with target resource limit"
        );

        _resourceConfig = _config;`, functions._setResourceConfig);


    setInfo(c, allOpts.contractInfo);
    return c;
}

const functions = defineFunctions({

  version: {
    kind: 'public' as const,
    args: [
    ],
    returns: ['string memory'],
    mutability: 'pure',
  },

  initialize: {
    kind: 'public' as const,
    args: [
          { name: '_owner', type: 'address' },
          { name: '_basefeeScalar', type: 'uint32' },
          { name: '_blobbasefeeScalar', type: 'uint32' },
          { name: '_batcherHash', type: 'bytes32' },
          { name: '_gasLimit', type: 'uint64' },
          { name: '_unsafeBlockSigner', type: 'address' },
          { name: '_config', type: 'IResourceMetering.ResourceConfig memory' },
          { name: '_batchInbox', type: 'address' },
          { name: '_addresses', type: 'SystemConfig.Addresses memory' },
        ],
  },

  minimumGasLimit: {
    kind: 'public' as const,
    args: [
    ],
    returns: ['uint64'],
    mutability: 'view',
  },

  maximumGasLimit: {
    kind: 'public' as const,
    args: [
    ],
    returns: ['uint64'],
    mutability: 'pure',
  },

  unsafeBlockSigner: {
    kind: 'public' as const,
    args: [
    ],
    returns: ['address addr_'],
    mutability: 'view',
  },

  l1CrossDomainMessenger: {
    kind: 'external' as const,
    args: [
    ],
    returns: ['address addr_'],
    mutability: 'view',
  },

  l1ERC721Bridge: {
    kind: 'external' as const,
    args: [
    ],
    returns: ['address addr_'],
    mutability: 'view',
  },

  l1StandardBridge: {
    kind: 'external' as const,
    args: [
    ],
    returns: ['address addr_'],
    mutability: 'view',
  },

  disputeGameFactory: {
    kind: 'external' as const,
    args: [
    ],
    returns: ['address addr_'],
    mutability: 'view',
  },

  optimismPortal: {
    kind: 'public' as const,
    args: [
    ],
    returns: ['address addr_'],
    mutability: 'view',
  },

  optimismMintableERC20Factory: {
    kind: 'external' as const,
    args: [
    ],
    returns: ['address addr_'],
    mutability: 'view',
  },

  batchInbox: {
    kind: 'external' as const,
    args: [
    ],
    returns: ['address addr_'],
    mutability: 'view',
  },

  startBlock: {
    kind: 'external' as const,
    args: [
    ],
    returns: ['uint256'],
    mutability: 'view',
  },

  gasPayingToken: {
    kind: 'public' as const,
    args: [
    ],
    returns: ['address addr_', 'uint8 decimals_'],
    mutability: 'view',
  },

  isCustomGasToken: {
    kind: 'public' as const,
    args: [
    ],
    returns: ['bool'],
    mutability: 'view',
  },

  gasPayingTokenName: {
    kind: 'external' as const,
    args: [
    ],
    returns: ['string memory name_'],
    mutability: 'view',
  },

  gasPayingTokenSymbol: {
    kind: 'external' as const,
    args: [
    ],
    returns: ['string memory symbol_'],
    mutability: 'view',
  },

  _setGasPayingToken: {
    kind: 'internal' as const,
    args: [
      { name: '_token', type: 'address' },
    ],
  },

  setUnsafeBlockSigner: {
    kind: 'external' as const,
    args: [
      { name: '_unsafeBlockSigner', type: 'address' },
    ],
  },

  _setUnsafeBlockSigner: {
    kind: 'internal' as const,
    args: [
      { name: '_unsafeBlockSigner', type: 'address' },
    ],
  },

  setBatcherHash: {
    kind: 'external' as const,
    args: [
      { name: '_batcherHash', type: 'bytes32' },
    ],
  },

  _setBatcherHash: {
    kind: 'internal' as const,
    args: [
      { name: '_batcherHash', type: 'bytes32' },
    ],
  },

  setGasConfig: {
    kind: 'external' as const,
    args: [
      { name: '_overhead', type: 'uint256' },
      { name: '_scalar', type: 'uint256' },
    ],
  },

  _setGasConfig: {
    kind: 'internal' as const,
    args: [
      { name: '_overhead', type: 'uint256' },
      { name: '_scalar', type: 'uint256' },
    ],
  },

  setGasConfigEcotone: {
    kind: 'external' as const,
    args: [
      { name: '_basefeeScalar', type: 'uint32' },
      { name: '_blobbasefeeScalar', type: 'uint32' },
    ],
  },

  _setGasConfigEcotone: {
    kind: 'internal' as const,
    args: [
      { name: '_basefeeScalar', type: 'uint32' },
      { name: '_blobbasefeeScalar', type: 'uint32' },
    ],
  },

  setGasLimit: {
    kind: 'external' as const,
    args: [
      { name: '_gasLimit', type: 'uint64' },
    ],
  },

  _setGasLimit: {
    kind: 'internal' as const,
    args: [
      { name: '_gasLimit', type: 'uint64' },
    ],
  },

  setEIP1559Params: {
    kind: 'external' as const,
    args: [
      { name: '_denominator', type: 'uint32' },
      { name: '_elasticity', type: 'uint32' },
    ],
  },

  _setEIP1559Params: {
    kind: 'internal' as const,
    args: [
      { name: '_denominator', type: 'uint32' },
      { name: '_elasticity', type: 'uint32' },
    ],
  },

  _setStartBlock: {
    kind: 'internal' as const,
    args: [
    ],
  },

  resourceConfig: {
    kind: 'external' as const,
    args: [
    ],
    returns: ['IResourceMetering.ResourceConfig memory'],
    mutability: 'view',
  },

  _setResourceConfig: {
    kind: 'internal' as const,
    args: [
      { name: '_config', type: 'IResourceMetering.ResourceConfig memory' },
    ],
  },

});