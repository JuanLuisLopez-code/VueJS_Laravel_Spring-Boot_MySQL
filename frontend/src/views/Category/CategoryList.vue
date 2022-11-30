<template>
    <div class="back-button">
        <div class="arrow-wrap">
            <span class="arrow-part-1"></span>
            <span class="arrow-part-2"></span>
            <span class="arrow-part-3"></span>
        </div>
    </div>
    <div class="categoriList">
        <h1>Categories</h1>
        <button class="pulse create" @click="redirectCreate()">CREATE</button>
        <button @click="updateCategory()" class="pulse update">UPDATE</button>
        <button @click="deleteCategory()" class="pulse delete">DELETE</button>
        <DataTable class="display" :options="{ select: true }" :columns="columns" :data="state.categories" ref="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Photo</th>
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

        store.dispatch(`categoryDashboard/${Constant.INITIALIZE_CATEGORY}`);

        const state = reactive({
            categories: computed(() => store.getters['categoryDashboard/GetCategories'])
        });

        const columns = [
            { data: 'id' },
            { data: 'name_category' },
            { data: 'photo' },
        ];

        let dt;
        const table = ref();
        onMounted(() => {
            dt = table.value.dt();
        });

        const updateCategory = () => {
            const indexs = dt.rows({ selected: true })[0];
            if (indexs.length === 1) {
                const id = state.categories[indexs[0]].id;
                router.push({ name: 'categoriesUpdate', params: { id } })
            } else {
                toaster.info('You have to select ONE category');
            }
        };

        const deleteCategory = () => {
            const indexs = dt.rows({ selected: true })[0];
            if (indexs.length > 0) {
                dt.rows({ selected: true }).every(index => store.dispatch(`categoryDashboard/${Constant.DELETE_CATEGORY}`, state.categories[index].id));
            } else {
                toaster.info('You have to at last ONE category');
            }
        };

        const redirectCreate = () => {
            router.push({ name: 'categoriesCreate' })
        }

        return { state, columns, table, updateCategory, deleteCategory, redirectCreate };
    }
}
</script>

<style lang="scss">
@import 'datatables.net-dt';

.categoriList {
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

// .back-button {
//     width: 50px;
//     height: 50px;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     border-radius: 50%;
//     border: #03A9F4 1px solid;
//     overflow: hidden;
//     transition: background 0.3s ease;

//     &.back {
//         .arrow-wrap {
//             left: -50%;
//         }
//     }

//     &:hover {
//         background: #03A9F4;

//         .arrow-wrap {
//             span {
//                 background: #fff;
//             }
//         }
//     }

//     .arrow-wrap {
//         display: block;
//         position: absolute;
//         height: 70%;
//         width: 70%;
//         top: 50%;
//         left: 50%;
//         transform: translate(-50%, -50%);
//         transition: left 0.3s ease;

//         span {
//             height: 1px;
//             left: 0;
//             top: 50%;
//             background: #03A9F4;
//             position: absolute;
//             display: block;
//             transition: background 0.3s ease;
//         }

//         .arrow-part-1 {
//             width: 100%;
//             transform: translate(0, -50%);
//         }

//         .arrow-part-2 {
//             width: 60%;
//             transform: rotate(-45deg);
//             transform-origin: 0 0;
//         }

//         .arrow-part-3 {
//             width: 60%;
//             transform: rotate(45deg);
//             transform-origin: 0 0;
//         }
//     }
// }


}
</style>