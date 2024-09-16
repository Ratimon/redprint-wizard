pragma solidity ^0.8.20;

import {Test} from "@redprint-forge-std/Test.sol";

contract BuildSafe_Test is Test {

    function setUp() external {


        string[] memory runJsInputs = new string[](8);

        // Build ffi command string
        runJsInputs[0] = 'npm';
        runJsInputs[1] = '--prefix';
        runJsInputs[2] = 'script-ts/';
        runJsInputs[3] = '--silent';
        runJsInputs[4] = 'run';
        runJsInputs[5] = 'generate_contract';
        runJsInputs[6] = leaves.length.toString();
        runJsInputs[7] = packed.toHexString();

        // Run command and capture output
        bytes memory jsResult = vm.ffi(runJsInputs);
        bytes32 jsGeneratedRoot = abi.decode(jsResult, (bytes32));



    }

}
