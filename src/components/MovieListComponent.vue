<script>
import CardComponent from "./CardComponent.vue";
import { store } from "../store";
export default {
  name: "MovieListComponent",
  data() {
    return {
      store,
    };
  },
  components: {
    CardComponent,
  },
};
</script>

<template>
  <div class="container">
    <CardComponent
      v-for="movie in this.store.movieResults"
      :title="movie.title"
      :originalTitle="movie.original_title"
      :originalLanguage="movie.original_language"
      :vote="movie.vote_average"
      :posterPath="movie.poster_path"
      :imgUrl="this.store.imgBaseUrl"
      :imgSize="this.store.imgSize"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  width: 80%;
  margin: 20px auto;
}
</style>
