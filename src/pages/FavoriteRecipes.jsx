import RecipeList from "../features/RecipeList";
import RecipeForm from "../features/RecipeForm.jsx";
import { useState, useContext, useEffect } from "react";
import { FavoritesContext } from "../context/FavoritesContext.jsx";
import placeholder from "../assets/img/placeholder.svg";

function FavoriteRecipes() {
 
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    id: ``,
    area: "",
    img: placeholder,
    isFavorite: false,
    ingredients: [],
    instructions: "",
    isEditing: false,
  });

  const { favoriteList } = useContext(FavoritesContext);

  useEffect(()=>{favoriteList.map(rec=> rec.isEditing&&setNewRecipe(rec))},[favoriteList])
 
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
