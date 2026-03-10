import InputWithLabel from "../shared/InputWithLabel";

function SearchForm({ searchValue, setSearchValue }) {
   return (
    <form onSubmit={(e) => e.preventDefault()}>
      <InputWithLabel
        label="Search recipe"
        type="search"
        id="searchRecipe"
        required={false}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        type="button"
        disabled={!searchValue}
        onClick={() => setSearchValue("")}
      >
        Clear
      </button>
    </form>
  );
}

export default SearchForm;
