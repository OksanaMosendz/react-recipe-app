import { useContext, useState } from "react";
import favoritesStorage from "../utility/favoritesStorage";
import { FavoritesContext } from "../context/FavoritesContext";
import placeholder from "../assets/img/placeholder.svg";
function RecipeForm({ setRecipe, recipe }) {
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const { setFavoriteList } = useContext(FavoritesContext);

  function createRecipe(e) {
    let createdRecipe = {
      ...recipe,
      id: recipe.id ? recipe.id : `${Date.now()}`,
      isFavorite: true,
      ingredients,
      isEditing: false,
    };
    e.preventDefault();

    favoritesStorage.addRecipe(createdRecipe);
    setFavoriteList(favoritesStorage.getList());
    recipe.id
      ? setRecipe(createdRecipe)
      : setRecipe({
          name: "",
          id: ``,
          area: "",
          img: placeholder,
          isFavorite: false,
          ingredients: [],
          instructions: "",
          isEditing: false,
        });
  }

  function addIngredient() {
    setIngredients([...ingredients, { name: "", measure: "" }]);
  }

  function handleIngredientChange(i, field, inputValue) {
    const changedIngredients = [...ingredients];
    changedIngredients[i][field] = inputValue;
    setIngredients(changedIngredients);
  }

  return (
    <form id="createRecipe" onSubmit={(e) => createRecipe(e)}>
      <label htmlFor="recipeName">Recipe name</label>
      <input
        type="text"
        id="recipeName"
        value={recipe.name}
        onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
      ></input>

      <ul>
        {ingredients.map((ingr, i) => (
          <li key={i}>
            <label htmlFor={`ingredient${i}`}>Ingredient</label>
            <input
              type="text"
              id={`ingredient${i}`}
              value={ingr.name}
              onChange={(e) =>
                handleIngredientChange(i, "name", e.target.value)
              }
            ></input>

            <label htmlFor={`measure${i}`}>Measure</label>
            <input
              type="text"
              id={`measure${i}`}
              value={ingr.measure}
              onChange={(e) =>
                handleIngredientChange(i, "measure", e.target.value)
              }
            ></input>
          </li>
        ))}
      </ul>

      <button type="button" onClick={addIngredient}>
        Add ingridient
      </button>

      <label htmlFor="instructions">Instructions:</label>
      <textarea
        id="instructions"
        value={recipe.instructions}
        onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
      ></textarea>

      <button type="submit" id="createRecipe">
        Save
      </button>
    </form>
  );
}

export default RecipeForm;
