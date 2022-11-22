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
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="mesa in mesas">
                        <td>{{ mesa.id }}</td>
                        <td>{{ mesa.name_mesa }}</td>
                        <td>{{ mesa.capacity }}</td>
                        <td>{{ mesa.photo }}</td>
                        <td>
                            <button class="pulse">Edit</button>
                        </td>
                        <td>
                            <button class="pulse" @click="deleteMesa(mesa.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
</template>

<script>
import { useStore } from 'vuex';
import Constant from '../Constant';
export default {
    props: {
        mesas: Object,
    },
    setup() {
        const store = useStore();
        const deleteMesa = (id) => {
            store.dispatch(`mesaDashboard/${Constant.DELETE_ONE_MESA}`, { id })
        }
        return { deleteMesa }
    }
}
</script>
<style>

</style>