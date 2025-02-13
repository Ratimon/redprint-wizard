import type { PostData } from './Blog.model'
import type {Link } from '$lib/model/Link';

export async function load({ fetch }) {
	const response = await fetch('/blog/api/posts')
	const posts: PostData[] = await response.json()

    const footLinks : Link[] = [
        {pathname: '/blog/category/announcements', title: 'Features', navType: 'tab'},
        {pathname: '/blog/category/tutorials', title: 'Tutorials', navType: 'tab'},
		{pathname: '/blog/category/reports', title: 'Reports', navType: 'tab'},
        {pathname: '/', title: 'Home', navType: 'tab'},
		{pathname: '/1-governance', title: '1: Governance', navType: 'tab'},
        {pathname: '/2-superchain', title: '2: SuperChain', navType: 'tab'},
        {pathname: '/3-alt-da', title: '3: Alternate DA', navType: 'tab'},
        {pathname: '/4-opchain-proxies', title: '4: OP Chain : Proxies', navType: 'tab'},

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