import { useContext, useState } from "react";
import placeholder from "../../assets/img/placeholder.svg";
import { RecipesContext } from "../../context/RecipesContext";
import InputWithLabel from "../../shared/InputWithLabel/InputWithLabel";
import favoritesStorage from "../../utility/favoritesStorage";

function RecipeForm({ setRecipe, recipe} ){

const { setFavoriteList, setIsEditing } = useContext(RecipesContext);
const [ingredients, setIngredients] = useState([...recipe.ingredients]);
const [createdRecipe,setCreatedRecipe] = useState({
      ...recipe,
      img: recipe.img? recipe.img :placeholder,
      isFavorite: true,
      ingredients
} )
console.log([...recipe.ingredients]);
  function handleCreateRecipe(e) {
    const newRecipe = {
    ...createdRecipe,
    ingredients
  };
    e.preventDefault();
    
    setRecipe(newRecipe);
    favoritesStorage.addRecipe(newRecipe);
    setFavoriteList(favoritesStorage.getList());
    setCreatedRecipe({
                name: "",
                id: '',
                area: "",
                isFavorite: false,
                ingredients: [],
                instructions: "",
              });
    setIsEditing(false);
  }

  function handleIngredientChange(i, field, inputValue) {
    const changedIngredients = [...ingredients];
    changedIngredients[i][field] = inputValue;
    setIngredients(changedIngredients);
 }

  function handleRemoveIngr(ingrIndex){
    const updatedIngredients=ingredients.filter((_,i)=>i!==ingrIndex);
    setIngredients([...updatedIngredients]);
  }

  return (
    <form id="createRecipe" onSubmit={(e) => handleCreateRecipe(e)}>
      <InputWithLabel
        label="Recipe name"
        id="recipeName"
        type="text"
        required={true}
        value={createdRecipe.name}
        onChange={(e) => setCreatedRecipe({ ...createdRecipe, name: e.target.value })}
      />

      <ul>
        {ingredients.map((ingr, i) => (
          <li key={i}>
            <InputWithLabel
              label="Ingredient"
              type="text"
              id={`ingredient${i}`}
              value={ingr.name}
              required={true}
              onChange={(e) =>
                handleIngredientChange(i, "name", e.target.value)
              }
            />

            <InputWithLabel
              label="Measure"
              type="text"
              id={`measure${i}`}
              value={ingr.measure}
              required={false}
              onChange={(e) =>
                handleIngredientChange(i, "measure", e.target.value)
              }
     />
              <button type="button" onClick={()=>handleRemoveIngr(i)}>X</button>
       
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
        value={createdRecipe.instructions}
        onChange={(e) => setCreatedRecipe({ ...createdRecipe, instructions: e.target.value })}
      ></textarea>

      <button type="submit" disabled={!createdRecipe.name} id="createRecipe">
        Save
      </button>

      <button type="button" onClick={()=>setIsEditing(false)}>Cancel</button>
    </form>
  );
}

export default RecipeForm;
