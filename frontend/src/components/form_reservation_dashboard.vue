<template>
    <div class="login-box">
        <h2>Reservstion Mesa {{ state.reservationLocal.mesa_id }}</h2>
        <div>
            <div class="user-box">
                <label>Fecha</label><br>
                <label class="error" v-if="v$.fecha_reserva.$invalid && !v$.fecha_reserva.$dirty">This input is
                    required or have an incorrect format (YYYY-MM-DD)</label>
                <input type="text" v-model="state.reservationLocal.fecha_reserva">
            </div>
            <div class="user-box">
                <label>Type: </label><br>
                <label class="error" v-if="v$.type_reservation.$invalid && !v$.type_reservation.$dirty">This input is
                    required</label>
                <select v-model="state.reservationLocal.type_reservation">
                    <option value="dinner" :selected="state.reservationLocal.type_reservation === 'dinner'">Dinner
                    </option>
                    <option value="launch" :selected="state.reservationLocal.type_reservation === 'launch'">Launch
                    </option>
                </select>
            </div>
            <br>
            <div class="user-box"><br>
                <label class="error" v-if="v$.accepted.$invalid && !v$.accepted.$dirty">This input is
                    required</label>
                <label>Accepted: </label>
                <input type="checkbox" v-model="state.reservationLocal.accepted">
            </div>

            <button @click="sendData()"
                :disabled="v$.fecha_reserva.$invalid || v$.type_reservation.$invalid || v$.accepted.$invalid">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Update
            </button>
        </div>
    </div>
</template>

<script>
import { reactive, getCurrentInstance, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'


export default {

    props: {
        reservation: Object
    },
    emits: {
        data: Object
    },
    setup(props) {
        const date_regex = helpers.regex(/^(?:(?:1[6-9]|[2-9]\d)?\d{2})(?:(?:(\/|-|\.)(?:0?[13578]|1[02])\1(?:31))|(?:(\/|-|\.)(?:0?[13-9]|1[0-2])\2(?:29|30)))$|^(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(\/|-|\.)0?2\3(?:29)$|^(?:(?:1[6-9]|[2-9]\d)?\d{2})(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:0?[1-9]|1\d|2[0-8])$/gm);
        const { emit } = getCurrentInstance();
        const state = reactive({
            reservationLocal: { ...props.reservation }
        });


        const rules = computed(() => ({
            fecha_reserva: {
                required,
                date_regex,
            },
            type_reservation: {
                required,
            },
            accepted: {
                required,
            },
        }));

        state.reservationLocal.accepted = Boolean(state.reservationLocal.accepted);
        const v$ = useVuelidate(rules, state.reservationLocal);
        const sendData = () => {
            emit('data', state.reservationLocal);
        }

        return { state, sendData, v$ };
    }
}
</script>

<style lang="scss">
.login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    padding: 40px;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
    border-radius: 10px;

    .error {
        color: red !important;
    }

    h2 {
        margin: 0 0 30px;
        padding: 0;
        color: #fff;
        text-align: center;
    }

    .user-box {
        position: relative;

        input {
            width: 100%;
            padding: 10px 0;
            font-size: 16px;
            color: #fff;
            margin-bottom: 30px;
            border: none;
            border-bottom: 1px solid #fff;
            outline: none;
            background: transparent;
        }

        label {
            padding: 10px 0;
            font-size: 16px;
            color: #fff;
        }

        input {

            &:focus~label,
            &:valid~label {
                top: -20px;
                left: 0;
                color: #03e9f4;
                font-size: 12px;
            }
        }
    }

    div button {
        background-color: transparent;
        position: relative;
        display: inline-block;
        border: none;
        padding: 10px 20px;
        color: #03e9f4;
        font-size: 16px;
        text-decoration: none;
        text-transform: uppercase;
        overflow: hidden;
        transition: .5s;
        margin-top: 40px;
        letter-spacing: 4px;
    }

    button {
        &:hover {
            background: #03e9f4;
            color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 100px #03e9f4;
        }

        span {
            position: absolute;
            display: block;

            &:nth-child(1) {
                top: 0;
                left: -100%;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, #03e9f4);
                animation: btn-anim1 1s linear infinite;
            }

            &:nth-child(2) {
                top: -100%;
                right: 0;
                width: 2px;
                height: 100%;
                background: linear-gradient(180deg, transparent, #03e9f4);
                animation: btn-anim2 1s linear infinite;
                animation-delay: 0.25s;
            }

            &:nth-child(3) {
                bottom: 0;
                right: -100%;
                width: 100%;
                height: 2px;
                background: linear-gradient(270deg, transparent, #03e9f4);
                animation: btn-anim3 1s linear infinite;
                animation-delay: 0.5s;
            }

            &:nth-child(4) {
                bottom: -100%;
                left: 0;
                width: 2px;
                height: 100%;
                background: linear-gradient(360deg, transparent, #03e9f4);
                animation: btn-anim4 1s linear infinite;
                animation-delay: 0.75s;
            }
        }
    }
}

@keyframes btn-anim1 {
    0% {
        left: -100%;
    }

    50%,
    100% {
        left: 100%;
    }
}

@keyframes btn-anim2 {
    0% {
        top: -100%;
    }

    50%,
    100% {
        top: 100%;
    }
}

@keyframes btn-anim3 {
    0% {
        right: -100%;
    }

    50%,
    100% {
        right: 100%;
    }
}

@keyframes btn-anim4 {
    0% {
        bottom: -100%;
    }

    50%,
    100% {
        bottom: 100%;
    }
}
</style>