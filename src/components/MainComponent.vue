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
  methods: {
    searchMovie() {
      const params = {};

      if (this.store.searchQuery) {
        params.query = this.store.searchQuery;
      }

      axios
        .get(store.apiMovieSearchUrl + store.apiKey, { params })
        .then((response) => {
          this.store.movieResults = response.data.results;
          console.log(response.data.results);
        });
    },
  },
  components: {},
};
</script>

<template>
  <main>
    <div class="search">
      <input
        type="text"
        placeholder="Search movie"
        v-model="this.store.searchQuery"
        @keyup.enter="searchMovie()"
      />
      <button @click="searchMovie()">Search</button>
    </div>
    <div class="movies">
      <h1 v-show="this.store.movieResults.length">Movies</h1>
      <ul v-for="movie in this.store.movieResults">
        <li>Title: {{ movie.title }}</li>
        <li>Original title: {{ movie.original_title }}</li>
        <li>
          Language:
          <img
            v-if="`/flags/${movie.original_language}.svg`"
            :src="`/flags/${movie.original_language}.svg`"
            :alt="`${movie.original_language} - flag not available`"
          />
        </li>
        <li>Rating: {{ movie.vote_average }}</li>
      </ul>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  text-align: center;
  .search {
    padding: 50px 0;
    input {
      margin-right: 10px;
    }
  }
  ul {
    padding-bottom: 20px;
    img {
      width: 15px;
    }
  }
}
.movies {
  h1 {
    padding-bottom: 10px;
  }
}
</style>
