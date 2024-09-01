import { configureStore, createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    activeTab: "home",
    movies: {
      top_rated: [],
      popular: [],
      now_playing: [],
      upcoming: [],
      searched_movies:[],
      genreMovies: [],
      watchList: []
    },
  },
  reducers: {
    addTopRatedMovies: (state, action) => {
      state.movies.top_rated = action.payload;
    },
    addNowPlayingMovies: (state, action) => {
      state.movies.now_playing = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.movies.upcoming = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.movies.popular = action.payload;
    },
    changeActiveTab: (state,action)=>{
      state.activeTab= action.payload;
    },
    addSearchMovies: (state,action)=>{
      state.movies.searched_movies = action.payload;
    },
    addGenreMovies: (state,action)=>{
      state.movies.genreMovies = action.payload;
    },
    addToWatchList: (state,action)=>{
      state.movies.watchList.push(action.payload);
    },
    removeFromWatchList: (state,action)=>{
      state.movies.watchList= state.movies.watchList.filter(movie=> movie.id!=action.payload);
    },
  },
});

const genreSlice = createSlice({
  name: "genres",
  initialState: {},
  reducers: {
    addInitialGenres: (state, action) => {
      const genreMap = {};
      action.payload.forEach((genre) => {
        genreMap[genre.id] = genre.name;
      });
      return (state = genreMap);
    },
  },
});

const store = configureStore({
  reducer: {
    movies: movieSlice.reducer,
    genres: genreSlice.reducer,
  },
});

export const genreActions = genreSlice.actions;
export const moviesActions = movieSlice.actions;
export default store;
