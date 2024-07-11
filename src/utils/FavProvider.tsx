import React, { createContext, useState, ReactNode } from "react";

type IdContextType = {
  favIds: number[];
  addFavId: (id: number) => void;
  removeFavId: (id: number) => void;
  setArrayOfFavIds: (array: number[]) => void;
};

export const FavProvider = createContext<IdContextType | undefined>(undefined);

export const IdProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favIds, setFavIds] = useState<number[]>([]);

  const addFavId = (id: number) => {
    setFavIds([...favIds, id]);
  };

  const removeFavId = (id: number) => {
    setFavIds(favIds.filter((existingId) => existingId !== id));
  };

  const setArrayOfFavIds = (array: number[]) => {
    setFavIds(array);
  };

  return (
    <FavProvider.Provider
      value={{ favIds, addFavId, removeFavId, setArrayOfFavIds }}
    >
      {children}
    </FavProvider.Provider>
  );
};
