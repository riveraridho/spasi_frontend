import React, {Component, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      password: '',
    };
  }

  register = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      nama: this.state.nama,
      password: this.state.password,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch('http://192.168.1.195:8080/api/v1/users/register/', requestOptions)
      .then(response => response.json())
      .then(result => {
        //this.setState({is_Loading: false});
        this.props.navigation.replace('Home');
        alert(result.meta.message);
      })
      .catch(error => console.log('error', error));
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <TextInput
            style={{
              width: 300,
              height: 50,
              margin: 12,
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              color: 'black',
            }}
            onChange={event => {
              this.setState({nama: event.nativeEvent.text});
            }}
            value={this.state.nama}
            placeholder="Name"
          />
          <TextInput
            style={{
              height: 50,
              width: 300,
              margin: 12,
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              color: 'black',
            }}
            onChange={event => {
              this.setState({password: event.nativeEvent.text});
            }}
            value={this.state.password}
            placeholder="Password"
          />
          <TouchableOpacity
            onPress={() => this.register()}
            style={{
              backgroundColor: '#3C8DBC',
              width: 100,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
            }}>
            <Text style={{color: 'white'}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  input: {
    height: 35,
    width: '60%',
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
});
