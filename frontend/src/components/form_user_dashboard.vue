<template>
    <div class="login-box">
        <h2>User</h2>
        <div>
            <div class="user-box">
                <label>Username</label><br>
                <label class="error" v-if="v$.username.$invalid">Min lenth 5 and alpha numeric</label>
                <input type="text" v-model="state.userLocal.username">
            </div>
            <div class="user-box">
                <label>Email</label><br>
                <label class="error" v-if="v$.email.$invalid">Must be an email</label>
                <input type="text" v-model="state.userLocal.email">
            </div>
            <div class="user-box">
                <label>Password</label><br>
                <label class="error" v-if="v$.password.$invalid">Min lenth 5</label>
                <input type="password" v-model="state.userLocal.password">
            </div>
            <div class="user-box">
                <label>Photo</label><br>
                <label class="error" v-if="v$.photo.$invalid">Must be an url</label>
                <input type="url" v-model="state.userLocal.photo">
            </div>
            <!-- <div class="user-box">
                <label>Active</label>
                <input type="checkbox" v-model="state.userLocal.is_active" :checked="state.userLocal.is_active">
            </div> -->
            <button @click="sendData()"
                :disabled="v$.username.$invalid || v$.email.$invalid || v$.password.$invalid || v$.photo.$invalid">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <p v-if="user">Update</p>
                <p v-else>Create</p>
            </button>
        </div>
    </div>
</template>

<script>
import { reactive, getCurrentInstance, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, url, minLength, email, alphaNum } from '@vuelidate/validators'

export default {

    props: {
        user: Object
    },
    emits: {
        data: Object
    },
    setup(props) {
        const { emit } = getCurrentInstance();

        const user_ = props.user ? props.user : { 'username': '', 'photo': '', 'email': '', 'password': '', 'is_active': 1 };
        const state = reactive({
            userLocal: { ...user_ }
        });
        state.userLocal.is_active = Boolean(state.userLocal.is_active);

        const sendData = () => {
            const data = { ...state.userLocal };
            if (data.username === user_.username) {
                delete (data.username)
            }
            if (data.email === user_.email) {
                delete (data.email)
            }
            if (data.photo === user_.photo) {
                delete (data.photo)
            }
            if (data.password === '') {
                delete (data.password);
            }
            delete (data.type);
            delete (data.is_active);
            emit('data', data);
        }

        let rules = computed(() => ({
            username: {
                required,
                alphaNum,
                minLength: minLength(5),
            },
            photo: {
                url,
            },
            email: {
                required,
                email,
            },
            password: {
                minLength: minLength(5),
            },
        }));

        //Rules for create
        if (!props.user) {
            rules = computed(() => ({
                username: {
                    required,
                    alphaNum,
                    minLength: minLength(5),
                },
                photo: {
                    url,
                },
                email: {
                    required,
                    email,
                },
                password: {
                    minLength: minLength(5),
                    required
                },
            }));
        }

        const v$ = useVuelidate(rules, state.userLocal);
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

    .error {
        color: red !important;
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