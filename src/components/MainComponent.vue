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
        params["api_key"] = this.store.apiKey;
        params.query = this.store.searchQuery;

        axios.get(store.apiMovieSearchUrl, { params }).then((response) => {
          this.store.movieResults = response.data.results;
          console.log(response.data.results);
          this.store.searchQuery = "";
        });
      }
    },
    searchTvSeries() {
      const params = {};

      if (this.store.searchQuery) {
        params["api_key"] = this.store.apiKey;
        params.query = this.store.searchQuery;

        axios.get(store.apiTvSearchUrl, { params }).then((response) => {
          this.store.tvResults = response.data.results;
          console.log(response.data.results);
          this.store.searchQuery = "";
        });
      }
    },
  },
  components: {},
};
</script>

<template>
  <main>
    <h1>Boolflix</h1>
    <div class="search">
      <input
        type="text"
        placeholder="Search movie"
        v-model="this.store.searchQuery"
        @keyup.enter="searchMovie(), searchTvSeries()"
      />
      <button @click="searchMovie(), searchTvSeries()">Search</button>
    </div>
    <div class="movies">
      <h2 v-show="this.store.movieResults.length">Movies</h2>
      <ul v-for="movie in this.store.movieResults">
        <li>
          <img
            v-if="!movie.poster_path"
            src="/placeholder.png"
            :alt="movie.title"
          />
          <img
            v-else
            :src="`${this.store.imgBaseUrl}${this.store.imgSize}${movie.poster_path}`"
            :alt="movie.title"
          />
        </li>
        <li>Title: {{ movie.title }}</li>
        <li>Original title: {{ movie.original_title }}</li>
        <li class="flag">
          Language:
          <img
            :src="`/flags/${movie.original_language}.svg`"
            :alt="`${movie.original_language} - flag not available`"
          />
        </li>
        <li>Rating: {{ movie.vote_average }}</li>
      </ul>
    </div>
    <div class="tvseries">
      <h2 v-show="this.store.tvResults.length">TV Series</h2>
      <ul v-for="tvSeries in this.store.tvResults">
        <li>
          <img
            v-if="!tvSeries.poster_path"
            src="/placeholder.png"
            :alt="tvSeries.title"
          />
          <img
            v-else
            :src="`${this.store.imgBaseUrl}${this.store.imgSize}${tvSeries.poster_path}`"
            :alt="tvSeries.title"
          />
        </li>
        <li>Title: {{ tvSeries.name }}</li>
        <li>Original title: {{ tvSeries.original_name }}</li>
        <li class="flag">
          Language:
          <img
            :src="`/flags/${tvSeries.original_language}.svg`"
            :alt="`${tvSeries.original_language} - flag not available`"
          />
        </li>
        <li>Rating: {{ tvSeries.vote_average }}</li>
      </ul>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  text-align: center;
  h1 {
    padding-top: 50px;
    font-size: 50px;
  }
  .search {
    padding: 50px 0;
    input {
      margin-right: 10px;
    }
  }
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
  }
}
</style>
