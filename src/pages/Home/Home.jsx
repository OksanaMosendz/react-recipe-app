import { useCallback, useContext, useEffect, useState } from "react";
import API from "../../API/API.js";
import { RecipesContext } from "../../context/RecipesContext";
import RecipeItem from "../../features/RecipeItem/RecipeItem.jsx";
import RecipeList from "../../features/RecipeList/RecipeList.jsx";
import SearchForm from "../../features/SearchForm/SearchForm.jsx";
import Error from "../../shared/Error/Error.jsx";
import formatRecipes from "../../utility/formatRecipes";
import styles from "./Home.module.css";
import Loader from "../../shared/Loader/Loader.jsx";

function Home() {
  const [randomRecipe, setRandomRecipe] = useState({});
  const [recipeList, setRecipeList] = useState([]);
  const [filteredRecipeList, setFilteredRecipeList] = useState([]);
  const { searchValue, setSearchValue } = useContext(RecipesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipesByLetter = useCallback(async () => {
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API.url}${API.key}${API.query.byLetter}${searchValue[0]}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }
      const recipes = await data.meals;

      if (recipes) {
        setRecipeList(formatRecipes(recipes, false));
      } else setRecipeList([]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [searchValue, setError]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchValue.length === 0) {
        setRecipeList([]);
        setFilteredRecipeList([]);
      } else if (searchValue.length === 1) {
        fetchRecipesByLetter();
      }
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchValue, fetchRecipesByLetter]);

  useEffect(() => {
    if (searchValue.length > 1 && recipeList.length > 0) {
      let filteredList = recipeList.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilteredRecipeList(filteredList);
    } else if (recipeList.length === 0 && searchValue.length > 1) {
      fetchRecipesByLetter();
    }
  }, [searchValue, recipeList, fetchRecipesByLetter]);

  useEffect(() => {
    const fetchRandomRecipe = async () => {
      setError("");
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

  if (error) {
    return <Error error={error} />;
  } else
    return (
      <section className={styles.home_section}>
        <div className={styles.random_recipe}>
          <h2>Try to cook!</h2>
          {isLoading && Object.keys(randomRecipe).length === 0 ? (
            <Loader />
          ) : (
            <RecipeItem
              className={styles.random_recipe_item}
              recipe={randomRecipe}
            />
          )}
        </div>
        <SearchForm setSearchValue={setSearchValue} searchValue={searchValue} />

        {searchValue && !isLoading && (
          <RecipeList
            recipeList={
              searchValue.length > 1 ? filteredRecipeList : recipeList
            }
          />
        )}

        {isLoading && searchValue && <Loader />}

        {!isLoading && searchValue.length > 0 && recipeList.length === 0 && (
          <p>No recipes found for "{searchValue}"</p>
        )}

        {!isLoading &&
          searchValue.length > 1 &&
          filteredRecipeList.length === 0 && (
            <p>No recipes found for "{searchValue}"</p>
          )}
      </section>
    );
}

export default Home;
