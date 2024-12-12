import type { ContractBuilder } from '../contract';

export function buildResolvedDelegateProxy(c: ContractBuilder): void {

    const AddressManager = {
        name: 'AddressManager',
        path: '@redprint-core/legacy/AddressManager.sol',
      };
    c.addImportOnly(AddressManager);
   
    c.addVariable(`/// @notice Mapping used to store the implementation name that corresponds to this contract. A
    ///         mapping was originally used as a way to bypass the same issue normally solved by
    ///         storing the implementation address in a specific storage slot that does not conflict
    ///         with any other storage slot. Generally NOT a safe solution but works as long as the
    ///         implementation does not also keep a mapping in the first storage slot.
    mapping(address => string) private implementationName;`);

    c.addVariable(`/// @notice Mapping used to store the address of the AddressManager contract where the
    ///         implementation address will be resolved from. Same concept here as with the above
    ///         mapping. Also generally unsafe but fine if the implementation doesn't keep a mapping
    ///         in the second storage slot.
    mapping(address => AddressManager) private addressManager;`);


    c.addConstructorArgument({
      type: 'AddressManager',
      name: '_addressManager'
    });
    c.addConstructorArgument({
      type: 'string memory',
      name: '_implementationName'
    });
    c.addConstructorCode(`addressManager[address(this)] = _addressManager;
        implementationName[address(this)] = _implementationName;`);


    c.addFallbackCode(`address target = addressManager[address(this)].getAddress((implementationName[address(this)]));

        require(target != address(0), "ResolvedDelegateProxy: target address must be initialized");

        // slither-disable-next-line controlled-delegatecall
        (bool success, bytes memory returndata) = target.delegatecall(msg.data);

        if (success == true) {
            assembly {
                return(add(returndata, 0x20), mload(returndata))
            }
        } else {
            assembly {
                revert(add(returndata, 0x20), mload(returndata))
            }
        }`)
  
}