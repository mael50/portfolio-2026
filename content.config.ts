import { defineCollection, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

const commonContentSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.string().optional(),
  path: z.string().optional(),
})

const commonArticleSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  image: z.string().min(1),
  readingTime: z.string().min(1),
  tags: z.array(z.string().min(1)),
  path: z.string().optional(),
})

const commonProjectSchema = z.object({
  name: z.string().min(1),
  image: z.string(),
  link: z.string(),
  release: z.string().min(1),
  date: z.string().min(1),
  featured: z.boolean().optional(),
  description: z.string().optional(),
  about_client: z.string().optional(),
  about_project: z.string().optional(),
  gallery: z.array(z.string()).optional(),
})

const commonFaqSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  items: z.array(
    z.object({
      label: z.string().min(1),
      content: z.string().min(1),
    }),
  ),
})

export const collections = {
  content_en: defineCollection({
    type: 'page',
    source: {
      include: 'en/**/*.md',
      exclude: ['en/articles/*.md'],
    },
    schema: commonContentSchema,
  }),
  content_fr: defineCollection({
    type: 'page',
    source: {
      include: 'fr/**/*.md',
      exclude: ['fr/articles/*.md'],
    },
    schema: commonContentSchema,
  }),
  articles_en: defineCollection({
    type: 'page',
    source: {
      include: 'en/articles/*.md',
    },
    schema: commonArticleSchema,
  }),
  articles_fr: defineCollection({
    type: 'page',
    source: {
      include: 'fr/articles/*.md',
    },
    schema: commonArticleSchema,
  }),
  projects_en: defineCollection({
    type: 'data',
    source: 'en/projects/*.json',
    schema: commonProjectSchema,
  }),
  projects_fr: defineCollection({
    type: 'data',
    source: 'fr/projects/*.json',
    schema: commonProjectSchema,
  }),
  stack: defineCollection({
    type: 'data',
    source: 'stack.json',
    schema: z.object({
      items: z.array(
        z.object({
          name: z.string().min(1),
          link: z.string(),
          icon: z.string().min(1),
        }),
      ),
    }),
  }),
  faq_en: defineCollection({
    type: 'data',
    source: 'en/faq.json',
    schema: commonFaqSchema,
  }),
  faq_fr: defineCollection({
    type: 'data',
    source: 'fr/faq.json',
    schema: commonFaqSchema,
  }),
}
