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
  const [randomRecipe, setRandomRecipe] = useState({});

  const API = {
    url: "https://www.themealdb.com/api/json/v1/",
    key: import.meta.env.VITE_API_KEY,
  };

  const searchQuery = {
    random: "/random.php",
    byName: "/search.php?f=a",
  };

  const fetchRecipes = async (query) => {
    try {
      const response = await fetch(`${API.url}${API.key}${query}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }
      const recipes = await data.meals;
      console.log(recipes);
      setRandomRecipe(recipes[0]);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("fetch is done");
    }
  };

  useEffect(() => {
    fetchRecipes(searchQuery.random);
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setTitle("Cookbook");
        break;
      case "/favorites":
        setTitle("Favorites");
        break;
      case "/recipe/id":
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
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<FavoriteRecipes />} />
        <Route
          path="/recipe/id"
          element={<RecipeDetails recipe={randomRecipe} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
