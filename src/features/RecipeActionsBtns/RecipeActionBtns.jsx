import Button from "../../shared/Button/Button";
import styles from "./RecipeActionBtns.module.css";

function RecipeActionBtns({ onEdit, onRemove, onAdd, isFavorite }) {
  return (
    <div className={styles.actionBtns}>
      {!isFavorite ? (
        <Button handleEvent={() => onAdd()} text="Add to Favorites" />
      ) : (
        <>
          <Button handleEvent={() => onEdit()} text="Edit" />
          <Button handleEvent={() => onRemove()} text="Remove" />
        </>
      )}
    </div>
  );
}

export default RecipeActionBtns;
