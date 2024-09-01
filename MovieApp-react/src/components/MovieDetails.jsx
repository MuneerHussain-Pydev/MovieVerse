import { useParams } from "react-router";
import styles from "./MovieDetails.module.css";

import { FaRegBookmark } from "react-icons/fa6";
import Rating from "./Rating";
import { useEffect, useState } from "react";
import axios from "axios";
import { moviesActions } from "../store";
import { useDispatch, useSelector } from "react-redux";

const MovieDetails = () => {
  const [inWatchList, setInWatchList] = useState(false);
  const dispatch = useDispatch();
  const movieId = useParams();
  const [movie, setMovie] = useState({
    genres: [],
    spoken_languages: [],
    production_companies: [],
  });
  const watchListMovies = useSelector((store) => store.movies.movies.watchList);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const API_KEY = import.meta.env.VITE_API_KEY;
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId.id}?api_key=${API_KEY}`
      );
      setMovie(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const movieExists = watchListMovies.some(
      (wmovie) => wmovie.id === movie.id
    );
    setInWatchList(movieExists);
  }, [movie.id, watchListMovies]);

  const handleAddToWatchList = () => {
    dispatch(
      moviesActions.addToWatchList({
        id: movie.id,
        poster_path: movie.poster_path,
        title: movie.title,
        popularity: movie.popularity,
        vote_average: movie.vote_average,
        genre_ids: movie.genres.map((genre) => {
          return genre.id;
        }),
      })
    );
    setInWatchList(true);
  };

  const handleRemoveFromWatchList = () => {
    dispatch(
      moviesActions.removeFromWatchList(movie.id),
    );
    setInWatchList(false);
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          margin: "-30px",
          minWidth: "98.8vw ",
          height: "100vh",
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 55%, rgba(11,11,11, 1) 100%),
    url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          border: "none",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginBottom: "350px",
          display: "flex",
          // alignContent: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="card mb-3"
          style={{
            maxWidth: "85%",
            position: "absolute",
            top: "440px",
            // left: "100px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
            borderRadius: "10px",
            border: "solid 5px #ffc00a",
            display: "flex",
          }}
        >
          <div
            className="row g-0"
            style={{ backgroundColor: "#1E201E", borderRadius: "5px" }}
          >
            <div className="col-md-4 col-sm-4">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                className="img-fluid rounded-start"
                alt="..."
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "80vh",
                  borderRadius: "15px 0 0 15px",
                }}
              />
            </div>
            <div className="col-md-8 col-sm-8">
              <div className="card-body">
                <h2 className={`card-title ${styles.movieTitle}`}>
                  {movie.title}
                </h2>
                <p className={`card-text ${styles.description}`}>
                  {movie.overview}
                </p>
                <div className={styles.genresDiv}>
                  <h6>Genres: </h6>
                  {movie.genres.map((genre) => {
                    return (
                      <span
                        className={`badge text-bg-warning ${styles.badgeIcon}`}
                        key={genre.id}
                      >
                        {genre.name}
                      </span>
                    );
                  })}
                </div>
                <div className={styles.productionCompanies}>
                  <h6>Produced By: </h6>
                  {movie.production_companies.map((pCompaines) => {
                    return (
                      <span
                        className={`badge text-bg-warning ${styles.badgeIcon}`}
                        key={pCompaines.id}
                      >
                        {pCompaines.name}
                      </span>
                    );
                  })}
                </div>
                <div className={styles.languages}>
                  <h6>Language: </h6>
                  {movie.spoken_languages.map((lang) => {
                    return (
                      <span
                        className={`badge text-bg-warning ${styles.badgeIcon}`}
                        key={lang.iso_639_1}
                      >
                        {lang.name}
                      </span>
                    );
                  })}
                </div>
                <div className={styles.duration}>
                  <h6>Duration: </h6>
                  <span style={{ color: "rgb(193, 193, 193)" }}>
                    {movie.runtime} minutes
                  </span>
                </div>

                <div className={styles.ratingDiv}>
                  <div className={styles.releaseDate}>
                    {movie.status === "Released"
                      ? `Released on ${movie.release_date}`
                      : `Will be release on ${movie.release_date}`}{" "}
                  </div>
                  <Rating ratingValue={movie.vote_average}></Rating>
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    marginRight: "1000px",
                    marginTop: "10px",
                  }}
                >
                  {!inWatchList ? (
                    <button
                      className={`btn btn-warning ${styles.watchListBtn}`}
                      onClick={handleAddToWatchList}
                    >
                      {" "}
                      Add to Watchlist{" "}
                      <FaRegBookmark style={{ fontSize: "20px" }} />
                    </button>
                  ) : (
                    <button
                      className={`btn btn-warning ${styles.watchListBtn}`}
                      onClick={handleRemoveFromWatchList}
                    >
                      {" "}
                      Remove From Watchlist{" "}
                      <FaRegBookmark style={{ fontSize: "20px" }} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
