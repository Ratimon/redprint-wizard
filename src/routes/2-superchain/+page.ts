import type {Link } from '$lib/model/Link';
import type { MetaTagsProps } from 'svelte-meta-tags';
import {appName} from 'web-config';

export function load() {

    const title = "Set up Super Chain";
    const description = "Deploy and set up Super Chain";

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
        {pathname: '/1-governance', title: '1: Governance', navType: 'tab'},
        {pathname: '/3-plasmachain', title: '3: PlasmaChain', navType: 'tab'},
    ];

    const dropDownLinks : Link[] = [
        {pathname: '/2-superchain/#2.0', title: '2.0) Prerequisites', navType: 'scroll' },
        {pathname: '/2-superchain/#2.1A', title: '2.1A) AddressManager', navType: 'scroll'},
        {pathname: '/2-superchain/#2.1B', title: '2.1B) ProxyAdmin', navType: 'scroll'},
        {pathname: '/2-superchain/#2.2A', title: '2.2A) SuperchainConfigProxy', navType: 'scroll'},
        {pathname: '/2-superchain/#2.2B', title: '2.2B) SuperchainConfig', navType: 'scroll'},
        {pathname: '/2-superchain/#2.3A', title: '2.3A) ProtocolVersionsProxy', navType: 'scroll'},
        {pathname: '/2-superchain/#2.3B', title: '2.3B) ProtocolVersions', navType: 'scroll'},
        {pathname: '/2-superchain/#all', title: 'Deploy All', navType: 'scroll'},
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
