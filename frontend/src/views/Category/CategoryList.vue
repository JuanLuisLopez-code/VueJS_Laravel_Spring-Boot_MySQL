<template>
    <button @click="test()">log</button>
    <router-link to="/dashboard/categories/create">
        <button>CREATE</button>
    </router-link>
    <button>UPDATE</button>
    <button>DELETE</button>
    <DataTable class="display" :options="{ select: true }" :columns="columns" :data="state.categories" ref="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Photo</th>
            </tr>
        </thead>
    </DataTable>
</template>

<script>
import { reactive, computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import Constant from '../../Constant';
import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net';
import 'datatables.net-select';
DataTable.use(DataTablesLib);

export default {
    components: { DataTable },
    setup() {
        const store = useStore();
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

        function test() {
            const indexs = dt.rows({ selected: true })[0];
            const cant = indexs.length;
            console.log(indexs, cant);
            dt.rows({ selected: true }).every(index => console.log(state.categories[index]));
        }

        return { state, columns, table, test };
    }
}
</script>

<style lang="scss">
@import 'datatables.net-dt';
</style>