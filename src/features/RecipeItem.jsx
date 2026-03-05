import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import favoritesStorage from "../utility/favoritesStorage";
import { FavoritesContext } from "../context/FavoritesContext";

function RecipeItem({ recipe }) {
  const { setFavoriteList } = useContext(FavoritesContext);

  const location = useLocation();

  return (
    <div>
      <h3>{recipe.name}</h3>
      <p>{recipe.area}</p>
      <img src={`${recipe.img}${recipe.imgSize}`} alt={recipe.name} />
      {/* {!recipe.isFavorite&&<button>add</button>} */}
      <Link to={`/recipe/${recipe.id}`} state={{ back: location }}>
        View
      </Link>

      {recipe.isFavorite && (
        <>
          <button>Edit</button>
          <button
            onClick={() => {
              favoritesStorage.removeRecipe(recipe);
              setFavoriteList(favoritesStorage.getList());
            }}
          >
            Remove
          </button>
        </>
      )}
    </div>
  );
}

export default RecipeItem;
