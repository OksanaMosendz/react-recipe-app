import RecipeDetailCard from "../features/RecipeDetailCard";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import formatRecipes from "../utility/formatRecipes.js";
import favoritesStorage from "../utility/favoritesStorage.js";
import RecipeForm from "../features/RecipeForm.jsx";
import { FavoritesContext } from "../context/FavoritesContext.jsx";
import API from "../API/API.js";

function RecipeDetails() {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { setFavoriteList } = useContext(FavoritesContext);
const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    setIsLoading(true);
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

        setRecipe(formatRecipes(recipes, false)[0]);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("fetch is done");
        setIsLoading(false)
      }
    };

   favoritesStorage.getById(id) ? setRecipe( favoritesStorage.getById(id)) : fetchRecipeById();
    setIsLoading(false)
  }, [id]);

  function addRecipe() {
    setRecipe({ ...recipe, isFavorite: true });
    favoritesStorage.addRecipe(recipe);
    setFavoriteList(favoritesStorage.getList());
  }

  function removeRecipe() {
    setRecipe({ ...recipe, isFavorite: false });
    favoritesStorage.removeRecipe(recipe);
    setFavoriteList(favoritesStorage.getList());
  }

  function editRecipe() {
    setRecipe({ ...recipe, isEditing: true });
    setFavoriteList(favoritesStorage.getList());
  }

  return (
    <>
      {recipe.isEditing && <RecipeForm setRecipe={setRecipe} recipe={recipe} />}

      {recipe.isFavorite && !recipe.isEditing && (
        <div>
          <RecipeDetailCard recipe={recipe} isLoading={isLoading}></RecipeDetailCard>
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
