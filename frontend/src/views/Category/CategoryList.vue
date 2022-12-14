<template>
    <font-awesome-icon icon="fa-solid fa-arrow-left" class="fa-2x" style="cursor:pointer; margin-left:0.2em;"
        @click="redirects.return()" />
    <div class="categoriList">
        <h1>Categories</h1><br>
        <div v-if="state.categories">
            <button class="pulse create" @click="redirects.create()">CREATE</button>
            <button @click="updateCategory()" class="pulse update">UPDATE</button>
            <button @click="deleteCategory()" class="pulse delete">DELETE</button>
        </div>
        <DataTable class="display" :options="{ select: true }" :columns="columns" :data="state.categories" ref="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Photo</th>
                </tr>
            </thead>
        </DataTable>
    </div>
</template>

<script>
import { reactive, computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import Constant from '../../Constant';
import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net';
import { createToaster } from "@meforma/vue-toaster";
import { useRouter } from 'vue-router';
import 'datatables.net-select';

export default {
    components: { DataTable },
    setup() {
        const toaster = createToaster({ "position": "top-right", "duration": 1500 });
        const store = useStore();
        const router = useRouter();
        DataTable.use(DataTablesLib);

        store.dispatch(`categoryDashboard/${Constant.INITIALIZE_CATEGORY}`);

        const state = reactive({
            categories: computed(() => store.getters['categoryDashboard/GetCategories'])
        });

        const columns = [
            { data: 'id' },
            { data: 'name_category' },
            { data: 'photo' },
        ];

        let dt;
        const table = ref();
        onMounted(() => {
            dt = table.value.dt();
        });

        const updateCategory = () => {
            const indexs = dt.rows({ selected: true })[0];
            if (indexs.length === 1) {
                const id = state.categories[indexs[0]].id;
                router.push({ name: 'categoriesUpdate', params: { id } })
            } else {
                toaster.info('You have to select ONE category');
            }
        };

        const deleteCategory = () => {
            const indexs = dt.rows({ selected: true })[0];
            if (indexs.length > 0) {
                dt.rows({ selected: true }).every(index => store.dispatch(`categoryDashboard/${Constant.DELETE_CATEGORY}`, state.categories[index].id));
            } else {
                toaster.info('You have to select at last ONE category');
            }
        };

        const redirects = {
            create: () => router.push({ name: 'categoriesCreate' }),
            return: () => router.push({ name: 'dashboard' }),
        };

        return { state, columns, table, updateCategory, deleteCategory, redirects };
    }
}
</script>

<style lang="scss">
@import 'datatables.net-dt';

.categoriList {
    h1 {
        text-align: center;
    }

    .pulse:hover,
    .pulse:focus {
        animation: pulse 1s;
        box-shadow: 0 0 0 2em transparent;
    }

    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 var(--hover);
        }
    }

    $colors: (
        create: green,
        update: blue,
        delete: red,
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
    margin: 0.5em;
    padding: 1em 2em;
}

}
</style>