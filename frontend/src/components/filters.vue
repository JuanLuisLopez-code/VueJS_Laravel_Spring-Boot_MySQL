<template>
    <div v-if="state.categories">
        <v-select multiple v-model="state.filters.categories" :options="state.categories" />
    </div>
    <div v-else>
        <span>Can not filter by categories</span>
    </div>

    <div class="container_filter_search">
        <searchVue :search="state.filters.name_mesa" @emitSearch="updateSearch" />
    </div>
    <div class="container_filter">
        <input type="number" min="0" v-model="state.filters.capacity" class="input_capacity"
            v-if="(state.filters.order == 0)" />
        <label class="delete" v-if="(state.filters.order == 0)" @click="resetFilters.capacity()">X</label>
        <label>Capacity (0 is all)</label>
        <select v-model="state.filters.order" class="select_order" v-if="(state.filters.capacity == 0)">
            <option :value="0" disabled hidden selected>Capacity Order</option>
            <option :value="1">Asc to Desc</option>
            <option :value="2">Desc to Asc</option>
        </select>
        <label class="delete" v-if="(state.filters.capacity == 0)" @click="resetFilters.order()">X</label>
        <button class="raise" @click="sendFilters()">Filter</button>
        <button class="raise" @click="deleteFilters()">Clear</button>
    </div>
</template>

<script>
import Constant from '../Constant';
import { useStore } from 'vuex'
import { reactive, getCurrentInstance, computed } from 'vue';
import searchVue from './search.vue';
export default {
    components: { searchVue },
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
            categories: computed(() => store.getters['category/GetCategories']?.map(item => item.name_category)),
            filters: { ...props.filters }
        });

        const sendFilters = () => {
            emit('filters', state.filters);
        }//sendFilters

        const deleteFilters = () => {
            state.filters.categories = [];
            state.filters.order = 0;
            state.filters.capacity = 0;
            state.filters.name_mesa = "";
            emit('deleteFilters', state.filters);
        }//sendFilters

        const updateSearch = (search) => {
            state.filters.name_mesa = search;
        }

        const resetFilters = {
            capacity: () => { state.filters.capacity = 0; sendFilters(); },
            order: () => { state.filters.order = 0; sendFilters(); }
        };

        return { state, sendFilters, deleteFilters, updateSearch, resetFilters }
    }
}

</script>

<style lang="scss">
@import '../../node_modules/vue-select/dist/vue-select.css';

.container_filter_search {
    display: flex;
    background-color: transparent;
    align-items: center;
    background-color: whitesmoke;
}

.container_filter {
    padding: 1%;
    display: flex;
    background-color: transparent;
    align-items: center;
    background-color: whitesmoke;

    .delete {
        border: 1px #ffa260 solid;
        border-radius: 100%;
        padding: 0.5%;
        cursor: pointer;
    }

    &:hover,
    &:focus {
        border-color: var(--hover);
        color: #000;
    }

    label {
        margin-left: 1em;
    }

    .input_capacity {
        text-align: center;
        display: flex;
        margin-left: 15%;
        width: 4%;
    }

    .select_order {
        display: flex;
        margin-left: 15%;
    }

    .raise:hover,
    .raise:focus {
        box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
        transform: translateY(-0.25em);
    }

    $colors: (
        raise: #ffa260,
    );

@each $button,
$color in $colors {
    .#{$button} {
        --color: #{$color};
        --hover: #{adjust-hue($color, 45deg)};
    }
}

button {
    color: var(--color);
    transition: 0.25s;

    &:hover,
    &:focus {
        border-color: var(--hover);
        color: #000;
    }
}

button {
    background: none;
    border: 2px solid;
    font: inherit;
    line-height: 1;
    margin-left: 5%;
    padding: 0.5em 1em;
    border-radius: 200%;
}
}
</style>