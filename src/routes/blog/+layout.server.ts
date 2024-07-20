import type { PostData } from './Blog.model'
import type {Link } from '$lib/model/Link';


export async function load({ fetch }) {
	const response = await fetch('/blog/api/posts')
	const posts: PostData[] = await response.json()

    const footLinks : Link[] = [
        {pathname: '#solution', title: 'Features', navType: 'scroll'},
        {pathname: '#resource', title: 'Resources', navType: 'scroll'},
        {pathname: '#contact', title: 'Contact Us', navType: 'scroll'},
        {pathname: '/blog/category/announcments', title: 'Features', navType: 'tab'},
        {pathname: '/blog/category/tutorials', title: 'Tutorials', navType: 'tab'},
        {pathname: '/', title: 'Home', navType: 'tab'},
        {pathname: '/2-superchain', title: '2: SuperChain', navType: 'tab'},
        {pathname: '/3-plasmachain', title: '3: PlasmaChain', navType: 'tab'},
        {pathname: '/4-opchain', title: '4: OP Chain', navType: 'tab'},

    ];

	const headLinks  : Link[] = [
		{pathname: '/blog', title: 'All Posts', navType: 'tab'},
	  ];
	
	const dropDownLinks  : Link[] = [
        {pathname: '/blog/category/announcments', title: 'Features', navType: 'tab'},
        {pathname: '/blog/category/tutorials', title: 'Tutorials', navType: 'tab'},
	];
	

	return {
		headLinks: headLinks,
		// menuTitle: "Blog",
        dropDownLinks: dropDownLinks,
        footLinks: footLinks,
		posts: posts,
		stepsHidden: true

	}
}