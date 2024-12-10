<h1>Keep Optimistic and be OPStack deployer!! </h1>

- [Installation](#installation)
- [What is it for](#what-is-it-for)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [Acknowledgement](#acknowledgement)

>[!NOTE]
> You can find our relevant examples [`here`](https://github.com/Ratimon/redprint-optimism-contracts-examples). Geneated contract code from the Redprint Wizard is stored here due to documentation and testing purpose.

## Installation

### with npm

We assume that you already setup your own working front-end environment and `cd` into it

```bash
cd my-project;
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