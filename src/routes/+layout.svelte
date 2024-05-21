<script>
    import '../app.postcss';
    import {url} from '$lib/utils/path';
	import {appName, appDescription, themeColor, appleStatusBarStyle} from 'web-config';

    // import type { PageData } from "./$types";
    import { page } from '$app/stores';

    import Header from './Header.svelte';

    const headLinks = [
    {pathname: '#about', title: 'ABOUT US'},
    {pathname: '#source', title: 'SOURCECODE'},
    {pathname: '#redprimt-forge', title: 'redprint-forge'},
    ];

    const featureLinks = [
    {pathname: '/features/custom-gas-token', title: 'Custom Gas Token'},
	{pathname: '/features/custom-bridge', title: 'Custom Bridge'},
    ];

</script>

<svelte:head>
	<title>{appName}</title>
	<meta name="title" content={appName} />
	<meta name="description" content={appDescription} />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={appName} />
	<meta property="og:description" content={appDescription} />
	<meta property="twitter:title" content={appName} />
	<meta property="twitter:description" content={appDescription} />

	<!-- minimal -->
	<!-- TODO automatise -->
	<link rel="icon" href={url('/pwa/favicon.svg')} type="image/svg+xml" />
	<link rel="icon" href={url('/pwa/favicon.ico')} sizes="any" /><!-- 32×32 -->
	<link rel="apple-touch-icon" href={url('/pwa/apple-touch-icon.png')} /><!-- 180×180 -->
  	<link rel="manifest" href={url('/pwa/manifest.webmanifest')} />

	<!-- extra info -->
	<meta name="theme-color" content={themeColor} />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="application-name" content={appName} />

	<!-- apple -->
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content={appleStatusBarStyle} />
	<meta name="apple-mobile-web-app-title" content={appName} />
</svelte:head>

<Header links={headLinks} featureLinks={featureLinks} class="bg-base-200 "></Header>
  

<nav class="flex justify-center my-4">

    <ul class="steps">

        <a href="/1-governance" class="step step-primary">
            Set up Governance Layer
        </a>

        <a href="/2-super-chain"
            class="step"
            class:step-primary={$page.route.id?.match(/2-super-chain|3-plasma-chain|4-op-chain/g)}
            > 
            Set up L1 Super Chain
        </a>

        <a href="/3-plasma-chain"
            class="step"
            class:step-primary={$page.route.id?.match(/3-plasma-chain|4-op-chain/g)}
        >
            Set up Plasma Chain
        </a>

        <a href="/4-op-chain"
            class="step"
            class:step-primary={$page.route.id?.includes("/4-op-chain")}
            >
            Set up L2 OP Chain
         </a>

    </ul>

</nav>

<!-- <div class="min-h-full flex flex-col">
</div> -->

<slot />