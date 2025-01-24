import { env } from '$env/dynamic/private'

export async function GET() {
  const sitemapURL = new URL('/sitemap.xml', env.SITE_URL).toString()
  const robotsTxt = ['User-agent: *', 'Disallow:\n', `Sitemap: ${sitemapURL}`]
  return new Response(robotsTxt.join('\n'), {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
