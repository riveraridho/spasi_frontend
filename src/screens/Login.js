import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  Modal,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      password: '',
      sercure: this.makeid(5),
      isSecure: '',
      is_Loading: false,
      is_see_password: true,
    };
  }

  login = async () => {
    this.setState({is_Loading: true});

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

    fetch('http://192.168.1.195:8080/api/v1/users/login/', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.meta.status == 'success') {
          this.storeToken(result.data.token);
          this.setState({is_Loading: false});
          this.props.navigation.navigate('Home');
          alert(result.meta.message);
        } else {
          this.setState({is_Loading: false});
          alert(result.meta.message);
        }
      })
      .catch(error => {
        this.setState({is_Loading: false});
        console.log('error', error);
      });
  };

  storeToken = async token => {
    await AsyncStorage.setItem('token', token);
  };

  makeid(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.setState({sercure: result});
    return result;
  }

  render() {
    console.log(this.state.sercure);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,0.4)',
          marginLeft: 10,
          marginRight: 10,
        }}>
        <ScrollView>
          <View style={{marginTop: 25}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#000',
                fontSize: 24,
                marginTop: 10,
              }}>
              Login
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextInput
                placeholder="Nama"
                onChangeText={nama => this.setState({nama: nama})}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#CCCCCC',
                  width: '90%',
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                placeholder="Password"
                onChangeText={password => this.setState({password: password})}
                secureTextEntry={true}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#CCCCCC',
                  width: '90%',
                }}
              />
            </View>
          </View>
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: 'white',
              width: 200,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Text style={{color: 'black', fontSize: 24}}>
              {this.state.sercure}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                placeholder="Security"
                onChangeText={isSecure => this.setState({isSecure: isSecure})}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#CCCCCC',
                  width: '90%',
                }}
              />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              disabled={
                this.state.isSecure != this.state.sercure ||
                this.state.is_Loading
              }
              onPress={() => this.login()}
              style={{
                height: 55,
                width: '90%',
                backgroundColor:
                  this.state.isSecure != this.state.sercure ||
                  this.state.is_Loading
                    ? '#3C8DBC90'
                    : '#3C8DBC',
                marginTop: 30,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {this.state.is_Loading ? (
                <ActivityIndicator size="large" color="#FFF" />
              ) : (
                <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold'}}>
                  Login
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Login;
