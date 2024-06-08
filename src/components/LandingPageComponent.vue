<script>
import CardComponent from "./CardComponent.vue";
import { store } from "../store";
export default {
  name: "LandingPageComponent",
  data() {
    return {
      store,
      scrollInterval: null, // Store the interval reference
      scrollAmount: 350, // Adjust scroll amount as needed
    };
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
          :key="movie.id"
          :title="movie.title"
          :original-title="movie.original_title"
          :original-language="movie.original_language"
          :vote="movie.vote_average"
          :poster-path="movie.poster_path"
          :img-url="store.imgBaseUrl"
          :img-size="store.imgSize"
          :id="movie.id"
          :cast="store.cast"
          :search-results="store.popularMovies"
          :actor-key="store.movieKey"
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
        :key="movie.id"
        :title="movie.title"
        :original-title="movie.original_title"
        :original-language="movie.original_language"
        :vote="movie.vote_average"
        :poster-path="movie.poster_path"
        :img-url="store.imgBaseUrl"
        :img-size="store.imgSize"
        :id="movie.id"
        :cast="store.cast"
        :search-results="store.upcomingMovies"
        :actor-key="store.movieKey"
      />
    </div>
    <div class="results">
      <h2>Top Rated Movies</h2>
    </div>
    <div class="container dragscroll">
      <CardComponent
        v-for="movie in store.topRatedMovies"
        :key="movie.id"
        :title="movie.title"
        :original-title="movie.original_title"
        :original-language="movie.original_language"
        :vote="movie.vote_average"
        :poster-path="movie.poster_path"
        :img-url="store.imgBaseUrl"
        :img-size="store.imgSize"
        :id="movie.id"
        :cast="store.cast"
        :search-results="store.topRatedMovies"
        :actor-key="store.movieKey"
      />
    </div>
    <div class="results">
      <h2>Top Rated Tv Shows</h2>
    </div>
    <div class="container dragscroll">
      <CardComponent
        v-for="tvshow in store.topRatedTv"
        :key="tvshow.id"
        :title="tvshow.name"
        :original-title="tvshow.original_name"
        :original-language="tvshow.original_language"
        :vote="tvshow.vote_average"
        :poster-path="tvshow.poster_path"
        :img-url="store.imgBaseUrl"
        :img-size="store.imgSize"
        :id="tvshow.id"
        :cast="store.cast"
        :search-results="store.topRatedTv"
        :actor-key="store.tvKey"
      />
    </div>
    <div class="results">
      <h2>Popular Tv Shows</h2>
    </div>
    <div class="container dragscroll">
      <CardComponent
        v-for="tvshow in store.popularTv"
        :key="tvshow.id"
        :title="tvshow.name"
        :original-title="tvshow.original_name"
        :original-language="tvshow.original_language"
        :vote="tvshow.vote_average"
        :poster-path="tvshow.poster_path"
        :img-url="store.imgBaseUrl"
        :img-size="store.imgSize"
        :id="tvshow.id"
        :cast="store.cast"
        :search-results="store.popularTv"
        :actor-key="store.tvKey"
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
