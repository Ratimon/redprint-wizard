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
        {pathname: '/3-alt-da', title: '3: Alternate DA', navType: 'tab'},
        {pathname: '/4-opchain-implementations', title: '4.2: OP Chain : Implementations', navType: 'tab'},
    ];

    const dropDownLinks : Link[] = [
        {pathname: '/4-opchain-proxies/#4.1', title: '4.0 : Prerequisites', navType: 'scroll' },
        {pathname: '/4-opchain-proxies/#all', title: 'Deploy All', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1A', title: '4.1A', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1B', title: '4.1B', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1C', title: '4.1C', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1D', title: '4.1D', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1E', title: '4.1E', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1F', title: '4.1F', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1G', title: '4.1G', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1H', title: '4.1H', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1I', title: '4.1I', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1J', title: '4.1J', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1K', title: '4.1K', navType: 'scroll'},
        {pathname: '/4-opchain-proxies/#4.1L', title: '4.1L', navType: 'scroll'},
    ];

    const actionLink : Link = {pathname: '/blog', title: 'Read Our Blog', navType: 'tab' };

    const footLinks : Link[] = [
        {pathname: '/', title: 'Home', navType: 'tab'},
        {pathname: '/blog/3-metric-hub', title: 'Metric Hub', navType: 'tab'},
        {pathname: '/2-superchain', title: '2: SuperChain', navType: 'tab'},
        {pathname: '/3-alt-da', title: '3: Alternate DA', navType: 'tab'},
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
