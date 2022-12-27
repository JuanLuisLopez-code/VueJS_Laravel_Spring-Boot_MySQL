<template>
    <p class="search">
        <input class="search-box" type="search" name="search" id="search" placeholder="Search..."
            v-model="state.name_mesa" @change="emitSearch()" autocomplete="false" />
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" @click="search()" v-if="!isReservation" />


    </p>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
export default {
    emits: {
        emitSearch: String
    },
    props: {
        search: String
    },
    computed: {
        isReservation() {
            const path = this.$route.path.split('/');
            return path[1] == 'reservation';
        }
    },
    setup(props) {
        const router = useRouter();
        const { emit } = getCurrentInstance();
        const state = reactive({
            name_mesa: props.search ? props.search : ""
        });

        const search = () => {
            if (state.name_mesa !== "") {
                const filters = {
                    categories: [],
                    capacity: 0,
                    order: 0,
                    name_mesa: state.name_mesa,
                    page: 1,
                    limit: 9,
                };
                const filters_64 = btoa(JSON.stringify(filters));
                router.push({ name: "reservationFilters", params: { filters: filters_64 } });
            }
        }

        const emitSearch = () => {
            emit('emitSearch', state.name_mesa);
        }

        return { state, search, emitSearch };
    }
}
</script>

<style lang="scss">
.search {
    display: none;
}

@media (min-width: 426px) {

    .search {
        display: block;
        cursor: pointer;

    }

    .search-box {
        height: 28px;
        font-size: 18px;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        margin-right: 8px;
    }

}
</style>