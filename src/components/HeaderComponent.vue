<script>
import { store } from "../store";
export default {
  name: "HeaderComponent",
  emits: ["search", "filterMovies", "filterTv"],
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <header>
    <div class="container">
      <a href="/"><h1>Boolflix</h1></a>

      <div class="search">
        <div class="tvGenres" v-show="this.store.searchQuery">
          <select
            name="tvgenres"
            id="tvgenres"
            v-model="this.store.currentSearchTvId"
            @change="$emit('filterTv')"
          >
            <option value="" disabled selected hidden>TV Genres</option>
            <option class="default" value="" selected>----</option>
            <option
              v-for="genre in this.store.tvGenres"
              :value="genre.id"
              :key="genre.id"
            >
              {{ genre.name }}
            </option>
          </select>
        </div>
        <div class="movieGenres" v-show="this.store.searchQuery">
          <select
            name="moviegenres"
            id="moviegenres"
            v-model="this.store.currentSearchMovieId"
            @change="$emit('filterMovies')"
          >
            <option value="" disabled selected hidden>Movie Genres</option>
            <option class="default" value="" selected>----</option>
            <option
              v-for="genre in this.store.movieGenres"
              :value="genre.id"
              :key="genre.id"
            >
              {{ genre.name }}
            </option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Search movie"
          v-model="this.store.searchQuery"
          @keyup="$emit('search')"
        />
        <!-- <button @click="$emit('search')">Search</button> -->
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: red;
  padding: 10px 0;
  padding-bottom: 20px;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 86%;
    margin: 0 auto;
    a:visited {
      color: black;
      h1 {
        font-size: 30px;
      }
    }

    .search {
      display: flex;
      input {
        margin-right: 10px;
      }
      select {
        margin-right: 10px;
      }
      .default {
        padding-left: 20px;
      }
    }
  }
}
</style>
