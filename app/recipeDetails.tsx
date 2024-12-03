import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable,ScrollView } from "react-native";
import { useRecipeContext } from "../context/RecipeContext";
import { Link } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

// Definir las interfaces para ingredientes y pasos
interface Ingredient {
  name: string;
}

interface Step {
  stepText: string;
}

const RecipeDetails = () => {
  const { recipes } = useRecipeContext(); // Contexto con las recetas
  const [loading, setLoading] = useState(true); // Estado para manejar carga

  useEffect(() => {
    // Verificar si las recetas ya se han cargado
    if (recipes && recipes.length > 0) {
      setLoading(false);
    }
  }, [recipes]);

  const logo: any = require("../assets/logo.png");

  // Verificar si hay recetas disponibles
  if (loading) {
    return (
      <View className="items-center bg-[#1D594E] justify-center h-screen">
        <Text className="text-white text-xl">Cargando...</Text>
      </View>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <View className="items-center bg-[#1D594E] justify-center h-screen">
        <Text className="text-white text-xl">No hay recetas disponibles.</Text>
      </View>
    );
  }

  const recipe=recipes[0];
  return (
    <ScrollView>
      <View className="bg-[#dde6e9] items-center h-[100vh]flex-col">
      {/* Banner */}
      <View className="bg-[#e94646] h-[150px] w-[100vw] justify-between items-center flex-row rounded-b-[50px] shadow-[0px_14px_6px_-4px_rgba(0,_0,_0,_0.1)]">
        <Link asChild href="/home" className="ml-10">
          <Pressable>
          <Ionicons name="arrow-back-circle-sharp" size={30} color="white" />
          </Pressable>
        </Link>
        <Image source={logo} className="w-[38%] h-[38%] m-10" />
      </View>

      {/* Content */}
      <View className="content flex-col gap-8 justify-center items-center">
        {/* Recipe Image */}
        <View className="imgContent  m-5 mb-1 w-[300px] h-[200px]">
          <Image source={{ uri: recipe.image }} className="w-[300px] h-[200px] bg-contain" />
        </View>

        {/* Recipe Title */}
        <View className="bg-[#D3CA7A] p-5 w-[300px] justify-center items-center rounded-md">
          <Text className="text-white text-lg font-bold">{recipe.title}</Text>
        </View>

        {/* Ingredients Section */}
        <Text className="text-black text-2xl font-bold ">Ingredients</Text>
        <View className="ingredientescontent bg-[#ffffff]  ml-4 mr-4 shadow-[4px_4px_36px_4px_rgba(0,_0,_0,_0.1)] p-5 rounded-md">
          <Text className="text-white">
            {recipe.ingredients?.map((ingredient: Ingredient, index: number) => (
              <Text key={index} className="text-black">
                {ingredient.name}
                {index < recipe.ingredients.length - 1 && ", "}
              </Text>
            ))}
          </Text>
        </View>

        {/* Instructions */}
        <View className="instructionsContent w-screen bg-[#dee7e5] shadow-[4px_4px_36px_4px_rgba(0,_0,_0,_0.1)] p-5 rounded-md">
          <Text className="text-black text-4xl font-bold">Instructions</Text>
          {recipe.instructions?.map((step: Step, index: number) => (
            <View key={index} className="mb-4">
              <Text className="text-black mt-2">{step.stepText}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

export default RecipeDetails;
