import RecipeList from "../features/RecipeList";
import { Link } from "react-router-dom";
import favoritesStorage from "../utility/favoritesStorage";
import RecipeForm from "../features/RecipeForm.jsx";
import { useState } from "react";

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

          <RecipeList recipeList={favoritesStorage.getList()} />
        </>
      ) : (
        <RecipeForm recipe={newRecipe} setRecipe={setNewRecipe} />
      )}
    </>
  );
}

export default FavoriteRecipes;
