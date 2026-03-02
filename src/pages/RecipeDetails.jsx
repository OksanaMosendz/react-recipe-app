import RecipeDetailCard from "../features/RecipeDetailCard";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import formatRecipes from "../utility/formatRecipes.js";
import favoritesStorage from "../utility/favoritesStorage.js";

function RecipeDetails({ API }) {
  const [recipe, setRecipe] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeById = async () => {
      try {
        const response = await fetch(
          `${API.url}${API.key}${API.query.byId}${id}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message);
        }
        const recipes = await data.meals;

        setRecipe(formatRecipes(recipes, false, "large")[0]);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("fetch is done");
      }
    };

    const favoriteRecipe = (favoritesStorage.getList()).find((recipe) => id === recipe.id);
    favoriteRecipe ? setRecipe(favoriteRecipe) : fetchRecipeById();
  }, [API, id]);

  function addRecipe() {
    setRecipe({ ...recipe, isFavorite: true });
    favoritesStorage.addRecipe(recipe);
  }

  function removeRecipe() {
    setRecipe({ ...recipe, isFavorite: false });
    favoritesStorage.removeRecipe(recipe);
  }

  return (
    <>
      <RecipeDetailCard recipe={recipe}></RecipeDetailCard>
      <button onClick={() => navigate(location.state?.back || "/")}>
        Back
      </button>
      {recipe.isFavorite ? (
        <div>
          <button>Edit</button>
          <button onClick={removeRecipe}>Remove </button>
        </div>
      ) : (
        <div>
          <button onClick={addRecipe}>Add to Favorites</button>
        </div>
      )}
    </>
  );
}

export default RecipeDetails;
