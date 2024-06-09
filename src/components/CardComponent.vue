<script>
import { store } from "../store";

export default {
  data() {
    return {
      store,
    };
  },
  name: "CardComponent",
  props: [
    "title",
    "originalTitle",
    "originalLanguage",
    "vote",
    "posterPath",
    "imgUrl",
    "imgSize",
    "searchResults",
    "info",
    "genres",
    "actors",
  ],
  computed: {
    calculateStars() {
      const stars = Math.round(this.vote / 2);
      return stars;
    },
  },
};
</script>

<template>
  <div class="card">
    <div class="poster">
      <img v-if="!posterPath" src="/placeholder.png" :alt="title" />
      <img v-else :src="`${imgUrl}${imgSize}${posterPath}`" :alt="title" />
    </div>
    <div class="info">
      <div>Title: {{ title }}</div>
      <div>Original title: {{ originalTitle }}</div>
      <div class="flag">
        Language:
        <img
          :src="`/flags/${originalLanguage}.svg`"
          :alt="`${originalLanguage} - flag not available`"
        />
      </div>
      <div>
        <span v-for="x in calculateStars" :key="x">
          <i class="fas fa-star"></i>
        </span>
        <span v-for="x in 5 - calculateStars" :key="5 - x">
          <i class="fa-regular fa-star"></i>
        </span>
      </div>
      <div class="actors" v-if="actors && actors.length">
        <h3>Cast:</h3>
        <ul>
          <li v-for="actor in actors" :key="actor.cast_id">{{ actor.name }}</li>
        </ul>
      </div>
      <div class="genres" v-if="genres && genres.length">
        <h3>Genres:</h3>
        <ul>
          <li v-for="genre in genres" :key="genre.id">{{ genre.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 342px;
  .poster img {
    width: 342px;
    height: 513px;
  }
  .info {
    width: 342px;
    height: 513px;
    border: 1px solid rgb(163, 162, 162);
    background-color: rgb(37, 37, 37);
    display: none;
    padding: 50px 30px;
    color: #ffffff;
    div {
      padding-bottom: 10px;
    }
  }

  &:hover .info {
    display: block;
  }

  &:hover .poster img {
    display: none;
  }
}

.flag {
  img {
    width: 15px;
  }
}
.fa-star {
  color: rgb(255, 187, 0);
}
.movies,
.tvseries {
  h2 {
    padding-bottom: 10px;
  }
}

.actors,
.genres {
  padding-top: 10px;
  h3 {
    padding-bottom: 5px;
  }
}
</style>
