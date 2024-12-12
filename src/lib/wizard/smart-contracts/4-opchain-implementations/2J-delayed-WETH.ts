import type { BaseFunction, Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from "../../shared/4-opchain-implementations/2J-option-delayed-WETH";
import type { SharedDelayedWETHOptions } from '../../shared/4-opchain-implementations/2J-option-delayed-WETH';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDefaults(opts: SharedDelayedWETHOptions): Required<SharedDelayedWETHOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printDelayedWETH(opts: SharedDelayedWETHOptions = commonDefaults): string {
  return printContract(buildDelayedWETH(opts));
}

export function buildDelayedWETH(opts: SharedDelayedWETHOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    const OwnableUpgradeable = {
      name: 'OwnableUpgradeable',
      path: '@redprint-openzeppelin-upgradeable/access/OwnableUpgradeable.sol',
    };
    c.addParent(OwnableUpgradeable, []);

    const WETH98 = {
      name: 'WETH98',
      path: '@redprint-core/universal/WETH98.sol',
    };
    c.addParent(WETH98, []);

    const ISemver = {
        name: 'ISemver',
        path: '@redprint-core/universal/interfaces/ISemver.sol',
    };
    c.addParent(ISemver, []);

    const ISuperchainConfig = {
        name: 'ISuperchainConfig',
        path: '@redprint-core/L1/interfaces/ISuperchainConfig.sol',
    };    
    c.addImportOnly(ISuperchainConfig);


    c.addVariable(`/// @notice Represents a withdrawal request.
    struct WithdrawalRequest {
        uint256 amount;
        uint256 timestamp;
    }`);
    
    c.addVariable(`/// @notice Emitted when an unwrap is started.
    /// @param src The address that started the unwrap.
    /// @param wad The amount of WETH that was unwrapped.
    event Unwrap(address indexed src, uint256 wad);`);

    c.addVariable(`/// @notice Semantic version.
    /// @custom:semver 1.2.0-beta.2
    string public constant version = "1.2.0-beta.2";`);

    c.addVariable(`/// @notice Returns a withdrawal request for the given address.
    mapping(address => mapping(address => WithdrawalRequest)) public withdrawals;`);

    c.addVariable(`/// @notice Withdrawal delay in seconds.
    uint256 internal immutable DELAY_SECONDS;`);

    c.addVariable(`/// @notice Address of the SuperchainConfig contract.
    ISuperchainConfig public config;`);


    c.addConstructorArgument({
        type: 'uint256',
        name: '_delay'
    });
    c.addConstructorCode(`DELAY_SECONDS = _delay;
        initialize({ _owner: address(0), _config: ISuperchainConfig(address(0)) });`);

    // initialize
    c.addModifier('initializer', functions.initialize);
    c.addFunctionCode(`__Ownable_init();
        _transferOwnership(_owner);
        config = _config;`, functions.initialize);

    // delay
    c.addFunctionCode(`return DELAY_SECONDS;`, functions.delay);

    // unlock
    c.addFunctionCode(`// Note that the unlock function can be called by any address, but the actual unlocking capability still only
        // gives the msg.sender the ability to withdraw from the account. As long as the unlock and withdraw functions
        // are called with the proper recipient addresses, this will be safe. Could be made safer by having external
        // accounts execute withdrawals themselves but that would have added extra complexity and made DelayedWETH a
        // leaky abstraction, so we chose this instead.
        WithdrawalRequest storage wd = withdrawals[msg.sender][_guy];
        wd.timestamp = block.timestamp;
        wd.amount += _wad;`, functions.unlock);

    // withdraw
    c.addModifier('override', getWithdrawFunction(1));
    c.addFunctionCode(`withdraw(msg.sender, _wad);`, getWithdrawFunction(1));

    // withdraw
    c.addFunctionCode(`require(!config.paused(), "DelayedWETH: contract is paused");
        WithdrawalRequest storage wd = withdrawals[msg.sender][_guy];
        require(wd.amount >= _wad, "DelayedWETH: insufficient unlocked withdrawal");
        require(wd.timestamp > 0, "DelayedWETH: withdrawal not unlocked");
        require(wd.timestamp + DELAY_SECONDS <= block.timestamp, "DelayedWETH: withdrawal delay not met");
        wd.amount -= _wad;
        super.withdraw(_wad);`, getWithdrawFunction(2));

    // recover
    c.addFunctionCode(`require(msg.sender == owner(), "DelayedWETH: not owner");
        uint256 amount = _wad < address(this).balance ? _wad : address(this).balance;
        (bool success,) = payable(msg.sender).call{ value: amount }(hex"");
        require(success, "DelayedWETH: recover failed");`, functions.recover);


    // hold
    c.addFunctionCode(`require(msg.sender == owner(), "DelayedWETH: not owner");
        allowance[_guy][msg.sender] = _wad;
        emit Approval(_guy, msg.sender, _wad);`, functions.hold);


    setInfo(c, allOpts.contractInfo);
    return c;
}

function getWithdrawFunction( argNumber: 1 | 2): BaseFunction {
    if (argNumber === 1) {
        const fn = {
            name: 'withdraw',
            args: [
                { name: '_wad', type: 'uint256' },
            ],
            returns: [ ] , 
            kind: 'public' as const,
          };
        return fn;
    } else {
        const fn = {
            name: 'withdraw',
            args: [
                { name: '_guy', type: 'address' },
                { name: '_wad', type: 'uint256' },
            ],
            returns: [ ] , 
            kind: 'public' as const,
          };
        return fn;
    }
    
  }
  

const functions = defineFunctions({
    initialize: {
      kind: 'public' as const,
      args: [
          { name: '_owner', type: 'address' },
          { name: '_config', type: 'ISuperchainConfig' },
        ],
    },

    delay: {
        kind: 'external' as const,
        args: [
        ],
        returns: ['uint256'],
        mutability: 'view',
    },

    unlock: {
        kind: 'external' as const,
        args: [
            { name: '_guy', type: 'address' },
            { name: '_wad', type: 'uint256' },
        ],
    },

    recover: {
        kind: 'external' as const,
        args: [
            { name: '_wad', type: 'uint256' },
        ],
    },


    hold: {
        kind: 'external' as const,
        args: [
            { name: '_guy', type: 'address' },
            { name: '_wad', type: 'uint256' },
        ],
    },

});