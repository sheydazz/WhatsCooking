import React from "react";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { fetchRecipes } from "../api/recipes"; // Importa la función
import { useRecipeContext } from "../context/RecipeContext";
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
const Home = () => {
  const logo: any = require("../assets/logo.png");
  const [inputIngredient, setInputIngredient] = React.useState<string[]>([""]);
  const [inputType, setInputType] = React.useState("");
  const { setRecipes } = useRecipeContext();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const handleAddInput = () => {
    setInputIngredient([...inputIngredient, ""]);
  };

  const handleIngredientChange = (text: string, index: number) => {
    const updatedIngredients = [...inputIngredient];
    updatedIngredients[index] = text;
    setInputIngredient(updatedIngredients);
  };

  const handleTypeRecipe = (type: string) => {
    setInputType(type);
    setSelectedType(type);
  };

  const handleFetchRecipes = async () => {
    try {
      const recipes = await fetchRecipes(inputIngredient, inputType);
      console.log("Recetas obtenida:", recipes);
      setRecipes([recipes]); // Guarda las recetas en el contexto
      router.push("/recipeDetails"); // Navega a la página de detalles
    } catch (error: any) {
      console.error("Error al obtener recetas:", error.message);
      alert("No se pudieron obtener las recetas. Intenta nuevamente.");
    }
  };

  return (
    <ScrollView>
      <View className=" bg-[#e2eaec]  h-[100vh] items-center">
        <View className="h-[200] w-[100vw] pt-safe-offset-0 sticky top-0  bg-[#e94646] justify-center items-center rounded-b-[50] shadow-[0px_14px_6px_-4px_rgba(0,_0,_0,_0.1)]">
          <Image source={logo} className="w-[90%] h-[90%]"></Image>
        </View>

       <View className=" mt-16 mb-10  ml-0rounded-r-lg "> 
        <Text className=" text-3xl text-black font-bold font-sans">
        What do you have in your kitchen?
        </Text>
        </View>
        <View className="w-[auto] h-[auto] flex-row gap-4 justify-start items-center ">
          <View className="flex-col">
            <Text className="m-2 text-black">
            Ingredients</Text>
            {inputIngredient.map((ingredient, index) => (
              <TextInput
                key={index}
                onChangeText={(text) => handleIngredientChange(text, index)}
                value={ingredient}
                placeholder="Ingrediente"
                className="m-2 border-1 p-2 w-[150px] h-10 bg-white rounded-lg"
              />
            ))}
          </View>
          <View className=" rounded-full  w-[40px] h-[40px] justify-center items-center content-center bg-[#f12905]">
            <Pressable onPress={handleAddInput}>
              <Text className="text-3xl font-semibold text-white">+</Text>
            </Pressable>
          </View>
        </View>
        <Text className="mt-16  text-3xl text-black font-bold font-sans">
        What kind of food do you want?
        </Text>
        <View className="flex-row m-10 gap-10">
          <View>
            <Pressable
              onPress={() => handleTypeRecipe("breakfast")}
              className={`p-10 rounded-full ${
                selectedType === "breakfast" ? "bg-[#b19a8a]" : "bg-[#ebca0e]"
              }`}
            >
             <FontAwesome6 name="bread-slice" size={24} color="brown" />
            </Pressable>
            <Text>breakfast</Text>
          </View>

          <View>
            <Pressable
              onPress={() => handleTypeRecipe("main course")}
              className={`p-10 rounded-full ${
                selectedType === "main course" ? "bg-[#b19a8a]" : "bg-[#f1863e]"
              }`}
            >
              <Ionicons
            name="restaurant-sharp"
            size={24}
            color={selectedType === "main course" ? "white" : "green"}
          />
            </Pressable>
            <Text>main course</Text>
          </View>

          <View>
            <Pressable
              onPress={() => handleTypeRecipe("dinner")}
              className={`p-10 rounded-full ${
                selectedType === "dinner" ? "bg-[#b19a8a]" : "bg-[#8dc064]"
              }`}
            >
             <Ionicons name="fast-food" size={24} color="black" />
            </Pressable>
            <Text>   Dinner</Text>
          </View>
        </View>
        <Pressable
          onPress={handleFetchRecipes}
          className="bg-[#f15a03] p-7 rounded-full text-white"
          
        >
          <Text>let's cook!</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
};

export default Home;
