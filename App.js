import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React,{useEffect, useState} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font';
import Tabs from './navigation/tabs'
import firebase_ from './firebase'
import profile from './comp/profile/profile';
import AddProduct from './comp/profile/AddProduct';
import ManageProducts from './comp/profile/ManageProducts';

const Stack = createStackNavigator();

const App = () => { 

    const[loaded_, setLoaded] = useState(false)
    const[loggedin, setLoggedin] = useState(false)
    
    useEffect(() => {
        firebase_.auth().onAuthStateChanged((user) =>{
          if(!user)
          {
            setLoaded(true)
            setLoggedin(false)
          }
          else{
            setLoaded(true)
            setLoggedin(true)
          }
        })
    }, [])
  
    
    const [loaded] = useFonts({
        "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
        "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
        "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),
        "Roboto-Light" : require('./assets/fonts/Roboto-Light.ttf'),
      })
      
      if(!loaded){
        return null;
      }

    // if(!loaded_)
    // {
    //   return (
    //       <View>
    //         <Text>Loading</Text>
    //       </View>
    //   )
    // }

    // if(!loggedin){
    //     return (
    //       <NavigationContainer>
    //           <Stack.Navigator initialRouteName="Welcome">
    //             <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />
    //             <Stack.Screen name="Register" component={Register} options={{headerShown: true}} />
    //             <Stack.Screen name="Login" component={Login} options={{headerShown: true, title:""}} />
    //           </Stack.Navigator>
    //       </NavigationContainer>    
    //   );
    //     }
      return (
          <NavigationContainer>
              <Stack.Navigator
                  screenOptions={{
                      headerShown: false
                  }}
                  initialRouteName={'Home'}              >
                  <Stack.Screen name="Home" component={Tabs} />
                  <Stack.Screen name="addProduct" component={AddProduct} options={{headerShown:true, title:"Add Product"}} />
                  <Stack.Screen name="manageProduct" component={ManageProducts} options={{headerShown:true, title:"My Products"}} />
         
                  
              </Stack.Navigator>
          </NavigationContainer>
      )
    
}

export default App;