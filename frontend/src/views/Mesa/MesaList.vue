<template>
    <div class="listMesa">
        <h1>Mesas</h1>
        <button class="pulse create" @click="createMesa()">CREATE</button>
        <button class="pulse update" @click="updateMesa()">UPDATE</button>
        <button class="pulse delete" @click="deleteMesa()">DELETE</button>
        <input type="checkbox" id="switch" name="switch" :disabled="state.checkbox_dissabled"
            v-model="state.checkbox_checked">
        <label for="switch" class="switch" @click="updateActive()"></label>
    </div>
    <DataTable class="display" :options="{ select: true }" :columns="columns" :data="state.mesas" ref="table"
        @click="check_status_active()">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Capacity</th>
                <th>Photo</th>
                <th>Active</th>
            </tr>
        </thead>
    </DataTable>
</template>

<script>
import { useMesaActive } from '../../composables/dashboard/mesas/useMesasDashboard';
import { ref, onMounted, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Constant from '../../Constant';
import { createToaster } from "@meforma/vue-toaster";
import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net';
import 'datatables.net-select';
export default {
    components: { DataTable },
    setup() {
        const store = useStore();
        const router = useRouter();
        const toaster = createToaster({ position: "top-right" });
        DataTable.use(DataTablesLib);

        store.dispatch(`mesaDashboard/${Constant.INITIALIZE_MESA}`)

        const state = reactive({
            mesas: computed(() => store.getters["mesaDashboard/getMesas"]),
            checkbox_dissabled: true,
            checkbox_checked: false,
        })

        let first_click = 0;

        const columns = [
            { data: 'id' },
            { data: 'name_mesa' },
            { data: 'capacity' },
            { data: 'photo' },
            { data: 'is_active' },
        ];

        let dt;
        const table = ref();
        onMounted(() => {
            dt = table.value.dt();
        });

        const createMesa = () => {
            router.push({ name: "createMesa" })
        }

        const updateMesa = () => {
            const indexs = dt.rows({ selected: true })[0];
            if (indexs.length === 1) {
                const id = state.mesas[indexs[0]].id;
                router.push({ name: 'updateMesa', params: { id } })
            } else {
                toaster.info('You have to select ONE mesa');
            }
        }

        const deleteMesa = () => {
            const indexs = dt.rows({ selected: true })[0];
            if (indexs.length > 0) {
                dt.rows({ selected: true }).every(index => store.dispatch(`mesaDashboard/${Constant.DELETE_ONE_MESA}`, state.mesas[index].id));
            } else {
                toaster.info('You have to select at last ONE mesa');
            }
        }

        const check_status_active = () => {
            const indexs = dt.rows({ selected: true })[0];
            if (indexs.length > 0) {
                let mesas_active = [];
                dt.rows({ selected: true }).every(index => mesas_active.push(state.mesas[index]));
                if (mesas_active.length == 1) {
                    first_click = mesas_active[0].is_active;
                }
                if (!mesas_active.every(item => item.is_active === first_click)) {
                    state.checkbox_dissabled = true;
                    state.checkbox_checked = false;
                } else {
                    state.checkbox_dissabled = false;
                    state.checkbox_checked = true;
                }
            } else {
                state.checkbox_dissabled = true;
                state.checkbox_checked = false;
            }
        }

        const updateActive = () => {
            if (!state.checkbox_dissabled) {
                const indexs = dt.rows({ selected: true })[0];
                if (indexs.length > 0) {
                    let mesas_active = [];
                    dt.rows({ selected: true }).every(index => mesas_active.push(state.mesas[index]));
                    useMesaActive(mesas_active);
                }
            } else {
                toaster.warning('Select at least 1 mesa for change ACTIVE');
            }
        }
        return { createMesa, updateMesa, deleteMesa, columns, table, state, check_status_active, updateActive }
    }
}
</script>

<style lang="scss">
@import 'datatables.net-dt';

.listMesa {
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

*,
*:after,
*:before {
    box-sizing: border-box;
}

#switch {
    visibility: hidden;
    clip: rect(0 0 0 0);
    position: absolute;
    left: 9999px;
}

.switch {
    display: block;
    width: 130px;
    height: 60px;
    margin: 70px auto;
    position: relative;
    background: #ced8da;
    /* Old browsers */
    background: -moz-linear-gradient(left, #ced8da 0%, #d8e0e3 29%, #ccd4d7 34%, #d4dcdf 62%, #fff9f4 68%, #e1e9ec 74%, #b7bfc2 100%);
    /* FF3.6+ */
    background: -webkit-gradient(linear, left top, right top, color-stop(0%, #ced8da), color-stop(29%, #d8e0e3), color-stop(34%, #ccd4d7), color-stop(62%, #d4dcdf), color-stop(68%, #fff9f4), color-stop(74%, #e1e9ec), color-stop(100%, #b7bfc2));
    /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(left, #ced8da 0%, #d8e0e3 29%, #ccd4d7 34%, #d4dcdf 62%, #fff9f4 68%, #e1e9ec 74%, #b7bfc2 100%);
    /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(left, #ced8da 0%, #d8e0e3 29%, #ccd4d7 34%, #d4dcdf 62%, #fff9f4 68%, #e1e9ec 74%, #b7bfc2 100%);
    /* Opera 11.10+ */
    background: -ms-linear-gradient(left, #ced8da 0%, #d8e0e3 29%, #ccd4d7 34%, #d4dcdf 62%, #fff9f4 68%, #e1e9ec 74%, #b7bfc2 100%);
    /* IE10+ */
    background: linear-gradient(to right, #ced8da 0%, #d8e0e3 29%, #ccd4d7 34%, #d4dcdf 62%, #fff9f4 68%, #e1e9ec 74%, #b7bfc2 100%);
    /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ced8da', endColorstr='#b7bfc2', GradientType=1);
    /* IE6-9 */
    transition: all 0.2s ease-out;
    cursor: pointer;
    border-radius: 0.35em;
    box-shadow:
        0 0 1px 2px rgba(0, 0, 0, 0.7),
        inset 0 2px 0 rgba(255, 255, 255, 0.6),
        inset 0 -1px 0 1px rgba(0, 0, 0, 0.3),
        0 8px 10px rgba(0, 0, 0, 0.15);
}

.switch:before {
    display: block;
    position: absolute;
    left: -35px;
    right: -35px;
    top: -25px;
    bottom: -25px;
    z-index: -2;
    content: "";
    border-radius: 0.4em;
    background: #d5dde0;
    background: linear-gradient(#d7dfe2, #bcc7cd);
    box-shadow:
        inset 0 2px 0 rgba(255, 255, 255, 0.6),
        inset 0 -1px 1px 1px rgba(0, 0, 0, 0.3),
        0 0 8px 2px rgba(0, 0, 0, 0.2),
        0 2px 4px 2px rgba(0, 0, 0, 0.1);
    pointer-events: none;
    transition: all 0.2s ease-out;
}

.switch:after {
    content: "";
    position: absolute;
    right: -25px;
    top: 50%;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: red;
    margin-top: -8px;
    z-index: -1;
    box-shadow:
        inset 0 -1px 8px rgba(0, 0, 0, 0.7),
        inset 0 -2px 2px rgba(0, 0, 0, 0.2),
        0 1px 0 white,
        0 -1px 0 rgba(0, 0, 0, 0.5),
        -47px 32px 15px 13px rgba(0, 0, 0, 0.25);
}

#switch:checked~.switch {
    background: #b7bfc2;
    /* Old browsers */
    background: -moz-linear-gradient(left, #b7bfc2 0%, #e1e9ec 26%, #fff9f4 32%, #d4dcdf 38%, #ccd4d7 66%, #d8e0e3 71%, #ced8da 100%);
    /* FF3.6+ */
    background: -webkit-gradient(linear, left top, right top, color-stop(0%, #b7bfc2), color-stop(26%, #e1e9ec), color-stop(32%, #fff9f4), color-stop(38%, #d4dcdf), color-stop(66%, #ccd4d7), color-stop(71%, #d8e0e3), color-stop(100%, #ced8da));
    /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(left, #b7bfc2 0%, #e1e9ec 26%, #fff9f4 32%, #d4dcdf 38%, #ccd4d7 66%, #d8e0e3 71%, #ced8da 100%);
    /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(left, #b7bfc2 0%, #e1e9ec 26%, #fff9f4 32%, #d4dcdf 38%, #ccd4d7 66%, #d8e0e3 71%, #ced8da 100%);
    /* Opera 11.10+ */
    background: -ms-linear-gradient(left, #b7bfc2 0%, #e1e9ec 26%, #fff9f4 32%, #d4dcdf 38%, #ccd4d7 66%, #d8e0e3 71%, #ced8da 100%);
    /* IE10+ */
    background: linear-gradient(to right, #b7bfc2 0%, #e1e9ec 26%, #fff9f4 32%, #d4dcdf 38%, #ccd4d7 66%, #d8e0e3 71%, #ced8da 100%);
    /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#b7bfc2', endColorstr='#ced8da', GradientType=1);
    /* IE6-9 */
}

#switch:checked~.switch:after {
    background: green;
    box-shadow:
        inset 0 -1px 8px rgba(0, 0, 0, 0.7),
        inset 0 -2px 2px rgba(0, 0, 0, 0.2),
        0 1px 0 white,
        0 -1px 0 rgba(0, 0, 0, 0.5),
        -110px 32px 15px 13px rgba(0, 0, 0, 0.25);
}
}
</style>