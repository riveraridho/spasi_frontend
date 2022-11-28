import React, {Component, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let myHeadersApiPrivate = new Headers();
    myHeadersApiPrivate.append('Accept', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeadersApiPrivate,
    };
    fetch(`http://192.168.1.195:8080/api/v1/users/allUser`, requestOptions)
      .then(async response => {
        let res = await response.json();
        console.log(res);
        this.setState({data: res.data});
      })
      .catch(err => console.log(err));
  };

  logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.replace('Login');
  };

  render() {
    console.log(this.state.data);
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '95%',
          }}>
          <Text style={{color: 'black', fontSize: 20}}>Daftar User</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddUser')}
            style={{
              backgroundColor: '#3C8DBC',
              width: 100,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
            }}>
            <Text style={{color: 'white'}}>Add new user</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 5,
            height: 100,
            width: '95%',
            borderWidth: 2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              borderBottomWidth: 2,
            }}>
            <View style={{width: 80}}>
              <Text style={{color: 'black'}}>Nama</Text>
            </View>
            <View style={{width: 100}}>
              <Text style={{color: 'black'}}>Password</Text>
            </View>
            <View style={{width: 100}}>
              <Text style={{color: 'black'}}>CreateAt</Text>
            </View>
            <View style={{width: 50}}>
              <Text style={{color: 'black'}}>Fungsi</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View style={{width: 80}}>
              <Text style={{color: 'black'}}>{this.state.data.nama}</Text>
            </View>
            <View style={{width: 100}}>
              <Text numberOfLines={1} style={{color: 'black'}}>
                {this.state.data.password}
              </Text>
            </View>
            <View style={{width: 100}}>
              <Text numberOfLines={1} style={{color: 'black'}}>
                {this.state.data.CreatedAt}
              </Text>
            </View>
            <View style={{width: 50}}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('EditUser', {
                    id: this.state.data,
                  })
                }>
                <Text
                  numberOfLines={1}
                  style={{color: 'black', alignSelf: 'center'}}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.logout()}
          style={{
            marginTop: 10,
            backgroundColor: '#3C8DBC',
            width: 150,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
          }}>
          <Text style={{color: 'white'}}>Back to Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    paddingVertical: 30,
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
