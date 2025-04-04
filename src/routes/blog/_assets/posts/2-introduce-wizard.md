---
title: Introducing Redprint Wizard
description: An interactive OPStack 's smart contract generator
date: '2023-7-24'
categories:
  - announcements
  - products
  - tutorials
author:
  - 'Rati'
published: true
imgSrc: /blog/2-introduce-wizard/header.webp
imgAlt: Introducting Redprint Wizard
---

# Introducing Redprint Wizard


After EIP 4844 has been launched, the tx cost on L2 becomes very cheap, as the Ethereum roll-up-centric roadmap has become more mature.
In particular, rollups will scale, and transactions by end users will not directly happen on L1, but L2, then be rolled up and settled on L1.

To align with the roll-up-centric roadmap vision, Optimism has released the concept of Superchain where a variations of L2  will be built with the same technoly stack : OPStack to shared the interoperability and standardization.

However, building roll-up, the app chain or even L3 on top of **Optimism** requires more better resourceful knowledge bases. This can be very challenging, especially for novices, because the technology is still early and the development practice is quite new. It is still difficult to communicate what potential features can be possibly built, and  exactly which sets of smart contracts required to choose and be composed together to archive such features.

To realize visions of both Ethereum and Optimism, we are thrilled to release [`Redprint Wizard`](https://redprint.ninja/). It is a code generator/ interactive developer playground to develop a part of L2/rollup out of components from OPStack Contracts. Select the desired smart contract layer that you want (currently support for Governor and SafeMultisig contracts for Governance layer),

It can be seen below that there are several options to choose in own desired layers. In our example, it is step 1 of the **governance** Layer and the [`Governor-style contract`](https://docs.openzeppelin.com/contracts/5.x/api/governance) is picked over the [`Safe's Multi-sig`](https://github.com/safe-global/safe-smart-account).

<img data-pagefind-meta="image[src]" width="1600" height="900" alt="Redprint ui" decoding="async" loading="eager" class="mt-4 border rounded bg-cover bg-center bg-no-repeat transform will-change-auto" src="2-introduce-wizard/wizard_ui.webp" />


To be more specific, when it comes to **Compound-style contract**,different sets of parameters can be selected based on the preference. This includes **Voting Delay**, **Voting Period**, **Time Lock Period** and etc.

Then, **Redprint Wizard** will generate all of the contract code, releavent deploy script and command to deploy such contract. This can serve as a starting point and customized further based on your own need.

Once the code is complete, both the contract code and the deploy can be used in your local local development workflows by utilitising  **Copy** and **Download As .sol** buttons as shown aove

> **Note**💡
It is highlighted that the generated deploy scripts relies on our own [solidity-based deployer module](https://github.com/Ratimon/redprint-forge/blob/main/src/deployer/Deployer.sol). Check out our article at [Introducing redprint-forge](http://redprint.ninja/blog/1-introduce-forge) !!

This is just one example. There are many other interesting customizable contracts to explore and add hackable features. For instance, customized bridge can be created by extending `IStandardard Bridge` as well as modifying `L1StandardBridge` or `L1ERC721Bridge`.

let us know what you dream, tinker, and push the boundaries of what's possible by composing your own different OPStack components together!

[👉🏻  🛠️ Detailed Installation Guide 🛠️](https://github.com/Ratimon/redprint-wizard?tab=readme-ov-file#installation)

## Acknowledgement

We embrace a culture of regenerative approach of building open-source software and we acknowledge, use, and get inspiration from these upstream software repositories :
- [OPStack](https://github.com/ethereum-optimism/optimism) by **OP Labs**
- [redprint-forge](https://github.com/Ratimon/redprint-forge) by Us !!
- [forge-deploy](https://github.com/wighawag/forge-deploy) by **Ronan Sandford**
- [openzeppelin-contracts](https://github.com/openZeppelin/openzeppelin-contracts) by **OpenZeppelin**
- [contracts-wizard](https://github.com/OpenZeppelin/contracts-wizard) by **OpenZeppelin**
- [skeleton](https://github.com/skeletonlabs/skeleton) by **Skeleton Labs**