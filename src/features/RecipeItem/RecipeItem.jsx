import { Link, useLocation } from "react-router-dom";
import styles from "./RecipeItem.module.css";

function RecipeItem({ recipe ,className}) {
  const location = useLocation();

  return (
    <Link
      className={`${styles.recipe_wrap_link} ${className} || ""}`}
      to={`/recipe/${recipe.id}`}
      state={{ back: location }}
    >
      <h3>{recipe.name}</h3>
      <img src={recipe.img} alt={recipe.name} />
    </Link>
  );
}

export default RecipeItem;
