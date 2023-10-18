import React, { Component } from "react";
import { View, Platform } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from './MenuComponent';
import DishDetail from "./DishDetailComponent";

const MenuNavigation = createNativeStackNavigator();

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavigationContainer>
                    <MenuNavigation.Navigator initialRouteName="Menu"
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: '#512DA8'
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                color: '#fff'
                            }
                        }}
                    >
                        <MenuNavigation.Screen name="Menu" component={Menu} />
                        <MenuNavigation.Screen name="Dishdetail" component={DishDetail} />
                    </MenuNavigation.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}

export default Main;
