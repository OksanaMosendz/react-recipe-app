import RecipeDetailCard from "../features/RecipeDetailCard";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import formatRecipes from "../utility/formatRecipes.js";
import favoritesStorage from "../utility/favoritesStorage.js";
import RecipeForm from "../features/RecipeForm.jsx"

function RecipeDetails({ API }) {
  const [recipe, setRecipe] = useState({});
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

    const favoriteRecipe = favoritesStorage
      .getList()
      .find((recipe) => id === recipe.id);

    if (favoriteRecipe) {
      setRecipe(favoriteRecipe);
    } else if (id !== "new" && !favoriteRecipe) {
      fetchRecipeById();
    }
  }, [API, id]);

  function addRecipe() {
    setRecipe({ ...recipe, isFavorite: true });
    favoritesStorage.addRecipe(recipe);
  }

  function removeRecipe() {
    id==='new'? setRecipe({}): setRecipe({ ...recipe, isFavorite: false });
    favoritesStorage.removeRecipe(recipe);
  }


  return (
    <>
      {id === "new"&&!recipe.isFavorite && <RecipeForm setRecipe={setRecipe} />}

      {recipe.isFavorite ? (
        <div>
          <RecipeDetailCard recipe={recipe}></RecipeDetailCard>
          <button>Edit</button>
          <button onClick={removeRecipe}>Remove </button>
        </div>
      ) : (
        Object.keys(recipe).length > 0 && (
          <div>
            <RecipeDetailCard recipe={recipe}></RecipeDetailCard>
            <button onClick={addRecipe}>Add to Favorites</button>
          </div>
        )
      )}
      <button onClick={() => navigate(location.state?.back || "/")}>
        Back
      </button>
    </>
  );
}

export default RecipeDetails;
