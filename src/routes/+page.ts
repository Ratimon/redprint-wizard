import type {Link } from '$lib/model/Link';
import type { MetaTagsProps } from 'svelte-meta-tags';
import {appName, appDescription} from 'web-config';

export function load() {
    const pageMetaTags = Object.freeze({
        title: appName,
        titleTemplate: '%s | OPStack Deployer',
        description: appDescription,
        openGraph: {
            title: appName,
            description: appDescription,
        },
    }) satisfies MetaTagsProps;

    const headLinks : Link[] = [
        {pathname: '#solution', title: 'Features', navType: 'scroll'},
        {pathname: '#resource', title: 'Resources' , navType: 'scroll'},
        {pathname: '/blog/0-metric-hub', title: 'Metric Hub', navType: 'tab'},
        {pathname: '#contact', title: 'Contact Us', navType: 'scroll'},
    ];

    const dropDownLinks : Link[] = [
        {pathname: '/blog/1-introduce-forge', title: 'redprint-forge 101', navType: 'tab' },
        {pathname: '/blog/2-introduce-wizard', title: 'Wizard 101', navType: 'tab'},
        {pathname: '/blog/6-contract-explainer-bridges', title: 'OP Stack Bridges 101', navType: 'tab'},
        {pathname: '/blog/7-contract-explainer-proxy', title: 'OP Stack Proxies 101', navType: 'tab'},
    ];
    
    const actionLink : Link = {pathname: '/blog', title: 'Blog', navType: 'tab' };

    const footLinks : Link[] = [
        {pathname: '#solution', title: 'Features', navType: 'scroll'},
        {pathname: '#testimonial', title: 'Testimonials', navType: 'scroll'},
        {pathname: '#resource', title: 'Resources', navType: 'scroll'},
        {pathname: '#contact', title: 'Contact Us', navType: 'scroll'},
        {pathname: '/blog/0-metric-hub', title: 'Metric Hub', navType: 'tab'},
        {pathname: '/blog/1-introduce-forge', title: 'redprint-forge', navType: 'tab'},
        {pathname: '/blog/2-introduce-wizard', title: 'Redprint Wizard', navType: 'tab'},
        {pathname: '/', title: 'Home', navType: 'tab'},
        {pathname: '/2-superchain', title: '2: Super Chain', navType: 'tab'},
        {pathname: '/3-alt-da', title: '3: Alternate DA', navType: 'tab'},
        {pathname: '/4-opchain-proxies', title: '4: OP Chain : Proxies', navType: 'tab'},
    ];

	return {
        pageMetaTags: pageMetaTags,
		headLinks: headLinks,
        menuTitle: "Tutorials",
        dropDownLinks: dropDownLinks,
        actionLink: actionLink,
        footLinks: footLinks,
        stepsHidden: false
	};
}
