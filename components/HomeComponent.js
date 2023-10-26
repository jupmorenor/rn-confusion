import React, { Component } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from '../shared/baseUrl';
import { Loading } from "./LoadingComponent";

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders,
    };
}

const RenderItem = (props) => {
    const item = props.item;

    if (props.isLoading) {
        return (
            <Card>
                <Loading />
            </Card>
        );
    } else if (props.errMess) {
        return (
            <Card>
                <Text style={{margin: 10}} >{props.errMess}</Text>
            </Card>
        );
    } else {
        if (item != null) {
            return (
                <Card>
                    <Card.Image source={ {uri: baseUrl + item.image }}>
                        <Card.FeaturedTitle>{item.name}</Card.FeaturedTitle>
                        <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>
                    </Card.Image>
                    <Card.Divider />
                    <Text style={{margin: 10}} >
                        {item.description}
                    </Text>
                </Card>
            );
        } else {
            return (
                <View></View>
            );
        }
    }
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);        
    }

    componentDidMount () {
        this.animate()
    }

    animate () {
        this.animatedValue.setValue(0)
        Animated.timing(
          this.animatedValue,
          {
            toValue: 8,
            duration: 8000,
            easing: Easing.linear,
            useNativeDriver: false
          }
        ).start(() => this.animate())
    }

    static navigationOptions = {
        title: 'Home',
    };

    render() {
        const xpos1 = this.animatedValue.interpolate({
            inputRange: [0, 1, 3, 5, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        })
        const xpos2 = this.animatedValue.interpolate({
            inputRange: [0, 2, 4, 6, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        })
        const xpos3 = this.animatedValue.interpolate({
            inputRange: [0, 3, 5, 7, 8],
            outputRange: [1200, 600, 0, -600, -1200 ]
        })
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                <Animated.View style={{ width: '100%', transform: [{translateX: xpos1}]}}>
                    <RenderItem 
                        isLoading={this.props.dishes.isLoading}
                        errMess={this.props.dishes.errMess}
                        item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    />
                </Animated.View>
                <Animated.View style={{ width: '100%', transform: [{translateX: xpos2}]}}>
                    <RenderItem
                        isLoading={this.props.promotions.isLoading}
                        errMess={this.props.promotions.errMess}
                        item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    />
                </Animated.View>
                <Animated.View style={{ width: '100%', transform: [{translateX: xpos3}]}}>
                    <RenderItem
                        isLoading={this.props.leaders.isLoading}
                        errMess={this.props.leaders.errMess}
                        item={this.props.leaders.leaders.filter((lead) => lead.featured)[0]}
                    />
                </Animated.View>
            </View>
        );
    }
}

export default connect(mapStateToProps)(Home);
