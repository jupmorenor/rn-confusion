import React, { Component } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
    };
}

const RenderDish = (props) => {
    const dish = props.dish;

    if (dish !== null) {
        return (
            <Card>
                <Card.Image source={{ uri: baseUrl + dish.image }}>
                    <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
                </Card.Image>
                <Card.Divider />
                <Text style={{margin: 10}} >
                    {dish.description}
                </Text>
                <Icon raised reverse type="font-awesome" color='#f50'
                    name={ props.favorite ? 'heart': 'heart-o'}
                    onPress={() => props.favorite ? console.log('fav') : props.onPress()}
                />
            </Card>
        );
    } else {
        return (
            <View></View>
        );
    }
}

const RenderComments = (props) => {
    const comments = props.comments;
    const RenderCommentItem = ({item, index}) => {
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} stars</Text>
                <Text style={{fontSize: 12}}>-- {item.author}, {item.date}</Text>
            </View>
        );
    }
    return (
        <Card>
            <Card.Title>Comments</Card.Title>
            <Card.Divider />
            <FlatList
                data={comments}
                renderItem={RenderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
        }
    }

    static navigationOptions = {
        title: 'Dish Details',
    };

    markFavorite(dishId) {
        this.setState({favorites: this.state.favorites.concat(dishId)});
    }

    render() {
        const dishId = +this.props.route.params.dishId;
        return (
            <ScrollView>
                <RenderDish
                    dish={this.props.dishes.dishes[dishId]}
                    favorite={this.state.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(DishDetail);
