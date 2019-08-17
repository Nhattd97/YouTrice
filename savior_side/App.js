import React, {Fragment} from 'react';
import {
  Button,
  // SafeAreaView,
  StyleSheet,
  // ScrollView,
  // View,
  // Text,
  // StatusBar,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

// const getToken = async () => {
//   let fcmToken = await AsyncStorage.getItem('fcmToken');
//   if (!fcmToken) {
//     fcmToken = await firebase.messaging().getToken();
//     if (fcmToken) {
//       await AsyncStorage.setItem('fcmToken', fcmToken);
//     }
//   }
// };

// const checkPermission = async () => {
//   const enabled = await firebase.messaging().hasPermission();
//   if (enabled) {
//     this.getToken();
//   } else {
//     this.requestPermission();
//   }
// };

// const requestPermission = async () => {
//   try {
//     await firebase.messaging().requestPermission();
//     this.getToken();
//   } catch (error) {
//     console.log('permission rejected');
//   }
// };

// const createNotificationListeners = () => {
//   firebase.notifications().onNotification(notification => {
//     notification.android.setChannelId('insider').setSound('default')
//     firebase.notifications().displayNotification(notification)
//   });
// };

// componentDidMount = () => {
//   const channel = new firebase.notifications.Android.Channel('insider', 'insider channel', firebase.notifications.Android.Importance.Max)
//   firebase.notifications().android.createChannel(channel);
//   this.checkPermission();
//   this.createNotificationListeners();
// };

const App = () => {
  return (
    <Fragment>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        region={{
          latitude: 10.806977,
          longitude: 106.665556,
          latitudeDelta: 0.1,
          longitudeDelta: 0.05,
        }}
        showsMyLocationButton={true}
        mapType="standard"
        zoomEnabled={true}
        pitchEnabled={true}
        showsUserLocation={true}
        followsUserLocation={true}
        showsCompass={true}
      />
      <Button onClick="checkPermission()" title="Click here!" />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
