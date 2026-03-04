function formatRecipes(fetchedRecipeList, isFavorite, imgSize) {
  const formatedRecipeList = fetchedRecipeList?.map((recipe) => {
    let ingredients = [];
    for (let i = 1; i < 21; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push({
          name: recipe[`strIngredient${i}`],
          measure: recipe[`strMeasure${i}`],
        });
      }
    }

    let newRecipe = {
      name: recipe.strMeal,
      id: recipe.idMeal,
      area: recipe.strArea,
      imgSize,
      img: `${recipe.strMealThumb}/`,
      isFavorite,
      ingredients: [...ingredients],
      instructions: recipe.strInstructions,
      isEditing: false,
      
    };
    return newRecipe;
  });
  return formatedRecipeList;
}

export default formatRecipes;
