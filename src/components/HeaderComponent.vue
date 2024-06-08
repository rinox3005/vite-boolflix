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
}
</style>
