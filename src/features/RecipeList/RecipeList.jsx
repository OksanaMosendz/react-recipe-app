import { useContext } from "react";
import favoritesStorage from "../../utility/favoritesStorage";
import { RecipesContext } from "../../context/RecipesContext";
import RecipeActionBtns from "../RecipeActionsBtns/RecipeActionBtns";
import RecipeItem from "../RecipeItem/RecipeItem";
import styles from './RecipeList.module.css';
import { Link, useLocation } from "react-router-dom";

function RecipeList({ recipeList, setCurrentRecipe }) {
  const { setFavoriteList, setIsEditing } = useContext(RecipesContext);
  const location = useLocation();
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
    <ul className={styles.recipe_list}>
      {recipeList.map((recipe) => (
        <li key={recipe.id}>
          <RecipeItem recipe={recipe} />
          {recipe.isFavorite && (<div className={styles.btn_wrap}>
             <Link
       to={`/recipe/${recipe.id}`}
           state={{ back: location }}
         >View</Link>
            <RecipeActionBtns
              onEdit={() => handleEditRecipe(recipe)}
              onRemove={() => handleRemoveRecipe(recipe)}
              onAdd={() => handleAddRecipe(recipe)}
              isFavorite={recipe.isFavorite}
            /></div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default RecipeList;
