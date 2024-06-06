<script>
import { store } from "../store";
export default {
  name: "MainComponent",
  data() {
    return {
      store,
    };
  },
  methods: {
    calculateStars(rating) {
      const stars = Math.round(rating / 2);
      return stars;
    },
  },
  components: {},
};
</script>

<template>
  <main>
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
        <li>
          <span v-for="x in calculateStars(movie.vote_average)">
            <i class="fas fa-star"></i>
          </span>
          <span v-for="x in 5 - calculateStars(movie.vote_average)">
            <i class="fa-regular fa-star"></i>
          </span>
        </li>
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
        <li>
          <span v-for="x in calculateStars(tvSeries.vote_average)">
            <i class="fas fa-star"></i>
          </span>
          <span v-for="x in 5 - calculateStars(tvSeries.vote_average)">
            <i class="fa-regular fa-star"></i>
          </span>
        </li>
      </ul>
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
  }
}
</style>
