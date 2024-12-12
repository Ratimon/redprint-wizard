import type {  Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2E-option-l1-ERC721-bridge';
import type { SharedL1ERC721BridgeOptions } from '../../shared/4-opchain-implementations//2E-option-l1-ERC721-bridge';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDefaults(opts: SharedL1ERC721BridgeOptions): Required<SharedL1ERC721BridgeOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printL1ERC721Bridge(opts: SharedL1ERC721BridgeOptions = commonDefaults): string {
  return printContract(buildL1ERC721Bridge(opts));
}

export function buildL1ERC721Bridge(opts: SharedL1ERC721BridgeOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    const ERC721Bridge = {
        name: 'ERC721Bridge',
        path: '@redprint-core/universal/ERC721Bridge.sol',
      };
    c.addParent(ERC721Bridge, [{ lit: '' }]);
    c.addOverride(ERC721Bridge, functions.paused);

    const Predeploys = {
        name: 'Predeploys',
        path: '@redprint-core/libraries/Predeploys.sol',
    };
    c.addImportOnly(Predeploys);

    const IERC721 = {
        name: 'IERC721',
        path: '@redprint-openzeppelin/token/ERC721/IERC721.sol',
    };
    c.addImportOnly(IERC721);

    const ISemver = {
        name: 'ISemver',
        path: '@redprint-core/universal/interfaces/ISemver.sol',
    };
    c.addParent(ISemver);

    const ICrossDomainMessenger = {
        name: 'ICrossDomainMessenger',
        path: '@redprint-core/universal/interfaces/ICrossDomainMessenger.sol',
    };
    c.addImportOnly(ICrossDomainMessenger);

    const ISuperchainConfig = {
        name: 'ISuperchainConfig',
        path: '@redprint-core/L1/interfaces/ISuperchainConfig.sol',
    };
    c.addImportOnly(ISuperchainConfig);

    const IL2ERC721Bridge = {
        name: 'IL2ERC721Bridge',
        path: '@redprint-core/L2/interfaces/IL2ERC721Bridge.sol',
    };
    c.addImportOnly(IL2ERC721Bridge);
    

    c.addVariable(`/// @notice Mapping of L1 token to L2 token to ID to boolean, indicating if the given L1 token
    ///         by ID was deposited for a given L2 token.
    mapping(address => mapping(address => mapping(uint256 => bool))) public deposits;`);


    c.addVariable(`/// @notice Address of the SuperchainConfig contract.
    ISuperchainConfig public superchainConfig;`);

    c.addVariable(`/// @notice Semantic version.
    /// @custom:semver 2.1.1-beta.4
    string public constant version = "2.1.1-beta.4";`);

    c.addConstructorCode(`initialize({ _messenger: ICrossDomainMessenger(address(0)), _superchainConfig: ISuperchainConfig(address(0)) });`);


    // initialize
    c.addModifier('initializer', functions.initialize);
    c.addFunctionCode(`superchainConfig = _superchainConfig;
        __ERC721Bridge_init({ _messenger: _messenger, _otherBridge: ERC721Bridge(payable(Predeploys.L2_ERC721_BRIDGE)) });`, functions.initialize);


    // finalizeBridgeERC721
    c.addModifier('onlyOtherBridge', functions.finalizeBridgeERC721);
    c.addFunctionCode(`require(paused() == false, "L1ERC721Bridge: paused");
        require(_localToken != address(this), "L1ERC721Bridge: local token cannot be self");

        // Checks that the L1/L2 NFT pair has a token ID that is escrowed in the L1 Bridge.
        require(
            deposits[_localToken][_remoteToken][_tokenId] == true,
            "L1ERC721Bridge: Token ID is not escrowed in the L1 Bridge"
        );

        // Mark that the token ID for this L1/L2 token pair is no longer escrowed in the L1
        // Bridge.
        deposits[_localToken][_remoteToken][_tokenId] = false;

        // When a withdrawal is finalized on L1, the L1 Bridge transfers the NFT to the
        // withdrawer.
        IERC721(_localToken).safeTransferFrom({ from: address(this), to: _to, tokenId: _tokenId });

        // slither-disable-next-line reentrancy-events
        emit ERC721BridgeFinalized(_localToken, _remoteToken, _from, _to, _tokenId, _extraData);`, functions.finalizeBridgeERC721);

    // _initiateBridgeERC721
    c.addModifier('override', functions._initiateBridgeERC721);
    c.addFunctionCode(`require(_remoteToken != address(0), "L1ERC721Bridge: remote token cannot be address(0)");

        // Construct calldata for _l2Token.finalizeBridgeERC721(_to, _tokenId)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC721Bridge.finalizeBridgeERC721.selector, _remoteToken, _localToken, _from, _to, _tokenId, _extraData
        );

        // Lock token into bridge
        deposits[_localToken][_remoteToken][_tokenId] = true;
        IERC721(_localToken).transferFrom({ from: _from, to: address(this), tokenId: _tokenId });

        // Send calldata into L2
        messenger.sendMessage({ _target: address(otherBridge), _message: message, _minGasLimit: _minGasLimit });
        emit ERC721BridgeInitiated(_localToken, _remoteToken, _from, _to, _tokenId, _extraData);`, functions._initiateBridgeERC721);



    setInfo(c, allOpts.contractInfo);
    return c;
}

const functions = defineFunctions({

  initialize: {
    kind: 'public' as const,
    args: [
          { name: '_messenger', type: ' ICrossDomainMessenger' },
          { name: '_superchainConfig', type: 'ISuperchainConfig' },
        ],
  },

  paused: {
    kind: 'public' as const,
    args: [
    ],
    returns: ['bool'],
    mutability: 'view',
  },

  finalizeBridgeERC721: {
    kind: 'external' as const,
    args: [
        { name: '_localToken', type: 'address' },
        { name: '_remoteToken', type: 'address' },
        { name: '_from', type: 'address' },
        { name: '_to', type: 'address' },
        { name: '_tokenId', type: 'uint256' },
        { name: '_extraData', type: 'bytes calldata' },
    ],
  },

  _initiateBridgeERC721: {
    kind: 'internal' as const,
    args: [
        { name: '_localToken', type: 'address' },
        { name: '_remoteToken', type: 'address' },
        { name: '_from', type: 'address' },
        { name: '_to', type: 'address' },
        { name: '_tokenId', type: 'uint256' },
        { name: '_minGasLimit', type: 'uint32' },
        { name: '_extraData', type: 'bytes calldata' },
    ],
  },

});