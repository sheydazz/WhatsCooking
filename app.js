import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import home from './app/home';
import recipeDetails from './app/recipeDetails';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={home} />
        <Stack.Screen name="Details" component={recipeDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
