<script>
import { provide } from "vue";

export default {
  name: "FuroProvider",
  props: {
    domain: String,
    clientId: String,
    redirectUri: String,
    apiUrl: String,
  },
  setup(props) {
    provide("furoOption", {
      domain: props.domain,
      clientId: props.clientId,
      redirectUri: props.redirectUri,
      apiUrl: props.apiUrl,
    });
  },
};
</script>

<template>
  <slot></slot>
</template>
