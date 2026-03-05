import { createContext, useState } from "react";

import favoritesStorage from "../utility/favoritesStorage";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favoriteList, setFavoriteList] = useState(favoritesStorage.getList());

  return (
    <FavoritesContext.Provider value={{ favoriteList, setFavoriteList }}>
      {children}
    </FavoritesContext.Provider>
  );
}
