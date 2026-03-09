import { Link, useLocation } from "react-router-dom";


function RecipeItem({ recipe }) {
   const location = useLocation(); 

  return (
    <div>
      <h3>{recipe.name}</h3>
      <p>{recipe.area}</p>
      <img src={recipe.img} alt={recipe.name} />
      <Link to={`/recipe/${recipe.id}`} state={{ back: location }}>
        View
      </Link>
   </div>
  );
}

export default RecipeItem;
