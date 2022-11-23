<template>

    <body class="tableMesa">
        <div class="crud-table">
            <div class="clearfix">
                <div class="form-inline pull-left">
                    <button class="btn btn-success" @click="createMesa()"><span class="glyphicon glyphicon-plus">
                        </span>Add more user</button>
                </div>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Capacity</th>
                        <th>Photo</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="mesa in mesas">
                        <td>{{ mesa.id }}</td>
                        <td>{{ mesa.name_mesa }}</td>
                        <td>{{ mesa.capacity }}</td>
                        <td>{{ mesa.photo }}</td>
                        <td>
                            <button class="pulse" @click="updateMesa(mesa.id)">Edit</button>
                        </td>
                        <td>
                            <button class="pulse" @click="deleteMesa(mesa.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Constant from '../Constant';
import { createToaster } from "@meforma/vue-toaster";

export default {
    props: {
        mesas: Object,
    },
    setup() {
        const toaster = createToaster({ position: "top-right" });
        const store = useStore();
        const router = useRouter();
        const createMesa = () => {
            router.push({ name: "createMesa" })
        }

        const deleteMesa = (id) => {
            store.dispatch(`mesaDashboard/${Constant.DELETE_ONE_MESA}`, { id })
            toaster.info("Mesa deleted")
        }
        const updateMesa = (id) => {
            router.push({ name: "updateMesa", params: { id } })
        }
        return { deleteMesa, updateMesa, createMesa }
    }
}
</script>
<style lang="scss">
body.tableMesa {
    font-family: "Roboto", helvetica, arial, sans-serif;
    font-size: 16px;
    font-weight: 400;
    text-rendering: optimizeLegibility;
}

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

body.tableMesa {
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
        border-bottom: 1px solid #C1C3D1;
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

body.tableMesa {
    $colors: (pulse: #ef6eae,
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