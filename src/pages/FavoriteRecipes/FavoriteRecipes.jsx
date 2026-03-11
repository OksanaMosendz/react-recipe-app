import { useContext, useState } from "react";
import { RecipesContext } from "../../context/RecipesContext.jsx";
import RecipeForm from "../../features/RecipeForm/RecipeForm.jsx";
import RecipeList from "../../features/RecipeList/RecipeList.jsx";
import Button from "../../shared/Button/Button.jsx";
import styles from "./FavoriteREcipes.module.css"

function FavoriteRecipes() {
  const [currentRecipe, setCurrentRecipe] = useState({
    name: "",
    area: "",
    isFavorite: false,
    ingredients: [],
    instructions: "",
  });

  const { favoriteList, setIsEditing, isEditing } = useContext(RecipesContext);

  function handleCreateRecipe() {
    setIsEditing(true);
    setCurrentRecipe({
      ...currentRecipe,
      id: `${Date.now()}`,
    });
  }
  return (
    <>
      {!isEditing ? (
        <section className={styles.favorite_section}>
          <Button handleEvent={()=>handleCreateRecipe()} text='Create Recipe'/>
             {favoriteList.length === 0 ? (
            <p>No favorite recipes yet. Start adding some!</p>
          ) : (
            <RecipeList
              recipeList={favoriteList}
              setCurrentRecipe={setCurrentRecipe}
            />
          )}
        </section>
      ) : (
        <RecipeForm recipe={currentRecipe} setRecipe={setCurrentRecipe} />
      )}
    </>
  );
}

export default FavoriteRecipes;
