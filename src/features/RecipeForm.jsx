import { useState } from "react";
import favoritesStorage from "../utility/favoritesStorage";

function RecipeForm({ setRecipe }) {
  const [ingredients, setIngredients] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    id: ``,
    area: "",
    imgSize: "large",
    img: "https://www.themealdb.com/images/media/meals/yypwwq1511304979.jpg/",
    isFavorite: false,
    ingredients: [],
    instructions: "",
  });

  function createRecipe(e) {
    let createdRecipe = {
      ...newRecipe,
      id: `${Date.now()}`,
      isFavorite: true,
      ingredients,
    };
    e.preventDefault();
    setNewRecipe(createdRecipe);
    setRecipe(createdRecipe);
    favoritesStorage.addRecipe(createdRecipe);
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
        value={newRecipe.name}
        onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
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
        value={newRecipe.instructions}
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, instructions: e.target.value })
        }
      ></textarea>

      <button type="submit" id="createRecipe">
        Save my Recipe
      </button>
    </form>
  );
}

export default RecipeForm;
