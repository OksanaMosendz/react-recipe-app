import { RecipesContext } from "../context/RecipesContext.jsx";
import { useContext } from "react";
import favoritesStorage from "../utility/favoritesStorage.js";
import RecipeActionBtns from "../shared/recipeActionBtns.jsx";

function RecipeDetailCard({recipe, setRecipe}){

 const { setFavoriteList, setIsEditing } = useContext(RecipesContext);

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

return(
<div>
      <h2>{recipe.name}</h2>
      <p>{recipe.area}</p>
      {recipe.img&&<img src={recipe.img} alt={recipe.name} />}
      <ul>
        {recipe.ingredients?.map((ingr, i) => 
          <li key={i}>{ingr.name} {ingr.measure}</li>
        )}
      </ul>
      <p>{recipe.instructions}</p>
  
       <RecipeActionBtns
        onAdd={handleAddRecipe}
        onEdit={()=>setIsEditing(true)}
        onRemove={handleRemoveRecipe}
        isFavorite={recipe.isFavorite}/>
      </div>
  )
}

export default RecipeDetailCard;
