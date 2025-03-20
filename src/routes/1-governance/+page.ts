import type {Link } from '$lib/model/Link';
import type { MetaTagsProps } from 'svelte-meta-tags';
import {appName} from 'web-config';

export function load() {
    const title = "Set up Governance Layer";
    const description = "Deploy and set up Governance Layer";

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
    ];

    const dropDownLinks : Link[] = [
        {pathname: '/1-governance/#1.0', title: '1.0 : Prerequisites', navType: 'scroll' },
        {pathname: '/1-governance/#all', title: 'Deploy All', navType: 'scroll'},
        {pathname: '/1-governance/#1.1', title: '1.1 : Governance', navType: 'scroll'},
    ];

    const actionLink : Link = {pathname: '/blog', title: 'Blog', navType: 'tab' };

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
