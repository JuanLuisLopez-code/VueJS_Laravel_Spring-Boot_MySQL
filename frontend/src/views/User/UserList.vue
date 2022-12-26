<template>
    <font-awesome-icon icon="fa-solid fa-arrow-left" class="fa-2x" style="cursor:pointer; margin-left:0.2em;"
        @click="redirects.return()" />
    <div class="usersList">
        <h1>Users</h1><br>
        <div v-if="state.users">
            <button class="pulse create" @click="redirects.create()">CREATE</button>
            <button @click="updateUser()" class="pulse update">UPDATE</button>
            <button @click="deleteUser()" class="pulse delete">DELETE</button>
        </div>
        <DataTable class="display" :options="{ select: true }" :columns="columns" :data="state.users" ref="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Photo</th>
                    <th>Type</th>
                    <!-- <th>Active</th> -->
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

        store.dispatch(`userDashboard/${Constant.INITIALIZE_USER}`);

        const state = reactive({
            users: computed(() => store.getters['userDashboard/GetUsers'])
        });

        const columns = [
            { data: 'id' },
            { data: 'username' },
            { data: 'email' },
            { data: 'photo' },
            { data: 'type' },
            // { data: 'is_active' },
        ];

        let dt;
        const table = ref();
        onMounted(() => {
            dt = table.value.dt();
        });

        const updateUser = () => {
            const indexs = dt.rows({ selected: true })[0];
            if (indexs.length === 1) {
                const id = state.users[indexs[0]].id;
                router.push({ name: 'updateUser', params: { id } })
            } else {
                toaster.info('You have to select ONE user');
            }
        };

        const deleteUser = () => {
            const indexs = dt.rows({ selected: true })[0];
            if (indexs.length > 0) {
                dt.rows({ selected: true }).every(index => store.dispatch(`userDashboard/${Constant.DELETE_USER}`, state.users[index].id));
            } else {
                toaster.info('You have to select at last ONE user');
            }
        };

        const redirects = {
            create: () => router.push({ name: 'createUser' }),
            return: () => router.push({ name: 'dashboard' }),
        };

        return { state, columns, table, redirects, updateUser, deleteUser };
    }
}
</script>

<style lang="scss">
@import 'datatables.net-dt';

.usersList {
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