import SearchForm from "../features/SearchForm";
import RecipeList from "../features/RecipeList";
import RecipeItem from "../features/RecipeItem";
import formatRecipes from "../utility/formatRecipes";
import { useState, useEffect, useCallback } from "react";
import API from "../API/API";

function Home({ setError }) {
  const [randomRecipe, setRandomRecipe] = useState({});
  const [recipeList, setRecipeList] = useState([]);
  const [filteredRecipeList, setFilteredRecipeList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecipesByLetter = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API.url}${API.key}${API.query.byLetter}${searchValue}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }
      const recipes = await data.meals;
      recipes ? setRecipeList(formatRecipes(recipes, false)) : [];
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      console.log("fetch");
    }
  }, [searchValue, setError]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchValue.length === 0) {
        setRecipeList([]);
      } else if (searchValue.length === 1) {
        fetchRecipesByLetter();
      }
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchValue, fetchRecipesByLetter]);

  useEffect(() => {
    if (searchValue.length > 1) {
      let filteredList = recipeList.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilteredRecipeList(filteredList);
    }
  }, [searchValue, recipeList]);

  useEffect(() => {
    const fetchRandomRecipe = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API.url}${API.key}${API.query.random}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message);
        }
        const recipes = await data.meals;

        setRandomRecipe(formatRecipes(recipes, false, "medium")[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    Object.keys(randomRecipe).length === 0 && fetchRandomRecipe();
  }, [randomRecipe, setError]);

  return (
    <>
      <p>Try to cook!</p>
      {(isLoading&&Object.keys(randomRecipe).length===0)? <p>...Loading...</p> : <RecipeItem recipe={randomRecipe} />}
      <hr />

      <SearchForm setSearchValue={setSearchValue} searchValue={searchValue} />

      {searchValue && !isLoading && (
        <RecipeList
          recipeList={searchValue.length > 1 ? filteredRecipeList : recipeList}
        />
      )}

      {isLoading && searchValue && <p>...Loading...</p>}

      {!isLoading &&
        searchValue &&
        (recipeList.length === 0 || filteredRecipeList.length === 0) && (
          <p>No recipes found for "{searchValue}"</p>
        )}
    </>
  );
}

export default Home;
