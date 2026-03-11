import { useContext, useState } from "react";
import { RecipesContext } from "../../context/RecipesContext.jsx";
import RecipeForm from "../../features/RecipeForm/RecipeForm.jsx";
import RecipeList from "../../features/RecipeList/RecipeList.jsx";

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
