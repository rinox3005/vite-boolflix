<script>
import CardComponent from "./CardComponent.vue";
import { store } from "../store";
import axios from "axios";
export default {
  name: "TvSeriesListComponent",
  data() {
    return {
      store,
      tvSerieDetails: {},
    };
  },
  components: {
    CardComponent,
  },
  created() {
    this.$watch(
      () => this.store.tvResults,
      (newResults) => {
        newResults.forEach((tvSerie) => {
          this.fetchTvDetails(tvSerie.id);
        });
      },
      { immediate: true }
    );
  },
  methods: {
    async fetchTvDetails(id) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=2e9823c947e947ab6a35784821aa1f55&append_to_response=credits`
        );
        const tvSerie = response.data;
        // Directly modifying the reactive object
        this.tvSerieDetails = {
          ...this.tvSerieDetails,
          [id]: {
            actors: tvSerie.credits.cast.slice(0, 5),
            genres: tvSerie.genres,
          },
        };
      } catch (error) {
        console.error("Error fetching tv series details:", error);
      }
    },
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
        v-for="tvSerie in store.tvResults"
        :title="tvSerie.name"
        :originalTitle="tvSerie.original_name"
        :originalLanguage="tvSerie.original_language"
        :vote="tvSerie.vote_average"
        :posterPath="tvSerie.poster_path"
        :imgUrl="this.store.imgBaseUrl"
        :imgSize="this.store.imgSize"
        :plot="tvSerie.overview"
        :actors="tvSerieDetails[tvSerie.id]?.actors || []"
        :genres="tvSerieDetails[tvSerie.id]?.genres || []"
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
        :plot="tvSerie.overview"
        :actors="tvSerieDetails[tvSerie.id]?.actors || []"
        :genres="tvSerieDetails[tvSerie.id]?.genres || []"
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
