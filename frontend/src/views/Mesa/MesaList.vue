<template>
    <button @click="updateMesa()">UPDATE</button>
    <button @click="deleteMesa()">DELETE</button>
    <DataTable class="display" :options="{ select: true }" :columns="columns" :data="state.mesas" ref="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Capacity</th>
                <th>Photo</th>
                <th>Active</th>
            </tr>
        </thead>
    </DataTable>
</template>

<script>
import { ref, onMounted, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Constant from '../../Constant';
import { createToaster } from "@meforma/vue-toaster";
import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net';
import 'datatables.net-select';
export default {
    components: { DataTable },
    setup() {
        const store = useStore();
        const router = useRouter();
        const toaster = createToaster({ position: "top-right" });
        DataTable.use(DataTablesLib);

        store.dispatch(`mesaDashboard/${Constant.INITIALIZE_MESA}`)

        const state = reactive({
            mesas: computed(() => store.getters["mesaDashboard/getMesas"])
        })

        const columns = [
            { data: 'id' },
            { data: 'name_mesa' },
            { data: 'capacity' },
            { data: 'photo' },
            { data: 'is_active' },
        ];

        let dt;
        const table = ref();
        onMounted(() => {
            dt = table.value.dt();
        });

        const createMesa = () => {
            router.push({ name: "createMesa" })
        }

        const updateMesa = () => {
            const indexs = dt.rows({ selected: true })[0];
            if (indexs.length === 1) {
                const id = state.mesas[indexs[0]].id;
                router.push({ name: 'updateMesa', params: { id } })
            } else {
                toaster.info('You have to select ONE mesa');
            }
        }

        const deleteMesa = () => {
            const indexs = dt.rows({ selected: true })[0];
            if (indexs.length > 0) {
                dt.rows({ selected: true }).every(index => store.dispatch(`mesaDashboard/${Constant.DELETE_ONE_MESA}`, state.mesas[index].id));
            } else {
                toaster.info('You have to at last ONE mesa');
            }
        }

        return { createMesa, updateMesa, deleteMesa, columns, table, state }
    }
}
</script>

<style lang="scss">
@import 'datatables.net-dt';
</style>