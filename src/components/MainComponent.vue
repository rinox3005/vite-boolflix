<script>
import axios from "axios";
import { store } from "../store";
export default {
  name: "MainComponent",
  data() {
    return {
      store,
    };
  },
  created() {
    this.apiCall();
  },
  methods: {
    apiCall() {
      const params = {};

      axios.get(store.apiUrl, { params }).then((response) => {});
    },
  },
  components: {},
};
</script>

<template>
  <main>
    <h1>Main</h1>
  </main>
</template>

<style lang="scss" scoped></style>
