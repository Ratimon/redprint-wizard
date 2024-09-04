import type { PostData } from './Blog.model'
import type {Link } from '$lib/model/Link';


export async function load({ fetch }) {
	const response = await fetch('/blog/api/posts')
	const posts: PostData[] = await response.json()

    const footLinks : Link[] = [
        {pathname: '/blog/category/announcements', title: 'Features', navType: 'tab'},
        {pathname: '/blog/category/tutorials', title: 'Tutorials', navType: 'tab'},
        {pathname: '/', title: 'Home', navType: 'tab'},
		{pathname: '/1-governance', title: '1: Governance', navType: 'tab'},
        {pathname: '/2-superchain', title: '2: SuperChain', navType: 'tab'},
        {pathname: '/3-plasmachain', title: '3: PlasmaChain', navType: 'tab'},
        {pathname: '/4-opchain', title: '4: OP Chain', navType: 'tab'},

    ];

	const headLinks  : Link[] = [
		{pathname: '/blog', title: 'All Posts', navType: 'tab'},
	  ];
	
	const dropDownLinks  : Link[] = [
        {pathname: '/blog/category/announcements', title: 'Features', navType: 'tab'},
        {pathname: '/blog/category/tutorials', title: 'Tutorials', navType: 'tab'},
	];
	

	return {
		headLinks: headLinks,
		// menuTitle: "Try Our toolkit",
        dropDownLinks: dropDownLinks,
        footLinks: footLinks,
		posts: posts,
		stepsHidden: true
	}
}