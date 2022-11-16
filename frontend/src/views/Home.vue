<template>
    <h1>
        <font-awesome-icon icon="fa-solid fa-fish-fins" />
        Categories
        <font-awesome-icon icon="fa-solid fa-fish-fins" />
    </h1>
    <carouselVue :data="state.categories" />
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import Constant from '../Constant';
import carouselVue from '../components/carousel.vue';

export default {
    components: { carouselVue },
    setup() {
        const store = useStore();
        store.dispatch(`category/${Constant.INITIALIZE_CATEGORY}`);

        const state = reactive({
            categories: computed(() => store.getters['category/GetCategories'])
        });

        return { state };
    }
}
</script>

<style lang="scss">
h1 {
    text-align: center;
}
</style>