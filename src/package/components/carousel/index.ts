import TyCarousel from './src/carousel.vue'
import TyCarouselItem from './src/carousel-item.vue'

TyCarousel.install = app=>{
    app.component('TyCarousel',TyCarousel),
    app.component('TyCarouselItem',TyCarouselItem)
}
export default TyCarousel 