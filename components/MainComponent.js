import React, { Component } from "react";
import { View, Image, StyleSheet, Text, ToastAndroid } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from "react-native-elements";
import NetInfo, { NetInfoStateType } from "@react-native-community/netinfo";
import { fetchComments, fetchDishes, fetchLeaders, fetchPromotions } from '../redux/ActionCreators'
import Menu from './MenuComponent';
import DishDetail from "./DishDetailComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import Reservation from "./ReservationComponent";
import Favorites from "./FavoriteComponent";
import Login from "./LoginComponent";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchPromotions: () => dispatch(fetchPromotions()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})

const MenuStackNavigator = createNativeStackNavigator();
const HomeStackNavigator = createNativeStackNavigator();
const ContactStackNavigator = createNativeStackNavigator();
const ReservationStackNavigator = createNativeStackNavigator();
const AboutStackNavigator = createNativeStackNavigator();
const FavoritesStackNavigator = createNativeStackNavigator();
const LoginStackNavigator = createNativeStackNavigator();
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

const RenderReservation = () => {
    return (
        <ReservationStackNavigator.Navigator initialRouteName="Reservation"
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
            <ReservationStackNavigator.Screen name="Reservation" component={Reservation} />
        </ReservationStackNavigator.Navigator>
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

const Renderfavorites = () => {
    return (
        <FavoritesStackNavigator.Navigator initialRouteName="Favorites"
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
            <FavoritesStackNavigator.Screen name="Favorites" component={Favorites} />
            <FavoritesStackNavigator.Screen name="Dishdetail" component={DishDetail} />
        </FavoritesStackNavigator.Navigator>
    );
}

const RenderLogin = () => {
    return (
        <LoginStackNavigator.Navigator initialRouteName="Login"
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
            <LoginStackNavigator.Screen name="Login" component={Login} />
        </LoginStackNavigator.Navigator>
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

const CustomDrawerContentComponent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <SafeAreaView style={styles.container}>
                <View style={styles.drawerHeader}>
                    <View style={{flex: 1}} >
                        <Image source={{uri: '/images/logo.png'}} style={styles.drawerImage} />
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={styles.drawerHeaderText} >Ristorante Confusion</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </SafeAreaView>
        </DrawerContentScrollView>
    );
}

class Main extends Component {
    constructor(props) {
        super(props);
    }

    connectionListener;

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchLeaders();

        NetInfo.fetch().then((connectionInfo) => {
            ToastAndroid.show(
                `Initial Network Connectivity Type: ${connectionInfo.type}`, 
                ToastAndroid.LONG
            );
        });
        this.connectionListener = NetInfo.addEventListener((connectionInfo) => {
            switch (connectionInfo.type) {
                case NetInfoStateType.wifi:
                    ToastAndroid.show('Connected to WiFi', ToastAndroid.LONG);
                    break;
                case NetInfoStateType.cellular:
                    ToastAndroid.show('Connected to Mobile network', ToastAndroid.LONG);
                    break;
                case NetInfoStateType.ethernet:
                    ToastAndroid.show('Connected to Desktop network', ToastAndroid.LONG);
                    break;
                case NetInfoStateType.unknown:
                    ToastAndroid.show('Connected to unknown network', ToastAndroid.LONG);
                    break;
                case NetInfoStateType.none:
                    ToastAndroid.show('Offline', ToastAndroid.LONG);
                    break;
                default:
                    break;
            }
        });
        
    }

    componentWillUnmount() {
        this.connectionListener();
    }        

    RenderMain() {
        return (
            <MainDrawerNavigator.Navigator initialRouteName="Home" 
                screenOptions={{
                    drawerActiveBackgroundColor: "#D1C4E9",
                    headerStyle: {
                        backgroundColor: '#512DA8'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        color: '#fff'
                    },
                    
                }}
                drawerContent={CustomDrawerContentComponent}
            >
                <MainDrawerNavigator.Screen
                    name="Login"
                    options={{
                        drawerLabel: "Login",
                        title: "Login",
                        drawerIcon: ({ color }) => <Icon name="sign-in" type="font-awesome" color={color} size={24} />
                    }}
                    component={RenderLogin}
                />
                <MainDrawerNavigator.Screen
                    name="Home"
                    options={{
                        drawerLabel: "Home",
                        title: "Home",
                        drawerIcon: ({ color }) => <Icon name="home" type="font-awesome" color={color} size={24} />
                    }}
                    component={RenderHome}
                />
                <MainDrawerNavigator.Screen 
                    name="About" 
                    options={{drawerLabel: "About Us",
                    title: "About",
                    drawerIcon: ({ color }) => <Icon name="info-circle" type="font-awesome" color={color} size={24} />
                }}
                    component={RenderAbout}
                />
                <MainDrawerNavigator.Screen 
                    name="Menu" 
                    options={{drawerLabel: "Menu",
                    title: "Menu",
                    drawerIcon: ({ color }) => <Icon name="list" type="font-awesome" color={color} size={24} />
                }}
                    component={RenderMenu}
                />
                <MainDrawerNavigator.Screen 
                    name="Contact" 
                    options={{
                        drawerLabel: "Contact Us",
                        title: "Contact",
                        drawerIcon: ({ color }) => <Icon name="address-card" type="font-awesome" color={color} size={22} />
                    }}
                    component={RenderContact}
                />
                <MainDrawerNavigator.Screen 
                    name="Favorites" 
                    options={{
                        drawerLabel: "My Favorites",
                        title: "My Favorites",
                        drawerIcon: ({ color }) => <Icon name="heart" type="font-awesome" color={color} size={24} />
                    }}
                    component={Renderfavorites}
                />
                <MainDrawerNavigator.Screen 
                    name="Reservation" 
                    options={{
                        drawerLabel: "Reserve table",
                        title: "Reservation",
                        drawerIcon: ({ color }) => <Icon name="cutlery" type="font-awesome" color={color} size={24} />
                    }}
                    component={RenderReservation}
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

const styles = StyleSheet.create({
    container: { flex: 1},
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60,
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: "bold",
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
