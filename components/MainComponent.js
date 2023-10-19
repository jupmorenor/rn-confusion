import React, { Component } from "react";
import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Menu from './MenuComponent';
import DishDetail from "./DishDetailComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";

const MenuStackNavigator = createNativeStackNavigator();
const HomeStackNavigator = createNativeStackNavigator();
const ContactStackNavigator = createNativeStackNavigator();
const AboutStackNavigator = createNativeStackNavigator();
const MainDrawerNavigator = createDrawerNavigator();

const RenderHome = () => {
    return (
        <HomeStackNavigator.Navigator initialRouteName="Home"
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
            <HomeStackNavigator.Screen name="Home" component={Home} />
        </HomeStackNavigator.Navigator>
    );
}

const RenderContact = () => {
    return (
        <ContactStackNavigator.Navigator initialRouteName="Contact"
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
            <ContactStackNavigator.Screen name="Contact" component={Contact} />
        </ContactStackNavigator.Navigator>
    );
}

const RenderAbout = () => {
    return (
        <AboutStackNavigator.Navigator initialRouteName="About"
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
            <AboutStackNavigator.Screen name="About" component={About} />
        </AboutStackNavigator.Navigator>
    );
}

const RenderMenu = () => {
    return (
        <MenuStackNavigator.Navigator initialRouteName="Menu"
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
            <MenuStackNavigator.Screen name="Menu" component={Menu} />
            <MenuStackNavigator.Screen name="Dishdetail" component={DishDetail} />
        </MenuStackNavigator.Navigator>
    );
}

class Main extends Component {
    constructor(props) {
        super(props);
    }

    RenderMain() {
        return (
            <MainDrawerNavigator.Navigator initialRouteName="Home" screenOptions={{drawerActiveBackgroundColor: "#D1C4E9"}}>
                <MainDrawerNavigator.Screen
                    name="Home"
                    options={{drawerLabel: "Home", title: "Home"}}
                    component={RenderHome}
                />
                <MainDrawerNavigator.Screen 
                    name="About" 
                    options={{drawerLabel: "About Us", title: "About"}}
                    component={RenderAbout}
                />
                <MainDrawerNavigator.Screen 
                    name="Menu" 
                    options={{drawerLabel: "Menu", title: "Menu"}}
                    component={RenderMenu}
                />
                <MainDrawerNavigator.Screen 
                    name="Contact" 
                    options={{drawerLabel: "Contact Us", title: "Contact"}}
                    component={RenderContact}
                />
            </MainDrawerNavigator.Navigator>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavigationContainer>
                    <this.RenderMain />
                </NavigationContainer>
            </View>
        );
    }
}

export default Main;
