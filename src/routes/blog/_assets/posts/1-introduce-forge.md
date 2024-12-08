---
title: Introducing redprint-forge
description: A dev framework to modify & deploy OPStack ’s contracts.
date: '2023-7-24'
categories:
  - announcements
  - products
author:
  - 'Rati'
published: true
imgSrc: /blog/1-introduce-forge/header.webp
imgAlt: Introducting redprint-forge
---

# Introducing Redprint Wizard


As OPStack technology advances along with the the roll-up-centric roadmap vision, there are a great range of OPStack 's smart contract variations to select and more features to choose from, it becomes a challenge to present, manage and deploy all of them in a simple way. 

To tackle this, we are thrilled to  introduce [redprint-forge](https://github.com/Ratimon/redprint-forge), a developer-friendly framework/library in solidity to modify & deploy OPStack ’s contracts in a modular style. It works as an engine to:

- Provide type-safe deployment functions for **OPStack**'s smart contract component. This ensures correct type and order of arguments, enhancing security in smart contract development
- Save deployment schemas in **json** file
- Separate into each of modular and customizable components
- Based on All-Solidity, so no context switching, no new testing syntax

The directories below show how modular the [redprint-forge](https://github.com/Ratimon/redprint-forge)'s **deployment system** is:

On the one hand, the first one is a set of deployment scripts written in [/script](https://github.com/Ratimon/redprint-optimism-contracts-examples/tree/main/script), using [redprint-forge](https://github.com/Ratimon/redprint-forge) library and style guide:

```sh 
├── script
│   ├── 000_DeployAll.s.sol
│   ├── 100_DeploySafe.s.sol
│   ├── 200_SetupSuperchain.s.sol
│   ├── 201_DeployAddressManager.s.sol
│   ├── 202_DeployPloxyAdmin.s.sol
```

I highlight that developers are able to abstract and aggregate all scripts into just single one like in [/script](https://github.com/Ratimon/redprint-optimism-contracts-examples/blob/main/script/000_DeployAll.s.sol):

```ts
/** ... */

// `redprint-forge` 's core engine
import {IDeployer, getDeployer} from "@script/deployer/DeployScript.sol";

/** ... */

// application-specific logic
import {DeploySafeScript} from "@script/100_DeploySafe.s.sol";
import {SetupSuperchainScript} from "@script/200_SetupSuperchain.s.sol";

contract DeployAllScript is Script {

    /** ... */

    function run() public {

        // a singleton global deployer that any deployment script can access
        deployerProcedue = getDeployer();
        // auto saving address schema in .json file
        deployerProcedue.setAutoSave(true);

        DeploySafeScript safeDeployments = new DeploySafeScript();
        SetupSuperchainScript superchainSetups = new SetupSuperchainScript();

        //1) set up Safe Multisig
        safeDeployments.deploy();
        //2) set up superChain
        superchainSetups.run();
        //3) TODO set up OpAltDA
        //4) TODO set up layer2 OP Chain

    }
    /** ... */
}
```

> **Note**💡
The first digit represents the higher level of deployment logic, compared to the last degits. For example, `setup_200_superchain` whose number is `200` includes all of scripts whose numbers starting with `2XX` (e.g. `201` or `deploy_201_address_manager`).

> **Note**💡
You can also checkout how our implemented MVP of deployer library works as **a core engine** behind the scene here [Deployer.sol](https://github.com/Ratimon/redprint-optimism-contracts-examples/blob/efa1d92424989f0b7c313f9a1d1592b64ea1aadd/script/deployer/Deployer.sol)

On the other hand, the second one is the original script from **Optimism**'s [`Deploy.s.sol`](https://github.com/ethereum-optimism/optimism/blob/abfc1e1f37a89405bacd08a3bb6363250d3f68f5/packages/contracts-bedrock/scripts/Deploy.s.sol).

```sh
├── script
│   ├──
│   ├── Deploy.s.sol
│   ├──
```

As you can see, the original script is a single file, containing more than 1000 lines of code for all deployment logics for all contracts. Meanwhile, [`redprint-forge`](https://github.com/Ratimon/redprint-forge) abstracts and separates them into modular components, enabling better readability.

Using together with [`Redprint Wizard`](https://redprint.ninja/), the generated solidity code which consists of both smart contract parts and their relevant deploy scripts are displayed in customizable ways, leading to better developer experience and creativity.

Furthermore, these deployment components are extremely re-usable to replicate the same environment when testing. This will speed up the development process, as the developer does not need to re-write deployment logics again in test suites.

As you can see in [ProxyAdmin.t.sol](https://github.com/Ratimon/redprint-optimism-contracts-examples/blob/main/test/ProxyAdmin.t.sol), we can use those deployment components as a test harness.

```sh
├── test
│   ├──
│   ├── ProxyAdmin.t.sol
│   ├──
```

This could, together with **Type-Safe Deployment** feature, also improve overall security, because it potentially minimize false positives from using different deployment logics among production and test environments.

Find the example of using **redprint-forge** in [Redprint Wizard](http://redprint.ninja/) and the source code at [github repo](https://github.com/Ratimon/redprint-forge) and let us know what you think!!

[👉🏻  🛠️ Installation Guide 🛠️](https://github.com/Ratimon/redprint-forge?tab=readme-ov-file#installation)

## Acknowledgement

We embrace a culture of regenerative approach of building open-source software and we acknowledge, use, and get inspiration from these upstream software repositories :
- [OPStack](https://github.com/ethereum-optimism/optimism) by **OP Labs**
- [forge](https://github.com/foundry-rs/foundry/tree/master/crates/forge) by **Paradigm**
- [forge-deploy](https://github.com/wighawag/forge-deploy) by **Ronan Sandford**