import { useEffect, useState } from "react";
import MovieHeading from "./MovieHeading";
import { moviesActions } from "../store";
import { useDispatch, useSelector } from "react-redux";
import styles from "./HomePage.module.css";
import axios from "axios";
import { genreActions } from "../store";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const HomePage = () => {
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(moviesActions.changeActiveTab("home"))
    setFetching(true);
    const fetchData = async () => {
      const API_KEY = import.meta.env.VITE_API_KEY;
      const nowPlayingmoviesRes = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
      );
      dispatch(
        moviesActions.addNowPlayingMovies(
          nowPlayingmoviesRes.data.results.slice(0, 10)
        )
      );
      const topRatedmoviesRes = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
      );
      dispatch(
        moviesActions.addTopRatedMovies(
          topRatedmoviesRes.data.results.slice(0, 10)
        )
      );
      const upcomingmoviesRes = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
      );
      dispatch(
        moviesActions.addUpcomingMovies(
          upcomingmoviesRes.data.results.slice(0, 10)
        )
      );
      const popularmoviesRes = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      dispatch(
        moviesActions.addPopularMovies(
          popularmoviesRes.data.results.slice(0, 10)
        )
      );
      setFetching(false);
    };
    fetchData();
  }, [dispatch]);

  const nowPlaying = useSelector((store) => store.movies.movies.now_playing);
  const topRated = useSelector((store) => store.movies.movies.top_rated);
  const upcoming = useSelector((store) => store.movies.movies.upcoming);
  const popular = useSelector((store) => store.movies.movies.popular);

  return (
    <>
      {fetching ? (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className={styles.nowPlaying}>
            <h1>Now Playing in Theatres</h1>
            <div className={styles.moviesBox}>
              {nowPlaying.map((movie) => {
                return <MovieCard key={movie.id} movie={movie} />;
              })}
              <Link to="/movies/now_playing/1" className={styles.link}>
                Explore More..
              </Link>
            </div>
          </div>
          <div className="topRated">
            <MovieHeading title="Top Rated"></MovieHeading>
            <div className={styles.moviesBox}>
              {topRated.map((movie) => {
                return <MovieCard key={movie.id} movie={movie} />;
              })}
              <Link to="/movies/top_rated/1" className={styles.link}>
                Explore More..
              </Link>
            </div>
          </div>
          <div className="popular">
            <MovieHeading title="Popular"></MovieHeading>
            <div className={styles.moviesBox}>
              {popular.map((movie) => {
                return <MovieCard key={movie.id} movie={movie} />;
              })}
              <Link to="/movies/popular/1" className={styles.link}>
                Explore More..
              </Link>
            </div>
          </div>
          <div className="upcoming">
            <MovieHeading title="Upcoming"></MovieHeading>
            <div className={styles.moviesBox}>
              {upcoming.map((movie) => {
                return <MovieCard key={movie.id} movie={movie} />;
              })}
              <Link to="/movies/upcoming/1" className={styles.link}>
                Explore More..
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default HomePage;
