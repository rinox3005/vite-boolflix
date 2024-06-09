<script>
import CardComponent from "./CardComponent.vue";
import { store } from "../store";
import axios from "axios";
export default {
  name: "LandingPageComponent",
  data() {
    return {
      store,
      scrollInterval: null, // Store the interval reference
      scrollAmount: 350, // Adjust scroll amount as needed
      movieDetails: {},
      tvSerieDetails: {},
    };
  },
  created() {
    this.$watch(
      () => this.store.popularMovies,
      (newResults) => {
        newResults.forEach((movie) => {
          this.fetchMovieDetails(movie.id);
        });
      },
      { immediate: true }
    );
    this.$watch(
      () => this.store.upcomingMovies,
      (newResults) => {
        newResults.forEach((movie) => {
          this.fetchMovieDetails(movie.id);
        });
      },
      { immediate: true }
    );
    this.$watch(
      () => this.store.topRatedMovies,
      (newResults) => {
        newResults.forEach((movie) => {
          this.fetchMovieDetails(movie.id);
        });
      },
      { immediate: true }
    );
    this.$watch(
      () => this.store.topRatedTv,
      (newResults) => {
        newResults.forEach((tvSerie) => {
          this.fetchTvDetails(tvSerie.id);
        });
      },
      { immediate: true }
    );
    this.$watch(
      () => this.store.popularTv,
      (newResults) => {
        newResults.forEach((tvSerie) => {
          this.fetchTvDetails(tvSerie.id);
        });
      },
      { immediate: true }
    );
  },
  mounted() {
    // Start automatic scrolling when component is mounted
    this.startAutoScroll();
    // Listen for the scroll event
    const container = this.$refs.scrollContainer;
    container.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    // Stop automatic scrolling when component is destroyed
    this.stopAutoScroll();
    // Remove the scroll event listener
    const container = this.$refs.scrollContainer;
    container.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    scrollLeft() {
      const container = this.$refs.scrollContainer;
      if (container) {
        container.scrollBy({
          left: -this.scrollAmount,
          behavior: "smooth",
        });
      }
    },
    scrollRight() {
      const container = this.$refs.scrollContainer;
      if (container) {
        container.scrollBy({
          left: this.scrollAmount,
          behavior: "smooth",
        });
      }
    },
    startAutoScroll() {
      // Start automatic scrolling
      this.scrollInterval = setInterval(this.scrollRight, 2000); // Adjust the interval time as needed
    },
    stopAutoScroll() {
      // Stop automatic scrolling
      clearInterval(this.scrollInterval);
    },
    handleScroll() {
      const container = this.$refs.scrollContainer;
      if (
        container.scrollLeft + container.clientWidth ===
        container.scrollWidth
      ) {
        // If scrolled to the end, scroll back to the beginning
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    },
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
    async fetchTvDetails(id) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=2e9823c947e947ab6a35784821aa1f55&append_to_response=credits`
        );
        const tvSerie = response.data;
        // Directly modifying the reactive object
        this.tvSerieDetails = {
          ...this.tvSerieDetails,
          [id]: {
            actors: tvSerie.credits.cast.slice(0, 5),
            genres: tvSerie.genres,
          },
        };
      } catch (error) {
        console.error("Error fetching tv series details:", error);
      }
    },
  },

  components: {
    CardComponent,
  },
};
</script>

<template>
  <div class="landing">
    <div class="results">
      <h2>Popular Movies</h2>
    </div>
    <div
      class="scroll-container-wrapper"
      @mouseenter="stopAutoScroll"
      @mouseleave="startAutoScroll"
    >
      <button @click="scrollLeft" class="scroll-button left">◀</button>
      <div class="scroll-container" ref="scrollContainer">
        <CardComponent
          v-for="movie in store.popularMovies"
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
      <button @click="scrollRight" class="scroll-button right">▶</button>
    </div>
    <div class="results">
      <h2>Upcoming Movies</h2>
    </div>
    <div class="container dragscroll">
      <CardComponent
        v-for="movie in store.upcomingMovies"
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
    <div class="results">
      <h2>Top Rated Movies</h2>
    </div>
    <div class="container dragscroll">
      <CardComponent
        v-for="movie in store.topRatedMovies"
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
    <div class="results">
      <h2>Top Rated Tv Shows</h2>
    </div>
    <div class="container dragscroll">
      <CardComponent
        v-for="tvSerie in store.topRatedTv"
        :title="tvSerie.name"
        :originalTitle="tvSerie.original_name"
        :originalLanguage="tvSerie.original_language"
        :vote="tvSerie.vote_average"
        :posterPath="tvSerie.poster_path"
        :imgUrl="this.store.imgBaseUrl"
        :imgSize="this.store.imgSize"
        :actors="tvSerieDetails[tvSerie.id]?.actors || []"
        :genres="tvSerieDetails[tvSerie.id]?.genres || []"
      />
    </div>
    <div class="results">
      <h2>Popular Tv Shows</h2>
    </div>
    <div class="container dragscroll">
      <CardComponent
        v-for="tvSerie in store.popularTv"
        :title="tvSerie.name"
        :originalTitle="tvSerie.original_name"
        :originalLanguage="tvSerie.original_language"
        :vote="tvSerie.vote_average"
        :posterPath="tvSerie.poster_path"
        :imgUrl="this.store.imgBaseUrl"
        :imgSize="this.store.imgSize"
        :actors="tvSerieDetails[tvSerie.id]?.actors || []"
        :genres="tvSerieDetails[tvSerie.id]?.genres || []"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scroll-container-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 90%;
  margin: 20px auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scroll-container-wrapper::-webkit-scrollbar {
  display: none;
}
.scroll-container {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  width: calc(100% - 70px);
  margin: 0 auto;
  gap: 5px;
}

.container {
  display: flex;
  overflow-x: auto;
  width: 86%;
  margin: 0 auto;
  gap: 5px;
  cursor: grab;
  margin-bottom: 30px;
}

.scroll-button {
  background-color: #333;
  border: none;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  display: none;
}

.scroll-button.left {
  left: 0;
}

.scroll-button.right {
  right: 0;
}

.scroll-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.landing {
  .results {
    display: flex;
    width: 86%;
    margin: 20px auto;
    align-items: baseline;
    justify-content: space-between;
    padding: 10px 0;
    color: #ffffff;
    h2 {
      font-size: 25px;
    }
  }
}
</style>
