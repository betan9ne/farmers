import React from 'react';
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import { isIphoneX } from 'react-native-iphone-x-helper';
import { COLORS, icons } from "../constants"
import {Feather} from '@expo/vector-icons'
import profile from '../comp/profile/profile';
import Explore from '../comp/explore/Explore';
import Search from '../comp/search/Search';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {

    var isSelected = accessibilityState.selected

    if (isSelected) {
        return (
         
                <TouchableOpacity
                    style={{
                        flex: 1,
                        height: 60,
                        backgroundColor: "#000000",      
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
          
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 60,
                    backgroundColor: "#000000", 
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        )
    }
}

const CustomTabBar = (props) => {
    if (isIphoneX()) {
        return (
            <View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 30,
                        backgroundColor: "#054D2B",  
                    }}
                ></View>
                <BottomTabBar
                    {...props.props}
                />
            </View>
        )
    } else {
        return (
            <BottomTabBar
                {...props.props}
            />
        )
    }

}

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    left: 20,
                    bottom: 30,
                    right: 20,                       
                    elevation: 0,
                    borderRadius:30,
                }
            }}
            tabBar={(props) => (
                <CustomTabBar
                    props={props}
                />
            )}
        >
            <Tab.Screen
                name="Home"
                component={Explore}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Feather name="search" size={24}
                        color={focused ? COLORS.white : COLORS.secondary}                            
                           
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Activity"
                component={Explore}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Feather name="activity" size={24}
                        color={focused ? COLORS.white : COLORS.secondary} 
                            
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

     

            <Tab.Screen
                name="User"
                component={profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Feather name="user" size={24}
                        color={focused ? COLORS.white : COLORS.secondary} 
                            resizeMode="contain"
                          
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs