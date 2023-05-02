<template>
  <img id="logo" alt="Vue logo" src="./assets/furo.svg" />
  <FuroProvider :clientId="'fdaskfjfasfsafafsfsf87s98f7sa9flsadf'">
    <TestPage />
  </FuroProvider>
</template>

<script>
import FuroProvider from "./components/FuroProvider.vue";
import TestPage from "./components/TestPage.vue";

export default {
  name: "App",
  components: {
    FuroProvider,
    TestPage,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
}

#logo {
  height: 200px;
  pointer-events: none;
}

body {
  background: #2c2c2c;
}
</style>
