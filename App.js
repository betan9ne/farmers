import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Tabs from "./navigation/tabs";
import firebase_ from "./firebase";
import AddProduct from "./comp/profile/AddProduct";
import ManageProducts from "./comp/profile/ManageProducts";
import ViewProduct from "./comp/profile/ViewProduct";
import UserProfile from "./comp/explore/UserProfile";
import ViewProduce from "./comp/explore/ViewProduce";
import Signin from "./comp/signin/Signin";
import Signup from "./comp/signin/Signup";
import Welcome from "./comp/signin/Welcome";
import { Text, View } from "react-native";
import updateProfile from "./comp/profile/UpdateProfile";

const Stack = createStackNavigator();

const App = () => {
  const [loaded_, setLoaded] = useState(false);
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    firebase_.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoaded(true);
        setLoggedin(false);
      } else {
        setLoaded(true);
        setLoggedin(true);
      }
    });
  }, []);

  const [loaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }

  if (!loaded_) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (!loggedin) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Signin}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    // <View>
    //   <updateProfile />
    // </View>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Home"}
      >
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen
          name="addProduct"
          component={AddProduct}
          options={{ headerShown: true, title: "Add Product" }}
        />
        <Stack.Screen
          name="manageProduct"
          component={ManageProducts}
          options={{ headerShown: true, title: "My Products" }}
        />
        <Stack.Screen
          name="viewProduct"
          component={ViewProduct}
          options={{ headerShown: true, title: "Produce Details" }}
        />
        <Stack.Screen
          name="userProfile"
          component={UserProfile}
          options={{ headerShown: true, title: "Profile" }}
        />
        <Stack.Screen
          name="updateProfile"
          component={updateProfile}
          options={{ headerShown: true, title: "Update Profile" }}
        />
        <Stack.Screen
          name="viewProduce"
          component={ViewProduce}
          options={{ headerShown: true, title: "Produce Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
