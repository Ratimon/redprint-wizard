interface Link {
    pathname: string;
    title: string;
    navType: NavOptions;
}

const navOptions = ['tab', 'scroll'] as const;
type NavOptions = typeof navOptions[number];

export function load() {


    const headLinks : Link[] = [
        {pathname: '/', title: 'Home', navType: 'tab'},
        {pathname: '/2-superchain', title: '2: SuperChain', navType: 'tab'},
    ];

    const footLinks : Link[] = [
        {pathname: '/', title: 'Home', navType: 'tab'},
        {pathname: '/2-superchain', title: '2: SuperChain', navType: 'tab'},
        {pathname: '/3-plasmachain', title: '3: PlasmaChain', navType: 'tab'},
        {pathname: '/4-opchain', title: '4: OP Chain', navType: 'tab'},
    ];

	return {
		headLinks: headLinks,
        footLinks: footLinks
	};
}
