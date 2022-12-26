<template>
    <table class="table-fill">
        <thead>
            <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Photo</th>
                <th class="text-left">Check reservation</th>
            </tr>
        </thead>
        <tbody class="table-hover">
            <tr v-for="mesa in state.mesas">
                <td class="text-left">{{ mesa.name_mesa }} (ID: {{ mesa.id }})</td>
                <td class="text-left"><img :src="mesa.photo" alt="" style="width: 10em;"></td>
                <td class="text-left"><button @click="getId(mesa.id)">Check</button></td>
            </tr>
        </tbody>
    </table>
    <br>
    <br>
    <listReservationOfMesa v-if="state.mesa_id != null" :id="state.mesa_id" :key="state.count_refresh" />
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useShowUserReservation } from '../composables/reservation/useReservation'
import listReservationOfMesa from './listReservationOfMesa.vue';
export default {
    components: { listReservationOfMesa },
    setup() {
        const store = useStore();

        const state = reactive({
            profile: store.getters['user/GetProfile'],
            mesas: useShowUserReservation(),
            mesa_id: null,
            count_refresh: 0
        })

        const getId = (id) => {
            state.mesa_id = id;
            state.count_refresh++;
        }

        return { state, getId };
    }

}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700,300,100);

div.table-title {
    display: block;
    margin: auto;
    max-width: 600px;
    padding: 5px;
    width: 100%;
}

.table-title h3 {
    color: #fafafa;
    font-size: 30px;
    font-weight: 400;
    font-style: normal;
    font-family: "Roboto", helvetica, arial, sans-serif;
    text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
    text-transform: uppercase;
}


/*** Table Styles **/

.table-fill {
    background: white;
    border-radius: 3px;
    border-collapse: collapse;
    height: 320px;
    margin: auto;
    max-width: 600px;
    padding: 5px;
    width: 100%;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    animation: float 5s infinite;
}

th {
    color: #D5DDE5;
    ;
    background: #1b1e24;
    border-bottom: 4px solid #9ea7af;
    border-right: 1px solid #343a45;
    font-size: 23px;
    font-weight: 100;
    padding: 24px;
    text-align: left;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    vertical-align: middle;
}

th:first-child {
    border-top-left-radius: 3px;
}

th:last-child {
    border-top-right-radius: 3px;
    border-right: none;
}

tr {
    border-top: 1px solid #C1C3D1;
    color: #666B85;
    font-size: 16px;
    font-weight: normal;
    text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
}

tr:hover td {
    background: #4E5066;
    color: #FFFFFF;
    border-top: 1px solid #22262e;
}

tr:first-child {
    border-top: none;
}

tr:last-child {
    border-bottom: none;
}

tr:nth-child(odd) td {
    background: #EBEBEB;
}

tr:nth-child(odd):hover td {
    background: #4E5066;
}

tr:last-child td:first-child {
    border-bottom-left-radius: 3px;
}

tr:last-child td:last-child {
    border-bottom-right-radius: 3px;
}

td {
    background: #FFFFFF;
    padding: 20px;
    text-align: left;
    vertical-align: middle;
    font-weight: 300;
    font-size: 18px;
    text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
    border-right: 1px solid #C1C3D1;
}

td:last-child {
    border-right: 0px;
}

th.text-left {
    text-align: left;
}

th.text-center {
    text-align: center;
}

th.text-right {
    text-align: right;
}

td.text-left {
    text-align: left;
}

td.text-center {
    text-align: center;
}

td.text-right {
    text-align: right;
}
</style>