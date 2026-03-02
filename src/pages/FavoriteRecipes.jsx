import RecipeList from '../features/RecipeList'
import favoritesStorage from '../utility/favoritesStorage';

// create

function FavoriteRecipes(){
   return (<>
  <RecipeList recipeList={favoritesStorage.getList()}/>
   </>)
}

export default FavoriteRecipes;