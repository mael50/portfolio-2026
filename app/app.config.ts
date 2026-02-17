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
    title: 'Développeur Web Freelance à Gouville-sur-Mer & Coutances',
    description: "Développeur web freelance basé près de Gouville-sur-Mer. J'accompagne les entreprises et indépendants à Agon-Coutainville, Blainville-sur-Mer, Coutances et alentours (Manche, Normandie) : sites vitrines, e-commerce, SaaS.",
    url: 'https://maellaroque.fr',
    localAreas: [
      'Gouville-sur-Mer',
      'Agon-Coutainville',
      'Blainville-sur-Mer',
      'Coutances',
      'Hauteville-sur-Mer',
      'Pirou',
      'Anneville-sur-Mer',
      'Geffosses',
      'Gratot',
      'Brainville',
      'Montsurvent',
      'Heugueville-sur-Sienne',
      'Tourville-sur-Sienne',
      'Muneville-le-Bingard',
      'Saint-Malo-de-la-Lande',
      'Servigny',
    ],
    localRegion: 'Manche',
    localRegionCode: 'FR-50',
    localCountry: 'FR',
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
