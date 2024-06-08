<script>
import axios from "axios";
export default {
  data() {
    return {
      currentActors: [],
      currentGenres: [],
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
    "id",
    "cast",
    "searchResults",
    "actorKey",
  ],
  computed() {
    this.calculateStars();
  },
  created() {
    this.searchInfo();
  },
  methods: {
    calculateStars() {
      const stars = Math.round(this.vote / 2);
      return stars;
    },
    searchInfo() {
      axios
        .get(
          "https://api.themoviedb.org/3/" +
            this.actorKey +
            this.id +
            "?api_key=2e9823c947e947ab6a35784821aa1f55&append_to_response=credits"
        )
        .then((response) => {
          this.currentActors = response.data.credits.cast;
          this.currentActors = this.currentActors.splice(0, 5);
          this.currentGenres = response.data.genres;
        });
    },
  },
  components: {},
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
        <span v-for="x in calculateStars()">
          <i class="fas fa-star"></i>
        </span>
        <span v-for="x in 5 - calculateStars()">
          <i class="fa-regular fa-star"></i>
        </span>
        <div class="actors" v-if="currentActors.length">
          <h3>Cast:</h3>
          <ul>
            <li v-for="actor in currentActors">{{ actor.name }}</li>
          </ul>
        </div>
        <div class="genres" v-if="currentGenres.length">
          <h3>Genres:</h3>
          <ul>
            <li v-for="genre in currentGenres">{{ genre.name }}</li>
          </ul>
        </div>
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
}

.card:hover .info {
  display: inline-block;
}

.card:hover .poster img {
  display: none;
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
