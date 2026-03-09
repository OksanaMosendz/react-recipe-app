import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import favoritesStorage from "../utility/favoritesStorage";
import { FavoritesContext } from "../context/FavoritesContext";
import RecipeActionBtns from "../shared/recipeActionBtns";

function RecipeItem({ recipe }) {
  const { setFavoriteList } = useContext(FavoritesContext);
  const location = useLocation();

  function handleAddRecipe(){
    favoritesStorage.addRecipe(recipe);
    setFavoriteList(favoritesStorage.getList());
  }

  function handleRemoveRecipe() {
    favoritesStorage.removeRecipe(recipe);
    setFavoriteList(favoritesStorage.getList());
  }

  function handleEditRecipe(){
  favoritesStorage.addRecipe({...recipe, isEditing:true})
  setFavoriteList(favoritesStorage.getList());
  }

  return (
    <div>
      <h3>{recipe.name}</h3>
      <p>{recipe.area}</p>
      <img src={recipe.img} alt={recipe.name} />
      <Link to={`/recipe/${recipe.id}`} state={{ back: location }}>
        View
      </Link>
    {recipe.isFavorite&&<RecipeActionBtns onEdit={handleEditRecipe} onRemove={handleRemoveRecipe} onAdd={handleAddRecipe} isFavorite={recipe.isFavorite}/>}
    </div>
  );
}

export default RecipeItem;
