<script>
import CardComponent from "./CardComponent.vue";
import { store } from "../store";
export default {
  name: "TvSeriesListComponent",
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
      v-for="tvSerie in this.store.tvResults"
      :title="tvSerie.name"
      :originalTitle="tvSerie.original_name"
      :originalLanguage="tvSerie.original_language"
      :vote="tvSerie.vote_average"
      :posterPath="tvSerie.poster_path"
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
