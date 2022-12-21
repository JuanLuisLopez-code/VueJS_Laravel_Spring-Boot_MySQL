<template>
    <font-awesome-icon icon="fa-solid fa-arrow-left" class="fa-2x" style="cursor:pointer; margin-left:0.2em;"
        @click="redirects.return()" />
    <div class="categoriList">
        <h1>Reservation</h1><br>
        <div v-if="state.reservations">
            <button @click="updateReservation()" class="pulse update">UPDATE</button>
            <button @click="deleteReservation()" class="pulse delete">DELETE</button>
            <button @click="activateDeactivete(true)" class="pulse create">ACTIVATE</button>
            <button @click="activateDeactivete(false)" class="pulse delete">DEACTIVATE</button>
        </div>
        <DataTable class="display" :options="{ select: true }" :columns="columns" :data="state.reservations"
            ref="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Reservation type</th>
                    <th>Mesa</th>
                    <th>User</th>
                    <th>Accepted</th>
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
        store.dispatch(`reservationDashboard/${Constant.INITIALIZE_RESERVATION}`);

        const state = reactive({
            reservations: computed(() => store.getters['reservationDashboard/GetReservations'])
        });

        const columns = [
            { data: 'id' },
            { data: 'fecha_reserva' },
            { data: 'type_reservation' },
            { data: 'mesa_id' },
            { data: 'user_id' },
            { data: 'accepted' },
        ];

        let dt;
        const table = ref();
        onMounted(() => {
            dt = table.value.dt();
        });

        const redirects = {
            return: () => router.push({ name: 'dashboard' }),
        };


        const updateReservation = () => {
            const indexs = dt.rows({ selected: true })[0];
            if (indexs.length === 1) {
                const id = state.reservations[indexs[0]].id;
                router.push({ name: 'updateReservation', params: { id } })
            } else {
                toaster.info('You have to select ONE reservation');
            }
        };

        const deleteReservation = () => {
            const indexs = dt.rows({ selected: true })[0];
            if (indexs.length > 0) {
                dt.rows({ selected: true }).every(index => store.dispatch(`reservationDashboard/${Constant.DELETE_RESERVATION}`, state.reservations[index].id));
            } else {
                toaster.info('You have to select at last ONE reservation');
            }
        };

        const activateDeactivete = (status) => {
            const indexs = dt.rows({ selected: true })[0];
            if (indexs.length > 0) {
                dt.rows({ selected: true }).every(index => {
                    const data = state.reservations[index];
                    if (data.accepted != status) {
                        data.accepted = status;
                        store.dispatch(`reservationDashboard/${Constant.UPDATE_RESERVATION}`, data);
                    }
                });
            } else {
                toaster.info('You have to select at last ONE reservation');
            }
        }

        return { state, columns, table, redirects, updateReservation, deleteReservation, activateDeactivete };
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