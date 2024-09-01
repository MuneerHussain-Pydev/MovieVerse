import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { useEffect, useRef, useState } from "react";
import store, { moviesActions, genreActions } from "./../store";
import { useDispatch } from "react-redux";
import axios from "axios";
import styles from "./Movies.module.css";
import { useNavigate, useParams } from "react-router";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import LoadingSpinner from "./LoadingSpinner";
import MovieHeading from "./MovieHeading";
import PageError from "./PageError";

const Movies = () => {
  const [fetching, setFetching] = useState(false);
  const [pageError, setPageError] = useState(false);
  let params = useParams();
  const category = params.category;
  const page = params.page;
  // const page = useSelector(store=>store.movies.page)

  const dispatch = useDispatch();

  const [apiResponse, setApiResponse] = useState({});

  useEffect(() => {
    dispatch(moviesActions.changeActiveTab(category));
    if (category != "watchList") {
      window.scrollTo(0, 0);
      const fetchData = async () => {
        setFetching(true);
        const API_KEY = "88567e47a1ee027ceda9610d04cdf5b3";
        const moviesRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=${page}`
        );
        setTimeout(() => {
          setApiResponse(moviesRes.data);
          if (category === "now_playing") {
            dispatch(moviesActions.addNowPlayingMovies(moviesRes.data.results));
          } else if (category === "top_rated") {
            dispatch(moviesActions.addTopRatedMovies(moviesRes.data.results));
          } else if (category === "upcoming") {
            dispatch(moviesActions.addUpcomingMovies(moviesRes.data.results));
          } else if (category === "popular") {
            dispatch(moviesActions.addPopularMovies(moviesRes.data.results));
          }
          setFetching(false);
        }, 1000);
      };
      fetchData();
    }
  }, [dispatch, category, page]);
  const navigate = useNavigate();

  const pageRef = useRef();
  const handleGoToBtn = () => {
    const pageValue = pageRef.current.value;
    if (pageValue === "") {
      alert("Enter a page number first");
    } else if (pageValue < 1) {
      alert("Enter a valid page number");
    } else if (pageValue > apiResponse.total_pages) {
      setPageError(true);
    } else {
      navigate(`/movies/${category}/${pageValue}`);
    }
  };

  const handleNextBtn = () => {
    navigate(`/movies/${category}/${+page + 1}`);
  };
  const handlePrevBtn = () => {
    navigate(`/movies/${category}/${+page - 1}`);
  };

  const movies = useSelector((store) => store.movies.movies[category]);
  console.log(movies);
  let title;
  if (category === "now_playing") {
    title = "Now Playing";
  } else if (category === "top_rated") {
    title = "Top Rated";
  } else if (category === "upcoming") {
    title = "Upcoming";
  } else if (category === "popular") {
    title = "Popular";
  } else if (category === "watchList") {
    title = "Watch List";
  }
  return (
    <>
      {!pageError ? (
        <>
          <MovieHeading title={title}></MovieHeading>
          {fetching ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {
                category=="watchList"&& movies.length==0 && <h1 style={{marginLeft: "15px"}}>No movies in watchlist</h1>
              }

              <div className={styles.moviesBox}>
                {movies.map((movie) => {
                  return <MovieCard key={movie.id} movie={movie} />;
                })}
              </div>
              {category != "watchList" && (
                <>
                  <div className={styles.pageContainer}>
                    {page <= 1 ? (
                      <button
                        className={`btn btn-warning ${styles.pageBtn}`}
                        disabled
                      >
                        <IoMdArrowDropleft fontSize="20px" />
                        Prev
                      </button>
                    ) : (
                      <button
                        className={`btn btn-outline-warning ${styles.pageBtn}`}
                        onClick={handlePrevBtn}
                      >
                        <IoMdArrowDropleft fontSize="20px" />
                        Prev
                      </button>
                    )}
                    <button className={`btn btn-warning ${styles.pageBtn}`}>
                      {page}
                    </button>
                    {page >= apiResponse.total_pages ? (
                      <button
                        className={`btn btn-warning ${styles.pageBtn}`}
                        disabled
                      >
                        Next <IoMdArrowDropright fontSize="20px" />
                      </button>
                    ) : (
                      <button
                        className={`btn btn-outline-warning ${styles.pageBtn}`}
                        onClick={handleNextBtn}
                      >
                        Next <IoMdArrowDropright fontSize="20px" />
                      </button>
                    )}

                    <div className={styles.orSeparator}>
                      <span className={styles.line}></span>
                      <span className={styles.orText}>OR</span>
                      <span className={styles.line}></span>
                    </div>
                    <div className={styles.pageSearch}>
                      <input
                        ref={pageRef}
                        type="number"
                        min={1}
                        max={apiResponse.total_pages}
                        className={styles.searchBar}
                      />
                      <button
                        className={`btn btn-outline-warning ${styles.goBtn}`}
                        onClick={handleGoToBtn}
                      >
                        Go To <IoMdArrowDropright fontSize="20px" />
                      </button>
                    </div>
                  </div>
                  <div className={styles.totalPages}>
                    Total Pages:{" "}
                    <span className={styles.totalPageNum}>
                      {apiResponse.total_pages}
                    </span>
                  </div>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <PageError />
      )}
    </>
  );
};
export default Movies;
