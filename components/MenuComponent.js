import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

const Menu = (props) => {

    const renderMenuItem = ({item, index}) => {
        return (
            <ListItem key={index} onPress={() => props.onPressed(item.id)} bottomDivider>
                <Avatar source={require('./images/uthappizza.png')}/>
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>            
        );
    }

    return (
        <FlatList 
            data={props.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
        />
    );

}

export default Menu;
