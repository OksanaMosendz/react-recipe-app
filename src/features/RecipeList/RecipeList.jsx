import { useContext } from "react";
import favoritesStorage from "../../utility/favoritesStorage";
import { RecipesContext } from "../../context/RecipesContext";
import RecipeActionBtns from "../RecipeActionsBtns/RecipeActionBtns";
import RecipeItem from "../RecipeItem/RecipeItem";

function RecipeList({ recipeList, setCurrentRecipe }) {
  const { setFavoriteList, setIsEditing } = useContext(RecipesContext);

  function handleAddRecipe(recipe) {
    favoritesStorage.addRecipe(recipe);
    setFavoriteList(favoritesStorage.getList());
  }

  function handleRemoveRecipe(recipe) {
    favoritesStorage.removeRecipe(recipe);
    setFavoriteList(favoritesStorage.getList());
  }

  function handleEditRecipe(recipe) {
    setCurrentRecipe(recipe);
    setIsEditing(true);
  }

  return (
    <ul>
      {recipeList.map((recipe) => (
        <li key={recipe.id}>
          <RecipeItem recipe={recipe} />
          {recipe.isFavorite && (
            <RecipeActionBtns
              onEdit={() => handleEditRecipe(recipe)}
              onRemove={() => handleRemoveRecipe(recipe)}
              onAdd={() => handleAddRecipe(recipe)}
              isFavorite={recipe.isFavorite}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default RecipeList;
