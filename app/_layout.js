import { Slot } from "expo-router";
import { View } from "react-native";
import { RecipeProvider } from "../context/RecipeContext";
import "../global.css";

export default function Layout() {
  return (
    <RecipeProvider>
      <View className="pb-safe-offset-0">
        <Slot  />
      </View>
    </RecipeProvider>
  );
}
