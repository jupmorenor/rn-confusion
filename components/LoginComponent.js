import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image/* , PermissionsAndroid */ } from 'react-native';
import { Input, CheckBox, Card, Icon, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as Asset from "expo-asset";
import baseUrl from '../shared/baseUrl';

class LoginTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo').then((userdata) => {
            let userinfo = JSON.parse(userdata);
            if (userinfo) {
                this.setState({username: userinfo.username});
                this.setState({password: userinfo.password});
                this.setState({remember: true})
            }
        });
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: () => <Icon name="sign-in" type="font-awesome" color="white" />
    };

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));
        }
    }

    render() {
        return (
            <Card style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={<Icon type='font-awesome' name='user-o' />}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    style={styles.formInput}
                />
                <Input
                    placeholder="Password"
                    leftIcon={<Icon type='font-awesome' name='key' />}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    style={styles.formInput}
                />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    style={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title="Login"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name="sign-in" type="font-awesome" color="white" />}
                    />
                </View>
            </Card>
        );
    }

}

class RegisterTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    // Revisar como obtener permisos SOLO ANDROID?
    getImageFromCamera = async () => {
        const cameraPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        const cameraRollPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA_ROLL);

        if (cameraPermission === PermissionsAndroid.RESULTS.GRANTED && cameraRollPermission === PermissionsAndroid.RESULTS.GRANTED) {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.canceled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
            }
        }

    }

    async processImage(imageUri) {
        let processedImage = await ImageManipulator.manipulateAsync(imageUri, [
            { resize: { width: 400 }}
        ], {
            format: 'png',
        });
        this.setState({ imageUri: processedImage.uri });
    }
    
    static navigationOptions = {
        title: 'Register',
        tabBarIcon: () => <Icon name='user-plus' type='font-awesome' size={24} color="white" />
    };

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
        }
    }

    render() {
        return(
            <ScrollView><Card>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: this.state.imageUrl}} 
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image} 
                    />
                    <Button
                        title="Camera"
                        onPress={this.getImageFromCamera}
                    />
                </View>
                <Input
                    placeholder="Username"
                    leftIcon={<Icon type='font-awesome' name='user-o' />}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    style={styles.formInput}
                />
                <Input
                    placeholder="Password"
                    leftIcon={<Icon type='font-awesome' name='key' />}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    style={styles.formInput}
                />
                <Input
                    placeholder="First Name"
                    leftIcon={<Icon type='font-awesome' name='user-o' />}
                    onChangeText={(firstname) => this.setState({firstname})}
                    value={this.state.firstname}
                    style={styles.formInput}
                />
                <Input
                    placeholder="Last Name"
                    leftIcon={<Icon type='font-awesome' name='user-o' />}
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                    style={styles.formInput}
                />
                <Input
                    placeholder="Email"
                    leftIcon={<Icon type='font-awesome' name='envelope-o' />}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    style={styles.formInput}
                />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    style={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleRegister()}
                        title="Register"
                        icon={<Icon name='user-plus' type='font-awesome' size={24} color='white' />}
                        buttonStyle={{ backgroundColor: "#512DA8" }}
                    />
                </View>
            </View>
            </Card></ScrollView>
        );
    }
}

const LoginTabNavigator = createBottomTabNavigator();
const Login = () => {
    return (
        <LoginTabNavigator.Navigator initialRouteName="Login"
            screenOptions={{
                tabBarActiveBackgroundColor: '#9575CD',
                tabBarInactiveBackgroundColor: '#D1C4E9',
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: 'gray',
            }}
        >
            <LoginTabNavigator.Screen name="Login" component={LoginTab} options={LoginTab.navigationOptions} />
            <LoginTabNavigator.Screen name="Register" component={RegisterTab} options={RegisterTab.navigationOptions} />
        </LoginTabNavigator.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formInput: {
        margin: 10
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
});

export default Login;