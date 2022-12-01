<template>
    <h1>HOLI</h1>
    <InfiniteLoading @infinite="scroll" />
</template>

<script>
import InfiniteLoading from "v3-infinite-loading";
import { reactive, computed } from 'vue';
export default {
    components: { InfiniteLoading },
    setup() {

        const state = reactive({
            page: 1
        });
        const scroll = () => {
            console.log(state.page);
        }

        return { scroll, state }
    }
}
</script>

<style lang="scss">
@import "v3-infinite-loading/lib/style.css";
</style>