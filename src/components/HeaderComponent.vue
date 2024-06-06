<script>
import { store } from "../store";
export default {
  name: "HeaderComponent",
  emits: ["search"],
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <header>
    <div class="container">
      <a href="/"><h1>Boolflix</h1></a>

      <div class="search">
        <input
          type="text"
          placeholder="Search movie"
          v-model="this.store.searchQuery"
          @keyup.enter="$emit('search')"
        />
        <button @click="$emit('search')">Search</button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: red;
  padding: 10px 0;
  padding-bottom: 20px;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 80%;
    margin: 0 auto;
    a:visited {
      color: black;
      h1 {
        font-size: 30px;
      }
    }

    .search {
      input {
        margin-right: 10px;
      }
    }
  }
}
</style>
