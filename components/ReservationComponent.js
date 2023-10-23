import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, Switch, Button, Modal } from "react-native";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            showModal: false,
        };
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
        });
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    //No funciona ninguno de los DateTimePicker probados
    render() {
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(value, index) => this.setState({guests: value})}
                    >
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        trackColor="#512DA8"
                        onValueChange={(value) => this.setState({smoking: value})}
                    ></Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and time</Text>                    
                    <RNDateTimePicker
                        style={styles.formDate}
                        value={this.state.date}
                        onChange={(e, date) => this.setState({date: date})}
                        placeholderText="Select a date and time"
                        mode="date"
                        positiveButton={{label: "Confirm", textColor:"#512AD8"}}
                        negativeButton={{label: "Cancel", textColor:"#512AD8"}}
                    />
                </View>
                <View style={styles.formRow}>
                    <Button
                        title="Reserve"
                        color="#512DA8"
                        onPress={() => this.handleReservation()}
                    />
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.resetForm()}
                    onRequestClose={() => {this.toggleModal(); this.resetForm()}}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your reservation</Text>
                        <Text style={styles.modalText}>Number of guests: {this.state.guests}</Text>
                        <Text style={styles.modalText}>Smoking?: {this.state.smoking ? "Yes" : "No"}</Text>
                        <Text style={styles.modalText}>Date of reservation: {this.state.date.toString()}</Text>
                        <Button
                            title="Close"
                            color="#512DA8"
                            onPress={() => {this.toggleModal(); this.resetForm()}}
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
        margin: 20,
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1,
    },
    formDate: {
        marginRight: 20,
        flex: 2,
    },
    modal: {
        justifyContent:"center",
        margin: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        backgroundColor: "#512DA8",
        textAlign: "center",
        color: "white",
        marginBottom: 20,
    },
    modalText: {
        fontSize: 18,
        margin: 10,
    }
});

export default Reservation;
