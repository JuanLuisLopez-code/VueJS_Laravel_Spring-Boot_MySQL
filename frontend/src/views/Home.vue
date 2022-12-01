<template>
    <h1 class="header_title">
        <font-awesome-icon icon="fa-solid fa-fish-fins" />
        Categories
        <font-awesome-icon icon="fa-solid fa-fish-fins" />
    </h1>
    <carouselVue :data="state.categories" v-if="state.categories" @emitAction="redirectReservation" />
    <span v-else>The carousel is not available</span>
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import Constant from '../Constant';
import carouselVue from '../components/carousel.vue';
import { useRouter } from 'vue-router';

export default {
    components: { carouselVue },
    setup() {
        const router = useRouter();
        const store = useStore();

        store.dispatch(`category/${Constant.INITIALIZE_CATEGORY}`);

        const state = reactive({
            categories: computed(() => store.getters['category/GetCategories'])
        });

        const redirectReservation = (item) => {
            const filters = {
                categories: [item.name_category],
                capacity: 0,
                order: 0,
                name_mesa: "",
            };
            const filters_ = btoa(JSON.stringify(filters));
            router.push({ name: "reservationFilters", params: { filters: filters_ } });
        }

        return { state, redirectReservation };
    }
}
</script>

<style lang="scss">
.header_title {
    text-align: center;
}
</style>