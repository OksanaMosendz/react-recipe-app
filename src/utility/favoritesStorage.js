const getList=()=> JSON.parse(localStorage.getItem("favoriteRecipeList")) || []


const setList = (list) => {
  localStorage.setItem("favoriteRecipeList", JSON.stringify(list));
};

function addRecipe(recipe) {
  setList([
    ...getList(),
    { ...recipe, isFavorite: true, imgSize: "medium" },
  ]);
}

function removeRecipe(recipe) {
  setList(getList().filter((favRecipe) => favRecipe.id !== recipe.id));
}

export default { addRecipe, removeRecipe, getList };
