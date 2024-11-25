---
title: Impacts & Metric Hub
description: A page contatining all sources of truth, relevant to impacts of Redprint Wizard to public goods
date: '2023-8-31'
categories:
  - reports
author:
  - 'Rati'
published: true
imgSrc: /blog/3-metric-hub/header.webp
imgAlt: Metric Hub
---

# Impact & Metric Measurement

To align with Optimism’s value (` impact=profit`), we have refered to the below framework which the Foundation applies in order to categorize different types of impact.

<img data-pagefind-meta="image[src]" width="5085" height="776" alt="upstream and downstream" decoding="async" loading="eager" class="mt-4 border rounded bg-cover bg-center bg-no-repeat transform will-change-auto" src="3-metric-hub/contributions.webp" />

They are both `upstream` or `downstream` of Optimism blockspace.

## Upstream
By definition, upstream contributions improve Optimism or OPStack itself.

In our case, `Redprint Toolkit`'s contribution aids in **usability** and **accessibility** of the OPStack, and it could, according to [Retro Funding 5: OP Stack - round details](https://gov.optimism.io/t/retro-funding-5-op-stack-round-details/8612/1), be fall into [Category 3: OP Stack Tooling](https://gov.optimism.io/t/retro-funding-5-op-stack-round-details/8612).

This toolset aims in development and deployment, tailored for **OPStack**, NOT general smart contract. 

The justifications are as follows:

### 1. Redprint Wizard
The `Redprint Wizard` can be thought as an interactive technical documentation and step-by-step tutorials to deploy OPStack components.

#### Metrics 's sources of truth
The key metrics indicating **accessibility** and **usability** of the OPStack are:

1. **Feedback/ Testimonials**

These are some of testimonials we have collected:

- From `Billy191`: Founder @[catalyzt.tech](https://catalyzt.tech/)/ 𝕏 Handle : [@billy191](https://x.com/billy191)

> `I was really looking for a way to avoid spending countless hours poring over OP Stack's documentation and analyzing audit reports.` That’s when I discovered Redprint, and it has truly transformed my experience. As a developer, I appreciate how its visualization is not only simple but also intuitive, making complex concepts easy to understand at a glance. Redprint has streamlined my workflow, allowing me to focus on building rather than getting lost in documentation. It’s been a game-changer for me!

<img data-pagefind-meta="image[src]" width="320" height="320" alt="Bio" decoding="async" loading="eager" class="mt-4 border rounded bg-cover bg-center bg-no-repeat transform will-change-auto" src="../testimonials/1_bio.webp" />

- From `wit03.eth`: Founder @[RetroPGF Hub](https://retropgfhub.com/) / 𝕏 Handle : [@witjarukit](https://x.com/witjarukit)

> `Redprint accelerates the way I build on OPStack.` With an innovative interactive UI, I can easily setup and deploy contracts on OP.

<img data-pagefind-meta="image[src]" width="320" height="320" alt="Bio" decoding="async" loading="eager" class="mt-4 border rounded bg-cover bg-center bg-no-repeat transform will-change-auto" src="../testimonials/2_bio.webp" />

- From `Teraflops-droid`: Software Engineer @ Accenture Thailand

> `Redprint makes building on OPStack quicker and easier for blockchain developers.` With clear, user-friendly documentation, it simplifies the process of setting up and deploying contracts.

<img data-pagefind-meta="image[src]" width="320" height="320" alt="Bio" decoding="async" loading="eager" class="mt-4 border rounded bg-cover bg-center bg-no-repeat transform will-change-auto" src="../testimonials/3_bio.webp" />

> **Note**💡
> We use **senja.io** to collect the the testimonial. They can be checked at following links
- [Billy191 's](https://senja.io/p/redprint/t/717b4ce1-716d-46df-8389-2010639a89af).
- [wit03.eth 's](https://senja.io/p/redprint/t/a61ee842-a4f6-4686-8b5d-f7d7b582de93).
- [Teraflops-droid 's](https://senja.io/p/redprint/t/e5433f72-8010-4b11-a4a4-02e2260fb1a7).



2. **Number of Monthly Visitor**: the number of developers who come to experiment our interactive turorial. It indicates **accessibility** of The OPStack.

This figure can be represented by GA's `page_view` events. It was 635 views in July, and this event can be grouped into different OPStack components. They are :

- `Set up Governance Layer | Redprint Wizard` page
- `Set up Super Chain | Redprint Wizard` page
- `Set up Plasma Chain | Redprint Wizard` page
- `Set up OP Chain | Redprint Wizard` page

> **Note**💡
> These figures can be checked in [reports/](https://github.com/Ratimon/redprint-wizard/tree/main/reports/) directory.

3. **Number of Link Clicks Toward the Code copy button** : the number of developers who come to experiment our interactive turorial. It shows **usability** of our tool to **modify** OPStack components.

4. **Number of Downloaded code as zip file** : the number of developers who use our generated contract. It suggests **usability** of our tool to **deploy** OPStack components.

These figures can be represented by GA's  custoizrd events. They are :
- `copy-contract-Safe`
- `copy-contract-Governor`
- `copy-script-Safe`
- `copy-script-Governor`

> **Note**💡
> All events can be found in in [lib/analytics/analytics.Store.ts](https://github.com/Ratimon/redprint-wizard/blob/main/src/lib/analytics/analytics.Store.ts#L5).

> **Note**💡
> The convention is : `<event_name>`-`<contract_kind>`-`<contract_name>`

> `<event_name>` could be either `copy` or `downloadd`
> `<contract_kind>` could be either `contract` or `script`

5. **Number of visitors to our technical articles in our blog** : The number of views on our blog/turorial. It indicates **accessibility** of The OPStack tool.

<img data-pagefind-meta="image[src]" width="1120" height="1120" alt="GA Metrics" decoding="async" loading="eager" class="mt-4 border rounded bg-cover bg-center bg-no-repeat transform will-change-auto" src="3-metric-hub/page-title.webp" />

This metric can be represented by GA's  events which are named by blog title For instance, they are :

- `Introducing Redprint Wizard` [page](https://redprint.ninja/blog/1-introduce-forge)
- `Introducing redprint-forge	` [page](https://redprint.ninja/blog/2-introduce-wizard)

> **Note**💡
> These figures can be checked at Google Analytics 's Reports e.g. [July](https://analytics.google.com/analytics/web/#/p450975503/reports/reportinghub?params=_u.comparisonOption%3Ddisabled%26_u.date00%3D20240701%26_u.date01%3D20240731%26_u..nav%3Dmaui&collectionId=business-objectives) and [August](https://analytics.google.com/analytics/web/#/p450975503/reports/reportinghub?params=_u.comparisonOption%3Ddisabled%26_u.date00%3D20240801%26_u.date01%3D20240831%26_u..nav%3Dmaui&collectionId=business-objectives)

> Projects launced before, but data collected for only 2 months


### 2. redprint-forge
The `redprint-forge` is a **deployer library** that facilitate the OPStack's contract deployment, and contract testing.

Our aim is to support different implementation of **OPStack Deployer**.

#### Problem Statement + Context
Some text copied from [OPStack 's design- 52](https://github.com/ethereum-optimism/design-docs/pull/52)

> The current L2 chain deployment approach originates from a time with Hardhat, single L1 target, and a single monolithic set of features.
> Since then the system has migrated to Foundry and extended for more features, but remains centered around a single monolithic deploy-config for all its features.
>
> Outside of interop, deployment also seems increasingly complex and opaque, while it does not have to be, due to the same configuration and composability troubles.

Our solution involves restructuring OPStack's [`DeploySuperchain`]([`Deploy.s.sol`](https://github.com/ethereum-optimism/optimism/blob/abfc1e1f37a89405bacd08a3bb6363250d3f68f5/packages/contracts-bedrock/scripts/Deploy.s.sol).).

You can see how `redprint-forge` lib tackles the problem by simplifying deployment and testing pipeline at this [Demo](https://github.com/Ratimon/redprint-optimism-contracts-examples/blob/main/README.md?plain=1#L53-L151)

Therefore, this suggests alignment with Collective Intent 1 **“Progress towards technical decentralization”** due to different deployer implementations by different team.

#### Metrics 's sources of truth

1. **Version Releases**

Now, the versions release are at `v0.2.x`. In short, we have two working component (Governance and superchain) (out of four).

The relevant links are:
- [Github's Version Released](https://github.com/Ratimon/redprint-forge/releases/tag/v0.2.1)
- [Github's Closed Milestones](https://github.com/Ratimon/redprint-forge/milestones?state=closed)

2. **Number of Github repo likes**

[redprint-forge's Repo Link](https://github.com/Ratimon/redprint-forge)

3. **Number of code repo forks**

[redprint-forge's Repo Link](https://github.com/Ratimon/redprint-forge)

4. **Number of npm packages downloaded**

[redprint-forge's Package Link](https://www.npmjs.com/package/redprint-forge)

These figures (2, 3 ,and 4) can represent **accessibility** and **usability** of the OPStack.


## Downstream [WIP]
On the other hand, downstream contributions improve the experience of Optimism users, such as builders.

Our tool also simplifies the complex **OPStack** smart contract deployment process & practice. Therefore, the developer can  even use OP mainnet as a base chain and ,then deploy their own rollup/ Appchain as a layer 2/3. This is aligned with Collective Intent: **Collective Intent 2 “Grow the Superchain”**  by bringing different layer 2 (s) or even layer 3 (s) out of the Ethereum base layer.

### 1. redprint-forge

#### Metrics 's sources of truth

1. **Number of Github repo likes**
[redprint-forge's Repo Link](https://github.com/Ratimon/redprint-forge)

2. **Number of code repo forks**
[redprint-forge'sRepo Link](https://github.com/Ratimon/redprint-forge)

3. **Number of npm packages downloaded**
[redprint-forge's Package Link](https://www.npmjs.com/package/redprint-forge)

### 2. Redprint Wizard

#### Metrics 's sources of truth

1. **Number of Github repo likes**
[Redprint Wizard's Repo Link](https://github.com/Ratimon/redprint-wizard)

2. **Number of code repo forks**
[Redprint Wizard's Repo Link](https://github.com/Ratimon/redprint-wizard)

3. **Number of npm packages downloaded**
[Redprint Wizard's Package Link](https://www.npmjs.com/package/redprint-wizard)