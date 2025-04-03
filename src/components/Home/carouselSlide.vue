<template>
  <div class="flex justify-center items-center min-h-[400px] w-full my-10">
    <div class="relative w-full overflow-hidden">
      <h1 class="relative w-full text-center">Nossa História</h1>
      
      <!-- Controles de navegação -->
      <div class="absolute z-20 w-full h-full flex items-center justify-between px-4">
        <button @click="prevSlide" class="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors">
          <i class="pi pi-chevron-left"></i>
        </button>
        <button @click="nextSlide" class="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transition-colors">
          <i class="pi pi-chevron-right"></i>
        </button>
      </div>

      <!-- Container do carrossel -->
      <div class="relative flex w-full h-[500px] justify-center items-center overflow-hidden">
        <div class="relative w-full flex justify-center items-center">
          <div
            v-for="(slide, index) in displaySlides"
            :key="slide.id"
            class="absolute transition-all duration-700 ease-in-out rounded-lg shadow-lg overflow-hidden transform"
            :style="getSlideStyle(index)"
          >
            <img :src="slide.image" :alt="slide.name" class="w-120 h-96 object-cover rounded-t-lg" />
            <div class="text-sm font-semibold text-center mt-0 bg-surface-0 p-2 text-wrap w-full">
              {{ slide.name }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Indicadores -->
      <div class="flex justify-center mt-4 gap-2">
        <button 
          v-for="(_, index) in slides" 
          :key="index"
          @click="goToSlide(index)"
          class="w-3 h-3 rounded-full transition-all"
          :class="currentIndex === index ? 'bg-primary-500' : 'bg-gray-300 hover:bg-gray-400 scale-75'"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

// Adiciona um ID único para cada slide para melhorar a transição
const slides = ref([
  { id: 1, image: "/home/carrossel/descobrimento-brasil.webp", name: "Oscar Pereira sa Silva - Descobrimento do Brasil" },
  { id: 2, image: "/home/carrossel/primeira-missa.jpg", name: "Victor Meirelles - Primeira Missa no Brasil" },
  { id: 3, image: "/home/carrossel/elevacao-cruz.jpg", name: "Pedro Peres - A Elevação da Cruz em Porto Seguro" },
  { id: 4, image: "/home/carrossel/fundacao-sao-paulo.jpg", name: "Oscar Pereira da Silva - Fundação de São Paulo" },
  { id: 5, image: "/home/carrossel/batalha-dos-guararapes.jpg", name: "Victor Meirelles - Batalha dos Guararapes" },
  { id: 6, image: "/home/carrossel/partida-da-moncao.jpg", name: "Almeida Júnior - Partida da Monção" },
  { id: 7, image: "/home/carrossel/juramento-isabel.jpg", name: "Victor Meirelles - Juramento da Princesa Isabel" },
  { id: 8, image: "/home/carrossel/abolicao-escravatura.jpg", name: "Victor Meirelles - Abolição da Escravatura" },
  { id: 9, image: "/home/carrossel/batalha-campo-grande.jpg", name: "Pedro Américo - Batalha de Campo Grande" },
  { id: 10, image: "/home/carrossel/passagem-do-chaco.jpg", name: "Pedro Américo - Passagem do Chaco" },
  { id: 11, image: "/home/carrossel/batalha-riachuelo.jpg", name: "Oscar Pereira da Silva - A Batalha Naval do Riachuelo" },
  { id: 12, image: "/home/carrossel/independencia-ou-morte.jpg", name: "Pedro Américo - O Grito do Ipiranga" },
  { id: 13, image: "/home/carrossel/sao-jose-anchieta-selva.jpg", name: "Benedito Calixto - Evangelho nas Selvas" },
  { id: 14, image: "/home/carrossel/paço-municipal-mococa.jpg", name: "Paço Municipal de Mococa, SP - 1930" },
  { id: 15, image: "/home/carrossel/aspectos-pitorescos-2.jpg", name: "Washington Luís e o arcebispo D. Duarte Leopoldo na matriz de Pirapora, MG- 1922" },
  { id: 16, image: "/home/carrossel/aspectos-pitorescos-3.jpg", name: "Matriz do Patrocínio - 1930" },
  { id: 17, image: "/home/carrossel/aspectos-pitorescos-4.jpg", name: "Estação Ferroviária da Cia Paulista - 1917" },
  { id: 18, image: "/home/carrossel/aspectos-pitorescos-5.jpg", name: "Desfile Cívico" },
  { id: 19, image: "/home/carrossel/faculdade-de-direito.webp", name: "Faculdade de Direito e Igreja São Francisco (SP) - 1900" },
  { id: 20, image: "/home/carrossel/estacao-da-luz.webp", name: "Estação da Luz em construção (SP) - 1900" },
  { id: 21, image: "/home/carrossel/casarao-familia-dumont.webp", name: "Casarão da Família Dumont (SP) - 1900" },
  { id: 22, image: "/home/carrossel/bonde-com-trabalhador.webp", name: "O Bonde - 1961" },
  { id: 23, image: "/home/carrossel/paulista.webp", name: "Avenida Paulista - 1891" },
  { id: 24, image: "/home/carrossel/theatro-municipal.webp", name: "Teatro Municipal em São Paulo - 1910" },
  { id: 25, image: "/home/carrossel/casamento.png", name: "Casamento coletivo no Palácio dos Campos Elíseos em São Paulo - 1950" },
  { id: 26, image: "/home/carrossel/colegio-salesiano.jpg", name: "Colégio Salesiano Santa Rosa em Niterói, RJ - 1908" },
  { id: 27, image: "/home/carrossel/sala-de-operacoes.jpg", name: "Sala de Operações do Hospital de Caridade de Santa Maria, RS - 1910" },
  { id: 28, image: "/home/carrossel/igreja-matriz-araraquara.jpg", name: "Igreja Matriz de Araraquara, SP - 1914" },
  { id: 29, image: "/home/carrossel/mosteiro-sao-bento.jpg", name: "Mosteiro São Bento (SP) - 1903" },
]);

const currentIndex = ref(0);
const isTransitioning = ref(false);
const autoplayInterval = ref(null);

// Mostrar 5 slides em vez de 3 para uma transição mais suave
const displaySlides = computed(() => {
  const total = slides.value.length;
  return [
    slides.value[(currentIndex.value - 2 + total) % total], // Extrema esquerda
    slides.value[(currentIndex.value - 1 + total) % total], // Esquerda
    slides.value[currentIndex.value],                       // Centro
    slides.value[(currentIndex.value + 1) % total],         // Direita
    slides.value[(currentIndex.value + 2) % total],         // Extrema direita
  ];
});

// Função para calcular o estilo de cada slide com base na sua posição
const getSlideStyle = (index) => {
  // Posições base com distâncias fixas entre slides
  // Usando distâncias em vw (viewport width) para manter consistência
  const positions = {
    0: { transform: 'translateX(-80vw) scale(0.7)', zIndex: 0, opacity: 0.5 },   // Extrema esquerda
    1: { transform: 'translateX(-20vw) scale(0.85)', zIndex: 1, opacity: 0.7 },  // Esquerda
    2: { transform: 'translateX(0) scale(1)', zIndex: 10, opacity: 1 },          // Centro
    3: { transform: 'translateX(20vw) scale(0.85)', zIndex: 1, opacity: 0.7 },   // Direita
    4: { transform: 'translateX(80vw) scale(0.7)', zIndex: 0, opacity: 0.5 }     // Extrema direita
  };
  
  return positions[index];
};

// Funções de navegação com bloqueio durante transição
const nextSlide = () => {
  if (isTransitioning.value) return;
  
  isTransitioning.value = true;
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
  
  setTimeout(() => {
    isTransitioning.value = false;
  }, 700); // Corresponde à duração da transição
};

const prevSlide = () => {
  if (isTransitioning.value) return;
  
  isTransitioning.value = true;
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length;
  
  setTimeout(() => {
    isTransitioning.value = false;
  }, 700); // Corresponde à duração da transição
};

const goToSlide = (index) => {
  if (isTransitioning.value || index === currentIndex.value) return;
  
  isTransitioning.value = true;
  currentIndex.value = index;
  
  setTimeout(() => {
    isTransitioning.value = false;
  }, 700);
};

// Autoplay com tempo aumentado para 8 segundos
const startAutoplay = () => {
  autoplayInterval.value = setInterval(() => {
    nextSlide();
  }, 10000); // Alterado de 5000 para 8000ms (8 segundos)
};

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
    autoplayInterval.value = null;
  }
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>