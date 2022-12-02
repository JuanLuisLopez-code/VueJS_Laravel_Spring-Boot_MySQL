<template>
    <div class="LoginRegisterForm">
        <main class="main">
            <div class="container">
                <section class="wrapper">
                    <div class="heading" v-if="isLogin">
                        <h1 class="text text-large">Login</h1>
                        <p class="text text-normal">New user? <span><a href="#" class="text text-links"
                                    @click="redirect.register()">Create an
                                    account</a></span>
                        </p>
                    </div>
                    <div class="heading" v-else>
                        <h1 class="text text-large">Register</h1>
                        <p class="text text-normal">Have an account? <span><a href="#" class="text text-links"
                                    @click="redirect.login()">Sign up</a></span>
                        </p>
                    </div>
                    <form name="signin" class="form">
                        <div class="input-control">
                            <label for="username" class="input-label" hidden>Username</label>
                            <input type="username" name="username" id="username" class="input-field"
                                placeholder="Username" v-model="state.username">
                        </div>
                        <div class="input-control" v-if="!isLogin">
                            <label for="email" class="input-label" hidden>Email Address</label>
                            <input type="email" name="email" id="email" class="input-field" placeholder="Email Address"
                                v-model="state.email">
                        </div>
                        <div class="input-control">
                            <label for="password" class="input-label" hidden>Password</label>
                            <input type="password" name="password" id="password" class="input-field"
                                placeholder="Password" v-model="state.password">
                        </div>
                        <div class="input-control" v-if="!isLogin">
                            <label for="password" class="input-label" hidden>Repeat Password</label>
                            <input type="password" name="password2" id="password2" class="input-field"
                                placeholder="Repeat Password" v-model="state.password2">
                        </div>
                        <div class="input-control" v-if="isLogin">
                            <!-- <a href="#" class="text text-links">Forgot Password</a> -->
                            <input @click="login()" name="submit" class="input-submit" value="Login">
                        </div>
                        <div class="input-control" v-else>
                            <input @click="register()" name="submit" class="input-submit" value="Register">
                        </div>
                    </form>
                    <!-- <div class="striped" v-if="isLogin">
                        <span class="striped-line"></span>
                        <span class="striped-text">Or</span>
                        <span class="striped-line"></span>
                    </div>
                    <div class="method" v-if="isLogin">
                        <div class="method-control">
                            <a href="#" class="method-action">
                                <i class="ion ion-logo-google"></i>
                                <span>Sign in with Google</span>
                            </a>
                        </div>
                        <div class="method-control">
                            <a href="#" class="method-action">
                                <i class="ion ion-logo-facebook"></i>
                                <span>Sign in with Facebook</span>
                            </a>
                        </div>
                        <div class="method-control">
                            <a href="#" class="method-action">
                                <i class="ion ion-logo-apple"></i>
                                <span>Sign in with Apple</span>
                            </a>
                        </div>
                    </div> -->
                </section>
            </div>
        </main>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { getCurrentInstance, reactive, computed } from 'vue';
export default {
    props: {
        isLogin: Boolean
    },
    emits: {
        send: Object
    },
    setup() {
        const { emit } = getCurrentInstance();
        const router = useRouter();

        const redirect = {
            register: () => router.push({ name: 'register' }),
            login: () => router.push({ name: 'login' }),
        };

        const state = reactive({
            username: "",
            email: "",
            password: "",
            password2: ""
        });

        const login = () => {
            const data = {
                username: state.username,
                password: state.password
            };

            emit('send', data);
        }

        const register = () => {
            const data = {
                username: state.username,
                email: state.email,
                password: state.password,
                password2: state.password2
            };

            emit('send', data);
        }

        return { redirect, login, register, state }
    }
}
</script>

<style lang="scss">
@import url(https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css);

:root {
    --color-white: #ffffff;
    --color-light: #f1f5f9;
    --color-black: #121212;
    --color-night: #001632;

    --color-red: #f44336;
    --color-blue: #1a73e8;
    --color-gray: #80868b;
    --color-grayish: #dadce0;

    --shadow-normal: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
        0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --shadow-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-large: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.LoginRegisterForm {
    font-size: 100%;
    font-size-adjust: 100%;
    box-sizing: border-box;
    scroll-behavior: smooth;

    *,
    *::before,
    *::after {
        padding: 0;
        margin: 0;
        box-sizing: inherit;
        list-style: none;
        list-style-type: none;
        text-decoration: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
    }

    body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1rem;
        font-weight: normal;
        line-height: 1.5;
        color: var(--color-black);
        background: var(--color-light);
    }

    a,
    button {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        cursor: pointer;
        border: none;
        outline: none;
        background: none;
        text-decoration: none;
    }

    img {
        display: block;
        width: 100%;
        height: auto;
        object-fit: cover;
    }

    // Components
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 80rem;
        min-height: 100vh;
        width: 100%;
        padding: 0 2rem;
        margin: 0 auto;
    }

    .ion {
        &-logo-apple {
            font-size: 1.65rem;
            line-height: inherit;
            margin-right: 0.5rem;
            color: var(--color-black);
        }

        &-logo-google {
            font-size: 1.65rem;
            line-height: inherit;
            margin-right: 0.5rem;
            color: var(--color-red);
        }

        &-logo-facebook {
            font-size: 1.65rem;
            line-height: inherit;
            margin-right: 0.5rem;
            color: var(--color-blue);
        }
    }

    .text {
        font-family: inherit;
        line-height: inherit;
        text-transform: unset;
        text-rendering: optimizeLegibility;

        &-large {
            font-size: 2rem;
            font-weight: 600;
            color: var(--color-black);
        }

        &-normal {
            font-size: 1rem;
            font-weight: 400;
            color: var(--color-black);
        }

        &-links {
            font-size: 1rem;
            font-weight: 400;
            color: var(--color-blue);

            &:hover {
                text-decoration: underline;
            }
        }
    }

    // Main
    .main {
        .wrapper {
            max-width: 28rem;
            width: 100%;
            margin: 2rem auto;
            padding: 2rem 2.5rem;
            border: none;
            outline: none;
            border-radius: 0.25rem;
            color: var(--color-black);
            background: var(--color-white);
            box-shadow: var(--shadow-large);

            .form {
                width: 100%;
                height: auto;
                margin-top: 2rem;

                .input-control {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1.25rem;
                }

                .input-field {
                    font-family: inherit;
                    font-size: 1rem;
                    font-weight: 400;
                    line-height: inherit;
                    width: 100%;
                    height: auto;
                    padding: 0.75rem 1.25rem;
                    border: none;
                    outline: none;
                    border-radius: 2rem;
                    color: var(--color-black);
                    background: var(--color-light);
                    text-transform: unset;
                    text-rendering: optimizeLegibility;
                }

                .input-submit {
                    font-family: inherit;
                    font-size: 1rem;
                    font-weight: 500;
                    line-height: inherit;
                    cursor: pointer;
                    min-width: 40%;
                    height: auto;
                    padding: 0.65rem 1.25rem;
                    border: none;
                    outline: none;
                    border-radius: 2rem;
                    color: var(--color-white);
                    background: var(--color-blue);
                    box-shadow: var(--shadow-medium);
                    text-transform: capitalize;
                    text-rendering: optimizeLegibility;
                }
            }

            .striped {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                margin: 1rem 0;

                &-line {
                    flex: auto;
                    flex-basis: auto;
                    border: none;
                    outline: none;
                    height: 2px;
                    background: var(--color-grayish);
                }

                &-text {
                    font-family: inherit;
                    font-size: 1rem;
                    font-weight: 500;
                    line-height: inherit;
                    color: var(--color-black);
                    margin: 0 1rem;
                }
            }

            .method {
                &-control {
                    margin-bottom: 1rem;
                }

                &-action {
                    font-family: inherit;
                    font-size: 0.95rem;
                    font-weight: 500;
                    line-height: inherit;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: auto;
                    padding: 0.35rem 1.25rem;
                    outline: none;
                    border: 2px solid var(--color-grayish);
                    border-radius: 2rem;
                    color: var(--color-black);
                    background: var(--color-white);
                    text-transform: capitalize;
                    text-rendering: optimizeLegibility;
                    transition: all 0.35s ease;

                    &:hover {
                        background: var(--color-light);
                    }
                }
            }
        }
    }

}
</style>