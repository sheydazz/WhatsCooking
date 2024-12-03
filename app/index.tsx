import { StatusBar } from "expo-status-bar";
import { Text, View, Pressable, ImageBackground } from "react-native";
import { Link } from "expo-router";
export default function App() {

  const image = {
    uri: "https://images.squarespace-cdn.com/content/v1/57879a6cbebafb879f256735/57a3a5d2-0e2d-4b84-b9af-e0fcfa3ccef8/ARM050424-4_original_uxga.jpg",
  };

  return (
    <View>
      <ImageBackground
        source={image}
        resizeMode="cover"
        className="h-screen w-screen items-center justify-center static  "
      >
        
          <View className="absolute bottom-0 bg-[#00000077] w-full justify-center items-center pb-safe-offset-0">
          <Text className="text-white  text-5xl m-10 mb-3 font-mono font-bold">
            you don't know what to cook?
          </Text>
          <Text className="text-white  text-2xl ml-9 mr-9 mb-2 bg-#[000000c0] ">
          Try writing ingredients and we will give you a recipe
          </Text>

          <Link asChild href="/home">
            <Pressable onPress={() => console.log("Navigating to Home")} className="bg-red-500 rounded-full p-4 w-[80px]  ">
              <Text className="text-white">lets 
                 
                 go!</Text>
            </Pressable>
          </Link>
       
          </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}
