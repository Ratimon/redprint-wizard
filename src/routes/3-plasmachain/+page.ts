import type {Link } from '$lib/model/Link';
import type { MetaTagsProps } from 'svelte-meta-tags';
import {appName} from 'web-config';

export function load() {

    const title = "Set up Plasma Chain";
    const description = "Deploy and set up Plasma Chain";

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
        {pathname: '/2-superchain', title: '2: SuperChain', navType: 'tab'},
        {pathname: '/4-opchain-proxies', title: '4.1: OP Chain : Proxies', navType: 'tab'},
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
        // menuTitle: "Blog",
        // dropDownLinks: categoryLinks,
        actionLink: actionLink,
        footLinks: footLinks
	};
}
