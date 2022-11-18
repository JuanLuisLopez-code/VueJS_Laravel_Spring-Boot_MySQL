<template>

    <body>
        <div class="container crud-table">
            <div class="clearfix">
                <div class="form-inline pull-left">
                    <button class="btn btn-success"><span class="glyphicon glyphicon-plus">
                        </span>Add more user</button>
                </div>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Capacity</th>
                        <th>Photo</th>

                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="mesa in state.mesas">
                        <td>{{ mesa.id }}</td>
                        <td>{{ mesa.name_mesa }}</td>
                        <td>{{ mesa.capacity }}</td>
                        <td>{{ mesa.photo }}</td>
                        <td>
                            <button class="btn btn-primary">Edit</button>
                        </td>
                        <td>
                            <button class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
</template>

<script>

import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net';
DataTable.use(DataTablesLib);
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import Constant from '../../Constant';
export default {
    components: { DataTable },
    setup() {
        const store = useStore();

        store.dispatch(`mesaDashboard/${Constant.INITIALIZE_MESA}`)

        const state = reactive({
            mesas: computed(() => store.getters["mesaDashboard/getMesas"])
        })
        return { state }
    }

}
</script>

<style lang="sass">


</style>