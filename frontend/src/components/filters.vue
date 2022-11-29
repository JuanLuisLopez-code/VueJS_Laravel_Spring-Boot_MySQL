<template>
    <v-select multiple v-model="state.filters.categories" :options="state.categories" />
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

        store.dispatch(`category/${Constant.INITIALIZE_CATEGORY}`);

        const state = reactive({
            categories: store.getters['category/GetCategories'].map(item => item.name_category),
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
@import '../../node_modules/vue-select/dist/vue-select.css'
</style>