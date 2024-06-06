<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import MainComponent from "./components/MainComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import axios from "axios";
import { store } from "./store";
export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    searchMovie() {
      const params = {};

      if (this.store.searchQuery) {
        params.api_key = this.store.apiKey;
        params.query = this.store.searchQuery;

        axios.get(store.apiMovieSearchUrl, { params }).then((response) => {
          this.store.movieResults = response.data.results;
          console.log(response.data.results);
        });
        this.store.currentSearch = this.store.searchQuery;
        // this.store.searchQuery = "";
      }
    },
    searchTvSeries() {
      const params = {};

      if (this.store.searchQuery) {
        params.api_key = this.store.apiKey;
        params.query = this.store.searchQuery;

        axios.get(store.apiTvSearchUrl, { params }).then((response) => {
          this.store.tvResults = response.data.results;
          console.log(response.data.results);
        });
        this.store.currentSearch = this.store.searchQuery;
        // this.store.searchQuery = "";
      }
    },
  },
  components: {
    HeaderComponent,
    MainComponent,
    FooterComponent,
  },
};
</script>

<template>
  <HeaderComponent @search="searchMovie(), searchTvSeries()" />
  <MainComponent />
  <FooterComponent />
</template>

<style lang="scss" scoped></style>
