import { useContext } from "react";
import { FavProvider } from "./FavProvider";

type IdContextType = {
  favIds: number[];
  addFavId: (id: number) => void;
  removeFavId: (id: number) => void;
  setArrayOfFavIds: (array: number[]) => void;
};

export const useFavIds = (): IdContextType => {
  const context = useContext(FavProvider);
  if (!context) {
    throw new Error("useIds must be used within an IdProvider");
  }
  return context;
};
