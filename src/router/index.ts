import { createRouter, createWebHistory } from 'vue-router'

interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly VITE_API_KEY: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_IMAGE_URL: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const routes = [
  {
    path: '/',
    name: 'Início',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Início - Capela Santa Maria das Vitórias',
      description: 'Bem-vindo à página inicial da Capela Santa Maria das Vitórias.',
      image: '/home-share-image.jpg',
    },
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: 'Sobre - Capela Santa Maria das Vitórias',
      description: 'Saiba mais sobre a história da Capela Santa Maria das Vitórias.',
      image: '/about-share-image.jpg',
    },
  },
  {
    path: '/padroeiros',
    name: 'Patronos',
    component: () => import('@/views/PadroeirosView.vue'),
    meta: {
      title: 'Padroeiros - Capela Santa Maria das Vitórias',
      description: 'Conheça os padroeiros da Capela Santa Maria das Vitórias.',
      image: '/patronos-share-image.jpg',
    },
  },
  {
    path: '/liturgia',
    name: 'Liturgia',
    component: () => import('@/views/LiturgiaView.vue'),
    meta: {
      title: 'Liturgia - Capela Santa Maria das Vitórias',
      description: 'Acompanhe a liturgia da Capela Santa Maria das Vitórias.',
      image: '/liturgia-share-image.jpg',
    },
  },
  {
    path: '/politica-de-privacidade',
    name: 'Política de Privacidade',
    component: () => import('@/views/PoliticaView.vue'),
    meta: {
      title: 'Política de Privacidade - Capela Santa Maria das Vitórias',
      description: 'Leia nossa política de privacidade.',
      image: '/privacy-policy-share-image.jpg',
    },
  },
  {
    path: '/carta-dos-cardeais-ottaviani-e-bacci-contra-a-promulgacao-da-missa-nova',
    name: 'Carta dos Cardeais Ottaviani e Bacci',
    component: () => import('@/views/CartaView.vue'),
    meta: {
      title: 'Carta dos Cardeais Ottaviani e Bacci - Capela Santa Maria das Vitórias',
      description: 'Leia a carta dos Cardeais Ottaviani e Bacci contra a promulgação da Missa Nova.',
      image: '/carta-share-image.jpg',
    },
  },
  {
    path: '/artigos',
    name: 'Artigos',
    component:  () => import('@/views/Articles/Index.vue'),
    props: true,
  },
  {
    path: '/projetos',
    name: 'Projetos',
    component:  () => import('@/views/ComingView.vue'),
    props: true,
  },
  {
    path: '/suma-teologica',
    name: 'Suma Teologica',
    component:  () => import('@/views/ComingView.vue'),
    props: true,
  },
  {
    path: '/fotos',
    name: 'Fotos',
    component:  () => import('@/views/ComingView.vue'),
    props: true,
  },
  {
    path: '/artigos/:categoria',
    name: 'Categoria',
    component:  () => import('@/views/Articles/CategoryView.vue'),
    props: true,
  },
  {
    path: '/artigos/:categoria/:slug',
    name: 'Artigo',
    component:  () => import('@/views/Articles/ArticleView.vue'),
    props: (route: { params: { categoria: any; slug: any; }; }) => ({ categoria: route.params.categoria, slug: route.params.slug }),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
