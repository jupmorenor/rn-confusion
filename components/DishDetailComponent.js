import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";

const RenderDish = (props) => {
    const dish = props.dish;

    if (dish != null) {
        return (
            <Card>
                <Card.Image source={require('./images/uthappizza.png')}>
                    <Card.Title>{dish.name}</Card.Title>
                </Card.Image>
                <Card.Divider />
                <Text style={{margin: 10}} >
                    {dish.description}
                </Text>
            </Card>
        );
    } else {
        return (
            <View></View>
        );
    }
}

const DishDetail = (props) => {
    return (<RenderDish dish={props.dish} />)
}

export default DishDetail;
