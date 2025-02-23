---
title: OPStack's Bridge Component Explainer 
description: A technical article guiding how OPStack's Bridge Contracts works
date: '2025-02-23'
categories:
  - tutorials
author:
  - 'Rati'
published: true
imgSrc: /blog/6-contract-explainer-bridges/header.webp
imgAlt: OPStack's Bridge Contract Explainer
---

# OPStack's Bridge Component Explainer


This article highlights and aim as a guide how **bridges** implemented in OP Stack monorepo codebase works. The content is very recommended for those smart contract developers/auditors who want to understand the core logics of OP Stack.

> **Note**💡
>  This bridge represent part of core logics in [L2 implementations components](https://redprint.ninja/4-opchain-implementations).

In simple words, OP Stack is a common development stack for building L2 blockchain ecosystems, and L2 are just blockchains with safe bridging. Also, Bridge contracts allows cross domain transfers of data ETH and ERC20 token across ethereum L1 and L2s.

There are 2 types of bridge systems:


## 1. **From L1 to L2** transactions and **Vice versa**


### Message Transfer

In general, when passing messages between L1 and L2, `CrossDomainMessenger` contract's functionalites are extended into `L1CrossDomainMessenger` and `L2CrossDomainMessenger` for L1 and L2 respectively.

Both contracts are resposible for relaying messages between the L1 and L2 layers. Then the next exexutions will be done on the destination chain.

For L1 to L2 path, messages sent are automatically relayed behind the scenes.

For L2 to L1 path, `L2ToL1MessagePasser` contract is  required to queue those messages when preparing for state updates or withdrawals. Then a second transaction on L1 is required to relayed in order to complete the withdrawal.

### Asset Transfer

Considering more complex use cases, `StandardBridge` contract could be used to implement the bridge. The official implementations inlude `L1StandardBridge`, `L2StandardBridge`, `L1ERC721Bridge` and `L2ERC721Bridge`. They are abstracted to bridge ETH and ERC20 tokens between L1 and L2. Otherwise, customized bridge contracts can be used to support more advanced features.

> **Tip**💡
> Check how to build customized bridge on [this tutorial](https://docs.optimism.io/app-developers/bridging/custom-bridge).

This below diagram shows the workflow of `StandardBridge` system:

<img data-pagefind-meta="image[src]" width="1120" height="1120" alt="relay flow" decoding="async" loading="eager" class="mt-4 border rounded bg-cover bg-center bg-no-repeat transform will-change-auto" src="6-contract-explainer-bridges/bridge_flow.webp" />

This `StandardBridge` system mandates the token deployed on L2 to be customized and conformed to `OptimismMintableERC20` standard. This extends the standard ERC-20 specification, incorporating additional functions that enable the bridge to validate deposits and withdrawals while managing token minting and burning. Check this [official tutorial](https://docs.optimism.io/app-developers/tutorials/bridging/standard-bridge-custom-token) for more details.

> **Tip**💡
> The `OptimismMintableERC20Factory` contract can be used to generate ERC-20 contracts on L2, enabling the deposit of native L1 tokens into `OptimismMintableERC20` contracts. This is the same for `OptimismMintableERC721` and `OptimismMintableERC721Factory` for ERC-721 tokens.

> **Note**💡
> These are link to relevant contract source code:
> 1. [`CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/universal/CrossDomainMessenger.sol)
> 2. [`L1CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L1/L1CrossDomainMessenger.sol)
> 3. [`L2CrossDomainMessenger` predeployed at `0x4200000000000000000000000000000000000016`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L2/L2CrossDomainMessenger.sol)
> 4. [`L1StandardBridge`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L1/L1StandardBridge.sol)
> 5. [`L2StandardBridge` predeployed at `0x4200000000000000000000000000000000000010`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L2/L2StandardBridge.sol)
> 6. [`L1ERC721Bridge`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L1/L1ERC721Bridge.sol)
> 7. [`L2ERC721Bridge` predeployed at `0x4200000000000000000000000000000000000014`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L2/L2ERC721Bridge.sol)
> 8. [`OptimismMintableERC20`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/universal/OptimismMintableERC20.sol)
> 9. [`OptimismMintableERC20Factory` predeployed at `0x4200000000000000000000000000000000000012`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/universal/OptimismMintableERC20Factory.sol)
> 10. [`OptimismMintableERC721`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L2/OptimismMintableERC721.sol)
> 11. [`OptimismMintableERC721Factory` predeployed at `0x4200000000000000000000000000000000000017`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L2/OptimismMintableERC721.sol)
> 12. [`L2ToL1MessagePasser1` deployed at `0x4200000000000000000000000000000000000007`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L2/L2ToL1MessagePasser.sol)



## 2. **Between L2 and L2** transactions


As above, it can be seen that bridging means **fragmented ecosystem** and **poor user experience** where users struggle to interact with applications across various L2 OPStack chains, as they have to bridge every time they want to transfer across different L2s.

OP Stack's **interoperability** aims to solve this problem by providing a seamless way to transfer assets between different L2s without requiring users to interact with multiple L2s.

### Message Transfer

`CrossL2Inbox` allows anyone to initiate the **execution** or **verification** of cross-chain messages on behalf of any user.

The `L2ToL2CrossDomainMessenger` is a higher-level abstraction built on top of the `CrossL2Inbox`, facilitating general message passing. It primarily included but not limited to securely transferring ERC-20 tokens between L2 chains. It also ensures replay protection, domain binding, and provides access to additional message details. xs

<img data-pagefind-meta="image[src]" width="1120" height="1120" alt="relaying_message" decoding="async" loading="eager" class="mt-4 border rounded bg-cover bg-center bg-no-repeat transform will-change-auto" src="6-contract-explainer-bridges/relaying_message_flow.webp"/>


When relaying a message via the `L2ToL2CrossDomainMessenger`, it a reqiuirement that the `_destination` matches `block.chainid` to ensure the message is valid only on a specific chain. The message hash is utilized for replay protection.

Additionally, the source chain must be included in the dependency set of the destination chain; otherwise, the message may become not playable.

To relay a message, the [`identifier`](https://specs.optimism.io/interop/messaging.html#message-identifier) of a event must be provided along with its associated [`message payload`](https://specs.optimism.io/interop/messaging.html#message-payload).

> **Note**💡

> The Identifier that uniquely represents a log that is emitted from a chain. 
```sh
struct Identifier {
    address origin;
    uint256 blocknumber;
    uint256 logIndex;
    uint256 timestamp;
    uint256 chainid;
}
```

### Asset Transfer

To achieve asset interoperability , `ERC7802` (by **Defiwonderland**, **UniswapLab** and **OP lab**) are proposed as a standard for interoperability, and one of its implemenation is `SuperchainERC20` standard by **OP Lab** to enable asset interoperability across the Superchain.

Simply speaking, it works by burning tokens on the source chain and minting an equivalent amount on the destination chain.

In particular, `SuperchainERC20` standard is an interface allowing ERC20 to be fungible across the Superchain using the official `SuperchainTokenBridge`, predeployed contract that serves as an abstraction layer over the `L2ToL2CrossDomainMessenger` for token bridging. It has mint and burn rights over `SuperchainERC20` tokens.

> **Tip**💡
> Check and try [superfuse.ninja](https://superfuse.ninja/) to create your own `SuperchainERC20` token.

This below diagram shows the workflow of `SuperchainERC20` standard:

<img data-pagefind-meta="image[src]" width="1120" height="1120" alt="interop flow" decoding="async" loading="eager" class="mt-4 border rounded bg-cover bg-center bg-no-repeat transform will-change-auto" src="6-contract-explainer-bridges/interop_flow.webp"/>


This `SuperchainERC20` system requires dApp developer to complete two steps.

1. Authorize the `SuperchainTokenBridge` (predeployed at `0x4200000000000000000000000000000000000028`) to execute `crosschainMint` and `crosschainBurn`. If `SuperchainERC20` is used, this permission is already granted.

2. Deploy the ERC-20 contract at the same address across all chains within the Superchain network, and this can be achieved by using `CREATE2` opcode.

> **Tip**💡
> The `OptimismSuperchainERC20Factory` contract can be used to creare `SuperchainERC20` contracts on L2. These contracts, known as `OptimismSuperchainERC20`, grant mint-burn permissions to the `L2StandardBridge`, include a `remoteToken` variable, and can be converted to and from `OptimismMintableERC20` tokens. The purpose of `OptimismSuperchainERC20` is to enhance `OptimismMintableERC20` with interoperability.

> **Note**💡
> These are link to relevant contract source code:
> 1. [`CrossL2Inbox` predeployed at `0x4200000000000000000000000000000000000022`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L2/CrossL2Inbox.sol)
> 2. [`L2ToL2CrossDomainMessenger` predeployed at `0x4200000000000000000000000000000000000023`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L2/L2ToL2CrossDomainMessenger.sol)
> 3. [`SuperchainERC20`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L2/SuperchainERC20.sol)
> 4. [`SuperchainTokenBridge` predeployed at `0x4200000000000000000000000000000000000028`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L2/SuperchainTokenBridge.sol)
> 5. [`OptimismSuperchainERC20Factory` predeployed at `0x4200000000000000000000000000000000000029`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L2/OptimismSuperchainERC20Factory.sol)
> 6. [`OptimismSuperchainERC20`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L2/OptimismSuperchainERC20.sol)


## Conclusion


In this article, we have discussed the bridge components in the OP Stack monorepo codebase. We have covered the core **predeployed** components of [`CrossDomainMessenger`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/universal/CrossDomainMessenger.sol) for **L1 to L2** bridging and vice versa, as well as the [`CrossL2Inbox`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L2/CrossL2Inbox.sol) and [`SuperchainERC20`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L2/SuperchainERC20.sol) for **L2 to L2** bridging.

Now, it is known that OP Stack's bridge sysem can be deployed or more advanced smart contract can be built on top of it, so new smore advanced interoperability can be unlocked.

> **Warning**💡
> This article is only for educational purposes and we note that the codebase is still experimental.