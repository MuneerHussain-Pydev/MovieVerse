import { useLocation, useNavigate } from "react-router";
import MovieHeading from "./MovieHeading";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import styles from "./Movies.module.css";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { moviesActions } from "../store";
import axios from "axios";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import PageError from "./PageError";

const SearchMovies = () => {
  const location = useLocation();
  const [fetching, setFetching] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("query");
  const pageNo = queryParams.get("page");
  const dispatch = useDispatch();
  const [apiResponse, setApiResponse] = useState({});
  const [pageError, setPageError] = useState(false);

  const [query, page] = location.search.split("&");
  console.log(query);
  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      const API_KEY = import.meta.env.VITE_API_KEY;
      const searchRes = await axios.get(
        `https://api.themoviedb.org/3/search/movie${query}&api_key=${API_KEY}&${page}`
      );
      dispatch(moviesActions.addSearchMovies(searchRes.data.results));
      setApiResponse(searchRes.data);
      setFetching(false);
    };
    fetchData();
  }, [location]);

  const searchedMovies = useSelector(
    (store) => store.movies.movies.searched_movies
  );

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
      navigate(`/movies/search${query}&page=${pageValue}`);
    }
  };

  const handleNextBtn = () => {
    navigate(`/movies/search${query}&page=${+pageNo + 1}`);
  };
  const handlePrevBtn = () => {
    navigate(`/movies/search${query}&page=${+pageNo - 1}`);
  };

  return (
    <>
      {!pageError ? (
        <>
          <MovieHeading title={`Results for ${searchValue}`} />
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
                {searchedMovies.map((movie) => {
                  return <MovieCard key={movie.id} movie={movie} />;
                })}
              </div>
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
                  {pageNo}
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
      ) : (
        <PageError />
      )}
    </>
  );
};

export default SearchMovies;
