import Button from "../../shared/Button/Button";

function RecipeActionBtns ({onEdit, onRemove,onAdd, isFavorite} ){

   return (
     !isFavorite? <Button handleEvent={()=>onAdd()} text="Add"/>:
          <>
     <Button  handleEvent={()=>onEdit()} text='Edit'/>
     <Button handleEvent={()=>onRemove()} text='Remove'/>
       </>
   )
}

export default RecipeActionBtns;