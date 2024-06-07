<script>
import { store } from "../store";
import MovieListComponent from "./MovieListComponent.vue";
import TvSeriesListComponent from "./TvSeriesListComponent.vue";
import LandingPageComponent from "./LandingPageComponent.vue";
export default {
  name: "MainComponent",
  data() {
    return {
      store,
    };
  },
  methods: {},
  components: {
    LandingPageComponent,
    MovieListComponent,
    TvSeriesListComponent,
  },
};
</script>

<template>
  <main>
    <LandingPageComponent v-if="!this.store.searchQuery" />
    <MovieListComponent v-if="this.store.searchQuery" />
    <TvSeriesListComponent v-if="this.store.searchQuery" />
  </main>
</template>

<style lang="scss" scoped>
main {
  text-align: center;
}
.flag {
  img {
    width: 15px;
  }
}
.movies,
.tvseries {
  h2 {
    padding-bottom: 10px;
    font-size: 40px;
    text-align: left;
  }
}
</style>
