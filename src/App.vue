<template>
  <img id="logo" alt="Vue logo" src="./assets/furo.svg" />
  <FuroProvider
    :domain="`https://auth.furo.one`"
    :clientId="clientId"
    :redirectUri="origin + `/${clientId}`"
    :apiUrl="`https://api.furo.one`"
  >
    <Board />
  </FuroProvider>
</template>

<script>
import FuroProvider from "./components/FuroProvider.vue";
import Board from "./components/Board.vue";

export default {
  name: "App",
  components: {
    FuroProvider,
    Board,
  },
  setup() {
    return {
      clientId: "Set up your client ID in App.vue",
      origin: window.location.origin,
    };
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
