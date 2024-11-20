import type {Link } from '$lib/model/Link';
import type { MetaTagsProps } from 'svelte-meta-tags';
import {appName} from 'web-config';

export function load() {

    const title = "Set up OP Chain";
    const description = "Deploy and set up OP Chain";

    const pageMetaTags = Object.freeze({
        title: title,
        titleTemplate: `%s | ${appName}`,
        description: description,
        openGraph: {
            title: title,
            description: description,
        },
    }) satisfies MetaTagsProps;

    const headLinks : Link[] = [
        {pathname: '/', title: 'Home', navType: 'tab'},
        {pathname: '/4-opchain-proxies', title: '4.1: OP Chain : Proxies', navType: 'tab'},
    ];

    const dropDownLinks : Link[] = [
        {pathname: '/4-opchain-implementations/#4.2', title: '4.2) Prerequisites', navType: 'scroll' },
        {pathname: '/4-opchain-implementations/#4.2A', title: '4.2A) L1CrossDomainMessenger', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2B', title: '4.2B) OptimismMintableERC20Factory', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2C', title: '4.2C) SystemConfig', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2D', title: '4.2D) L1StandardBridge', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2E', title: '4.2E) L1ERC721Bridge', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2F', title: '4.2F) OptimismPortal', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2G', title: '4.2G) L2OutputOracle', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2H', title: '4.2H) OptimismPortal2', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2I', title: '4.2I) DisputeGameFactory', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2J', title: '4.2J) DelayedWETH', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2K', title: '4.2K) PreimageOracle', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2L', title: '4.2L) MIPS', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#all', title: 'Deploy All', navType: 'scroll'},
    ];

    const actionLink : Link = {pathname: '/blog', title: 'Read Our Blog', navType: 'tab' };

    const footLinks : Link[] = [
        {pathname: '/', title: 'Home', navType: 'tab'},
        {pathname: '/blog/3-metric-hub', title: 'Metric Hub', navType: 'tab'},
        {pathname: '/2-superchain', title: '2: SuperChain', navType: 'tab'},
        {pathname: '/3-plasmachain', title: '3: PlasmaChain', navType: 'tab'},
        {pathname: '/4-opchain-proxies', title: '4.1: OP Chain : Proxies', navType: 'tab'},
        {pathname: '/4-opchain-implementations', title: '4.2: OP Chain : Implementations', navType: 'tab'},
    ];

	return {
        pageMetaTags: pageMetaTags,
		headLinks: headLinks,
        menuTitle: "Steps",
        dropDownLinks: dropDownLinks,
        actionLink: actionLink,
        footLinks: footLinks
	};
}
