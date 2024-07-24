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
        images: [
          {
            url: 'https://github.com/Ratimon/redprint-wizard/blob/main/static/icon.png',
            alt: 'Redprint Wizard Logo',
            width: 512,
            height: 512,
            secureUrl: 'https://github.com/Ratimon/redprint-wizard/blob/main/static/icon.png',
            type: 'image/jpeg'
          },
          {
            url: 'https://github.com/Ratimon/redprint-wizard/blob/main/static/blog/1-introduce-forge/header.png',
            alt: 'redprint-forge',
            width: 1280,
            height: 720,
            secureUrl: 'https://github.com/Ratimon/redprint-wizard/blob/main/static/blog/1-introduce-forge/header.png',
            type: 'image/jpeg'
          },
          {
            url: 'https://github.com/Ratimon/redprint-wizard/blob/main/static/blog/2-introduce-wizard/header.png',
            alt: 'Redprint Wizard',
            width: 1280,
            height: 720,
            secureUrl: 'https://github.com/Ratimon/redprint-wizard/blob/main/static/blog/2-introduce-wizard/header.png',
            type: 'image/jpeg'
          }
        ],
      },
      // to do
      twitter: {
        handle: 'RATi_MOn',
        site: 'https://twitter.com/RATi_MOn',
        title: appName,
        description: appDescription,
        image: '/icon.png',
        imageAlt: 'Redprint Wizars'
      }
    }) satisfies MetaTagsProps;
  
    return {
      baseMetaTags
    };
  };