import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "./components/Container"; 
import { Outlet } from "react-router";
import { useEffect } from "react";
import { genreActions } from "./store";
import axios from "axios";
import { useDispatch } from "react-redux";


function App() {
  const dispatch= useDispatch();
  useEffect(()=>{
    const fetchData= async ()=>{
      const API_KEY = import.meta.env.VITE_API_KEY;
      const genreRes = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      dispatch(genreActions.addInitialGenres(genreRes.data.genres));
    }
    fetchData()
  },[dispatch])
  

  return (
    <div>
      <Header></Header>
      <Container>
        <Outlet/>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default App;
