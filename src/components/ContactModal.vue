<template>
    <div>
      <template v-if="type === 'button'">
        <Button
          label="Entre em contato"
          class="btn-primary text-white bg-primary-600 hover:bg-primary-700 transition-all"
          @click="isModalOpen = true"
        />
      </template>
      <template v-else-if="type === 'link'">
        <a
          href="#"
          :class="linkClass"
          @click.prevent="isModalOpen = true"
        >
          Entre em contato
        </a>
      </template>
  
      <!-- Modal -->
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isModalOpen"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div class="bg-white rounded-lg shadow-lg p-6 break-words w-full max-w-lg overflow-hidden">
            <!-- Header do Modal -->
            <div class="flex justify-between items-center mb-4 text-xs">
              <h2 class="m-0 text-2xl font-bold">Entre em contato</h2>
              <Button
                icon="pi pi-times"
                class="text-gray-500 hover:text-gray-700"
                @click="isModalOpen = false"
              />
            </div>
  
            <!-- Conteúdo do Modal -->
            <div class="text-base">
              <div class="flex items-center gap-4 m-0 mt-8">
                <i class="pi pi-envelope text-primary-700 text-2xl"></i>
                <p class="text-gray-700 m-0">santamariadasvitorias@gmail.com</p>
              </div>
              <div class="flex items-center gap-4 my-4">
                <i class="pi pi-map-marker text-primary-700 text-2xl break-words"></i>
                <p class="text-gray-700 m-0 break-words">
                  Rua Espírito Santo Lt. 27 Vila Santa Rita, Anápolis – Goiás – Brasil
                </p>
              </div>
              <div class="flex items-center gap-4">
                <iframe
                  class="w-full h-64 rounded-lg shadow-lg"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2174.559598980255!2d-48.960447255933516!3d-16.35094913300922!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ea49df0669287%3A0xcec31bc9cd464167!2sR.%20Esp%C3%ADrito%20Santo%20-%20Vila%20Santa%20RITA%2C%20An%C3%A1polis%20-%20GO%2C%2075120-795!5e0!3m2!1spt-BR!2sbr!4v1738513957779!5m2!1spt-BR!2sbr"
                  allowfullscreen="false"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
  
          </div>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps } from 'vue';
  import Button from 'primevue/button';
  
  // Props para configurar o componente
  defineProps({
    type: {
      type: String,
      default: 'button', // Pode ser 'button' ou 'link'
      validator: (value: string) => ['button', 'link'].includes(value),
    },
    linkClass: {
      type: String,
      default: '', // Classe personalizada para o link
    },
  });
  
  const isModalOpen = ref(false);
  </script>