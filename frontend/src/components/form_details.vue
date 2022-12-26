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
export default {
    props: {
        reservations: Object
    },
    emits: {
        send_data: Object
    },
    setup(props) {
        let reservas = props.reservations;
        if (props.reservations.length > 0) {
            sessionStorage.setItem("reservations", JSON.stringify(props.reservations))
        } else {
            reservas = JSON.parse(sessionStorage.getItem("reservations"))
        }
        const { emit } = getCurrentInstance();

        const toaster = createToaster({ "position": "top-right", "duration": 1500 });
        let same_day = []
        let different_day = []

        if (reservas) {
            for (let i = 0; i < reservas.length; i++) {
                let num = reservas[i].fecha_reserva.split('-');
                num[1] = num[1] - 1;
                reservas[i].fecha_reserva = num.join(',');
            }

            const fecha_noRep = Array.from(new Set(reservas.map(item => item.fecha_reserva)));

            const fecha_count = fecha_noRep.map(item => {
                const item_ = {
                    fecha_reserva: item,
                    count: reservas.filter(item_ => item_.fecha_reserva === item).length,
                    type_reservation: reservas.filter(item_ => item_.fecha_reserva === item)
                        .map(item_map => {
                            return item_map.type_reservation
                        })
                }

                if (item_.count > 1) {
                    same_day.push(item_.fecha_reserva)
                } else {
                    different_day.push(item_.fecha_reserva)
                }
                return item_
            });
        }
        const state = reactive({
            dinner: 0,
            launch: 0,
            dinner_check: 0,
            launch_check: 0,
            data: new Date(undefined),
            attributes: [
                {
                    highlight: 'red',
                    dates: same_day.map((item) => {
                        let day = item.split(',');
                        return new Date(day[0], day[1], day[2]);
                    })
                    ,
                },
                {
                    highlight: 'green',
                    dates: different_day.map((item) => {
                        let day = item.split(',');
                        return new Date(day[0], day[1], day[2]);
                    })
                    ,
                },
            ]
        })
        state.dinner_check = 1;
        state.launch_check = 1;
        const getDay = () => {
            let full_date = [];
            state.dinner_check = 0;
            state.launch_check = 0;
            state.dinner = 0;
            state.launch = 0;
            if (state.data == null) {
                state.dinner_check = 1;
                state.launch_check = 1;
            } else {
                full_date.push(String(state.data.getFullYear()), String(state.data.getMonth()), state.data.getDate());
                fecha_count.map(item => {
                    if (item.fecha_reserva == full_date.join()) {
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
                full_date = [];
                full_date.push(String(state.data.getFullYear()), String(state.data.getMonth() + 1), state.data.getDate());
                localStorage.setItem('date', full_date.join('-'))
            }
        }

        const send_data = () => {
            let data = {
                fecha_reserva: localStorage.getItem('date'),
                type_reservation: state.dinner
            }
            localStorage.removeItem('date')
            emit('send_data', data);
        }

        return { state, getDay, send_data, reservas }
    }

}
</script>