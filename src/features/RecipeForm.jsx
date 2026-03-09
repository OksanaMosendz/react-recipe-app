import { useContext, useState } from "react";
import favoritesStorage from "../utility/favoritesStorage";
import { FavoritesContext } from "../context/FavoritesContext";
import placeholder from "../assets/img/placeholder.svg";
import InputWithLabel from "../shared/InputWithLabel";

function RecipeForm({ setRecipe, recipe }) {
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const { setFavoriteList } = useContext(FavoritesContext);

  function handleCreateRecipe(e) {
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

  function handleIngredientChange(i, field, inputValue) {
    const changedIngredients = [...ingredients];
    changedIngredients[i][field] = inputValue;
    setIngredients(changedIngredients);
  }

  return (
    <form id="createRecipe" onSubmit={(e) => handleCreateRecipe(e)}>
      <InputWithLabel
        label="Recipe name"
        id="recipeName"
        type="text"
        value={recipe.name}
        onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
      />

      <ul>
        {ingredients.map((ingr, i) => (
          <li key={i}>
            <InputWithLabel
              label="Ingredient"
              type="text"
              id={`ingredient${i}`}
              value={ingr.name}
              onChange={(e) =>
                handleIngredientChange(i, "name", e.target.value)
              }
            />

            <InputWithLabel
              label="Measure"
              type="text"
              id={`measure${i}`}
              value={ingr.measure}
              onChange={(e) =>
                handleIngredientChange(i, "measure", e.target.value)
              }
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() =>
          setIngredients([...ingredients, { name: "", measure: "" }])
        }
      >
        Add ingridient
      </button>

      <label htmlFor="instructions">Instructions:</label>
      <textarea
        id="instructions"
        value={recipe.instructions}
        onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })}
      ></textarea>

      <button type="submit" disabled={!recipe.name} id="createRecipe">
        Save
      </button>

      <button type="button">Cancel</button>
    </form>
  );
}

export default RecipeForm;
