import { Link, useLocation } from "react-router-dom";
import styles from './RecipeItem.module.css';

function RecipeItem({ recipe }) {
   const location = useLocation(); 

  return (
    <div className={styles.recipe_wrap}>
      <h3>{recipe.name}</h3>
      <Link to={`/recipe/${recipe.id}`} state={{ back: location }}>
        View
      </Link>
      <img src={recipe.img} alt={recipe.name} />
   </div>
  );
}

export default RecipeItem;
