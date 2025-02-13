<h1>Keep Optimistic and be OPStack deployer!! </h1>

- [Installation](#installation)
- [What is it for](#what-is-it-for)
- [Architecture](#architecture)
- [Metric Definitions](#metrics)
- [Contributing](#contributing)
- [Acknowledgement](#acknowledgement)

>[!NOTE]
> You can find our relevant examples [`here`](https://github.com/Ratimon/redprint-optimism-contracts-examples). Geneated contract code from the Redprint Wizard is stored here due to documentation and testing purpose.

## Installation

### with npm

We assume that you already setup your own working front-end environment and `cd` into it

```bash
cd my-project;
nvm use v22.14.0
``` 

Add the `redprint-wizard` using your favorite package manager, e.g., with pnpm:

```sh
npm add -D redprint-wizard
```

Alternatively, you can fork a project and installed dependencies with `pnpm install` (or `yarn`), then start a development server:

```bash
git clone git@github.com:Ratimon/redprint-wizard.git
cd redprint-wizard;
pnpm dev
```

## What Is It For

One of our Swiss army knife toolset: **Redprint Wizard UI**. It is a code generator/ interactive developer playground. It supports a space to experience, innovate and build features that either lie far along ether Optimism or Ethereum 's roadmaps which aren't yet available on the production at all, empowering developers to dream, tinker, and push the boundaries of what's possible by composing their own different OPStack components together.

Together with [`redprint-forge`](https://github.com/Ratimon/redprint-forge), it does not only help novice developers to deploy OPStack's smart contracts to deploy on OP mainnet, but also help them to use generated deployment script in their own projects.

## Architecture

```sh
├── src
│   ├── lib
│   │   ├── analytics            # Google Analytics 
│   │   ├── model                # Front-end Data Model
│   │   ├── ui                   # UI Compoment
│   │   ├── utils
│   │   └── wizard               # code generation logic.
│   │       ├── deploy-scripts
│   │       ├── shared
│   │       ├── smart-contracts
│   │       └── utils
│   ├── routes                    # Svelte routes
│   │   ├── 1-governance
│   │   ├── 2-superchain
│   │   ├── 3-alt-da
│   │   ├── 4-opchain-proxies
│   │   ├── 4-opchain-implementations
│   │   ├── about
│   │   ├── blog
│   │   ├── privacy-policy
│   │   └── tos
└── static                        # Static files
    ├── blog
    └── pwa
```

#metrics

1. **Active Users** or **Number of (Monthly/Yearly) Visitor**: a unique person who engaged with your website or app within a given time frame

This figure can be represented by GA's `page_view` events, and these events can be grouped into different OPStack components. They are :

- `Set up Governance Layer | Redprint Wizard` page
- `Set up Super Chain | Redprint Wizard` page
- `Set up OpAltDA Chain | Redprint Wizard` page
- `Set up OP Chain | Redprint Wizard` page

>[!NOTE]
> These figures can be checked in [reports/](https://github.com/Ratimon/redprint-wizard/tree/main/reports/) directory.

2. **Number of Link Clicks Toward the Code copy button** : the number of developers who come to experiment our interactive turorial. It shows **usability** of our tool to **modify** OPStack components.

3. **Number of Downloaded code as zip file** : the number of developers who use our generated contract. It suggests **usability** of our tool to **deploy** OPStack components.

These figures can be represented by GA's  custoizrd events. They are :
- `copy-contract-Safe`
- `copy-contract-Governor`
- `copy-script-Safe`
- `copy-script-Governor`

>[!NOTE]
> All events'names can be found in in [lib/analytics/analytics.Store.ts](https://github.com/Ratimon/redprint-wizard/blob/main/src/lib/analytics/analytics.Store.ts#L5).

>[!NOTE]
> The convention is : `<event_name>`-`<contract_kind>`-`<contract_name>`

> `<event_name>` could be either `copy` or `downloadd`
> `<contract_kind>` could be either `contract` or `script`

4. **Number of visitors to our articles in our blog** : The number of views on our blog/turorial. It indicates **accessibility** of The OPStack tool.


This metric can be represented by GA's  events which are named by blog title For instance, they are :

- `Introducing Redprint Wizard` [page](https://redprint.ninja/blog/1-introduce-forge)
- `Introducing redprint-forge	` [page](https://redprint.ninja/blog/2-introduce-wizard)

>[!NOTE]
> These figures can be checked in [reports/](https://github.com/Ratimon/redprint-wizard/tree/main/reports/) directory.


5. **Version Releases**: The software features releases of `Ratimon/redprint-wizard` and `Ratimon/redprint-forge`.

Given a version number `MAJOR.MINOR.PATCH`, the definition is:

- MAJOR version for making incompatible changes
- MINOR version for adding functionality in a backwards-compatible manner
- PATCH version for making backwards-compatible bug fixes

>[!NOTE]
> The released versions can be checked as following:

> [github link](https://github.com/Ratimon/redprint-wizard/releases). (for redprint-wizard)
> [github link](https://github.com/Ratimon/redprint-forge/releases). (for redprint-forge)

6. **Number of repo stars**: The number of stars on the github repositories for `Ratimon/redprint-wizard` and `Ratimon/redprint-forge`.

- [redprint-wizard's Repo Link](https://github.com/Ratimon/redprint-wizard)
- [redprint-forge's Repo Link](https://github.com/Ratimon/redprint-forge)

7. **Number of repo forks**: The number of forks on the github repositories for `Ratimon/redprint-wizard` and `Ratimon/redprint-forge`.

- [redprint-wizard's Repo Link](https://github.com/Ratimon/redprint-wizard)
- [redprint-forge's Repo Link](https://github.com/Ratimon/redprint-forge)

8. **Number of npm packages downloaded**: The number of downloads of `redprint-wizard` and `redprint-forge` on npm.

- [redprint-wizard's Package Link](https://www.npmjs.com/package/redprint-wizard)
- [redprint-forge's Package Link](https://www.npmjs.com/package/redprint-forge)


## Contributing

See our [`contributing guidelines`](./CONTRIBUTING.md).

If you want to say **thank you** or/and support active development of Redprint Wizard:

- Add a [GitHub Star](https://github.com/Ratimon/redprint-wizard) to the
  project.
- Tweet about [Redprint](https://redprint.ninja/blog/2-introduce-wizard)
- Write interesting articles about the project on
  [Medium](https://medium.com/), or your personal blog.
- Keep Optimimstic !!

## Acknowledgement

This project would not have been possible to build without the advanced iniatiative from opensource software including  [contracts-wizard](https://github.com/OpenZeppelin/contracts-wizard), so we are deeply thankful for their contributions in our web3 ecosystem.

If we’ve overlooked anyone, please open an issue so we can correct it. While we always aim to acknowledge the inspirations and code we utilize, mistakes can happen in a team setting, and a reference might unintentionally be missed.