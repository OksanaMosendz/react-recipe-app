import { useContext, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import API from "../../API/API.js";
import { RecipesContext } from "../../context/RecipesContext.jsx";
import RecipeDetailCard from "../../features/RecipeDetailCard/RecipeDetailCard.jsx";
import RecipeForm from "../../features/RecipeForm/RecipeForm.jsx";
import Error from "../../shared/Error/Error.jsx";
import favoritesStorage from "../../utility/favoritesStorage.js";
import formatRecipes from "../../utility/formatRecipes.js";
import Loader from "../../shared/Loader/Loader.jsx";

function RecipeDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [error, setError] = useState("");
  const { isEditing } = useContext(RecipesContext);
 
  useEffect(() => {
    const fetchRecipeById = async () => {
      setError("");
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API.url}${API.key}${API.query.byId}${id}`,
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error.message);
        }
        const recipes = await data.meals;
        setRecipe(formatRecipes(recipes, false)[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    !favoritesStorage.getById(id)
      ? fetchRecipeById()
      : setRecipe(favoritesStorage.getById(id));

  }, [id, setError]);

  return (
    <>
      {isEditing && <RecipeForm setRecipe={setRecipe} recipe={recipe} />}

      {isLoading && <Loader/>}
      {error && <Error error={error} />}

      {!isLoading && !error && !isEditing && (
        <RecipeDetailCard recipe={recipe} setRecipe={setRecipe} />
      )}

     
    </>
  );
}

export default RecipeDetails;
