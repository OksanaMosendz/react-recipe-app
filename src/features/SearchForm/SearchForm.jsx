import InputWithLabel from "../../shared/InputWithLabel/InputWithLabel";
import Button from "../../shared/Button/Button";
import styles from "./SearchForm.module.css";

function SearchForm({ searchValue, setSearchValue }) {
  return (
    <form className={styles.search_form} onSubmit={(e) => e.preventDefault()}>
      <InputWithLabel
        label="Search recipe"
        type="search"
        id="searchRecipe"
        required={false}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button
        disabled={!searchValue}
        handleEvent={() => setSearchValue("")}
        text="Clear"
      />
    </form>
  );
}

export default SearchForm;
