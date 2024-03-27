<template>
  <div class="divRoot">
    <TyCarousel style="width: 500px;">
        <TyCarouselItem>
          <img src="../../../../assets/banner_01.jpeg" style="width: 100%;" alt="">
      </TyCarouselItem>
      <TyCarouselItem>
        <img src="../../../../assets/banner_02.jpeg"  style="width: 100%;"  alt="">
      </TyCarouselItem>
      <TyCarouselItem>
        <img src="../../../../assets/banner_03.jpeg"  style="width: 100%;"  alt="">
      </TyCarouselItem>
    </TyCarousel>
    <hr>
    <TyCarousel style="width: 500px;" :showIndicator="false">
        <TyCarouselItem>
          <img src="../../../../assets/banner_01.jpeg" alt="">
      </TyCarouselItem>
      <TyCarouselItem>
        <img src="../../../../assets/banner_02.jpeg" alt="">
      </TyCarouselItem>
      <TyCarouselItem>
        <img src="../../../../assets/banner_03.jpeg" alt="">
      </TyCarouselItem>
    </TyCarousel>

    <hr>
    <TyCarousel style="width: 500px;" :interval="500">
        <TyCarouselItem>
          <img src="../../../../assets/banner_01.jpeg" alt="">
      </TyCarouselItem>
      <TyCarouselItem>
        <img src="../../../../assets/banner_02.jpeg" alt="">
      </TyCarouselItem>
      <TyCarouselItem>
        <img src="../../../../assets/banner_03.jpeg" alt="">
      </TyCarouselItem>
    </TyCarousel>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
</style>
