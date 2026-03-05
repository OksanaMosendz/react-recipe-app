import RecipeList from "../features/RecipeList";
import RecipeForm from "../features/RecipeForm.jsx";
import { useState, useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext.jsx";

function FavoriteRecipes() {
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    id: ``,
    area: "",
    imgSize: "large",
    img: "https://www.themealdb.com/images/media/meals/yypwwq1511304979.jpg/",
    isFavorite: false,
    ingredients: [],
    instructions: "",
    isEditing: false,
  });

  const { favoriteList } = useContext(FavoritesContext);

  return (
    <>
      {!newRecipe.isEditing ? (
        <>
          <button
            type="button"
            onClick={() =>
              setNewRecipe({
                ...newRecipe,
                isEditing: true,
              })
            }
          >
            Create Your Recipe
          </button>

          <RecipeList recipeList={favoriteList} />
        </>
      ) : (
        <RecipeForm recipe={newRecipe} setRecipe={setNewRecipe} />
      )}
    </>
  );
}

export default FavoriteRecipes;
