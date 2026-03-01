import {Link, useLocation} from 'react-router-dom';
function RecipeItem({ recipe }) {

const location=useLocation();

  return (
    <div>
      <h3>{recipe.name}</h3>
      <img src={`${recipe.img}${recipe.imgSize}`} alt={recipe.name} />

      {!recipe.isFavorite&&<button>add</button>}
      <Link to={`/recipe/${recipe.id}`} state={{back: location}}>View</Link>
      {recipe.isFavorite&&<><button>Edit</button>
      <button>Remove</button></>}
    </div>
  );
}

export default RecipeItem;
