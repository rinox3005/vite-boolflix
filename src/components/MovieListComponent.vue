<script>
import CardComponent from "./CardComponent.vue";
import { store } from "../store";
import axios from "axios";

export default {
  name: "MovieListComponent",
  data() {
    return {
      store,
      movieDetails: {},
    };
  },
  components: {
    CardComponent,
  },
  created() {
    this.$watch(
      () => this.store.movieResults,
      (newResults) => {
        newResults.forEach((movie) => {
          this.fetchMovieDetails(movie.id);
        });
      },
      { immediate: true }
    );
  },
  methods: {
    async fetchMovieDetails(id) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=2e9823c947e947ab6a35784821aa1f55&append_to_response=credits`
        );
        const movie = response.data;
        // Directly modifying the reactive object
        this.movieDetails = {
          ...this.movieDetails,
          [id]: {
            actors: movie.credits.cast.slice(0, 5),
            genres: movie.genres,
          },
        };
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    },
  },
};
</script>

<template>
  <div class="movies">
    <div class="results">
      <h2 v-show="store.movieResults.length">Movies</h2>
    </div>
    <div class="container">
      <CardComponent
        v-if="!this.store.filteredMovies.length"
        v-for="movie in store.movieResults"
        :title="movie.title"
        :originalTitle="movie.original_title"
        :originalLanguage="movie.original_language"
        :vote="movie.vote_average"
        :posterPath="movie.poster_path"
        :imgUrl="store.imgBaseUrl"
        :imgSize="store.imgSize"
        :actors="movieDetails[movie.id]?.actors || []"
        :genres="movieDetails[movie.id]?.genres || []"
      />
      <CardComponent
        v-else
        v-for="movie in store.filteredMovies"
        :title="movie.title"
        :originalTitle="movie.original_title"
        :originalLanguage="movie.original_language"
        :vote="movie.vote_average"
        :posterPath="movie.poster_path"
        :imgUrl="store.imgBaseUrl"
        :imgSize="store.imgSize"
        :actors="movieDetails[movie.id]?.actors || []"
        :genres="movieDetails[movie.id]?.genres || []"
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
    width: 76%;
    margin: 20px auto;
    align-items: baseline;
    justify-content: space-between;
    padding-top: 10px;
    color: #ffffff;
    h2 {
      font-size: 30px;
    }
    h3 {
      font-size: 20px;
    }
  }
}
</style>
