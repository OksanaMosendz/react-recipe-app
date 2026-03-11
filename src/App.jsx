import { useEffect, useState, } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import styles from "./App.module.css";
import About from "./pages/About/About";
import FavoriteRecipes from "./pages/FavoriteRecipes/FavoriteRecipes";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import Container from './shared/Container/Container';
import Footer from "./shared/Footer/Footer";
import Header from "./shared/Header/Header";

function App() {
  const [title, setTitle] = useState("Cookbook");

  const location = useLocation();

 useEffect(() => {

const changeTitle = ()=>{

  if(location.pathname.startsWith('/recipe/')){
      setTitle("Recipe");
    }
    else{
    switch (location.pathname) {
      case "/":
        setTitle("Cookbook");
        break;
      case "/favorites":
        setTitle("Favorite Recipes");
        break;
          case "/favorite/new":
        setTitle("New Recipe");
        break;
        case "/about":
        setTitle("About");
        break;
      default:
        setTitle("Not Found");
        break;
    }}
  }
changeTitle();

  },[location.pathname]);

  return (
  <div className={styles.app}>
      <Header title={title} />
    <Container className={styles.app_container}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/favorites" element={<FavoriteRecipes />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Container>
      <Footer/>
</div>

  );
}

export default App;
