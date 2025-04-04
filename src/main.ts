import './assets/main.scss';
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    options: {
      darkModeSelector: '.asmv-dark',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  },
  ripple: true,
  zIndex: {
    modal: 1100,
    overlay: 1000,
    menu: 1000,
    tooltip: 1100
  },
});

const defaultMeta = {
  title: 'Capela Santa Maria das Vitórias',
  description: 'Bem-vindo à Capela Santa Maria das Vitórias. Conheça nossa história, eventos e artigos.',
  image: '/default-share-image.jpg', // Caminho para a imagem padrão
};

app.use(router);

// Atualizar meta tags dinamicamente
router.afterEach((to) => {
  const meta = to.meta as { title?: string; description?: string; image?: string } || {};
  document.title = meta.title || defaultMeta.title;

  // Atualizar meta description
  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag) {
    descriptionTag.setAttribute('content', meta.description || defaultMeta.description);
  } else {
    const newDescriptionTag = document.createElement('meta');
    newDescriptionTag.name = 'description';
    newDescriptionTag.content = meta.description || defaultMeta.description;
    document.head.appendChild(newDescriptionTag);
  }

  // Atualizar meta image (para compartilhamento)
  const imageTag = document.querySelector('meta[property="og:image"]');
  if (imageTag) {
    imageTag.setAttribute('content', meta.image || defaultMeta.image);
  } else {
    const newImageTag = document.createElement('meta');
    newImageTag.setAttribute('property', 'og:image');
    newImageTag.content = meta.image || defaultMeta.image;
    document.head.appendChild(newImageTag);
  }
});

app.mount('#app')