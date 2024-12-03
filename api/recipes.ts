// 📁 api/recipes.ts
export const fetchRecipes = async (ingredients: string[], type: string) => {
  if (
    ingredients.length === 0 ||
    ingredients.some((ingredient) => !ingredient)
  ) {
    throw new Error("Por favor, ingresa al menos un ingrediente.");
  }

  const apiKey = "185b7420af844d4fbcd76ae6ce81a763"; // Clave 
  const ingredientsParam = ingredients.join(",");

  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsParam}&type=${type}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Hubo un error al obtener las recetas.");
    }
    const recipes = await response.json();
    if (!Array.isArray(recipes)) {
      throw new Error("La respuesta de la API no es válida.");
    }
    const idRecipeGenarte = recipes[0].id; // id receta
    const titleRecipeGenerate=recipes[0].title;// titulo de la receta
    const imageRecipeGenerate=recipes[0].image
    // Obtenemos las instrucciones analizadas de esa receta específica
    const instructionsUrl = `https://api.spoonacular.com/recipes/${idRecipeGenarte}/analyzedInstructions?apiKey=${apiKey}`;
    const instructionsResponse = await fetch(instructionsUrl);
    if (!instructionsResponse.ok) {
      throw new Error(
        `Error al obtener instrucciones de la receta con ID ${idRecipeGenarte}.`
      );
    }
    const instructionsData = await instructionsResponse.json();
    // Seleccionamos los pasos y los devolvemos con los detalles
    const steps = instructionsData.length > 0 ? instructionsData[0].steps : [];
    const recipeInstruction = steps.map((step: any) => ({
      stepNumber: step.number,
      stepText: step.step,
    }));
    recipeInstruction//instrucciones de la receta
    //obtenemos los ingredientes 
  
    const ingredientsUrl = `https://api.spoonacular.com/recipes/${idRecipeGenarte}/information?apiKey=${apiKey}`;
    const ingredientsResponse = await fetch(ingredientsUrl);
    if (!ingredientsResponse.ok) {
      throw new Error(
        `Error al obtener ingredientes de la receta con ID ${idRecipeGenarte}.`
      );
    }
    const ingredientsData = await ingredientsResponse.json();
    const ingredientsList = ingredientsData.extendedIngredients.map((ingredient: any) => {
        return {
          name: ingredient.name,
          
        };
      });
      ingredientsList //lista de ingredientes
    
     //receta con todos los detalles
     const recipeDetails = {
        id: idRecipeGenarte,
        title: titleRecipeGenerate,
        image:imageRecipeGenerate,
        ingredients: ingredientsList,
        instructions: recipeInstruction,
      };

    return recipeDetails;
  } catch (error: any) {
    console.error("Error en fetchRecipes:", error.message);
    throw error;
  }
};
