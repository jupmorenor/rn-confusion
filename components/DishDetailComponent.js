import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import { DISHES } from "../shared/dishes";

const RenderDish = (props) => {
    const dish = props.dish;

    if (dish != null) {
        return (
            <Card>
                <Card.Image source={require('./images/uthappizza.png')}>
                    <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
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

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
        }
    }

    static navigationOptions = {
        title: 'Dish Details',
    };

    render() {
        const dishId = this.props.route.params.dishId;
        return (<RenderDish dish={this.state.dishes[+dishId]} />)
    }
}

export default DishDetail;
