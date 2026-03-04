import RecipeDetailCard from "../features/RecipeDetailCard";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import formatRecipes from "../utility/formatRecipes.js";
import favoritesStorage from "../utility/favoritesStorage.js";
import RecipeForm from "../features/RecipeForm.jsx";

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

    const favoriteRecipe = favoritesStorage.getById(id);

    favoriteRecipe ? setRecipe(favoriteRecipe) : fetchRecipeById();
  }, [API, id]);

  function addRecipe() {
    setRecipe({ ...recipe, isFavorite: true, imgSize: "large" });
    favoritesStorage.addRecipe(recipe);
  }

  function removeRecipe() {
    setRecipe({ ...recipe, isFavorite: false });
    favoritesStorage.removeRecipe(recipe);
  }

  function editRecipe() {
    setRecipe({ ...recipe, isEditing: true });
  }

  return (
    <>
      {recipe.isEditing && <RecipeForm setRecipe={setRecipe} recipe={recipe} />}

      {recipe.isFavorite && !recipe.isEditing && (
        <div>
          <RecipeDetailCard recipe={recipe}></RecipeDetailCard>
          <button type="button" onClick={editRecipe}>
            Edit
          </button>
          <button type="button" onClick={removeRecipe}>
            Remove{" "}
          </button>
        </div>
      )}

      {!recipe.isFavorite && !recipe.isEditing && (
        <div>
          <RecipeDetailCard recipe={recipe}></RecipeDetailCard>
          <button type="button" onClick={addRecipe}>
            Add to Favorites
          </button>
        </div>
      )}

      <button onClick={() => navigate(location.state?.back || "/")}>
        Back
      </button>
    </>
  );
}

export default RecipeDetails;
