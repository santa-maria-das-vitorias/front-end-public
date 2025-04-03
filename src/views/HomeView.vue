<template>
  <div class="flex flex-col items-center gap-40">
    <Slider :slides="heroSlides" :interval="20000" />

    <div class="flex flex-col lg:flex-row items-center justify-between md:mx-28 2xl:mx-64 px-10">
      <img 
        src="/about/foto-capela.jpg" 
        alt="Quem somos" 
        class="w-full lg:max-w-96 lg:w-1/2 aspect-[8/1] lg:aspect-square lg:rounded-full object-cover"
      />
      <div class="w-full lg:w-1/2">
        <div class="flex flex-row gap-5 mb-5">
          <span class="block w-1 bg-primary-500"></span>
          <div class="text-left">
            <h3 class="text-2xl mb-3 relative">Quem somos</h3>
            <h1 class="text-4xl font-bold relative">Santa Maria das Vitórias</h1>
          </div>
        </div>
        <p class="text-justify leading-relaxed my-10">
          A Associação Civil Santa Maria das Vitórias tem por fim promover a evangelização através da divulgação da liturgia romana tradicional, bem como apresentar os valores da cultura católica publicando resenhas, seletas e crônicas que focalizem temas filosóficos, teológicos, históricos e literários. Nossa Associação construiu uma capela em estilo barroco dedicada a Santa Maria das Vitórias onde se celebra como rito exclusivo a missa romana tradicional, também conhecida como missa de São Pio V ou missa tridentina.
        </p>

        <div class="w-fit space-x-5 mt-4">
          <a href="/sobre">
            <button class="btn-primary">
              Saiba mais
            </button>
          </a>
          <a href="https://www.paypal.com/ncp/payment/TYNYLJQ33BF9U" target="_blank" rel="noopener">
            <button class="btn-ghost">
              <i class="pi pi-paypal" /> Doe com PayPal
            </button>
          </a>
        </div>

      </div>
    </div>
    
    <div class="flex flex-col justify-between w-full">
      <div class="flex flex-row gap-5 md:mx-28 2xl:mx-64 px-10">
        <span class="block w-1 bg-primary-500"></span>
        <div class="text-left">
          <h1 class="text-4xl font-bold relative">Nossos padroeiros</h1>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20">
        <div 
          v-for="padroeiro in padroeiros" 
          :key="padroeiro.name" 
          class="relative group overflow-hidden shadow-lg"
        >
          <img 
            :src="padroeiro.image" 
            :alt="padroeiro.name" 
            class="w-full h-full object-cover"
          />
        <div class="absolute inset-0 bg-black bg-opacity-50 transition-all hover:bg-opacity-70 flex flex-col justify-center text-white p-4">
          <h2 class="text-2xl font-bold mb-2 text-white">{{ padroeiro.name }}</h2>
          <p class="text-sm text-justify mb-4">{{ padroeiro.description }}</p>
          <router-link 
            :to="`/padroeiros`" 
            class="flex items-center gap-2"
          >
            Saiba mais <i class="pi pi-arrow-right" />
          </router-link>
        </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col justify-between md:mx-28 2xl:mx-64 px-10">
      <div class="flex flex-row gap-5">
        <span class="block w-1 bg-primary-500"></span>
        <div class="text-left">
          <h1 class="text-4xl font-bold relative">Artigos</h1>
        </div>
      </div>
    </div>

    <div 
      class="mt-40 bg-primary-500 p-4 py-20 bg-cover bg-center relative"
      style="background-image: url('home/slider/4.jpg');"
    >
      <div class="absolute inset-0 bg-black bg-opacity-70"></div>
      <div class="relative z-10">
      <h1 class="text-center text-white mt-4">
        “Aquele que só busca palavras não terá nada; mas o que é possuidor de entendimento ama a sua alma, e o conservador da prudência achará bens.”
      </h1>
      <h2 class="text-center mt-4 text-white">
        (Provérbios, 19, 7-8)
      </h2>
      </div>
    </div>

    <div class="flex flex-col justify-between md:mx-28 2xl:mx-64 px-10">
      <div class="flex flex-row gap-5">
        <span class="block w-1 bg-primary-500"></span>
        <div class="text-left">
          <h1 class="text-4xl font-bold relative">Artigos</h1>
        </div>
      </div>
      <EventosSlider />
    </div>
    
    <div class="flex flex-col justify-between md:mx-28 2xl:mx-64 px-10">
      <div class="flex flex-col items-center">
        <img src="/home/ornamento-topo.svg" alt="ornamentos em arabesco" class="w-28 h-14 mx-auto">
        <h1 class="text-center border-t border-b border-secondary-500 md:w-5/6 w-full py-2 pt-4">
          Louvemos aos grandes homens, e aos nossos pais em sua geração
        </h1>
        <img src="/home/ornamento-topo.svg" alt="ornamentos em arabesco" class="w-28 h-14 mx-auto rotate-180">
      </div>

      <div class="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-6 gap-6 mt-14">
        <div v-for="homens in homens" :key="homens.image" class="flex flex-col items-center justify-center">
          <img :src="homens.image" class="w-48 aspect-square rounded-full" />
          <p class="text-center font-bold">{{ homens.name }}</p>
          <div class="text-center text-surface-600 font-light">{{ homens.date }}</div>
        </div>
      </div>
    </div>

    <CarouselSlide />
  </div>
</template>

<script>
import CarouselSlide from '@/components/Home/carouselSlide.vue';
import Slider from "@/components/Home/slider.vue";
import Avatar from "primevue/avatar";
import LatestArticles from "@/components/Articles/latestArticles.vue";
import socialbuttons from "@/components/socialbuttons.vue";
import EventosSlider from "@/components/Home/EventosSlider.vue";

export default {
  components: {
    Slider,
    LatestArticles,
    socialbuttons,
    Avatar,
    CarouselSlide,
    EventosSlider
  },
  data() {
    return {
      hideButtonLeft: false,
      hideButtonRight: false,
      heroSlides: [
        {
          image: 'home/slider/1.jpg',
          alt: 'Nossa Capela',
          title: 'Capela Santa Maria das Vitórias',
          description: 'Dedicada à celebração da Missa Tridentina e à preservação da tradição católica.',
          buttonText: 'Nossa história',
          buttonLink: '/sobre'
        },
        {
          image: 'home/slider/2.jpg',
          alt: 'Nossa missão',
          title: 'A Missa de Sempre',
          description: 'Culto solene e fiel à liturgia romana tradicional.',
          buttonText: 'Conheça a Liturgia',
          buttonLink: '/liturgia'
        },
        {
          image: 'home/slider/3.jpg',
          alt: 'Eventos e atividades',
          title: 'Vida Católica e Formação',
          description: 'Catequese, sacramentos e aprofundamento na fé.',
          buttonText: 'Saiba mais',
          buttonLink: '/equipe'
        },
        {
          image: 'home/slider/4.jpg',
          alt: 'Como ajudar',
          title: 'Colabore com Nossa Missão',
          description: 'Ajude na evangelização e na construção do Centro de Cultura Católica.',
          buttonText: 'Doe aqui',
          buttonLink: '/projetos'
        },
      ],
      padroeiros: [
        { image: "home/padroeiros/santa-maria-das-vitorias.jpg", name: "Santa Maria das Vitórias", description:"A devoção a Nossa Senhora das Vitórias está ligada à história da França do século XVII, mais precisamente à vitória dos católicos sobre os protestantes na batalha de La Rochelle, e à novena da rainha Ana d' Áustria para obter a graça de um herdeiro do trono." },
        { image: "home/padroeiros/jose-anchieta.jpg", name: "São José de Anchieta", description:"Nascido nas Ilhas Canárias, na Espanha, José de Anchieta mudou-se ainda bem jovenzinho, com quatorze anos, para Portugal em prol dos estudos. Ingressou-se na Universidade de Coimbra para estudar Letras e Filosofia." },
        { image: "home/padroeiros/tomas-aquino.jpg", name: "Santo Tomás de Aquino", description:"São Tomás de Aquino. Nasceu em 1225, no castelo de Roccasecca, no sul do Lácio. Pertencia a uma nobre família, a qual lhe proporcionou ótima formação." },
        { image: "home/padroeiros/pio-x.jpg", name: "São Pio X", description:"Pio X ou São Pio X, O.F.S., nascido Giuseppe Melchiorre Sarto, foi o 257.º Papa." },
      ],
      homens: [
        { image: "home/homens/santo-agostinho.png", date: "354-430", name: "Santo Agostinho" },
        { image: "home/homens/cardeal-merry-del-val.png", date: "1865-1930", name: "Cardeal Merry del Val" },
        { image: "home/homens/jacques-bossuet.png", date: "1627-1704", name: "Jacques Bossuet" },
        { image: "home/homens/d-lefebvre.png", date: "1905-1991", name: "D. Lefebvre" },
        { image: "home/homens/d-mayer.png", date: "1904-1991", name: "D. Mayer" },
        { image: "home/homens/d-pestana.png", date: "1928-2011", name: "D. Pestana" },
      ],
    };
  },
};
</script>