import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {Home, Login, AddUser, EditUser} from '../screens';

const Stack = createNativeStackNavigator();

const ScreenNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShadowVisible: false}}
        initialRouteName="Home">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="EditUser" component={EditUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default ScreenNavigation;
