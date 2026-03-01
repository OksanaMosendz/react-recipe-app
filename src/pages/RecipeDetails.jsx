import RecipeDetailCard from "../features/RecipeDetailCard";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import formatRecipes from "../utility/formatRecipes.js";

function RecipeDetails({ API }) {
  const [recipe, setRecipe] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

let favoriteRecipeList=localStorage.getItem("favoriteRecipeList");

  if (!favoriteRecipeList) {
    localStorage.setItem("favoriteRecipeList", `${JSON.stringify([])}`);}
    favoriteRecipeList = JSON.parse(favoriteRecipeList);
  

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `${API.url}${API.key}${API.query.byId}${id}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message);
        }
        const recipes = await data.meals;

        setRecipe(formatRecipes(recipes, false, "large")[0]);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("fetch is done");
      }
    };
    fetchRecipe();
  }, []);

  function addRecipe() {
    setRecipe({ ...recipe, isFavorite: true });

    favoriteRecipeList =[ ...favoriteRecipeList, { ...recipe, isFavorite: true, imgSize: "medium" } ]

    localStorage.setItem(
      "favoriteRecipeList",
      `${JSON.stringify(favoriteRecipeList)}`,
    );
  }

function removeRecipe(){
 setRecipe({ ...recipe, isFavorite: false });
favoriteRecipeList=favoriteRecipeList.filter((favRecipe)=>favRecipe.id!==recipe.id);
 
localStorage.setItem(
      "favoriteRecipeList",
      `${JSON.stringify(favoriteRecipeList)}`,
    )
}

  return (
    <>
      <RecipeDetailCard recipe={recipe}></RecipeDetailCard>
      <button onClick={() => navigate(location.state?.back || "/")}>
        Back
      </button>
      {recipe.isFavorite ? (
        <div>
          <button>Edit</button>
          <button onClick={removeRecipe}>Remove </button>
        </div>
      ) : (
        <div>
          <button onClick={addRecipe}>Add to Favorites</button>
        </div>
      )}
    </>
  );
}

export default RecipeDetails;
