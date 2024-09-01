import axios from "axios";
import styles from "./MovieCard.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";


const MovieCard = ({movie}) => {
  console.log(movie);
  const genreMap = useSelector(store=>store.genres)
  const navigate = useNavigate();

  const [remainingGenres, setRemainingGenres] = useState(0);
  const [moreThan3Genres, setMoreThan3Genres] = useState(false);
  useEffect(() => {
    if (movie.genre_ids.length > 2) {
      const remaining = movie.genre_ids.length - 2;
      setMoreThan3Genres(true);
      setRemainingGenres(remaining);
    }
  }, [movie.genre_ids]);
  return (
    <div className={`card ${styles.cardBox}`} style={{ width: "13.5rem" }} onClick={()=>navigate(`/movie/${movie.id}`)}>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        className="card-img-top"
        alt="..."
        style={{ height: "245px" }}
      />
      <div className="card-body">
        {/* <h6 className={`card-title ${styles.movieTitle}`}>{movie.title}</h6> */}
        <div className={styles.popularityAndRating}>
          <div className={styles.popularity}>
            <img
              src="/fire.png"
              alt=""
              className={styles.iconImage}
            />
            <span className={styles.spanText}>{movie.popularity}K</span>
          </div>
          <div className={styles.rating}>
            <img
              src="/star.png"
              alt=""
              className={styles.iconImage}
            />
            <span className={styles.spanText}>{movie.vote_average} / 10</span>
          </div>
        </div>
        <div className={styles.genres}>
          {!moreThan3Genres ? (
            movie.genre_ids.map((id) => {
              return (
                <span
                  className={`badge text-bg-light ${styles.badgeIcon}`}
                  key={id}
                >
                  {genreMap[id]}
                </span>
              );
            })
          ) : (
            <>
              <span className={`badge text-bg-light ${styles.badgeIcon}`}>
                {genreMap[movie.genre_ids[0]]}
              </span>
              <span className={`badge text-bg-light ${styles.badgeIcon}`}>
                {genreMap[movie.genre_ids[1]]}
              </span>

              <span className={`badge text-bg-light ${styles.badgeIcon}`}>
                +{remainingGenres} more
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
