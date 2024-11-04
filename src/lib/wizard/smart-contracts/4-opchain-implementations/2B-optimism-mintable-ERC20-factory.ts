import type { BaseModifier, Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2B-option-optimism-mintable-ERC20-factory';
import type { SharedOptimismMintableERC20FactoryOptions } from '../../shared/4-opchain-implementations/2B-option-optimism-mintable-ERC20-factory';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDefaults(opts: SharedOptimismMintableERC20FactoryOptions): Required<SharedOptimismMintableERC20FactoryOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printOptimismMintableERC20Factory(opts: SharedOptimismMintableERC20FactoryOptions = commonDefaults): string {
  return printContract(buildOptimismMintableERC20Factory(opts));
}

export function buildOptimismMintableERC20Factory(opts: SharedOptimismMintableERC20FactoryOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    const OptimismMintableERC20 = {
        name: 'OptimismMintableERC20',
        path: '@redprint-core/universal/OptimismMintableERC20.sol',
    };
    c.addModule(OptimismMintableERC20);

    const ISemver = {
        name: 'ISemver',
        path: '@redprint-core/universal/ISemver.sol',
    };
    c.addParent(ISemver);

    const Initializable = {
        name: 'Initializable',
        path: '@redprint-openzeppelin/proxy/utils/Initializable.sol',
    };
    c.addParent(Initializable);

    const IOptimismERC20Factory = {
        name: 'IOptimismERC20Factory',
        path: '@redprint-core/L2/interfaces/IOptimismERC20Factory.sol',
    };
    c.addParent(IOptimismERC20Factory);

    c.addVariable(`/// @custom:spacer OptimismMintableERC20Factory's initializer slot spacing
    /// @notice Spacer to avoid packing into the initializer slot
    bytes30 private spacer_0_2_30;`);
    
    c.addVariable(`/// @notice Address of the StandardBridge on this chain.
    /// @custom:network-specific
    address public bridge;`);

    c.addVariable(`/// @notice Mapping of local token address to remote token address.
    ///         This is used to keep track of the token deployments.
    mapping(address => address) public deployments;`);

    c.addVariable(`/// @notice Reserve extra slots in the storage layout for future upgrades.
    ///         A gap size of 48 was chosen here, so that the first slot used in a child contract
    ///         would be a multiple of 50.
    uint256[48] private __gap;`);

    c.addVariable(`/// @custom:legacy
    /// @notice Emitted whenever a new OptimismMintableERC20 is created. Legacy version of the newer
    ///         OptimismMintableERC20Created event. We recommend relying on that event instead.
    /// @param remoteToken Address of the token on the remote chain.
    /// @param localToken  Address of the created token on the local chain.
    event StandardL2TokenCreated(address indexed remoteToken, address indexed localToken);`);

    c.addVariable(`/// @notice Emitted whenever a new OptimismMintableERC20 is created.
    /// @param localToken  Address of the created token on the local chain.
    /// @param remoteToken Address of the corresponding token on the remote chain.
    /// @param deployer    Address of the account that deployed the token.
    event OptimismMintableERC20Created(address indexed localToken, address indexed remoteToken, address deployer);`);

    c.addVariable(`/// @notice The semver MUST be bumped any time that there is a change in
    ///         the OptimismMintableERC20 token contract since this contract
    ///         is responsible for deploying OptimismMintableERC20 contracts.
    /// @notice Semantic version.
    /// @custom:semver 1.10.1-beta.4
    string public constant version = "1.10.1-beta.4";`);


    c.addConstructorCode('initialize({ _bridge: address(0) });');

    // initialize
    c.addModifier('initializer', functions.initialize);
    c.addFunctionCode(`bridge = _bridge;`, functions.initialize);

    // BRIDGE
    c.addFunctionCode(`return bridge;`, functions.BRIDGE);

    // createStandardL2Token
    c.addFunctionCode(`return createOptimismMintableERC20(_remoteToken, _name, _symbol);`, functions.createStandardL2Token);

    // createOptimismMintableERC20
    c.addFunctionCode(`return createOptimismMintableERC20WithDecimals(_remoteToken, _name, _symbol, 18);`, functions.createOptimismMintableERC20);


    // createOptimismMintableERC20WithDecimals
    c.addFunctionCode(`require(_remoteToken != address(0), "OptimismMintableERC20Factory: must provide remote token address");

        bytes32 salt = keccak256(abi.encode(_remoteToken, _name, _symbol, _decimals));

        address localToken =
            address(new OptimismMintableERC20{ salt: salt }(bridge, _remoteToken, _name, _symbol, _decimals));

        deployments[localToken] = _remoteToken;

        // Emit the old event too for legacy support.
        emit StandardL2TokenCreated(_remoteToken, localToken);

        // Emit the updated event. The arguments here differ from the legacy event, but
        // are consistent with the ordering used in StandardBridge events.
        emit OptimismMintableERC20Created(localToken, _remoteToken, msg.sender);

        return localToken;`, functions.createOptimismMintableERC20WithDecimals);


    setInfo(c, allOpts.contractInfo);
    return c;
}

const functions = defineFunctions({

  initialize: {
    kind: 'public' as const,
    args: [
          { name: '_bridge', type: 'address' },
        ],
  },

  BRIDGE: {
    kind: 'external' as const,
    args: [
    ],
    returns: ['address'],
    mutability: 'view',
},

  createStandardL2Token: {
    kind: 'external' as const,
    args: [
      { name: '_remoteToken', type: 'address' },
      { name: '_name', type: 'string memory' },
      { name: '_symbol', type: 'string memory' },
    ],
    returns: ['address'],
  },

  createOptimismMintableERC20: {
    kind: 'public' as const,
    args: [
        { name: '_remoteToken', type: 'address' },
        { name: '_name', type: 'string memory' },
        { name: '_symbol', type: 'string memory' },
    ],
    returns: ['address'],
  },

  createOptimismMintableERC20WithDecimals: {
    kind: 'public' as const,
    args: [
        { name: '_remoteToken', type: 'address' },
        { name: '_name', type: 'string memory' },
        { name: '_symbol', type: 'string memory' },
        { name: '_decimals', type: 'uint8' },
    ],
    returns: ['address'],
  },

});