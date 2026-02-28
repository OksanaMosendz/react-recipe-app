import RecipeDetailCard from "../features/RecipeDetailCard";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import formatRecipes from '../utility/formatRecipes.js'

function RecipeDetails({ API }) {
const[recipe, setRecipe]=useState([]);
const {id}=useParams();

 useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${API.url}${API.key}${API.query.byId}${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error.message);
        }
        const recipes = await data.meals;


      setRecipe(formatRecipes(recipes, false, 'large')[0]);
    }
        catch (error) {
        console.log(error);
      } finally {
        console.log("fetch is done");
      }
    };
     fetchRecipe()
  },[]);



  return (
    <>
      <RecipeDetailCard recipe={recipe}></RecipeDetailCard>
      <Link to="/">Back to search</Link>
      <button>Add to Favorites</button>
    </>
  );
}

export default RecipeDetails;
