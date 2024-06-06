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
</template>

<style lang="scss" scoped>
.card {
  width: 342px;
  .poster img {
    width: 342px;
    height: 513px;
  }
}
.flag {
  img {
    width: 15px;
  }
}
.movies,
.tvseries {
  h2 {
    padding-bottom: 10px;
  }
}
</style>
