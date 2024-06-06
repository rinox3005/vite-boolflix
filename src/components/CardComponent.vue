<script>
export default {
  name: "CardComponent",
  props: [
    "title",
    "originalTitle",
    "originalLanguage",
    "vote",
    "posterPath",
    "imgUrl",
    "imgSize",
  ],
  computed() {
    this.calculateStars();
  },
  methods: {
    calculateStars() {
      const stars = Math.round(this.vote / 2);
      return stars;
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
    padding: 20px;
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
</style>
