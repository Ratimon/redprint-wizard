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
        {pathname: '/4-opchain-implementations/#4.2', title: '4.2 : Prerequisites', navType: 'scroll' },
        {pathname: '/4-opchain-implementations/#all', title: 'Deploy All', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2A', title: 'Part 1 : 4.2A', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2B', title: '4.2B', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2C', title: '4.2C', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2D', title: '4.2D', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2E', title: '4.2E', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2F', title: '4.2F', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2G', title: '4.2G', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2H', title: 'Part 2 : 4.2H', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2I', title: '4.2I', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2J', title: '4.2J', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2K', title: '4.2K', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2L', title: '4.2L', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2M', title: '4.2M', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2N', title: '4.2N', navType: 'scroll'},
        {pathname: '/4-opchain-implementations/#4.2O', title: '4.2O', navType: 'scroll'},
    ];

    const actionLink : Link = {pathname: '/blog', title: 'Read Our Blog', navType: 'tab' };

    const footLinks : Link[] = [
        {pathname: '/', title: 'Home', navType: 'tab'},
        {pathname: '/blog/0-metric-hub', title: 'Metric Hub', navType: 'tab'},
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
