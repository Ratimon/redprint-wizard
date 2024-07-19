import type { MetaTagsProps } from 'svelte-meta-tags';
import {appName, appDescription} from 'web-config';

export const prerender = true;

export const load = ( { url} : {url:any} ) => {
    const baseMetaTags = Object.freeze({
      title: appName,
      titleTemplate: '%s | OPStack Deployer',
      description: appDescription,
      canonical: new URL(url.pathname, url.origin).href,
      openGraph: {
        type: 'website',
        url: new URL(url.pathname, url.origin).href,
        locale: 'en_IE',
        title: appName,
        description: appDescription,
        siteName: appName,
        // images: [
        //   {
        //     url: 'https://www.example.ie/og-image.jpg',
        //     alt: 'Og Image Alt',
        //     width: 800,
        //     height: 600,
        //     secureUrl: 'https://www.example.ie/og-image.jpg',
        //     type: 'image/jpeg'
        //   }
        // ],
      },
      // to do
      twitter: {
        handle: '@handle',
        site: '@site',
        title: appName,
        description: appDescription,
        image: 'https://www.example.ie/twitter-image.jpg',
        imageAlt: 'Twitter image alt'
      }
    }) satisfies MetaTagsProps;
  
    return {
      baseMetaTags
    };
  };