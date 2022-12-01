<template>
  <h1>Dashboard</h1>
  <button class="pulse" @click="redirects.categories()">List categories</button>
  <br>
  <button class="pulse" @click="redirects.mesas()">List mesas</button>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    const redirects = {
      categories: () => router.push({ name: 'categoriesList' }),
      mesas: () => router.push({ name: 'mesasList' }),
    };
    return { redirects };
  }

};
</script>

<style lang="scss">
$pulse_color: blue;
$pulse_color_hover: grey;

.pulse:hover,
.pulse:focus {
  animation: pulse 1s;
  box-shadow: 0 0 0 2em transparent;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 $pulse_color_hover;
  }
}

button.pulse {
  color: $pulse_color;
  transition: 0.25s;

  &:hover,
  &:focus {
    border-color: $pulse_color_hover;
    color: $pulse_color_hover;
  }
}

button.pulse {
  background: none;
  border: 2px solid;
  font: inherit;
  line-height: 1;
  margin: 0.5em;
  padding: 1em 2em;
}
</style>
