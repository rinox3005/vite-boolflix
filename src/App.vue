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
  created() {
    this.getTvGenres();
    this.getMovieGenres();
    this.getPopular();
  },
  methods: {
    searchMovie() {
      const params = {};

      if (this.store.searchQuery) {
        params.api_key = this.store.apiKey;
        params.query = this.store.searchQuery;

        axios.get(store.apiMovieSearchUrl, { params }).then((response) => {
          this.store.movieResults = response.data.results;
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
        });
        this.store.currentSearch = this.store.searchQuery;
        // this.store.searchQuery = "";
      }
    },
    getMovieGenres() {
      const params = {};

      params.api_key = this.store.apiKey;
      axios.get(store.apiMovieGenresUrl, { params }).then((response) => {
        this.store.movieGenres = response.data.genres;
      });
    },
    getTvGenres() {
      const params = {};

      params.api_key = this.store.apiKey;
      axios.get(store.apiTvGenresUrl, { params }).then((response) => {
        this.store.tvGenres = response.data.genres;
      });
    },
    filterMovieResults() {
      this.store.filteredMovies = [];
      this.store.movieResults.map((movie) => {
        if (movie.genre_ids.includes(this.store.currentSearchMovieId)) {
          this.store.filteredMovies.push(movie);
        }
      });
    },
    filterTvResults() {
      this.store.filteredTvShows = [];
      this.store.tvResults.map((tvshow) => {
        if (tvshow.genre_ids.includes(this.store.currentSearchTvId)) {
          this.store.filteredTvShows.push(tvshow);
        }
      });
    },
    getPopular() {
      const params = {};

      params.api_key = this.store.apiKey;

      axios.get(store.apiPopularUrl, { params }).then((response) => {
        this.store.popularMovies = response.data.results;
      });
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
  <HeaderComponent
    @search="searchMovie(), searchTvSeries()"
    @filterMovies="filterMovieResults()"
    @filterTv="filterTvResults()"
  />
  <MainComponent />
  <FooterComponent />
</template>

<style lang="scss" scoped></style>
