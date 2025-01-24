import { env } from '$env/dynamic/private'
import { SitemapStream, streamToPromise } from 'sitemap'
export async function GET() {
  const hostname = env.SITE_URL
  const smStream = new SitemapStream({ hostname })
  const slugs = ['/1-governance', '2-superchain', '3-alt-da', '4-opchain-proxies', '4-opchain-implementations', '/blog', '/about', '/tos', '/privacy-policy']
  try {
    slugs.forEach((url) => smStream.write({ url, changefreq: 'daily', priority: 1 }))
    smStream.end()
    const sitemap = await streamToPromise(smStream)
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'text/xml',
      },
    })
  } catch (e: any) {
    const tmp = e.message || e.toString()
    console.log(tmp)
    return new Response(tmp, { status: 500 })
  }
}