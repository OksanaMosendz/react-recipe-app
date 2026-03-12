import { useContext } from "react";
import { RecipesContext } from "../../context/RecipesContext.jsx";
import favoritesStorage from "../../utility/favoritesStorage.js";
import RecipeActionBtns from "../RecipeActionsBtns/RecipeActionBtns.jsx";
import styles from "./RecipeDetailCard.module.css";
import Button from "../../shared/Button/Button.jsx";
import { useLocation, useNavigate } from "react-router-dom";

function RecipeDetailCard({ recipe, setRecipe }) {
  const { setFavoriteList, setIsEditing } = useContext(RecipesContext);
  const location = useLocation();
  const navigate = useNavigate();
  function handleAddRecipe() {
    setRecipe({ ...recipe, isFavorite: true });
    favoritesStorage.addRecipe(recipe);
    setFavoriteList(favoritesStorage.getList());
  }

  function handleRemoveRecipe() {
    setRecipe({ ...recipe, isFavorite: false });
    favoritesStorage.removeRecipe(recipe);
    setFavoriteList(favoritesStorage.getList());
  }

  return (
    <div className={styles.recipe_info}>
      <h2>{recipe.name}</h2>
      <p>{recipe.area}</p>
      <div>
        {recipe.img && <img src={recipe.img} alt={recipe.name} />}
        <ul>
          {recipe.ingredients?.map((ingr) => (
            <li key={ingr.id}>
              {ingr.name} {ingr.measure}
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.recipe_instr}>{recipe.instructions}</p>

      <div className={styles.btns_wrap}>
        <Button
          handleEvent={() => navigate(location.state?.back || "/")}
          text={location.state?.back ? "Back" : "Go to Home Page"}
        />
        <RecipeActionBtns
          onAdd={handleAddRecipe}
          onEdit={() => setIsEditing(true)}
          onRemove={handleRemoveRecipe}
          isFavorite={recipe.isFavorite}
        />
      </div>
    </div>
  );
}

export default RecipeDetailCard;
