<script>
import { store } from "../store";
export default {
  name: "HeaderComponent",
  emits: ["search", "filterMovies", "filterTv"],
  data() {
    return {
      store,
      isSearchBarVisible: false,
    };
  },
  watch: {
    "store.searchQuery"(newQuery) {
      if (!newQuery) {
        this.store.currentSearchTvId = "";
        this.store.currentSearchMovieId = "";
        this.$emit("filterMovies");
        this.$emit("filterTv");
        this.isSearchBarVisible = false;
      }
    },
  },
  methods: {
    showHideSearchBar() {
      if (!this.isSearchBarVisible) {
        console.log("ciao");
        this.isSearchBarVisible = true;
        this.store.searchQuery = "";
        this.$emit("search");
      } else {
        this.isSearchBarVisible = false;
      }
    },
  },
};
</script>

<template>
  <header>
    <div class="container">
      <a href="/"><h1>Boolflix</h1></a>

      <div class="search">
        <div class="tvGenres" v-show="store.searchQuery">
          <select
            name="tvgenres"
            id="tvgenres"
            v-model="store.currentSearchTvId"
            @change="$emit('filterTv')"
          >
            <option class="default" value="" selected>TV Genres</option>
            <option
              v-for="genre in store.tvGenres"
              :value="genre.id"
              :key="genre.id"
            >
              {{ genre.name }}
            </option>
          </select>
        </div>
        <div class="movieGenres" v-show="store.searchQuery">
          <select
            name="moviegenres"
            id="moviegenres"
            v-model="store.currentSearchMovieId"
            @change="$emit('filterMovies')"
          >
            <option class="default" value="" selected>Movie Genres</option>
            <option
              v-for="genre in store.movieGenres"
              :value="genre.id"
              :key="genre.id"
            >
              {{ genre.name }}
            </option>
          </select>
        </div>

        <input
          v-show="isSearchBarVisible"
          type="text"
          placeholder="Search movie or tv show"
          v-model="store.searchQuery"
          @keyup="$emit('search')"
        />
        <div v-show="!store.searchQuery" @click="showHideSearchBar">
          <i class="fas fa-magnifying-glass"></i>
          <i class="fas fa-bell"></i>
          <i class="fas fas fa-user"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: black;
  padding: 15px 0;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 86%;
    margin: 0 auto;
    h1 {
      font-size: 30px;
    }
    a:visited {
      color: red;
    }

    .search {
      display: flex;
      input {
        margin-right: 10px;
        padding: 5px 10px;
        border-radius: 5px;
        border: 1px solid grey;
        background-color: black;
        color: white;
        &:focus {
          outline: none;
        }
      }
      select {
        margin-right: 10px;
        padding: 5px 10px;
        border-radius: 5px;
        border: 1px solid grey;
        background-color: black;
        color: white;
      }
      .default {
        padding-left: 20px;
      }
    }
  }
  .fa-magnifying-glass,
  .fa-bell,
  .fa-user {
    color: grey;
    font-size: 22px;
    padding-top: 4px;
    &:hover {
      color: lightgray;
      cursor: pointer;
    }
  }
  .fa-bell,
  .fa-user {
    padding-left: 15px;
  }
}
</style>
