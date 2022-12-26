<template>
    <table class="table-fill">
        <thead>
            <tr>
                <th class="text-left">fecha_reserva</th>
                <th class="text-left">type_reservation</th>
                <th class="text-left">Update</th>
                <th class="text-left">Delete</th>
            </tr>
        </thead>
        <tbody class="table-hover">
            <tr v-for="mesa in state.reservations">
                <td class="text-left">{{ mesa.fecha_reserva }}</td>
                <td class="text-left">{{ mesa.type_reservation }}</td>
                <td class="text-left"><button @click="update_reservation(mesa.id)">Update</button></td>
                <td class="text-left"><button @click="delete_reservation(mesa.id)">Delete</button></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import 'v-calendar/dist/style.css';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { reactive, computed } from 'vue'
import Constant from '../Constant';
import { useListReservationsOfMesa, deleteReservation } from '../composables/reservation/useReservation'
export default {
    components: { useListReservationsOfMesa, deleteReservation },
    props: {
        id: Number
    },
    setup(props) {
        const router = useRouter();

        const store = useStore();

        store.dispatch(`mesa/${Constant.INITIALIZE_ONE_STATE_MESA}`, props.id)
        const state = reactive({
            mesas: computed(() => store.getters["mesa/getOneMesa"]),
            reservations: useListReservationsOfMesa(props.id),
        })

        const update_reservation = (id) => {
            router.push({ name: "updateReservation", params: { id } })
        }

        const delete_reservation = (id) => {
            const check = deleteReservation(id);
            if (check) {
                state.reservations = state.reservations.filter(item => item.id !== id)
            }
        }

        return { state, delete_reservation, update_reservation };
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