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
        {pathname: '/3-plasmachain', title: '3: PlasmaChain', navType: 'tab'},
        {pathname: '/4-opchain-implementations', title: '4: OP Chain : Implementations', navType: 'tab'},
    ];

    const dropDownLinks : Link[] = [
        {pathname: '/4-opchain-proxies/#4.1', title: '4.0) Prerequisites', navType: 'scroll' },
        {pathname: '/4-opchain-proxies/#4.1A', title: '4.1A) OptimismPortalProxy ', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1B', title: '4.1B) SystemConfigProxy', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1C', title: '4.1C) L1StandardBridgeProxy', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1D', title: '4.1D) L1CrossDomainMessengerProxy', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1E', title: '4.1E) OptimismMintableERC20FactoryProxy', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1F', title: '4.1F) L1ERC721BridgeProxy', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1G', title: '4.1G) DisputeGameFactoryProxy', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1H', title: '4.1H) L2OutputOracleProxy', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1I', title: '4.1I) DelayedWETHProxy', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1J', title: '4.1J) PermissionedDelayedWETHProxy', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1K', title: '4.1K) AnchorStateRegistryProxy', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#all', title: 'Deploy All', navType: 'scroll'},
    ];

    const actionLink : Link = {pathname: '/blog', title: 'Read Our Blog', navType: 'tab' };

    const footLinks : Link[] = [
        {pathname: '/', title: 'Home', navType: 'tab'},
        {pathname: '/blog/3-metric-hub', title: 'Metric Hub', navType: 'tab'},
        {pathname: '/2-superchain', title: '2: SuperChain', navType: 'tab'},
        {pathname: '/3-plasmachain', title: '3: PlasmaChain', navType: 'tab'},
        {pathname: '/4-opchain-proxies', title: '4: OP Chain : Proxies', navType: 'tab'},
        {pathname: '/4-opchain-implementations', title: '4: OP Chain : Implementations', navType: 'tab'},   
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
