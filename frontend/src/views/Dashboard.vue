<template>
  <h1>Dashboard</h1>

  <router-link to="/dashboard/categories"><button class="pulse">List categories</button></router-link>
  <br>
  <router-link to="/dashboard/mesas"><button class="pulse">List mesas</button></router-link>
</template>

<script>
export default {};
</script>

<style lang="scss">
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

button.pulse {
  color: var(--color);
  transition: 0.25s;

  &:hover,
  &:focus {
    border-color: var(--hover);
    color: #fff;
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
