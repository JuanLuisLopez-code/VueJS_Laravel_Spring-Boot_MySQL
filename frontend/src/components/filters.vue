<template>
    <select multiple v-model="state.filters.categories">
        <option v-for="category in state.categories" :value="category.name_category" :key="category.id">
            {{ category.name_category }}
        </option>
    </select>
    <button @click="sendFilters()">Filtrar</button>
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
        const filters_ = { categories: [] };
        store.dispatch(`category/${Constant.INITIALIZE_CATEGORY}`);

        const state = reactive({
            categories: computed(() => store.getters['category/GetCategories']),
            filters: { ...filters_ }
        });

        const sendFilters = () => {
            emit('filters', state.filters);
        }//sendFilters

        return { state, sendFilters }
    }
}

</script>

<style lang="scss">

</style>