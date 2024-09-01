import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { moviesActions } from "../store";
import MovieHeading from "./MovieHeading";
import LoadingSpinner from "./LoadingSpinner";
import MovieCard from "./MovieCard";
import styles from "./Movies.module.css";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import PageError from "./PageError";

const GenreMovies = () => {
  const [fetching, setFetching] = useState(false);
  const [pageError, setPageError] = useState(false);
  let genre = useParams().genre;
  [genre] = genre.split("?");
  console.log(genre);
  const genreMap = useSelector((store) => store.genres);
  const [genreID] = Object.keys(genreMap).filter(
    (id) => genreMap[id] === genre
  );
  console.log(genreID);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageNo = queryParams.get("page");
  const [apiResponse, setApiResponse] = useState({});

  useEffect(() => {
    // Only fetch data if genreID is available
    if (genreID) {
      dispatch(moviesActions.changeActiveTab("genre"));
      window.scrollTo(0, 0);
      setFetching(true);

      const fetchData = async () => {
        try {
          const API_KEY = import.meta.env.VITE_API_KEY;
          const genreMoviesRes = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreID}&page=${pageNo}`
          );
          setApiResponse(genreMoviesRes.data);
          dispatch(moviesActions.addGenreMovies(genreMoviesRes.data.results));
        } catch (error) {
          console.error("Error fetching genre movies:", error);
        } finally {
          setFetching(false);
        }
      };

      fetchData();
    }
  }, [genreID, pageNo, dispatch]);

  const genreMovies = useSelector((store) => store.movies.movies.genreMovies);

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
      navigate(`/movies/genre/${genre}?page=${pageValue}`);
    }
  };

  const handleNextBtn = () => {
    navigate(`/movies/genre/${genre}?page=${+pageNo + 1}`);
  };
  const handlePrevBtn = () => {
    navigate(`/movies/genre/${genre}?page=${+pageNo - 1}`);
  };

  return (
    <>
      {!pageError ? (
        <>
          <MovieHeading title={`Results for ${genre} Genre`} />
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
              <div className={styles.moviesBox}>
                {genreMovies.map((movie) => {
                  return <MovieCard key={movie.id} movie={movie} />;
                })}
              </div>
              <div className={styles.pageContainer}>
                {pageNo <= 1 ? (
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
                  {pageNo}
                </button>
                {pageNo >= apiResponse.total_pages ? (
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
      ) : (
        <PageError />
      )}
    </>
  );
};
export default GenreMovies;
