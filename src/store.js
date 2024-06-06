import { reactive } from "vue";

export const store = reactive({
  apiKey: "2e9823c947e947ab6a35784821aa1f55",
  apiMovieSearchUrl: "https://api.themoviedb.org/3/search/movie",
  apiTvSearchUrl: "https://api.themoviedb.org/3/search/tv",
  imgBaseUrl: "https://image.tmdb.org/t/p/",
  imgSize: "w342",
  movieResults: [],
  tvResults: [],
  cast: [],
  searchQuery: "",
  currentSearch: "",
  movieKey: "movie/",
  tvKey: "tv/",
});
