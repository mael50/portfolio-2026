import { SitemapStream, streamToPromise } from 'sitemap'
import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const sitemap = new SitemapStream({
    hostname: 'https://maellaroque.fr',
  })

  const collections = [
    'content_fr',
    'content_en',
    'articles_fr',
    'articles_en',
    'projects_fr',
    'projects_en',
  ]

  const results = await Promise.all(
    collections.map((collection) => queryCollection(event, collection).all()),
  )

  const seen = new Set<string>()
  const docs = results.flat()

  for (const doc of docs) {
    const url = doc?.sitemap?.loc || doc?._path
    if (!url || seen.has(url)) continue
    seen.add(url)

    sitemap.write({
      url,
      changefreq: 'weekly',
      lastmod: doc?.updatedAt || doc?.dateModified || doc?.date,
    })
  }

  sitemap.end()

  event.node.res.setHeader('content-type', 'application/xml')
  return streamToPromise(sitemap)
})
