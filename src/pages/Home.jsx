import Search from "../features/Search";
import RecipeList from "../features/RecipeList";
import RecipeItem from "../features/RecipeItem";
import { useState, useEffect } from "react";

function Home() {
  const [randomRecipe, setRandomRecipe] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [filteredRecipeList, setFilteredRecipeList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const API = {
    url: "https://www.themealdb.com/api/json/v1/",
    key: import.meta.env.VITE_API_KEY,
  };

  const query = {
    random: "/random.php",
    byLetter: "/search.php?f=",
  };

  useEffect(() => {
  
   const debounce = setTimeout(() => {
    
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `${API.url}${API.key}${query.byLetter}${searchValue}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message);
        }
        const recipes = await data.meals;

        recipes ? setRecipeList(recipes) : [];
      } catch (error) {
        console.log(error);
      } finally {
        console.log("fetch is done");
      }
    };
    if (searchValue.length === 1) {
      fetchRecipes();
    } else if (searchValue.length > 1) {
      let filteredList = recipeList.filter((recipe) => {
        return (
          recipe.strMeal.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      console.log("filteredlist", filteredRecipeList);
      setFilteredRecipeList(filteredList);
    }
    }, 300);
     return () => clearTimeout(debounce);
  }, [searchValue]);


  useEffect(() => {
    const fetchRandomRecipe = async () => {
      try {
        const response = await fetch(`${API.url}${API.key}${query.random}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message);
        }
        const recipes = await data.meals;

        setRandomRecipe(recipes[0]);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("fetch is done");
      }
    };
     fetchRandomRecipe()
  },[]);

  return (
    <>
      <p>Recipe Of The Day!</p>
      <RecipeItem recipe={randomRecipe} />
      <hr />
      <Search setSearchValue={setSearchValue} searchValue={searchValue} />

{searchValue&&<RecipeList
        recipeList={searchValue.length > 1 ? filteredRecipeList : recipeList}
      />}
    </>
  );
}

export default Home;
