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
    <div class="movies">
      <h2 v-show="this.store.movieResults.length">Movies</h2>
      <MovieListComponent />
    </div>
    <div class="tvseries">
      <h2 v-show="this.store.tvResults.length">TV Series</h2>
      <TvSeriesListComponent />
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  text-align: center;

  ul {
    padding-bottom: 20px;
  }
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
  }
}
</style>
