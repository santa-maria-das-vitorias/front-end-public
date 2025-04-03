<template>
  <div class="container mx-auto p-4">
    <div class="card-padding mt-10 flex flex-col items-center">
      <div class="prose w-full flex flex-col items-center">
        <!-- Quem Somos -->
        <h1 class="text-center text-3xl font-bold text-primary-700 mb-6">Quem somos</h1>
        <p class="text-justify leading-relaxed">
          A Associação Civil Santa Maria das Vitórias tem por fim promover a evangelização através da divulgação da liturgia romana tradicional, bem como apresentar os valores da cultura católica publicando resenhas, seletas e crônicas que focalizem temas filosóficos, teológicos, históricos e literários. Nossa Associação construiu uma capela em estilo barroco dedicada a Santa Maria das Vitórias onde se celebra como rito exclusivo a missa romana tradicional, também conhecida como missa de São Pio V ou missa tridentina.
        </p>
        <p class="text-justify leading-relaxed mt-4">
          Nossa associação pretende construir também um centro de cultura católica anexo à capela, onde se cultive a filosofia tomista bem como outras correntes do pensamento católico contra-revolucionário, conforme o magistério perene da Igreja.
        </p>
        <img
          src="/about/capela.jpg"
          alt="Quem somos"
          class="w-full h-auto mt-6 rounded-lg shadow-lg object-cover"
        />

        <!-- Finalidade da Associação -->
        <h2 class="text-center text-2xl font-semibold text-primary-700 mt-10">Finalidade da Associação</h2>
        <p class="mt-4 text-justify leading-relaxed">
          A Associação Civil Santa Maria das Vitórias tem por finalidade:
        </p>
        <ul class="list-disc list-inside mt-4 text-gray-700">
          <li>Celebrar a Santa Missa no rito tridentino, bem como os demais sacramentos católicos.</li>
          <li>Acolher qualquer sacerdote católico que, em caráter perpétuo, terá o direito de celebrar o Santo Sacrifício da Missa e do Ofício Divino na Capela Santa Maria das Vitórias, segundo o rito tridentino.</li>
          <li>Ensinar o Catecismo e a preparar para os sacramentos.</li>
          <li>Promover a assistência social a famílias carentes e outras práticas de caridade.</li>
          <li>Administrar uma escola de ensino fundamental precedida de classes de alfabetização para os filhos dos associados e um Centro de Cultivo do Pensamento Aristotélico-Tomista.</li>
          <li>Promover orações e outras celebrações pela santificação dos bispos e prelados de toda a hierarquia católica e suas respectivas Cúrias.</li>
        </ul>

        <!-- Botão para abrir o modal -->
        <div class="mt-10">
          <ContactModal />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactModal from '@/components/ContactModal.vue';
</script>