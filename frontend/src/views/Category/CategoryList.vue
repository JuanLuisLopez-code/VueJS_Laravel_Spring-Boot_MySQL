<template>
    <DataTable class="display" :options="{ select: true }" :columns="columns" :data="state.categories">
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
import { reactive, computed, ref } from 'vue';
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

        return { state, columns };
    }
}
</script>

<style lang="scss">
@import 'datatables.net-dt';
</style>