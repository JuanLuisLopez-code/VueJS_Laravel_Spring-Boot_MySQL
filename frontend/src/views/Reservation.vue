<template>
    <filters @filters="ApplyFilters" @deleteFilters="deleteAllFilters" :filters="filters_URL" />
    <div class="container_gallery" v-if="state.mesas.length > 0">
        <div class="gallery">
            <card_mesa v-for="mesa in state.mesas" :key="mesa.id" :mesa="mesa" />
        </div>
        <paginate v-model="state.page" :page-count="state.totalPages" :page-range="3" :margin-pages="2"
            :click-handler="clickCallback" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'"
            :page-class="'page-item'">
        </paginate>
    </div>
    <div v-else>
        <span>No tables</span>
    </div>
</template>

<script>
import { reactive } from 'vue'
import card_mesa from '../components/card_mesa.vue';
import filters from '../components/filters.vue';
import { useRouter, useRoute } from 'vue-router';
import { useMesaFilters } from '../composables/mesas/useMesa';
import { useMesaPaginate } from '../composables/mesas/useMesa';
import Paginate from 'vuejs-paginate-next';
export default {
    components: { card_mesa, filters, Paginate },
    setup() {
        const route = useRoute();
        const router = useRouter();

        let filters_URL = {
            categories: [],
            capacity: 0,
            order: 0,
            name_mesa: "",
            page: 1,
            limit: 9,
        };


        try {
            if (route.params.filters !== '') {
                filters_URL = JSON.parse(atob(route.params.filters));
            }
        } catch (error) {
        }

        const state = reactive({
            mesas: useMesaFilters(filters_URL),
            page: filters_URL.page,
            totalPages: useMesaPaginate(filters_URL)
        });

        const ApplyFilters = (filters) => {
            const filters_64 = btoa(JSON.stringify(filters));
            router.push({ name: "reservationFilters", params: { filters: filters_64 } });
            state.mesas = useMesaFilters(filters);
            state.totalPages = useMesaPaginate(filters);

        }

        const deleteAllFilters = (deleteFilters) => {
            router.push({ name: "reservation" });
            state.mesas = useMesaFilters(deleteFilters);
            state.page = 1;
            filters_URL = deleteFilters;
            state.totalPages = useMesaPaginate(deleteFilters);
        }

        const clickCallback = (pageNum) => {
            try {
                if (route.params.filters !== '') {
                    filters_URL = JSON.parse(atob(route.params.filters));
                }
            } catch (error) {
            }
            filters_URL.page = pageNum;
            state.page = pageNum;
            ApplyFilters(filters_URL)
        }

        return { state, ApplyFilters, deleteAllFilters, filters_URL, clickCallback }
    }
}
</script>

<style lang="scss">
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";


.container_gallery {
    max-width: 93.5rem;
    margin: 1.3%;
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