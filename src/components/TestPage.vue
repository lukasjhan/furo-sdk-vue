<template>
  <div class="test">
    <button @click="loginWithRedirect">login</button>
    <button @click="logout" :disabled="!isAuthenticated">logout</button>
    <h1>ID: {{ cid }}</h1>
    <code>
      <h2>User</h2>
      <pre>{{ data }}</pre>
    </code>
  </div>
</template>

<script>
import useFuro from "../composables/use-furo";

export default {
  name: "TestPage",
  setup() {
    const { clientId, loginWithRedirect, logout, isAuthenticated, user } =
      useFuro();
    return {
      cid: clientId,
      data: user,
      loginWithRedirect,
      logout,
      isAuthenticated,
    };
  },
};
</script>

<style scoped>
.test {
  color: #fff;
}
code {
  text-align: left;
}
pre {
  text-align: left;
  font-size: 20px;
  line-height: 1.5;
  background-color: #1b1b1b;
  border: 3px solid #333;
  padding: 10px;
}
</style>
