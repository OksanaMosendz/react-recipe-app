import {Link} from 'react-router-dom';
function RecipeItem({ recipe }) {


  return (
    <div>
      <h3>{recipe.name}</h3>
      <img src={recipe.img} alt={recipe.name} />
      {!recipe.isFavorite&&<button>add</button>}
      <Link to={`/recipe/${recipe.id}`}>View</Link>
      {recipe.isFavorite&&<><button>Edit</button>
      <button>Remove</button></>}
    </div>
  );
}

export default RecipeItem;
