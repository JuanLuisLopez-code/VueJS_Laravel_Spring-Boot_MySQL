<template>
    <div class="container_filter">
        <v-select multiple v-model="state.filters.categories" :options="state.categories" />
        <input type="number" min="0" v-model="state.filters.capacity" class="input_capacity" />
        <select v-model="state.filters.order" class="select_order">
            <option :value="0" disabled hidden selected>Order</option>
            <option :value="1">Asc to Desc</option>
            <option :value="2">Desc to Asc</option>
        </select>
        <button class="raise" @click="sendFilters()">Filtrar</button>
        <button class="raise" @click="deleteFilters()">Borrar</button>
    </div>
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
@import '../../node_modules/vue-select/dist/vue-select.css';

.container_filter {
    padding: 1%;
    display: flex;
    background-color: transparent;
    align-items: center;
    background-color: whitesmoke;

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
        color: #fff;
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