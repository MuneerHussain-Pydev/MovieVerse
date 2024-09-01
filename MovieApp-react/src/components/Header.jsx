import logo from "/logo.png";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { useRef } from "react";
import { moviesActions } from "../store";

const Header = () => {
  const watchListMovies = useSelector(store=>store.movies.movies.watchList);
  const activeTab = useSelector((store) => store.movies.activeTab);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movieName = useRef("");

  const handleMovieSearch = async () => {
    const movieNameValue = movieName.current.value;
    const params = new URLSearchParams({ query: movieNameValue });
    dispatch(moviesActions.changeActiveTab("search"));
    navigate(`/movies/search?${params.toString()}&page=1`);
    movieName.current.value="";
  };

  return (
    <header
      style={{ height: "33vh" }}
      className={`p-1 p-lg-4 p-md-4 p-sm-4  text-bg-dark ps-0`}
    >
      <div className="d-flex flex-column mx-4 ">
        <img src={logo} alt="" style={{ width: "250px", marginTop: "-17px", marginBottom: "-5px" }} />
        <div className="d-flex flex-wrap flex-md-wrap flex-sm-wrap align-items-center justify-content-center justify-content-lg-start justify-content-sm-start mt-md-4">
          <ul className="nav col-8 col-md-6 col-sm-12 col-lg-auto me-lg-auto mb-2 justify-content-center justify-content-sm-center mb-md-0 flex-nowrap flex-sm-nowrap">
            <li>
              <Link
                to="/"
                className={`nav-link px-2 ${
                  activeTab === "home" ? "text-warning" : "text-white"
                }`}
                onClick={() => dispatch(moviesActions.changeActiveTab("home"))}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/movies/now_playing/1"
                className={`nav-link px-2 ${
                  activeTab === "now_playing" ? "text-warning" : "text-white"
                }`}
                onClick={() =>
                  dispatch(moviesActions.changeActiveTab("now_playing"))
                }
              >
                Now Playing
              </Link>
            </li>
            <li>
              <Link
                to="/movies/popular/1"
                className={`nav-link px-2 ${
                  activeTab === "popular" ? "text-warning" : "text-white"
                }`}
                onClick={() =>
                  dispatch(moviesActions.changeActiveTab("popular"))
                }
              >
                Popular
              </Link>
            </li>
            <li>
              <Link
                to="/movies/upcoming/1"
                className={`nav-link px-2 ${
                  activeTab === "upcoming" ? "text-warning" : "text-white"
                }`}
                onClick={() =>
                  dispatch(moviesActions.changeActiveTab("upcoming"))
                }
              >
                Upcoming
              </Link>
            </li>
            <li>
              <Link
                to="/movies/top_rated/1"
                className={`nav-link px-2 ${
                  activeTab === "top_rated" ? "text-warning" : "text-white"
                }`}
                onClick={() =>
                  dispatch(moviesActions.changeActiveTab("top_rated"))
                }
              >
                Top Rated
              </Link>
            </li>
            <li>
              <Link
                to="/movies/watchList"
                className={`nav-link px-2 position-relative ${
                  activeTab === "watchList" ? "text-warning" : "text-white"
                }`}
                onClick={() =>
                  dispatch(moviesActions.changeActiveTab("watchList"))
                }
              >
                WatchList
                <span className="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-warning text-secondary">
                  {watchListMovies.length}
                </span>
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center justify-content-end col-md-6 col-sm-12 col-8">
            <form className="me-3 col-lg-auto me-lg-3  col-md-5" role="search">
              <input
                ref={movieName}
                type="search"
                className={`form-control form-control-dark text-bg-dark ${styles.movieSearchBar}`}
                placeholder={"Search movie"}
                aria-label="Search"
              />
            </form>

            <div className="text-end d-flex flex-nowrap align-items-center">
              <button
                type="button"
                className={`btn btn-warning ${styles.btns}`}
                onClick={handleMovieSearch}
              >
                {"Find "}
                <CiSearch />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
