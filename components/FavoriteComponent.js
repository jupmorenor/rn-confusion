import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { deleteFavorite } from '../redux/ActionCreators';
import { Swipeable, RectButton } from 'react-native-gesture-handler';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    };
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    };

    render() {
        const { navigate } = this.props.navigation;
        
        const deleteButton = (item) => {
            const alertMessage = () => {
                Alert.alert(
                    "Delete favorite?",
                    "Are you sure you wish to delete your favorite dish " + item.name + "?",
                    [
                        {text: "Cancel", style: "cancel", onPress: () => console.log("Not deleted")},
                        {text: "Ok", onPress: () => this.props.deleteFavorite(item.id)}
                    ],
                    {cancelable: false}
                );
            }
            return (
                <RectButton
                    style={{backgroundColor: "red", padding: 20 }}
                    onPress={() => alertMessage()}
                ><Text>Delete</Text></RectButton>
            );
        }
        const renderMenuItem = ({item, index}) => {
            return (
                <Swipeable renderRightActions={() => deleteButton(item)}>
                    <ListItem key={index} onPress={() => navigate('Dishdetail', {dishId: item.id})} bottomDivider>
                        <Avatar source={{uri: baseUrl + item.image}}/>
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>            
                </Swipeable>
            );
        };

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        } else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{this.props.dishes.errMess}</Text>
                </View>            
            );
        } else {
            return (
                <FlatList 
                    data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
