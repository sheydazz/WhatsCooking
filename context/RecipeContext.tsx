import React, { createContext, useState, useContext } from "react";

// Define la estructura de una receta
interface Ingredient {
  name: string;
}

interface Instruction {
  stepNumber: number;
  stepText: string;
}

interface Recipe {
  id: number;
  title: string;
  image:string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}

type RecipeContextType = {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Ahora usa el tipo Recipe[]

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipeContext debe usarse dentro de un RecipeProvider");
  }
  return context;
};
