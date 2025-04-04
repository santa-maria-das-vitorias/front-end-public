<template>
  <div class="relative w-full mx-auto my-10">
    <!-- Controles de navegação -->
    <div class="absolute z-20 w-full h-full flex items-center justify-between px-2 sm:px-4">
      <button
        @click="prevSlide"
        class="bg-black/30 hover:bg-black/60 p-2 sm:p-3 rounded-full text-white"
        aria-label="Slide anterior"
      >
        <i class="pi pi-chevron-left text-sm sm:text-lg"></i>
      </button>
      <button
        @click="nextSlide"
        class="bg-black/30 hover:bg-black/60 p-2 sm:p-3 rounded-full text-white"
        aria-label="Próximo slide"
      >
        <i class="pi pi-chevron-right text-sm sm:text-lg"></i>
      </button>
    </div>

    <!-- Container do carrossel -->
    <div class="relative w-full h-[300px] sm:h-[500px] overflow-hidden">
      <div
        class="flex transition-transform duration-700 ease-in-out h-full"
        :style="{ transform: `translateX(-${currentIndex * 100 / slidesPerView}%)` }"
      >
        <div
          v-for="(evento, index) in events"
          :key="index"
          class="flex-shrink-0 px-1 sm:px-2 h-full"
          :style="{ width: `${100 / slidesPerView}%` }"
        >
          <div class="h-full flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
            <div class="relative overflow-hidden h-60 sm:h-96">
              <img
                :src="evento.image"
                :alt="evento.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-2 sm:p-4 bg-white flex-grow">
              <h2 class="font-bold text-base sm:text-xl text-gray-800 mb-1 sm:mb-2">{{ evento.title }}</h2>
              <p class="text-gray-600 text-xs sm:text-sm">{{ evento.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Indicadores -->
    <div class="flex justify-center mt-4 sm:mt-6 gap-2 sm:gap-3">
      <button
        v-for="i in events.length - slidesPerView + 1"
        :key="i-1"
        @click="goToSlide(i-1)"
        class="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
        :class="currentIndex === i-1 ? 'bg-primary-500 w-4 sm:w-5' : 'bg-gray-300'"
        :aria-label="`Ir para slide ${i}`"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const events = ref([
  {
    title: "Rosário Mariano",
    image: "/home/eventos/ns-do-rosario.webp",
    description: "Logo antes de cada missa diária os fiéis se reúnem com o padre na capela para recitar o Santo Terço Mariano."
  },
  {
    title: "Congregação Mariana",
    image: "/home/eventos/CM.jpeg",
    description: "Congrega rapazes católicos que desejam ser católicos mais perfeitos e filhos mais devotos de Nossa Senhora."
  },
  {
    title: "Confraria da Boa Morte",
    image: "/home/eventos/congregatio-bonae-mortis.jpg",
    description: "Esta confraria se reúne às primeiras terças de cada mês para assistência na missa votiva pela graça de uma boa morte."
  },
  {
    title: "Pia União das Filhas de Maria",
    image: "/home/eventos/santa-ines.webp",
    description: "Congrega moças católicas que desejam crescer na fé e na devoção a Nossa Senhora."
  },
  {
    title: "Catequese Básica",
    image: "/home/eventos/catequese.jpg",
    description: "Semanalmente o padre dá uma aula de catequese básica a crianças aos sábados."
  },
]);

const currentIndex = ref(0);
const slidesPerView = ref(1);

// Computar o índice máximo baseado no número de slides visíveis
const maxIndex = computed(() => Math.max(0, events.value.length - slidesPerView.value));

// Atualizar número de slides visíveis com base no tamanho da tela
const updateSlidesPerView = () => {
  slidesPerView.value = window.innerWidth >= 768 ? 3 : 1;
  // Certificar que o índice atual é válido após mudança de layout
  if (currentIndex.value > maxIndex.value) {
    currentIndex.value = maxIndex.value;
  }
};

const nextSlide = () => {
  currentIndex.value = currentIndex.value >= maxIndex.value ? 0 : currentIndex.value + 1;
};

const prevSlide = () => {
  currentIndex.value = currentIndex.value <= 0 ? maxIndex.value : currentIndex.value - 1;
};

const goToSlide = (index) => {
  currentIndex.value = Math.min(Math.max(index, 0), maxIndex.value);
};

onMounted(() => {
  updateSlidesPerView();
  window.addEventListener("resize", updateSlidesPerView);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateSlidesPerView);
});
</script>