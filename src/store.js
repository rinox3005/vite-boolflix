import { reactive } from "vue";

export const store = reactive({
  apiKey: "?api_key=2e9823c947e947ab6a35784821aa1f55",
  apiMovieSearchUrl: "https://api.themoviedb.org/3/search/movie",
  movieResults: [],
  searchQuery: "",
});
