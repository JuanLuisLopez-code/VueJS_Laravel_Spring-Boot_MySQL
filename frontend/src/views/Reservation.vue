<template>
    <filters @filters="ApplyFilters" />
    <div class="container_gallery">
        <div class="gallery">
            <card_mesa v-for="mesa in state.mesas" :key="mesa.id" :mesa="mesa" />
        </div>
    </div>
</template>

<script>
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import Constant from '../Constant';
import card_mesa from '../components/card_mesa.vue';
import filters from '../components/filters.vue';
import { useRouter, useRoute } from 'vue-router';
import { useMesaFilters } from '../composables/mesas/useMesa';
export default {
    components: { card_mesa, filters },
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        // try {
        //     const filters_URL = JSON.parse(atob(route.params.filters));
        //     store.dispatch(`mesa/${Constant.INITIALIZE_MESA}`, filters_URL)
        // } catch (error) {
        //     store.dispatch(`mesa/${Constant.INITIALIZE_MESA}`)
        // }

        // const state = reactive({
        //     mesas: computed(() => store.getters["mesa/getMesas"])
        // })

        // let state = [];

        // let state = reactive({
        //     mesas: []
        // })

        let filters_URL = [];
        try {
            filters_URL = JSON.parse(atob(route.params.filters));
        } catch (error) {
            // console.error(error)
        }
        const { mesas } = useMesaFilters(filters_URL);
        console.log(mesas);
        const state = reactive({
            mesas: mesas
        });

        const ApplyFilters = (filters) => {
            console.log(state, "('------------');");
            const filters_64 = btoa(JSON.stringify(filters));
            router.push({ name: "reservationFilters", params: { filters: filters_64 } });
            state = useMesaFilters(filters);
            console.log(state, "hghghghgh");

            // store.dispatch(`mesa/${Constant.INITIALIZE_MESA}`, filters);
        }

        return { state, ApplyFilters }
    }
}
</script>

<style lang="scss">
.container_gallery {
    max-width: 93.5rem;
    margin: 2.43%;
    padding: 0 2rem;
}

.gallery {
    display: flex;
    flex-wrap: wrap;
    margin: -1rem -1rem;
    padding-bottom: 3rem;
}

@supports (display: grid) {
    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
        grid-gap: 2rem;
    }

}
</style>