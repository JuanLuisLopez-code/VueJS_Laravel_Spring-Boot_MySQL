<template>
    <filters @filters="ApplyFilters" />
    <div class="container_gallery" v-if="state.mesas.length > 0">
        <div class="gallery">
            <card_mesa v-for="mesa in state.mesas" :key="mesa.id" :mesa="mesa" />
        </div>
    </div>
    <div v-else>
        <span>No Mesas</span>
    </div>
</template>

<script>
import { reactive } from 'vue'
import card_mesa from '../components/card_mesa.vue';
import filters from '../components/filters.vue';
import { useRouter, useRoute } from 'vue-router';
import { useMesaFilters } from '../composables/mesas/useMesa';
export default {
    components: { card_mesa, filters },
    setup() {
        const route = useRoute();
        const router = useRouter();

        let filters_URL = [];
        try {
            filters_URL = JSON.parse(atob(route.params.filters));
        } catch (error) {
        }

        const state = reactive({
            mesas: useMesaFilters(filters_URL)
        });

        const ApplyFilters = (filters) => {
            const filters_64 = btoa(JSON.stringify(filters));
            router.push({ name: "reservationFilters", params: { filters: filters_64 } });
            state.mesas = useMesaFilters(filters);
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