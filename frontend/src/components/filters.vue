<template>
    <select multiple v-model="state.filters.categories">
        <option v-for="category in state.categories" :value="category.name_category" :key="category.id">
            {{ category.name_category }}
        </option>
    </select>
    <input type="number" min="0" v-model="state.filters.capacity" />
    <select v-model="state.filters.order">
        <option :value="0" disabled hidden selected>Order</option>
        <option :value="1">Asc to Desc</option>
        <option :value="2">Desc to Asc</option>
    </select>
    <button @click="sendFilters()">Filtrar</button>
    <button @click="deleteFilters()">Borrar</button>
</template>

<script>
import Constant from '../Constant';
import { useStore } from 'vuex'
import { reactive, computed, getCurrentInstance } from 'vue';
export default {
    props: {
        filters: Object
    },
    emits: {
        filters: Object,
        deleteFilters: Object
    },
    setup(props) {
        const store = useStore();
        const { emit } = getCurrentInstance();
        const filters_empty = { categories: [], order: 0, capacity: 0 };

        store.dispatch(`category/${Constant.INITIALIZE_CATEGORY}`);

        const state = reactive({
            categories: computed(() => store.getters['category/GetCategories']),
            filters: { ...props.filters }
        });

        const sendFilters = () => {
            emit('filters', state.filters);
        }//sendFilters

        const deleteFilters = () => {
            state.filters.categories = [];
            state.filters.order = 0;
            state.filters.capacity = 0;
            emit('deleteFilters', state.filters);
        }//sendFilters

        return { state, sendFilters, deleteFilters }
    }
}

</script>

<style lang="scss">

</style>