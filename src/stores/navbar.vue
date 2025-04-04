<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Button from 'primevue/button';
import Image from 'primevue/image';
import { RouterLink } from 'vue-router';
import { fetchAllCategories } from '@/api/fetchAllCategories';
import ContactModal from '@/components/ContactModal.vue';

// Tipos
interface Category {
  id: number;
  title: string;
  slug: string;
}

interface MegaMenuItem {
  label: string;
  to?: string;
  isModal?: boolean;
}

// Estado
const isScrolled = ref(false);
const isSidebarOpen = ref(false);
const categories = ref<Category[]>([]);

// Navegação e menus
const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Sobre', to: '/sobre', hasMegaMenu: true },
  { label: 'Artigos', to: '/Artigos', hasMegaMenu: true },
];

const megaMenuItems = {
  artigos: [
    { label: 'Artigos', to: '/artigos' },
    { label: 'Suma Teológica', to: '/suma-teologica' },
  ],
  sobre: [
    { label: 'Sobre a Capela', to: '/sobre' },
    { label: 'Liturgia', to: '/liturgia' },
    { label: 'Eventos', to: '/Projetos' },
    { label: 'Fotos', to: '/fotos' },
    { label: 'Padroeiros', to: '/padroeiros' },
    { label: 'Contato', isModal: true },
  ],
};

const contactLinks = [
  {
    icon: 'pi pi-map-marker',
    href: 'https://maps.app.goo.gl/qVXDhUGzRXxjSUMx8',
    label: "Localização",
  },
  {
    icon: 'pi pi-envelope',
    href: 'mailto:santamariadasvitorias@gmail.com',
    label: 'santamariadasvitorias@gmail.com',
  },
];

// Métodos
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const loadCategories = async () => {
  try {
    categories.value = await fetchAllCategories() as Category[];
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
  }
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  loadCategories();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header class="w-full">
    <!-- Top bar -->
    <nav class="w-full bg-primary-600 min-h-10 border-b-2 border-b-secondary-500 text-surface-0 flex justify-between items-center px-4 py-2">
      <div class="flex items-center gap-4">
        <Button
          v-for="link in contactLinks"
          :key="link.href"
          :as="'a'"
          :href="link.href"
          target="_blank"
          rel="noopener"
          class="hover:text-surface-200 text-xs gap-2 flex items-center transition-all"
        >
          <i :class="link.icon"></i>
          <span class="hidden sm:inline">{{ link.label }}</span>
        </Button>
      </div>
    </nav>

    <!-- Mini Menu -->
    <nav
      class="fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-all duration-300 transform"
      :class="isScrolled ? 'translate-y-0' : '-translate-y-full'"
    >
      <div class="flex items-center justify-between px-4 md:px-32 py-2">
        <RouterLink to="/">
          <Image class="w-12 h-12 hover:brightness-110" src="/favicon.svg" alt="Logo" width="50" height="50" />
        </RouterLink>

        <!-- Nav Links -->
        <div class="hidden md:flex items-center gap-6">
          <div v-for="link in navLinks" :key="link.to" class="relative group">
            <RouterLink
              v-if="!link.hasMegaMenu"
              :to="link.to"
              class="text-sm hover:text-primary-500 transition-all"
            >
              {{ link.label }}
            </RouterLink>
            <div v-else class="relative">
              <span
                class="text-sm cursor-pointer hover:text-primary-500 transition-all"
              >
                {{ link.label }}
              </span>

              <!-- MegaMenu -->
              <div
                class="absolute right-0 top-full z-20 hidden group-hover:flex bg-white shadow-lg rounded-lg p-4 min-w-64"
              >
                <ul>
                  <li
                    v-for="item in megaMenuItems[link.label.toLowerCase() as 'artigos' | 'sobre']"
                    :key="item.label || item.to"
                    class="py-2 px-4 hover:bg-gray-100 rounded"
                  >
                    <ContactModal
                      v-if="'isModal' in item && item.isModal"
                      type="link"
                      linkClass="text-primary-500 hover:underline block w-full"
                    />
                    <RouterLink
                      v-else-if="item.to"
                      :to="item.to"
                      class="block w-full"
                    >
                      {{ item.label }}
                    </RouterLink>
                  </li>

                  <!-- Dynamic categories for 'Artigos' -->
                  <li
                    v-if="link.label === 'Artigos'"
                    v-for="category in categories"
                    :key="category.id"
                    class="py-2 px-4 hover:bg-gray-100 rounded"
                  >
                    <RouterLink
                      :to="`/artigos/${category.slug}/`"
                      class="block w-full"
                    >
                      {{ category.title }}
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <Button icon="pi pi-bars" class="md:hidden" @click="toggleSidebar" />
      </div>
    </nav>

    <!-- Main Navigation -->
    <nav class="w-full bg-surface-0 py-4 px-4 md:px-32">
      <div class="wrapper w-full flex items-center justify-between px-4 md:px-10">
        <!-- Logo -->
        <RouterLink to="/">
          <Image class="hidden md:block hover:brightness-110 transition-all" src="/logo.svg" alt="Logo" width="180" height="180" />
          <Image class="block md:hidden w-12 h-12 hover:brightness-110" src="/favicon.svg" alt="Logo" width="50" height="50" />
        </RouterLink>

        <!-- Nav Links -->
        <div class="hidden md:flex items-center gap-10 relative">
          <div v-for="link in navLinks" :key="link.to" class="relative group">
            <RouterLink v-if="!link.hasMegaMenu" :to="link.to" class="hover:text-primary-500 transition-all">
              {{ link.label }}
            </RouterLink>
            <div v-else>
              <span class="cursor-pointer hover:text-primary-500 transition-all">{{ link.label }}</span>
              
              <!-- MegaMenu -->
              <div class="absolute right-0 top-5 z-20">
                <div v-if="link.hasMegaMenu" class="bg-white shadow-lg rounded-lg p-4 hidden group-hover:block min-w-64">
                  <ul>
                    <li v-for="item in megaMenuItems[link.label.toLowerCase() as 'artigos' | 'sobre']" :key="item.label || item.to" 
                        class="py-2 px-4 hover:bg-gray-100 rounded">
                      <ContactModal v-if="'isModal' in item && item.isModal" type="link" linkClass="text-primary-500 hover:underline block w-full" />
                      <RouterLink v-else-if="item.to" :to="item.to" class="block w-full">{{ item.label }}</RouterLink>
                    </li>
                    
                    <!-- Dynamic categories for 'Artigos' -->
                    <li v-if="link.label === 'Artigos'" v-for="category in categories" :key="category.id" 
                        class="py-2 px-4 hover:bg-gray-100 rounded">
                      <RouterLink :to="`/artigos/${category.slug}/`" class="block w-full">{{ category.title }}</RouterLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button icon="pi pi-bars" class="md:hidden" @click="toggleSidebar" />
      </div>
    </nav>

    <!-- Sidebar & Overlay -->
    <div class="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300"
         :class="isSidebarOpen ? 'translate-x-0' : 'translate-x-full'">
      <div class="flex justify-end p-4">
        <Button icon="pi pi-times" class="text-primary-500" @click="toggleSidebar" />
      </div>
      <ul class="p-4">
        <li v-for="link in navLinks" :key="link.to" class="py-2 px-4 rounded">
          <RouterLink :to="link.to" class="block w-full">{{ link.label }}</RouterLink>
          
          <!-- Subitems -->
          <ul v-if="link.hasMegaMenu" class="pl-4 text-sm text-gray-500">
            <li v-for="item in megaMenuItems[link.label.toLowerCase() as 'artigos' | 'sobre']" :key="item.label || item.to" 
                class="py-1">
              <RouterLink v-if="item.to" :to="item.to" class="block w-full">{{ item.label }}</RouterLink>
            </li>
            
            <!-- Dynamic categories -->
            <li v-if="link.label === 'Artigos'" v-for="category in categories" :key="category.id" class="py-1">
              <RouterLink :to="`/artigos/${category.slug}/`" class="block w-full">{{ category.title }}</RouterLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    
    <div v-if="isSidebarOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="toggleSidebar"></div>
  </header>
</template>

<style scoped>
nav.fixed {
  transition: transform 0.3s ease-in-out;
}
</style>