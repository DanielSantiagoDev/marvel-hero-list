import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FavoriteContextType {
  favorites: Set<number>;
  handleFavorite: (id: number) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const handleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      console.log(newFavorites)
      return newFavorites;
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, handleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = (): FavoriteContextType => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorites must be used in a providerr');
  }
  return context;
};
