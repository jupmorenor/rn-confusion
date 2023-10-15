import React, { Component } from "react";
import { View } from "react-native";
import Menu from './MenuComponent';
import { DISHES } from "../shared/dishes";
import DishDetail from "./DishDetailComponent";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null,
        };
    }

    onDishSelected(dishId) {
        this.setState({selectedDish: dishId});
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: "flex-start"}} >
                <Menu
                    dishes={this.state.dishes}
                    onPressed={(dishId) => this.onDishSelected(dishId)}
                />
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
            </View>
        );
    }
}

export default Main;
