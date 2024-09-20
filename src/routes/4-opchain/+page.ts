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
    ];


    const dropDownLinks : Link[] = [
        {pathname: '/4-opchain/#4.0', title: '4.0) Prerequisites', navType: 'scroll' },
        {pathname: '/4-opchain/#4.1A', title: '4.1A) OptimismPortalProxy', navType: 'scroll'},
        {pathname: '/4-opchain/#4.1B', title: '4.1B) OptimismPortal', navType: 'scroll'},
        {pathname: '/4-opchain/#4.2A', title: '4.2A) SystemConfigProxy', navType: 'scroll'},
        {pathname: '/4-opchain/#4.2B', title: '4.2B) SystemConfig', navType: 'scroll'},
        {pathname: '/4-opchain/#4.3', title: '4.3) L1ChugSplashProxy', navType: 'scroll'},
        {pathname: '/4-opchain/#4.4', title: '4.4) ResolvedDelegateProxy', navType: 'scroll'},
        {pathname: '/4-opchain/#4.5A', title: '4.5A) OptimismMintableERC20FactoryProxy', navType: 'scroll'},
        {pathname: '/4-opchain/#4.5B', title: '4.5B) OptimismMintableERC20Factory', navType: 'scroll'},
        {pathname: '/4-opchain/#4.6A', title: '4.6A) L1ERC721BridgeProxy', navType: 'scroll'},
        {pathname: '/4-opchain/#4.6B', title: '4.6B) L1ERC721Bridge', navType: 'scroll'},
        {pathname: '/4-opchain/#4.7A', title: '4.7A) DisputeGameFactoryProxy', navType: 'scroll'},
        {pathname: '/4-opchain/#4.7B', title: '4.7B) DisputeGameFactory', navType: 'scroll'},
        {pathname: '/4-opchain/#4.A', title: '4.A) L2OutputOracleProxy', navType: 'scroll'},
        {pathname: '/4-opchain/#4.B', title: '4.B) L2OutputOracle', navType: 'scroll'},
        {pathname: '/4-opchain/#4.A', title: '4.A) DelayedWETHProxy', navType: 'scroll'},
        {pathname: '/4-opchain/#4.B', title: '4.B)  DelayedWETH', navType: 'scroll'},
        {pathname: '/4-opchain/#4.A', title: '4.A) PermissionedDelayedWETHProxy', navType: 'scroll'},
        {pathname: '/4-opchain/#4.B', title: '4.B) PermissionedDelayedWETH', navType: 'scroll'},
        {pathname: '/4-opchain/#4.A', title: '4.A) AnchorStateRegistryProxy', navType: 'scroll'},
        {pathname: '/4-opchain/#4.B', title: '4.B) AnchorStateRegistry', navType: 'scroll'},
        {pathname: '/4-opchain/#all', title: 'Deploy All', navType: 'scroll'},
    ];

    const actionLink : Link = {pathname: '/blog', title: 'Read Our Blog', navType: 'tab' };

    const footLinks : Link[] = [
        {pathname: '/', title: 'Home', navType: 'tab'},
        {pathname: '/blog/3-metric-hub', title: 'Metric Hub', navType: 'tab'},
        {pathname: '/2-superchain', title: '2: SuperChain', navType: 'tab'},
        {pathname: '/3-plasmachain', title: '3: PlasmaChain', navType: 'tab'},
        {pathname: '/4-opchain', title: '4: OP Chain', navType: 'tab'},
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
