const getList=()=> JSON.parse(localStorage.getItem("favoriteRecipeList")) || []


const setList = (list) => {
  localStorage.setItem("favoriteRecipeList", JSON.stringify(list));
};

const addRecipe =(recipe)=> {
const checkedList= getList().filter((favRecipe) => favRecipe.id !== recipe.id);
      setList([
    ...checkedList,
    { ...recipe, isFavorite: true},
  ]);
}

const removeRecipe=(recipe)=> {
  setList(getList().filter((favRecipe) => favRecipe.id !== recipe.id));
}

const getById=(id)=>getList().find((recipe) => id === recipe.id);


export default { addRecipe, removeRecipe, getList, getById };
