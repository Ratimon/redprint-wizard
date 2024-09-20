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
        {pathname: '/4-opchain/#4.1', title: '4.1) Deploy Proxies', navType: 'scroll'},
        {pathname: '/4-opchain/#4.2', title: '4.2) Deploy Implementations', navType: 'scroll'},
        {pathname: '/4-opchain/#4.3', title: '4.3) Initialize Implementations', navType: 'scroll'},
        {pathname: '/4-opchain/#4.3', title: '4.3) Set Fault Proof Implementation', navType: 'scroll'},
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
