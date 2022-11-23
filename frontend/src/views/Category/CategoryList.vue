<template>
    <router-link to="/dashboard/categories/create">
        <button>CREATE</button>
    </router-link>
    <button @click="updateCategory()">UPDATE</button>
    <button @click="deleteCategory()">DELETE</button>
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

        function updateCategory() {
            const indexs = dt.rows({ selected: true })[0];
            if (indexs.length === 1) {
                const id = state.categories[indexs[0]].id;
                router.push({ name: 'categoriesUpdate', params: { id } })
            } else {
                toaster.info('You have to select ONE category');
            }
        };

        function deleteCategory() {
            const indexs = dt.rows({ selected: true })[0];
            if (indexs.length > 0) {
                dt.rows({ selected: true }).every(index => store.dispatch(`categoryDashboard/${Constant.DELETE_CATEGORY}`, state.categories[index].id));
            } else {
                toaster.info('You have to at last ONE category');
            }
        };

        return { state, columns, table, updateCategory, deleteCategory };
    }
}
</script>

<style lang="scss">
@import 'datatables.net-dt';
</style>