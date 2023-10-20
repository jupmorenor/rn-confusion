import React, { Component } from "react";
import { FlatList, View } from "react-native";
import { Avatar, ListItem, Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
    };
}

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Menu',
    };

    render() {
        const renderMenuItem = ({item, index}) => {
            const { navigate } = this.props.navigation;
            return (
                <Tile key={index}
                    featured
                    title={item.name}
                    caption={item.description}
                    imageSrc={{ uri: baseUrl + item.image }}
                    onPress={() => navigate('Dishdetail', {dishId: item.id})}
                />
            );
        }
        
        return (
            <FlatList 
                data={this.props.dishes.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }

}

export default connect(mapStateToProps)(Menu);
