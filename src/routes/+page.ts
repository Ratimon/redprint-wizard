import type {Link } from '$lib/model/Link';

export function load() {

    const headLinks : Link[] = [
        {pathname: '#solution', title: 'Features', navType: 'scroll'},
        {pathname: '#resource', title: 'Resources' , navType: 'scroll'},
        {pathname: '#contact', title: 'Contact Us', navType: 'scroll'},
    ];

    const dropDownLinks : Link[] = [
        {pathname: '/blog/1-introduce-forge', title: 'Custom Gas Token', navType: 'tab' },
        {pathname: '/blog/2-introduce-wizard', title: 'Custom Bridge', navType: 'tab'},
    ];
    
    const actionLink : Link = {pathname: '/blog', title: 'Read Our Blog', navType: 'tab' };


    const footLinks : Link[] = [
        {pathname: '#solution', title: 'Features', navType: 'scroll'},
        {pathname: '#resource', title: 'Resources', navType: 'scroll'},
        {pathname: '#contact', title: 'Contact Us', navType: 'scroll'},
        {pathname: '/blog/1-introduce-forge', title: 'Feature: Custom Gas Token', navType: 'tab'},
        {pathname: '/blog/2-introduce-wizard', title: 'Feature: Custom Bridge', navType: 'tab'},
        {pathname: '/', title: 'Home', navType: 'tab'},
        {pathname: '/2-superchain', title: '2: SuperChain', navType: 'tab'},
        {pathname: '/3-plasmachain', title: '3: PlasmaChain', navType: 'tab'},
        {pathname: '/4-opchain', title: '4: OP Chain', navType: 'tab'},

    ];

	return {
		headLinks: headLinks,
        menuTitle: "Try these Features!!",
        dropDownLinks: dropDownLinks,
        actionLink: actionLink,
        footLinks: footLinks,
        // stepsHidden: true
	};
}
