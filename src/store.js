import { reactive } from "vue";

export const store = reactive({
  apiKey: "2e9823c947e947ab6a35784821aa1f55",
  apiMovieSearchUrl: "https://api.themoviedb.org/3/search/movie",
  apiTvSearchUrl: "https://api.themoviedb.org/3/search/tv",
  movieResults: [],
  tvResults: [],
  searchQuery: "",
});
