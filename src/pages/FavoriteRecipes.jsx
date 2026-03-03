import RecipeList from '../features/RecipeList'
import {Link} from 'react-router-dom'
import favoritesStorage from '../utility/favoritesStorage';

function FavoriteRecipes(){
  
   return (<>
 <Link to={`/recipe/new`}>Create Your Recipe</Link>
  <RecipeList recipeList={favoritesStorage.getList()}/>
   </>)
}

export default FavoriteRecipes;