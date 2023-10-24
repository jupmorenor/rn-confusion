import React, { Component } from "react";
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button } from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from '../shared/baseUrl';
import { postFavorites, postComment } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    };
}

const mapDispatchToProps = dispatch => ({
    postFavorites: (dishId) => dispatch(postFavorites(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

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
                <View style={styles.modalContent}>
                    <Icon style={{flex: 1}} raised reverse type="font-awesome" color='#f50'
                        name={ props.favorite ? 'heart': 'heart-o'}
                        onPress={() => props.favorite ? console.log('fav') : props.onPress()}
                    />
                    <Icon style={{flex: 1}} raised reverse type="font-awesome" color="#512DA8" name="pencil"
                        onPress={() => props.toggleModal()}
                    />
                </View>
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
            rating: 0,
            author: '',
            comment: '',
            showModal: false,
        }
    }

    static navigationOptions = {
        title: 'Dish Details',
    };

    markFavorite(dishId) {
        this.props.postFavorites(dishId);
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    resetForm() {
        this.setState({
            rating: 0,
            author: '',
            comment: '',
        });
    }

    handleComment(dishId) {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.toggleModal();
    }

    render() {
        const dishId = +this.props.route.params.dishId;
        return (
            <ScrollView>
                <RenderDish
                    dish={this.props.dishes.dishes[dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={() => this.toggleModal()}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.resetForm()}
                    onRequestClose={() => {this.toggleModal(); this.resetForm()}}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your comment</Text>
                        <Rating
                        showRating
                            value={this.state.rating}
                            startingValue={0}
                            fractions="{1}"
                            onFinishRating={(val) => this.setState({rating: val})}
                        />
                        <Input
                            leftIcon={<Icon type="fontawesome" name="person" />}
                            style={{margin: 10}}
                            placeholder="Author"
                            value={this.state.author}
                            onChangeText={(text) => this.setState({author: text})}
                        />
                        <Input
                            leftIcon={<Icon type="fontawesome" name="comment" />}
                            style={{margin: 10}}
                            placeholder="Comment"
                            value={this.state.comment}
                            onChangeText={(text) => this.setState({comment: text})}
                        />
                        <View style={{margin: 10}}>
                            <Button
                                title="Submit"
                                color="#512DA8"
                                onPress={() => {this.handleComment(dishId)}}
                            />
                        </View>
                        <View style={{margin: 10}}>
                            <Button
                                title="Close"
                                color="#999"
                                onPress={() => {this.toggleModal(); this.resetForm()}}
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent:"center",
        margin: 20,
    },
    modalContent: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row"
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        backgroundColor: "#512DA8",
        textAlign: "center",
        color: "white",
        marginBottom: 20,
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
