<template>
    <div v-if="reservas">
        <DatePicker v-model="state.data" @dayclick="getDay" :attributes="state.attributes" :min-date='new Date()'
            :disabled-dates='{ weekdays: [1, 1] }' is-double-paned />
        <input type="radio" :disabled="state.dinner_check" v-model="state.dinner" name="type" value="dinner"> Dinner
        <input type="radio" :disabled="state.launch_check" v-model="state.dinner" name="type" value="launch"> Launch
        <button @click="send_data()" :disabled="!state.dinner">Reservation</button>
    </div>
    <div v-else>
        No data
    </div>
</template>

<script>
import 'v-calendar/dist/style.css';
import { createToaster } from "@meforma/vue-toaster";
import { getCurrentInstance } from 'vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
export default {
    props: {
        reservations: Object
    },
    emits: {
        send_data: Object
    },
    setup(props) {
        const { emit } = getCurrentInstance();
        const router = useRouter();
        const toaster = createToaster({ "position": "top-right", "duration": 1500 });
        let reservas = props.reservations || [];

        const fecha_noRep = Array.from(new Set(reservas.map(item => item.fecha_reserva)));

        const fecha_count = fecha_noRep.map(item => {
            let fecha_split = item.split('-');
            fecha_split[1] = fecha_split[1] - 1;
            const item_ = {
                fecha_reserva: new Date(fecha_split[0], fecha_split[1], fecha_split[2]),
                count: reservas.filter(item_ => item_.fecha_reserva === item).length,
                type_reservation: reservas.filter(item_ => item_.fecha_reserva === item)
                    .map(item_map => {
                        return item_map.type_reservation
                    })
            }
            return item_
        });

        const same_day = fecha_count.filter(item => item.count > 1);
        const different_day = fecha_count.filter(item => item.count <= 1);

        const state = reactive({
            selected_day: '',
            dinner: 0,
            launch: 0,
            dinner_check: 0,
            launch_check: 0,
            data: new Date(undefined),
            attributes: [
                {
                    highlight: 'red',
                    dates: same_day.map(item => item.fecha_reserva)

                },
                {
                    highlight: 'green',
                    dates: different_day.map(item => item.fecha_reserva)
                },
            ]
        })
        state.dinner_check = 1;
        state.launch_check = 1;
        const getDay = () => {
            state.dinner_check = 0;
            state.launch_check = 0;
            state.dinner = 0;
            state.launch = 0;
            if (state.data == null) {
                state.dinner_check = 1;
                state.launch_check = 1;
            } else {
                const full_date = `${state.data.getFullYear()}-${state.data.getMonth() + 1}-${state.data.getDate()}`;
                state.selected_day = full_date;
                fecha_count.map(item => {
                    const full_date_item = `${item.fecha_reserva.getFullYear()}-${item.fecha_reserva.getMonth() + 1}-${item.fecha_reserva.getDate()}`;
                    if (full_date_item == full_date) {
                        if (item.count > 1) {
                            state.dinner_check = 1;
                            state.launch_check = 1;
                            toaster.error('Day completed');
                        } else {
                            if (item.type_reservation[0] == 'dinner') {
                                state.dinner_check = 1;
                                state.launch_check = 0;
                            } else if (item.type_reservation[0] == 'launch') {
                                state.dinner_check = 0;
                                state.launch_check = 1;
                            }
                        }
                    }
                });
            }
        }

        const send_data = () => {
            let data = {
                fecha_reserva: state.selected_day,
                type_reservation: state.dinner
            }
            localStorage.removeItem('date')
            emit('send_data', data);
        }

        return { state, getDay, send_data, reservas }
    }

}
</script>