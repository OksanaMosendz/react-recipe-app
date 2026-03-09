
function RecipeActionBtns ({onEdit, onRemove,onAdd, isFavorite} ){

   return (
     !isFavorite?  <button type="button" onClick={onAdd}>
            Add
          </button>:
          <>
     <button type="button" onClick={onEdit}>
            Edit
          </button>
          <button type="button" onClick={onRemove}>
            Remove
          </button>
      </>
   )
}

export default RecipeActionBtns;