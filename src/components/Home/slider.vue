<template>
  <div class="relative w-full max-h-screen overflow-hidden rounded-lg shadow-lg">
    <!-- Slider Container -->
    <div
      class="flex transition-all duration-700 ease-in-out w-full h-[70vh]"
      :style="`transform: translateX(-${currentIndex * 100}%)`"
    >
      <div v-for="(slide, index) in slides" :key="index" class="relative h-full min-w-full">
        <img
          :src="slide.image"
          :alt="slide.alt || 'Slide Image'"
          class="h-full w-full object-cover"
        />
        <!-- Overlay with Text -->
        <div v-if="slide.title || slide.description" class="absolute inset-0 flex flex-col justify-end p-8">
          <div class="bg-black bg-opacity-40 backdrop-blur-xl p-8 rounded-lg w-fit flex flex-col justify-end gap-4">
            <h2 v-if="slide.title" class="text-white text-3xl font-bold mb-2">{{ slide.title }}</h2>
            <p v-if="slide.description" class="text-white text-lg mb-4">{{ slide.description }}</p>
            <a
            v-if="slide.buttonText && slide.buttonLink"
            :href="slide.buttonLink"
            class="btn-primary w-fit"
            >
              {{ slide.buttonText }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <button
      @click="prevSlide"
      class="absolute top-1/2 left-5 p-3 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all duration-300"
      aria-label="Slide anterior"
    >
      <i class="pi pi-chevron-left"></i>
    </button>
    <button
      @click="nextSlide"
      class="absolute top-1/2 right-5 p-3 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all duration-300"
      aria-label="Próximo slide"
    >
      <i class="pi pi-chevron-right"></i>
    </button>

    <!-- Indicators -->
    <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="index === currentIndex ? 'bg-white scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'"
        :aria-label="`Ir para slide ${index + 1}`"
      ></button>
    </div>

    <!-- Play/Pause Button -->
    <button
      @click="toggleAutoplay"
      class="absolute aspect-square w-10 bottom-4 right-4 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-all duration-300 flex items-center justify-center"
      :aria-label="isPlaying ? 'Pausar slideshow' : 'Iniciar slideshow'"
    >
      <i :class="isPlaying ? 'pi pi-pause' : 'pi pi-play'" class="m-0"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      required: true,
      default: () => [],
      validator: (value) => {
        return value.every(slide => 
          typeof slide === 'object' && 
          slide.hasOwnProperty('image')
        );
      }
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 5000
    }
  },
  data() {
    return {
      currentIndex: 0,
      timer: null,
      isPlaying: false,
      isHovering: false,
      touchStartX: 0,
      touchEndX: 0
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.$emit('slide-changed', this.currentIndex);
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.$emit('slide-changed', this.currentIndex);
    },
    goToSlide(index) {
      this.currentIndex = index;
      this.$emit('slide-changed', this.currentIndex);
    },
    startAutoplay() {
      if (this.timer === null) {
        this.timer = setInterval(this.nextSlide, this.interval);
        this.isPlaying = true;
      }
    },
    stopAutoplay() {
      clearInterval(this.timer);
      this.timer = null;
      this.isPlaying = false;
    },
    toggleAutoplay() {
      if (this.isPlaying) {
        this.stopAutoplay();
      } else {
        this.startAutoplay();
      }
    },
    handleMouseEnter() {
      this.isHovering = true;
      if (this.pauseOnHover && this.isPlaying) {
        this.stopAutoplay();
      }
    },
    handleMouseLeave() {
      this.isHovering = false;
      if (this.pauseOnHover && this.autoplay && !this.isPlaying) {
        this.startAutoplay();
      }
    },
    handleTouchStart(e) {
      this.touchStartX = e.changedTouches[0].screenX;
    },
    handleTouchEnd(e) {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    },
    handleSwipe() {
      const swipeThreshold = 50;
      const diff = this.touchEndX - this.touchStartX;
      
      if (diff > swipeThreshold) {
        // Swipe right
        this.prevSlide();
      } else if (diff < -swipeThreshold) {
        // Swipe left
        this.nextSlide();
      }
    },
    handleKeydown(e) {
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
      }
    }
  },
  mounted() {
    if (this.autoplay) {
      this.startAutoplay();
    }
    
    // Add event listeners for touch and keyboard
    this.$el.addEventListener('touchstart', this.handleTouchStart);
    this.$el.addEventListener('touchend', this.handleTouchEnd);
    this.$el.addEventListener('mouseenter', this.handleMouseEnter);
    this.$el.addEventListener('mouseleave', this.handleMouseLeave);
    window.addEventListener('keydown', this.handleKeydown);
    
    // Make slider responsive to window resize
    window.addEventListener('resize', () => {
      // You could add additional logic here if needed
      this.$forceUpdate();
    });
  },
  beforeDestroy() {
    this.stopAutoplay();
    
    // Remove event listeners
    this.$el.removeEventListener('touchstart', this.handleTouchStart);
    this.$el.removeEventListener('touchend', this.handleTouchEnd);
    this.$el.removeEventListener('mouseenter', this.handleMouseEnter);
    this.$el.removeEventListener('mouseleave', this.handleMouseLeave);
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('resize', this.$forceUpdate);
  }
};
</script>

<style scoped>
/* Adicione estilos adicionais aqui se necessário */
.slide-enter-active, .slide-leave-active {
  transition: opacity 0.5s;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
}
</style>