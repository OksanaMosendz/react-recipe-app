import Search from "../features/Search";
import RecipeList from "../features/RecipeList";
import RecipeItem from "../features/RecipeItem";
import formatRecipes from '../utility/formatRecipes'
import { useState, useEffect } from "react";


function Home({API}) {
  const [randomRecipe, setRandomRecipe] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [filteredRecipeList, setFilteredRecipeList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

 

  useEffect(() => {
  
   const debounce = setTimeout(() => {
    
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `${API.url}${API.key}${API.query.byLetter}${searchValue}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message);
        }
        const recipes = await data.meals;

        recipes ? setRecipeList(formatRecipes(recipes, false, "medium")):[];
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
          recipe.name.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
    
      setFilteredRecipeList(filteredList);
    }
    }, 300);
     return () => clearTimeout(debounce);
  }, [searchValue]);



  useEffect(() => {
    const fetchRandomRecipe = async () => {
      try {
        const response = await fetch(`${API.url}${API.key}${API.query.random}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message);
        }
        const recipes = await data.meals;

      setRandomRecipe(formatRecipes(recipes, false, 'medium')[0]);
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
