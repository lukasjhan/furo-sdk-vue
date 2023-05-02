<template>
  <div class="test">
    <h1>ID: {{ cid }}</h1>
    <code>
      <h2>User</h2>
      <pre>{{ data }}</pre>
      <h2>Workspace</h2>
      <pre>{{ data }}</pre>
    </code>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  name: "TestPage",
  setup() {
    const testObject = {
      name: "test",
      age: 12,
      address: {
        street: "teststreet",
        city: "testcity",
      },
    };
    const clientId = inject("clientId");
    return { cid: clientId, data: JSON.stringify(testObject, null, 2) };
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
  background-color: #1b1b1b;
  border: 3px solid #333;
  padding: 10px;
}
</style>
