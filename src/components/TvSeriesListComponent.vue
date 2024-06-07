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
    </div>
    <div class="container">
      <CardComponent
        v-if="!this.store.filteredTvShows.length"
        v-for="tvSerie in this.store.tvResults"
        :title="tvSerie.name"
        :originalTitle="tvSerie.original_name"
        :originalLanguage="tvSerie.original_language"
        :vote="tvSerie.vote_average"
        :posterPath="tvSerie.poster_path"
        :imgUrl="this.store.imgBaseUrl"
        :imgSize="this.store.imgSize"
        :id="tvSerie.id"
        :cast="this.store.cast"
        :searchResults="this.store.tvResults"
        :actorKey="this.store.tvKey"
      />
      <CardComponent
        v-else
        v-for="tvSerie in this.store.filteredTvShows"
        :title="tvSerie.name"
        :originalTitle="tvSerie.original_name"
        :originalLanguage="tvSerie.original_language"
        :vote="tvSerie.vote_average"
        :posterPath="tvSerie.poster_path"
        :imgUrl="this.store.imgBaseUrl"
        :imgSize="this.store.imgSize"
        :id="tvSerie.id"
        :cast="this.store.cast"
        :searchResults="this.store.filteredTvShows"
        :actorKey="this.store.tvKey"
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
    width: 76%;
    margin: 20px auto;
    align-items: baseline;
    justify-content: space-between;
    padding-top: 10px;
    color: #ffffff;
    h2 {
      font-size: 30px;
    }
    h3 {
      font-size: 20px;
    }
  }
}
</style>
