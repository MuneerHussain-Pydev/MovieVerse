import { useSelector } from "react-redux";
import styles from "./Footer.module.css";
import {Link} from 'react-router-dom'

const Footer = () => {
  const genreMap = useSelector((store) => store.genres);
  return (
    <footer
      className=""
      style={{
        backgroundColor: "#212429",
        maxWidth: "99.8vw",
        marginBottom: "-32rem",
      }}
    >
      <div
        className="col-12 "
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="my-4 col-12 d-flex justify-content-center">
          <h4 style={{ color: "white" }}>Genres</h4>
        </div>
        <div className="d-flex ">
          <div className="col-12">
            <ul className="nav d-flex">
              {Object.values(genreMap).map((genre) => {
                return (
                  <li className="nav-item mb-2  col-md-3 ps-5 col-sm-4 col-6" key={genre}>
                    <Link to={`/movies/genre/${genre}?page=1`} className={`nav-link p-0 ${styles.listItems}`}>
                      {genre}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className=" col-12 mt-4 ps-4 d-flex justify-content-end">
        <p style={{ color: "#9B9B9B" }}>© 2024 Muneer, All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
