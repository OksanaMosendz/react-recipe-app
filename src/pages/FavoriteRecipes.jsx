import RecipeList from "../features/RecipeList";
import RecipeForm from "../features/RecipeForm.jsx";
import { useState, useContext } from "react";
// import placeholder from "../assets/img/placeholder.svg";
import { RecipesContext } from "../context/RecipesContext.jsx";

function FavoriteRecipes() {
  const [currentRecipe, setCurrentRecipe] = useState({});
  const { favoriteList,setIsEditing,isEditing } = useContext(RecipesContext);
  return (
    <>
      {!isEditing ? (
        <>
          <button
            type="button"
            onClick={() => {
              setIsEditing(true);
              setCurrentRecipe({
                name: "",
                id: `${Date.now()}`,
                area: "",
                isFavorite: false,
                ingredients: [],
                instructions: "",
              });
            }}
          >
            Create Your Recipe
          </button>

          <RecipeList
            recipeList={favoriteList}
            setCurrentRecipe={setCurrentRecipe}
          />
        </>
      ) : (
        <RecipeForm
          recipe={currentRecipe}
          setRecipe={setCurrentRecipe}
                />
      )}
    </>
  );
}

export default FavoriteRecipes;
