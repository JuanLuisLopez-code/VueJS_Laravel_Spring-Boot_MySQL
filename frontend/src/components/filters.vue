<template>
    <select multiple v-model="state.filters.categories">
        <option v-for="category in state.categories" :value="category.name_category" :key="category.id">
            {{ category.name_category }}
        </option>
    </select>
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
    emits: {
        filters: Object
    },
    setup() {
        const store = useStore();
        const { emit } = getCurrentInstance();
        const filters_ = { categories: [], order: 0};
        store.dispatch(`category/${Constant.INITIALIZE_CATEGORY}`);

        const state = reactive({
            categories: computed(() => store.getters['category/GetCategories']),
            filters: { ...filters_ }
        });

        const sendFilters = () => {
            emit('filters', state.filters);
        }//sendFilters

        const deleteFilters = () => {
            emit('deleteFilters', filters_);
        }//sendFilters

        return { state, sendFilters, deleteFilters }
    }
}

</script>

<style lang="scss">

</style>