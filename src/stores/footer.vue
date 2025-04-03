<template>
  <div class="fixed bottom-4 z-30 right-4 flex flex-col-reverse items-center gap-2">
    <a href="https://www.paypal.com/ncp/payment/TYNYLJQ33BF9U" class="" target="_blank">
      <button class="bg-primary-800 text-white p-2 rounded-full h-10 items-center aspect-square justify-center flex hover:bg-primary-500">
        <i class="text-bold text-lg pi pi-paypal"></i>
        <span class="hidden text-xs">Doe agora!</span>
      </button>
    </a>
  </div>
  <div class="mt-20 bg-primary-600 border-t-2 border-t-secondary-500 w-full min-h-10 p-4 flex flex-col md:flex-row justify-between items-center text-xs font-light text-surface-100">
    <div class="text-center md:text-left">
      <p>&copy; {{ currentYear }} Capela Santa Maria das Vitórias. Todos os direitos reservados.</p>
    </div>
    <div class="flex space-x-4 mt-2 md:mt-0">
      <a href="/" class="hover:text-primary-500 transition-all">Início</a>
      <ContactModal type="link" linkClass="text-surface-100 hover:text-primary-500 transition-all" />
      <a href="/politica-de-privacidade" class="hover:text-primary-500 transition-all">Política de Privacidade</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ContactModal from '@/components/ContactModal.vue';

const currentYear = ref<number>(new Date().getFullYear());
</script>