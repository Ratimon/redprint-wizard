import type {  Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2D-option-l1-standard-bridge';
import type { SharedL1StandardBridgeOptions } from '../../shared/4-opchain-implementations/2D-option-l1-standard-bridge';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDefaults(opts: SharedL1StandardBridgeOptions): Required<SharedL1StandardBridgeOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printL1StandardBridge(opts: SharedL1StandardBridgeOptions = commonDefaults): string {
  return printContract(buildL1StandardBridge(opts));
}

export function buildL1StandardBridge(opts: SharedL1StandardBridgeOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    const Predeploys = {
      name: 'Predeploys',
      path: '@redprint-core/libraries/Predeploys.sol',
    };
    c.addImportOnly(Predeploys);


    const StandardBridge = {
        name: 'StandardBridge',
        path: '@redprint-core/universal/StandardBridge.sol',
      };
    c.addParent(StandardBridge, [{ lit: '' }]);

    c.addOverride(StandardBridge, functions._emitETHBridgeInitiated);
    c.addOverride(StandardBridge, functions._emitETHBridgeFinalized);
    c.addOverride(StandardBridge, functions._emitERC20BridgeInitiated);
    c.addOverride(StandardBridge, functions._emitERC20BridgeFinalized);

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

    const ISystemConfig = {
        name: 'ISystemConfig',
        path: '@redprint-core/L1/interfaces/ISystemConfig.sol',
    };
    c.addImportOnly(ISystemConfig);

    c.addVariable(`/// @custom:legacy
    /// @notice Emitted whenever a deposit of ETH from L1 into L2 is initiated.
    /// @param from      Address of the depositor.
    /// @param to        Address of the recipient on L2.
    /// @param amount    Amount of ETH deposited.
    /// @param extraData Extra data attached to the deposit.
    event ETHDepositInitiated(address indexed from, address indexed to, uint256 amount, bytes extraData);
`);


    c.addVariable(`/// @custom:legacy
    /// @notice Emitted whenever a withdrawal of ETH from L2 to L1 is finalized.
    /// @param from      Address of the withdrawer.
    /// @param to        Address of the recipient on L1.
    /// @param amount    Amount of ETH withdrawn.
    /// @param extraData Extra data attached to the withdrawal.
    event ETHWithdrawalFinalized(address indexed from, address indexed to, uint256 amount, bytes extraData);`);

    c.addVariable(`/// @custom:legacy
    /// @notice Emitted whenever an ERC20 deposit is initiated.
    /// @param l1Token   Address of the token on L1.
    /// @param l2Token   Address of the corresponding token on L2.
    /// @param from      Address of the depositor.
    /// @param to        Address of the recipient on L2.
    /// @param amount    Amount of the ERC20 deposited.
    /// @param extraData Extra data attached to the deposit.
    event ERC20DepositInitiated(
        address indexed l1Token,
        address indexed l2Token,
        address indexed from,
        address to,
        uint256 amount,
        bytes extraData
    );`);

    c.addVariable(`/// @custom:legacy
    /// @notice Emitted whenever an ERC20 withdrawal is finalized.
    /// @param l1Token   Address of the token on L1.
    /// @param l2Token   Address of the corresponding token on L2.
    /// @param from      Address of the withdrawer.
    /// @param to        Address of the recipient on L1.
    /// @param amount    Amount of the ERC20 withdrawn.
    /// @param extraData Extra data attached to the withdrawal.
    event ERC20WithdrawalFinalized(
        address indexed l1Token,
        address indexed l2Token,
        address indexed from,
        address to,
        uint256 amount,
        bytes extraData
    );`);

    c.addVariable(`/// @notice Semantic version.
    /// @custom:semver 2.2.1-beta.1
    string public constant version = "2.2.1-beta.1";`);

    c.addVariable(`/// @notice Address of the SuperchainConfig contract.
    ISuperchainConfig public superchainConfig;`);

    c.addVariable(`/// @notice Address of the SystemConfig contract.
    ISystemConfig public systemConfig;`);

    c.addConstructorCode(`initialize({
            _messenger: ICrossDomainMessenger(address(0)),
            _superchainConfig: ISuperchainConfig(address(0)),
            _systemConfig: ISystemConfig(address(0))
        });`);


    // initialize
    c.addModifier('initializer', functions.initialize);
    c.addFunctionCode(`superchainConfig = _superchainConfig;
        systemConfig = _systemConfig;
        __StandardBridge_init({
            _messenger: _messenger,
            _otherBridge: StandardBridge(payable(Predeploys.L2_STANDARD_BRIDGE))
        });`, functions.initialize);

    // version
    c.addModifier('override', functions.paused);
    c.addFunctionCode(`return superchainConfig.paused();`, functions.paused);

    c.addReceiveModifier('override onlyEOA');
    c.addReceiveCode(`_initiateETHDeposit(msg.sender, msg.sender, RECEIVE_DEFAULT_GAS_LIMIT, bytes(""));`)

    // gasPayingToken
    c.addModifier('override', functions.gasPayingToken);
    c.addFunctionCode(`(addr_, decimals_) = systemConfig.gasPayingToken();`, functions.gasPayingToken);


    // depositETH
    c.addModifier('onlyEOA', functions.depositETH);
    c.addFunctionCode(`_initiateETHDeposit(msg.sender, msg.sender, _minGasLimit, _extraData);`, functions.depositETH);

    // depositETHTo
    c.addModifier('onlyEOA', functions.depositETHTo);
    c.addFunctionCode(`_initiateETHDeposit(msg.sender, _to, _minGasLimit, _extraData);`, functions.depositETHTo);

    // depositERC20
    c.addModifier('virtual onlyEOA', functions.depositERC20);
    c.addFunctionCode(`_initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _minGasLimit, _extraData);`, functions.depositERC20);

    // depositERC20To
    c.addModifier('virtual', functions.depositERC20To);
    c.addFunctionCode(`_initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _minGasLimit, _extraData);`, functions.depositERC20To);

    // finalizeETHWithdrawal
    c.addFunctionCode(`finalizeBridgeETH(_from, _to, _amount, _extraData);`, functions.finalizeETHWithdrawal);

    // finalizeERC20Withdrawal
    c.addFunctionCode(`finalizeBridgeERC20(_l1Token, _l2Token, _from, _to, _amount, _extraData);`, functions.finalizeERC20Withdrawal);

    // l2TokenBridge
    c.addFunctionCode(`return address(otherBridge);`, functions.l2TokenBridge);

    // _initiateETHDeposit
    c.addFunctionCode(`_initiateBridgeETH(_from, _to, msg.value, _minGasLimit, _extraData);`, functions._initiateETHDeposit);

    // _initiateERC20Deposit
    c.addFunctionCode(`_initiateBridgeERC20(_l1Token, _l2Token, _from, _to, _amount, _minGasLimit, _extraData);`, functions._initiateERC20Deposit);

    // _emitETHBridgeInitiated
    c.addFunctionCode(`emit ETHDepositInitiated(_from, _to, _amount, _extraData);`, functions._emitETHBridgeInitiated);

    // _emitETHBridgeFinalized
    c.addFunctionCode(`emit ETHWithdrawalFinalized(_from, _to, _amount, _extraData);`, functions._emitETHBridgeFinalized);

    // _emitERC20BridgeInitiated
    c.addFunctionCode(` emit ERC20DepositInitiated(_localToken, _remoteToken, _from, _to, _amount, _extraData);`, functions._emitERC20BridgeInitiated);

    // _emitERC20BridgeFinalized
    c.addFunctionCode(`emit ERC20WithdrawalFinalized(_localToken, _remoteToken, _from, _to, _amount, _extraData);`, functions._emitERC20BridgeFinalized);


    setInfo(c, allOpts.contractInfo);
    return c;
}

const functions = defineFunctions({

  initialize: {
    kind: 'public' as const,
    args: [
          { name: '_messenger', type: ' ICrossDomainMessenger' },
          { name: '_superchainConfig', type: 'ISuperchainConfig' },
          { name: '_systemConfig', type: 'ISystemConfig' },
        ],
  },

  paused: {
    kind: 'public' as const,
    args: [
    ],
    returns: ['bool'],
    mutability: 'view',
  },


  gasPayingToken: {
    kind: 'internal' as const,
    args: [
    ],
    returns: ['address addr_', 'uint8 decimals_'],
    mutability: 'view',
  },

  depositETH: {
    kind: 'external payable' as const,
    args: [
      { name: '_minGasLimit', type: 'uint32' },
      { name: '_extraData', type: 'bytes calldata' },
    ],
  },

  depositETHTo: {
    kind: 'external payable' as const,
    args: [
        { name: '_to', type: 'address' },
        { name: '_minGasLimit', type: 'uint32' },
        { name: '_extraData', type: 'bytes calldata' },
    ],
  },

  depositERC20: {
    kind: 'external' as const,
    args: [
        { name: '_l1Token', type: 'address' },
        { name: '_l2Token', type: 'address' },
        { name: '_amount', type: 'uint256' },
        { name: '_minGasLimit', type: 'uint32' },
        { name: '_extraData', type: 'bytes calldata' },
    ],
  },

  depositERC20To: {
    kind: 'external' as const,
    args: [
        { name: '_l1Token', type: 'address' },
        { name: '_l2Token', type: 'address' },
        { name: '_to', type: 'address' },
        { name: '_amount', type: 'uint256' },
        { name: '_minGasLimit', type: 'uint32' },
        { name: '_extraData', type: 'bytes calldata' },
    ],
  },

  finalizeETHWithdrawal: {
    kind: 'external payable' as const,
    args: [
        { name: '_from', type: 'address' },
        { name: '_to', type: 'address' },
        { name: '_amount', type: 'uint256' },
        { name: '_extraData', type: 'bytes calldata' },
    ],
  },

  finalizeERC20Withdrawal: {
    kind: 'external' as const,
    args: [
        { name: '_l1Token', type: 'address' },
        { name: '_l2Token', type: 'address' },
        { name: '_from', type: 'address' },
        { name: '_to', type: 'address' },
        { name: '_amount', type: 'uint256' },
        { name: '_extraData', type: 'bytes calldata' },
    ],
  },

  l2TokenBridge: {
    kind: 'external' as const,
    args: [
    ],
    returns: ['address'],
    mutability: 'view',
  },

  _initiateETHDeposit: {
    kind: 'internal' as const,
    args: [
        { name: '_from', type: 'address' },
        { name: '_to', type: 'address' },
        { name: '_minGasLimit', type: 'uint32' },
        { name: '_extraData', type: 'bytes memory' },
    ],
  },

  _initiateERC20Deposit: {
    kind: 'internal' as const,
    args: [
        { name: '_l1Token', type: 'address' },
        { name: '_l2Token', type: 'address' },
        { name: '_from', type: 'address' },
        { name: '_to', type: 'address' },
        { name: '_amount', type: 'uint256' },
        { name: '_minGasLimit', type: 'uint32' },
        { name: '_extraData', type: 'bytes memory' },
    ],
  },

  _emitETHBridgeInitiated: {
    kind: 'internal' as const,
    args: [
        { name: '_from', type: 'address' },
        { name: '_to', type: 'address' },
        { name: '_amount', type: 'uint256' },
        { name: '_extraData', type: 'bytes memory' },
    ],
  },

  _emitETHBridgeFinalized: {
    kind: 'internal' as const,
    args: [
        { name: '_from', type: 'address' },
        { name: '_to', type: 'address' },
        { name: '_amount', type: 'uint256' },
        { name: '_extraData', type: 'bytes memory' },
    ],
  },

  _emitERC20BridgeInitiated: {
    kind: 'internal' as const,
    args: [
        { name: '_localToken', type: 'address' },
        { name: '_remoteToken', type: 'address' },
        { name: '_from', type: 'address' },
        { name: '_to', type: 'address' },
        { name: '_amount', type: 'uint256' },
        { name: '_extraData', type: 'bytes memory' },
    ],
  },

  _emitERC20BridgeFinalized: {
    kind: 'internal' as const,
    args: [
        { name: '_localToken', type: 'address' },
        { name: '_remoteToken', type: 'address' },
        { name: '_from', type: 'address' },
        { name: '_to', type: 'address' },
        { name: '_amount', type: 'uint256' },
        { name: '_extraData', type: 'bytes memory' },
    ],
  },

});