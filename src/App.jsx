import "./App.css";
import { useLocation, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FavoriteRecipes from "./pages/FavoriteRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./shared/Header";
import { useEffect, useState,} from "react";

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
        setTitle("Favorites");
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
    <>
      <Header title={title} />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/favorites" element={<FavoriteRecipes />} />
        <Route path="/recipe/:id" element={<RecipeDetails/>} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
