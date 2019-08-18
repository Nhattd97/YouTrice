import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet, Text, Button, Alert,Image } from 'react-native';
import firebase from "react-native-firebase";

const serverTime = firebase.database().getServerTime();
const ref = firebase.database().ref('requestPending');
ref.on('child_added', dataSnapshot => {
  if (dataSnapshot.val()) {
    console.warn(dataSnapshot.val());
  }
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    height: 35,
    width: 35,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
    zIndex: 2,
    height: 48,
    width: 48,
  },
});

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

export default class MapScreen extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 10.779845,
        longitude: 106.694714,
        latitudeDelta,
        longitudeDelta,
      }
    }
  }

  confirmation = () => {
    Alert.alert(
      'Confirmation',
      'Do you want to accept this request?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', 
          onPress: () => {
            this.setState({
              region: {
                latitude: 10.780889,
                longitude: 106.629271
              }
            });
          }
        },
      ],
      { cancelable: true },
    );
  }

  static navigationOptions = {
    header: null
  };

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    firebase.notifications().onNotification(notification => {
      notification.android.setChannelId('insider').setSound('default')
      firebase.notifications().displayNotification(notification)
    });
  }

  componentDidMount() {
    const channel = new firebase.notifications.Android.Channel('insider', 'insider channel', firebase.notifications.Android.Importance.Max)
    firebase.notifications().android.createChannel(channel);
    this.checkPermission();
    this.createNotificationListeners();
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: latitudeDelta,
          }}
        >
        </MapView>
        <View
          style={[styles.markerFixed]}
          pointerEvents="none">
          <Image
            style={styles.marker}
            resizeMode="contain"
            source={{
              uri:
                'https://cdn4.iconfinder.com/data/icons/iconsimple-places/512/pin_1-512.png',
            }}
          />
        </View>
        <Text>{serverTime.toString()}</Text>
      </View>
    );
  }
}
