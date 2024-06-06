<script>
import { store } from "../store";
import MovieListComponent from "./MovieListComponent.vue";
import TvSeriesListComponent from "./TvSeriesListComponent.vue";
export default {
  name: "MainComponent",
  data() {
    return {
      store,
    };
  },
  methods: {},
  components: {
    MovieListComponent,
    TvSeriesListComponent,
  },
};
</script>

<template>
  <main>
    <MovieListComponent />
    <TvSeriesListComponent />
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
