<script lang="ts" >
    import type { PageData } from "./$types";
    import type {Link } from '$lib/model/Link';

    import '../app.postcss';
    import {url} from '$lib/utils/path';
	import {appName, themeColor, appleStatusBarStyle} from 'web-config';
    import { PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID } from '$env/static/public'

    import { MetaTags } from 'svelte-meta-tags';
    import { page } from '$app/stores';
    import extend from 'just-extend';

    import Background from '$lib/ui/background/Background.svelte';
    import Header from '$lib/ui/templates/Header.svelte';
    import Footer from '$lib/ui/templates/Footer.svelte';
    import GaAnalytics from '$lib/analytics/GaAnalytics.svelte';

    // only 'tab'
    const fallbackHeadLinks : Link[] = [
    {pathname: '/', title: 'Home', navType: 'tab'},
    ];

    const fallbackMenuTitle: string = 'Blog'

    const fallbackDropDownLinks : Link[] = [
    {pathname: '/blog/category/announcements', title: 'Announcements', navType: 'tab'},
    {pathname: '/blog/category/tutorials', title: 'Tutorials', navType: 'tab'},
    ];

    // only 'tab'
    const fallbackFootLinks : Link[] = [
    {pathname: '/', title: 'Home', navType: 'tab'},
    {pathname: '/blog/1-introduce-forge', title: 'Introduce Forge', navType: 'tab'},
	{pathname: '/blog/2-introduce-wizard', title: 'Introduce Wizard', navType: 'tab'},
    ];


    export let data : PageData;
    $: metaTags = extend(true, {}, data.baseMetaTags, $page.data.pageMetaTags);

    // to do : private?
    let MEASUREMENT_ID = PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID;

</script>

<MetaTags
    {...metaTags}
    
    additionalLinkTags={[
        {
        rel: 'icon',
        href: url('/pwa/favicon.svg'),
        },
        {
        rel: 'icon',
        href: url('/pwa/favicon.svg'),
        sizes: "any" //  32×32
        },
        {
        rel: 'apple-touch-icon',
        href: url('/pwa/apple-touch-icon.png')
        },
        {
        rel: 'manifest',
        href: url('/pwa/manifest.webmanifest')
        }
    ]}

    additionalMetaTags={[
        // extra info
        {
        name: "theme-color",
        content: themeColor
        },
        {
        name: 'mobile-web-app-capable',
        content: 'yes'
        },
        {
        name: 'application-name',
        content: appName
        },
        // apple
        {
        name: "apple-mobile-web-app-capable",
        content: 'yes'
        },
        {
        name: 'apple-mobile-web-app-status-bar-style',
        content: appleStatusBarStyle
        },
        {
        name: 'apple-mobile-web-app-title',
        content: appName
        }
    ]}
    >
</MetaTags>

<Background color='bg-base-200'>    

    <!-- to do : see edge case -->
    {#if $page.data.headLinks && $page.data.actionLink }
        <Header links={$page.data.headLinks} menuTitle={$page.data.menuTitle} dropDownLinks={$page.data.dropDownLinks} actionLink={$page.data.actionLink} ></Header>
    {:else}
        <Header links={fallbackHeadLinks} menuTitle={fallbackMenuTitle} dropDownLinks={fallbackDropDownLinks} actionLink={fallbackHeadLinks[0]} ></Header>
    {/if}

</Background>

{#if  !$page.data.stepsHidden }

<!-- {#if  stepsHidden || $page.data.stepsHidden } -->
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
{/if}

<slot />

{#if $page.data.footLinks}
    <Footer links={$page.data.footLinks}></Footer>
{:else}
    <Footer links={fallbackFootLinks}></Footer>
{/if}

<GaAnalytics {MEASUREMENT_ID} />