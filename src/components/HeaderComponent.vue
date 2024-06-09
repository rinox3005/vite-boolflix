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
      this.isSearchBarVisible = !this.isSearchBarVisible;
      this.$nextTick(() => {
        if (this.isSearchBarVisible) {
          this.$refs.searchInput.focus();
        }
      });
    },
  },
};
</script>

<template>
  <header>
    <div class="container">
      <a href="/">
        <h1 class="mainlogo">Boolflix</h1>
        <h1 class="altlogo">B</h1>
      </a>
      <div class="navburger"><i class="fas fa-bars"></i></div>
      <div class="navcompact">
        <select name="navcompact" id="navcompact">
          <option value="home" selected hidden>Browse &#11167;</option>
          <option value="home">Home</option>
          <option value="tvshows">Tv Shows</option>
          <option value="movies">Movies</option>
          <option value="newreleases">New Releases</option>
          <option value="popular">Popular</option>
          <option value="browsebylang">Browse by Languages</option>
        </select>
      </div>
      <ul class="nav" v-show="!this.store.searchQuery">
        <li><a href="/">Home</a></li>
        <li><a href="#">Tv Shows</a></li>
        <li><a href="#">Movies</a></li>
        <li><a href="#">New Releases</a></li>
        <li><a href="#">Popular</a></li>
        <li><a href="#">Browse by Languages</a></li>
      </ul>

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
          ref="searchInput"
          v-show="isSearchBarVisible"
          type="text"
          placeholder="Search movie or tv show"
          v-model="store.searchQuery"
          @keyup="$emit('search')"
        />
        <div v-show="!store.searchQuery" @click="showHideSearchBar">
          <i class="fas fa-magnifying-glass"></i>
        </div>
        <div v-show="!store.searchQuery">
          <i class="fas fa-bell"></i>
          <i class="fas fa-user"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(13, 13, 13, 1) 70%
  );
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 1;
  min-height: 70px;
  min-width: 435px;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 86%;
    margin: 0 auto;
    h1 {
      font-size: 30px;
      color: red;
      a:visited {
        color: red;
      }
    }

    .search {
      display: flex;
      align-items: center;
      input {
        margin-right: 15px;
        padding: 7px 10px;
        border-radius: 5px;
        border: 1px solid grey;
        background-color: #0d0d0d;
        color: white;
        &:focus {
          outline: none;
        }
      }
      select {
        margin-right: 10px;
        padding: 7px 10px;
        border-radius: 5px;
        border: 1px solid grey;
        background-color: #0d0d0d;
        color: white;
        &:focus {
          outline: none;
        }
      }
      .default {
        padding-left: 20px;
      }
    }
  }
  .fa-magnifying-glass,
  .fa-bell,
  .fa-user {
    color: rgb(255, 254, 254);
    font-size: 23px;
    &:hover {
      cursor: pointer;
    }
  }
  .fa-bell,
  .fa-user {
    padding-left: 20px;
  }
}

ul {
  display: flex;
  color: #ffffff;
  flex-grow: 1;
  padding-left: 40px;
  li {
    padding-right: 20px;
    a {
      color: #ffffff;
      &:visited {
        color: #ffffff;
      }
    }
  }
}
.navburger {
  display: none;
}
.navcompact {
  display: none;
}

.altlogo {
  display: none;
}

@media screen and (max-width: 1225px) {
  .nav {
    display: none;
  }

  .navcompact {
    display: block;
    flex-grow: 1;
    margin-left: 20px;

    select {
      font-size: 17px;
      padding: 5px 10px;
      width: auto;
      border: none;
      color: white;
      background-color: transparent;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      &:focus {
        outline: none;
      }
      option {
        background-color: #0d0d0d;
      }
    }
  }
}

@media screen and (max-width: 890px) {
  .movieGenres,
  .tvGenres {
    display: none;
  }
}
@media screen and (max-width: 715px) {
  .mainlogo {
    display: none;
  }
  .altlogo {
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .navcompact {
    display: none;
  }

  .navburger {
    display: block;
    flex-grow: 1;
    color: #ffffff;
    margin-left: 10px;
    font-size: 25px;
    margin-top: 2px;
    margin-right: 10px;
  }
}
</style>
