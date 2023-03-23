<template>
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup></script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  min-height: 100vh;
  background-color: #333333;
  display: flex;
  justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}

.v-overlay__scrim {
  background-color: #2b210fc7 !important;
  opacity: 0.4;
}

hr {
  border-color: #fcae1e;
}
</style>
