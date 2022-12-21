<template>
    <DatePicker v-model="state.data" @dayclick="getDay" :attributes="state.attributes" is-double-paned />
    <!-- <DatePicker v-model="state.data" @dayclick="getDay" :attributes="state.attributes" :min-date='new Date()'
        :disabled-dates='{ weekdays: [1, 1] }' is-double-paned /> -->
    <input type="radio" :disabled="state.dinner_check" v-model="state.dinner" name="type" value="dinner"> Dinner
    <input type="radio" :disabled="state.launch_check" v-model="state.dinner" name="type" value="launch"> Launch
    <button @click="send_data()" :disabled="!state.dinner">Reservation</button>
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
        const { emit } = getCurrentInstance();

        const toaster = createToaster({ "position": "top-right", "duration": 1500 });

        for (let i = 0; i < props.reservations.length; i++) {
            let num = props.reservations[i].fecha_reserva.split('-');
            num[1] = num[1] - 1;
            props.reservations[i].fecha_reserva = num.join(',');
        }

        let same_day = []
        let different_day = []

        const fecha_noRep = Array.from(new Set(props.reservations.map(item => item.fecha_reserva)));

        const fecha_count = fecha_noRep.map(item => {
            const item_ = {
                fecha_reserva: item,
                count: props.reservations.filter(item_ => item_.fecha_reserva === item).length,
                type_reservation: props.reservations.filter(item_ => item_.fecha_reserva === item)
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

        return { state, getDay, send_data }
    }

}
</script>