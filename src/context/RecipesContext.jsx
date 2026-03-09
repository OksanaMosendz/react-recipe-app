import { createContext, useState } from "react";

import favoritesStorage from "../utility/favoritesStorage";

export const RecipesContext = createContext();

export function RecipesProvider({ children }) {
const [favoriteList, setFavoriteList] = useState(favoritesStorage.getList())
const [searchValue, setSearchValue] = useState("");
const [isEditing, setIsEditing] = useState(false);

  return (
    <RecipesContext.Provider value={{ favoriteList, setFavoriteList, searchValue, setSearchValue, isEditing, setIsEditing}}>
      {children}
    </RecipesContext.Provider>
  );
}
