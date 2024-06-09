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
    "plot",
  ],
  computed: {
    // funzione per calcolare il numero di stelle
    calculateStars() {
      const stars = Math.round(this.vote / 2);
      return stars;
    },
  },
  methods: {
    // funzione per nascondere l'overflow della preview
    hidePreviewOverflow(plot, limit) {
      const dots = "...";
      if (this.plot.length > limit) {
        return this.plot.substring(0, limit) + dots;
      }
      return this.plot;
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
      <h2>
        {{ title }}
      </h2>
      <div>
        <h4>Original title:</h4>
        {{ originalTitle }}
      </div>
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
      <div class="plot">
        <p>
          {{ hidePreviewOverflow(plot, 180) }}
        </p>
      </div>
      <div class="extra">
        <div class="actors" v-if="actors && actors.length">
          <h3>Cast:</h3>
          <ul>
            <li v-for="actor in actors" :key="actor.cast_id">
              {{ actor.name }}
            </li>
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
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 342px;
  position: relative;

  .poster img {
    width: 342px;
    height: 513px;
  }

  .info {
    width: 342px;
    height: 513px;
    background-color: rgba(37, 37, 37, 0.8);
    padding: 40px 30px;
    color: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s ease;

    div {
      padding-bottom: 10px;
    }
    h4 {
      padding-top: 10px;
    }
  }

  &:hover .info {
    opacity: 1;
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
  li {
    font-size: 13px;
  }
  h3 {
    padding-bottom: 5px;
    font-size: 15px;
  }
}

.extra {
  display: flex;
  justify-content: space-evenly;
  margin: 0 auto;
}
</style>
