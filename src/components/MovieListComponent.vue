<script>
import CardComponent from "./CardComponent.vue";
import { store } from "../store";
export default {
  name: "MovieListComponent",
  data() {
    return {
      store,
    };
  },
  components: {
    CardComponent,
  },
};
</script>

<template>
  <div class="movies">
    <div class="results">
      <h2 v-show="this.store.movieResults.length">Movies</h2>
      <h3 v-show="this.store.movieResults.length">
        Results for "{{ this.store.currentSearch }}"
      </h3>
    </div>
    <div class="container">
      <CardComponent
        v-for="movie in this.store.movieResults"
        :title="movie.title"
        :originalTitle="movie.original_title"
        :originalLanguage="movie.original_language"
        :vote="movie.vote_average"
        :posterPath="movie.poster_path"
        :imgUrl="this.store.imgBaseUrl"
        :imgSize="this.store.imgSize"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  width: 80%;
  margin: 20px auto;
}
.movies {
  .results {
    display: flex;
    width: 77%;
    margin: 20px auto;
    align-items: baseline;
    justify-content: space-between;
    padding: 10px 0;
    color: #ffffff;
    h2 {
      font-size: 40px;
    }
    h3 {
      font-size: 20px;
    }
  }
}
</style>
