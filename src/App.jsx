import "./App.css";
import { useLocation, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FavoriteRecipes from "./pages/FavoriteRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./shared/Header";
import { useEffect, useState } from "react";

function App() {
  const [title, setTitle] = useState("Cookbook");
  const location = useLocation();

 const API = {
    url: "https://www.themealdb.com/api/json/v1/",
    key: import.meta.env.VITE_API_KEY,
    query:{
    random: "/random.php",
    byLetter: "/search.php?f=",
    byId: "/lookup.php?i="
  }
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setTitle("Cookbook");
        break;
      case "/favorites":
        setTitle("Favorites");
        break;
      case "/recipe/:id":
        setTitle("Recipe");
        break;
      case "/about":
        setTitle("About");
        break;
      default:
        setTitle("Not Found");
        break;
    }
  }, [location]);

  return (
    <>
      <Header title={title} />
      <Routes>
        <Route path="/" element={<Home API={API}/>} />
        <Route path="/favorites" element={<FavoriteRecipes />} />
        <Route path="/recipe/:id" element={<RecipeDetails API={API}/>} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
