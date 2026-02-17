import { defineContentConfig, defineCollection, z } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'

const basePageSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
})

const projectSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  link: z.string().optional(),
  release: z.string().optional(),
  featured: z.boolean().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  about_client: z.string().optional(),
  about_project: z.string().optional(),
  industry: z.string().optional(),
  role: z.string().optional(),
  services: z.array(z.string()).optional(),
  highlights: z.array(z.string()).optional(),
  results: z.array(z.string()).optional(),
  gallery: z.array(z.string()).optional(),
  stack: z.array(z.string()).optional(),
})

const faqSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(
    z.object({
      label: z.string(),
      content: z.string(),
    }),
  ).optional(),
})

const stackSchema = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      link: z.string().optional(),
      icon: z.string().optional(),
    }),
  ).optional(),
})

export default defineContentConfig({
  collections: {
    content_fr: asSitemapCollection(defineCollection({
      type: 'page',
      source: 'fr/*.md',
      schema: basePageSchema,
    })),
    content_en: asSitemapCollection(defineCollection({
      type: 'page',
      source: 'en/*.md',
      schema: basePageSchema,
    })),
    articles_fr: asSitemapCollection(defineCollection({
      type: 'page',
      source: 'fr/articles/*.md',
      schema: basePageSchema,
    })),
    articles_en: asSitemapCollection(defineCollection({
      type: 'page',
      source: 'en/articles/*.md',
      schema: basePageSchema,
    })),
    projects_fr: asSitemapCollection(defineCollection({
      type: 'page',
      source: 'fr/projects/*.json',
      schema: projectSchema,
    })),
    projects_en: asSitemapCollection(defineCollection({
      type: 'page',
      source: 'en/projects/*.json',
      schema: projectSchema,
    })),
    faq_fr: defineCollection({
      type: 'data',
      source: 'fr/faq.json',
      schema: faqSchema,
    }),
    faq_en: defineCollection({
      type: 'data',
      source: 'en/faq.json',
      schema: faqSchema,
    }),
    stack: defineCollection({
      type: 'data',
      source: 'stack.json',
      schema: stackSchema,
    }),
  },
})
