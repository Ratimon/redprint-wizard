<script lang="ts" >
    import '../app.postcss';
    import {url} from '$lib/utils/path';
	import {appName, appDescription, themeColor, appleStatusBarStyle} from 'web-config';

    // to do
    // import type { PageData } from "./$types";
    import { page } from '$app/stores';

    import Background from '$lib/ui/background/Background.svelte';

    import Header from '$lib/ui/templates/Header.svelte';
    import Footer from '$lib/ui/templates/Footer.svelte';

    import type {Link } from '$lib/model/Link';

    // only 'tab'
    const fallbackHeadLinks : Link[] = [
    {pathname: '/', title: 'Home', navType: 'tab'},
    ];

    const featureLinks : Link[] = [
    {pathname: '/features/custom-gas-token', title: 'Custom Gas Token', navType: 'tab' },
	{pathname: '/features/custom-bridge', title: 'Custom Bridge', navType: 'tab'},
    ];

    // only 'tab'
    const fallbackFootLinks : Link[] = [
    {pathname: '/', title: 'Home', navType: 'tab'},
    {pathname: '/features/custom-gas-token', title: 'Custom Gas Token', navType: 'tab'},
	{pathname: '/features/custom-bridge', title: 'Custom Bridge', navType: 'tab'},
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
	<!-- to do automatise -->
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


<Background color='bg-base-200'>    

    {#if $page.data.headLinks}
        <Header links={$page.data.headLinks} featureLinks={featureLinks}></Header>
    {:else}
        <Header links={fallbackHeadLinks} featureLinks={featureLinks}></Header>
    {/if}

    <!-- <Header links={$page.data.headLinks} featureLinks={featureLinks}></Header> -->

</Background>


<nav class="flex justify-center my-4">

    <ul class="steps">
        <a href="/"
            data-content="0"
            class="step step-primary"
        >
            Get Started !!
        </a>
        <a href="/1-governance"
            data-content="1"
            class="step"
            class:step-primary={$page.route.id?.match(/1-governance|2-superchain|3-plasmachain|4-opchain/g)}
        >
            Set up Governance Layer
        </a>
        <a href="/2-superchain"
            data-content="2"
            class="step"
            class:step-primary={$page.route.id?.match(/2-superchain|3-plasmachain|4-opchain/g)}
        > 
            Set up L1 Super Chain
        </a>
        <a href="/3-plasmachain"
            data-content="3"
            class="step"
            class:step-primary={$page.route.id?.match(/3-plasmachain|4-opchain/g)}
        >
            Set up Plasma Chain
        </a>
        <a href="/4-opchain"
            data-content="4"
            class="step"
            class:step-primary={$page.route.id?.includes("/4-opchain")}
            >
            Set up L2 OP Chain
         </a>
    </ul>

</nav>

<slot />

{#if $page.data.footLinks}
    <Footer links={$page.data.footLinks}></Footer>
{:else}
    <Footer links={fallbackFootLinks}></Footer>
{/if}

