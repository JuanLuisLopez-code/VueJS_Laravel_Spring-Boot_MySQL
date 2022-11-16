<template>
    <carousel :items-to-show="1" :autoplay="4000" :wrap-around="true">
        <slide v-for="item in data" :key="item.id">
            <carousel_itemVue class="carousel__item" :item="item" />
        </slide>

        <template #addons>
            <navigation />
            <pagination />
        </template>
    </carousel>

</template>

<script>
import carousel_itemVue from './carousel_item.vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
export default {
    components: { carousel_itemVue, Carousel, Slide, Pagination, Navigation },
    props: {
        data: Object
    },
}
</script>
