---
title: OPStack's Proxy Component Explainer 
description: A technical article guiding how OPStack's Proxy Contracts works
date: '2025-03-10'
categories:
  - tutorials
author:
  - 'Rati'
published: true
imgSrc: /blog/7-contract-explainer-proxy/header.webp
imgAlt: OPStack's Proxy Contract Explainer
---

# OPStack's Bridge Component Explainer


This article highlights and aim as a guide how different types of **proxy** implemented in OP Stack monorepo codebase work. It is very recommended for smart contract developers/auditors who want to understand the core logics of OP Stack.

> **Note**💡
>  These contracts represent parts of [proxy components](https://redprint.ninja/4-opchain-proxies).

## Introduction to Proxy

Proxy contract solves a fundamental limitation in smart contracts: the inability to modify deployed code. It works by:

- Separating storage and logic into different contracts
- Keeping data in a "proxy" storage contract
- Delegating function calls to upgradeable "logic" contracts

This allows developers to upgrade contract functionality while preserving all stored data.


##  Proxy in context of OP Stack


This is important in context of L2 development stack, because the L2 acts as an intermediary layer on top of an Ethereum L1 to only resolve any disputes and achieve consensus on the L2 state. In simple words, this means that such ugradable abstraction is separate from  dApp and user 's data stored on L2. Futhermore, it is noted that L2 is in still in high development phase, so it is important to have a way to upgrade the contract logic for security issues.


When looking at the OP Stack codebase, including [L1 's contracts](https://redprint.ninja/2-superchain) and [L2 's contracts](https://redprint.ninja/4-opchain-proxies), there are 3 types of proxy implementations as follows:

1. [`Proxy.sol`](https://github.com/ethereum-optimism/optimism/blob/v1.11.2/packages/contracts-bedrock/src/universal/Proxy.sol)
2. [`L1ChugSplashProxy.sol`](https://github.com/ethereum-optimism/optimism/blob/v1.11.2/packages/contracts-bedrock/src/legacy/L1ChugSplashProxy.sol)
3. [`ResolvedDelegateProxy.sol`](https://github.com/ethereum-optimism/optimism/blob/v1.11.2/packages/contracts-bedrock/src/legacy/ResolvedDelegateProxy.sol)

These different types of proxies are different variations of **Transparent Upgradeable Proxy Contract**. Essentially, it allows upgrades while preventing **function selector clashes**.


## Risks of using Proxy


Those proxy contract metioned above requires a **storage slot** for the implementation address, as well as a mechanism for an admin to update it. Indeed, **ERC-1967** standardizes storage placement to avoid collisions but doesn’t specify the update mechanism. Adding an update function directly in the proxy risks clashes with implementation functions.

The Transparent Upgradeable Proxy Pattern prevents **function selector clashes** by ensuring the proxy has **minimal public/external** functions except the fallback.

> **Note**💡

> Check out this [forum](https://forum.openzeppelin.com/t/beware-of-the-proxy-learn-how-to-exploit-function-clashing/1070) for more information on how to exploit function selector clashes in proxy contracts and how to prevent them.

Nonetheless, it may be acceptible to have more public/external functions in the proxy contract, as long as they have modifiers to prevent direct calls from others except admin address. This means that user will not be able to call these functions directly, minimizing the risk of function selector clashes from the perspective of users.

On the other hand, the risks of using proxy contract are still needed to be addressed. When ownership ( e.g. [Proxy Admin](https://github.com/ethereum-optimism/optimism/blob/v1.11.2/packages/contracts-bedrock/src/universal/Proxy.sol#L10)) of the proxy contract is **compromised**. The risks are:

- It can be used to call either the `upgradeTo` or `upgradeToAndCall` functions to upgrade the proxy to a malicious versions.

- It can lock or remove assets in the Standard Bridge including [`L1StandardBridge`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L1/L1StandardBridge.sol), [`L2StandardBridge`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L2/L2StandardBridge.sol),[`L1ERC721Bridge`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L1/L1ERC721Bridge.sol) and [`L2ERC721Bridge`](https://github.com/ethereum-optimism/optimism/blob/v1.11.1/packages/contracts-bedrock/src/L2/L2ERC721Bridge.sol).

- There is failure to mitigate a risk associated with the `upgradeTo` or `upgradeToAndCall` functions.

> **Note**💡

> This risk is mitigated by multi-sig control of the L1 Proxy Admin. The L1 Proxy Admin is controlled by a 2-of-2 multisig, with one owner being the **Optimism Foundation**’s 5/7 multisig and the other being the **Security Council** multisig.


##  Different Proxy Implementations in OP Stack


The main difference across different proxy implementations is variation in **different public/external functions**. 


### 1. `Proxy.sol`

```sh
interface IProxy {
    # ...
    function admin() external returns (address);
    function changeAdmin(address _admin) external;
    function implementation() external returns (address);
    function upgradeTo(address _implementation) external;
    function upgradeToAndCall(address _implementation, bytes memory _data) external payable returns (bytes memory);
    # ...
}
```


### 2. `L1ChugSplashProxy`

```sh
interface IL1ChugSplashProxy {

    # ...
    function getImplementation() external returns (address);
    function getOwner() external returns (address);
    function setCode(bytes memory _code) external;
    function setOwner(address _owner) external;
    function setStorage(bytes32 _key, bytes32 _value) external;
    function __constructor__(address _owner) external;
    # ...
}

```


### 3. `ResolvedDelegateProxy`

While, **ResolvedDelegateProxy()** contails no public functions except the fallback. So,the risk of a selector clash collision is eliminated. It is noted that this contractis a legacy proxy that uses [AddressManager](https://github.com/ethereum-optimism/optimism/blob/v1.11.2/packages/contracts-bedrock/src/legacy/AddressManager.sol) to determine the implementation address. It is retained for backward compatibility to manage existing legacy proxies as needed.


## Final Thoughts


Although it is industry standard to use proxy contract for upgradable smart contracts, it is important to understand the risks, benefits and ,most importantly, the history how it is evolved over time. So, we have the full context of how they work in OP Stack.


### Acknowledgements:

- [Rareskills: Transparent Upgradeable Proxy Pattern](https://www.rareskills.io/post/transparent-upgradeable-proxy)

- [OpenZeppelin Forum: Function Name Clashing Exploits with Proxies](https://forum.openzeppelin.com/t/function-name-clashing-exploits-with-proxies/5003)

- [Nomic Foundation Blog: Malicious Backdoors in Ethereum Proxies](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357)