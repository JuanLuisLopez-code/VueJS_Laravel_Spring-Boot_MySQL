<template>
    <DatePicker v-model="state.data" @dayclick="modelo" :attributes="state.attributes" :min-date='new Date()'
    :disabled-dates='{ weekdays: [1, 1] }' is-double-paned />
    <span>{{ reservations }}</span>
</template>

<script>
import 'v-calendar/dist/style.css';
import { reactive } from 'vue';
export default {
    props: {
        reservations: Object
    },
    setup(props) {
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
                count: props.reservations.filter(item_ => item_.fecha_reserva === item).length
            }
            if (item_.count > 1) {
                same_day.push(item_.fecha_reserva)
            } else {
                different_day.push(item_.fecha_reserva)
            }
            return item_
        });

        const state = reactive({
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



        const modelo = () => {
        }

        return { state, modelo }
    }

}
</script>