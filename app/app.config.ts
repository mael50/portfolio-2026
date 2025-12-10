export default defineAppConfig({
  global: {
    meetingLink: 'https://cal.com/mael-laroque',
    available: true,
  },
  profile: {
    name: 'Maël Laroque',
    job: 'Développeur Web Freelance & Expert Technique',
    email: 'contact@maellaroque.fr',
    phone: '07 69 71 17 62',
    picture: '/assets/picture.jpg',
  },
  socials: {
    github: 'https://github.com/mael50',
    linkedin: 'https://www.linkedin.com/in/ma%C3%ABl-laroque-3884281bb/',
  },
  seo: {
    title: 'Maël Laroque - Développeur Web Freelance',
    description: 'Portfolio de Maël Laroque, Développeur Web Freelance spécialisé en SaaS, E-commerce et sites vitrines. Conception, déploiement et maintenance de projets web.',
    url: 'https://maellaroque.fr',
  },
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'neutral',
    },
    notifications: {
      position: 'top-0 bottom-auto',
    },
    notification: {
      progress: {
        base: 'absolute bottom-0 end-0 start-0 h-0',
        background: 'bg-transparent dark:bg-transparent',
      },
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
      defaultVariants: {
        color: 'neutral',
      },
    },
    input: {
      defaultVariants: {
        color: 'neutral',
      },
    },
    textarea: {
      defaultVariants: {
        color: 'neutral',
      },
    },
    icons: {
      loading: 'lucide:loader',
    },
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
})
