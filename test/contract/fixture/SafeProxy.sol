// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IProxy} from "@redprint-safe-contracts/contracts/proxies/SafeProxy.sol";

contract SafeProxy {
    address internal singleton;

    constructor(address _singleton) {
        require(_singleton != address(0), "Invalid singleton address provided");
        singleton = _singleton;
    }

    fallback() external payable {
        // solhint-disable-next-line no-inline-assembly
        assembly {
          let _singleton := sload(0)
          // 0xa619486e == keccak("masterCopy()"). The value is right padded to 32-bytes with 0s
          if eq(calldataload(0), 0xa619486e00000000000000000000000000000000000000000000000000000000) {
              mstore(0, shr(12, shl(12, _singleton)))
              return(0, 0x20)
          }
          calldatacopy(0, 0, calldatasize())
          let success := delegatecall(gas(), _singleton, 0, calldatasize(), 0, 0)
          returndatacopy(0, 0, returndatasize())
          if eq(success, 0) {
              revert(0, returndatasize())
          }
          return(0, returndatasize())
        }
    }
}
