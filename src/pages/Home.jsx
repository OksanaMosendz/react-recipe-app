import Search from "../features/Search";
import RecipeList from "../features/RecipeList";
import RecipeItem from "../features/RecipeItem";
import formatRecipes from "../utility/formatRecipes";
import { useState, useEffect , useCallback} from "react";
import API from "../API/API";

function Home() {
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
        console.log(error);
      } finally {
        setIsLoading(false);
        console.log("fetch");
      }
    },[searchValue]);


 useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchValue.length === 1) {
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
      try {
        const response = await fetch(`${API.url}${API.key}${API.query.random}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message);
        }
        const recipes = await data.meals;

        setRandomRecipe(formatRecipes(recipes, false, "medium")[0]);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("fetch is done");
      }
    };
    fetchRandomRecipe();
  }, []);

  return (
    <>
      <p>Try to cook!</p>
      <RecipeItem recipe={randomRecipe} />

      <hr />
      <Search setSearchValue={setSearchValue} searchValue={searchValue} />

      { !isLoading&&(
        <RecipeList
          recipeList={searchValue.length > 1 ? filteredRecipeList : recipeList}
        />
      )}

      {isLoading && <p>...Loading...</p>}
    </>
  );
}

export default Home;
