import React, {Component} from 'react';
import { AsyncStorage,View,Text } from 'react-native';
import firebase from 'react-native-firebase';

export default class App extends Component {
state={
  tokennya:null
}
async componentDidMount() {
  this.checkPermission();
}

  //1
async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
      console.log('get token');
  } else {
      this.requestPermission();
  }
}

  //3
async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('this '+fcmToken);
  this.setState({
    tokennya:fcmToken
  })
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          // user has a device token
      console.log('user has a device token');
          await AsyncStorage.setItem('fcmToken', fcmToken);
      }else{
        console.log('why '+fcmToken);
      }
  }
}

  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      console.log('User has authorised');
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}

  render() {
    return (
      <View style={{flex: 1}}>
  <Text>Welcome to React Native!{this.state.tokennya}</Text>
      </View>
    );
  }
}