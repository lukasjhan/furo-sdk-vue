<script>
import { provide } from "vue";

export default {
  name: "FuroProvider",
  props: {
    clientId: String,
  },
  setup(props) {
    provide("clientId", props.clientId);
  },
};
</script>

<template>
  <slot></slot>
</template>
