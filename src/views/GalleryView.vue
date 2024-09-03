<template>
  <div class="main">
    <div style="width: 100%;">
      <swiper 
        :effect="'coverflow'"
        :grabCursor="true"
        :centeredSlides="true"
        :slidesPerView="'auto'"
        :coverflowEffect="{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }"
        :pagination="true"
        :modules="modules"
        class="mySwiper"
        :loop="true">
        <swiper-slide><img src="../assets/LINE_ALBUM_240731_2.jpg" ></swiper-slide>
        <swiper-slide><img src="../assets/LINE_ALBUM_240731_3.jpg" ></swiper-slide>
        <swiper-slide><img src="../assets/LINE_ALBUM_240731_4.jpg" ></swiper-slide>
        <swiper-slide><img src="../assets/LINE_ALBUM_240731_5.jpg" ></swiper-slide>
        <swiper-slide><img src="../assets/LINE_ALBUM_240731_6.jpg" ></swiper-slide>
        <swiper-slide><img src="../assets/LINE_ALBUM_240731_12.jpg" ></swiper-slide>
        <swiper-slide><img src="../assets/LINE_ALBUM_240731_13.jpg" ></swiper-slide>
        <swiper-slide><img src="../assets/LINE_ALBUM_240731_14.jpg" ></swiper-slide>
        <swiper-slide><img src="../assets/LINE_ALBUM_240731_15.jpg" ></swiper-slide>
      </swiper>
    </div>
    
    <SearchItem></SearchItem>
  </div>
</template>

<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import SearchItem from '../components/SearchItem.vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

const modules = [EffectCoverflow, Pagination];

</script>

<style lang="scss" scoped>
.swiper {
    /* width: 800px; */
    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 300px;
      height: 300px;
    }
    img{
      width: 100%;
    }
}
h1{
  margin: 1rem;
  padding-bottom: 0.1rem;
  border-bottom: 1px solid;
}

</style>
