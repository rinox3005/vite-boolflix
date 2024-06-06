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
  <div class="tvseries">
    <div class="results">
      <h2 v-show="this.store.tvResults.length">TV Series</h2>
      <h3 v-show="this.store.tvResults.length">
        Results for "{{ this.store.currentSearch }}"
      </h3>
    </div>
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
.tvseries {
  .results {
    display: flex;
    width: 77%;
    margin: 20px auto;
    align-items: baseline;
    justify-content: space-between;
    padding: 10px 0;
    color: #ffffff;
    h2 {
      font-size: 40px;
    }
    h3 {
      font-size: 20px;
    }
  }
}
</style>
