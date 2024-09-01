import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import { Provider } from "react-redux";
import store from "./store/index.js";
import MovieDetails from "./components/MovieDetails.jsx";
import Movies from "./components/Movies.jsx";
import HomePage from "./components/HomePage.jsx";
import SearchMovies from "./components/SearchMovies.jsx";
import GenreMovies from "./components/GenreMovies.jsx";
import WatchList from "./components/WatchList.jsx";

const router=createBrowserRouter([
  {path: "/", element: <App/>, children:[
      {path: "/", element: <HomePage/>},
      {path: "/movie/:id", element: <MovieDetails/>},
      {path: "/movies/:category/:page", element: <Movies/>},
      {path: "movies/search", element: <SearchMovies/>},
      {path: "/movies/genre/:genre", element: <GenreMovies/>},
      {path: "/movies/:category", element: <Movies/>}
  ]}
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store= {store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
