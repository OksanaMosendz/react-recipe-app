function Search({ searchValue, setSearchValue }) {
  

  return (
    <form onSubmit={(e)=>e.preventDefault()}>
      <label htmlFor="searchRecipe">Search recipe</label>
      <input
        type="search"
        id="searchRecipe"
        value={searchValue}
        onChange={(e) =>setSearchValue(e.target.value)}
      ></input>
      <button type="button" onClick={()=>setSearchValue("")}>
        Clear
      </button>
    </form>
  );
}

export default Search;
