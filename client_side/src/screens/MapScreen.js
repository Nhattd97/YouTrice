import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Picker,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {debounce} from 'lodash';
import MapView from 'react-native-maps';
import {findPlaceFromLatLng} from '../services/google.service';
import Geolocation from 'react-native-geolocation-service';

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

const Toast = content => {
  ToastAndroid.showWithGravityAndOffset(
    content.message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
  return null;
};
export default class MapScreen extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 10.780889,
        longitude: 106.629271,
        latitudeDelta,
        longitudeDelta,
      },
      isPanding: false,
      text: 'hello omega ka ka',
      incidentType: 'all',
    };
    this.onPanDrag = debounce(this.onPanDrag, 1000, {
      leading: true,
      trailing: false,
    });
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta,
          longitudeDelta,
        };
        this.onRegionChangeComplete(region);
      },
      error => {
        console.log(JSON.stringify(error));
      },
      {enableHighAccuracy: false},
    );
  }

  onRegionChangeComplete = async region => {
    const {data} = await findPlaceFromLatLng(
      `${region.latitude},${region.longitude}`,
    );
    const newState = {
      region,
      isPanding: false,
    };
    if (data.status === 'OK') {
      newState.text = data.results[0].formatted_address;
    }
    this.setState(newState);
  };

  onPanDrag = () => {
    const {isPanding} = this.state;
    if (isPanding) {
      return;
    }
    this.setState({
      isPanding: true,
    });
  };

  render() {
    const {region, isPanding, text} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.controlWrapper}>
          <Picker
            style={styles.picker}
            selectedValue={this.state.incidentType}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({incidentType: itemValue})
            }>
            <Picker.Item style={{display: 'none'}} label="All" value="all" />
            <Picker.Item
              style={{justifyContent: 'center', alignItems: 'center'}}
              label="Car"
              value="car"
            />
            <Picker.Item label="Bike" value="bike" />
            <Picker.Item label="Plumper" value="plumper" />
          </Picker>
          <TextInput
            placeholder={'Enter a message to your savior'}
            style={styles.textInput}
            editable={true}
            maxLength={40}
            onChange={msg => this.setState({message: msg})}
          />
        </View>
        <View style={styles.address}>
          <View style={styles.text}>
            <Text>{text}</Text>
          </View>
        </View>
        <View style={styles.mapWrapper}>
          <MapView
            ref={map => (this.map = map)}
            initialRegion={region}
            style={styles.map}
            showsUserLocation={true}
            followUserLocation={true}
            loadingEnabled={true}
            onPanDrag={this.onPanDrag}
            onRegionChangeComplete={this.onRegionChangeComplete}
          />
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              style={styles.submitBtn}
              // onPress={this.submit}
            >
              <Text>S.O.S</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[styles.markerFixed, isPanding ? styles.isPanding : null]}
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
        <Toast message={String(region.latitude)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    position: 'relative',
  },
  mapWrapper: {
    flex: 1,
    height: 400,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
    height: '100%',
  },
  marker: {
    height: 48,
    width: 48,
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
  isPanding: {
    marginTop: -60,
  },
  address: {
    alignItems: 'center',
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: 'black',
  },
  text: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: 'black',
    overflow: 'hidden',
    height: 40,
    padding: 8,
    alignItems: 'center',
  },
  textInput: {
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRightWidth: 30,
    borderLeftWidth: 30,
    height: 50,
    width: '80%',
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  picker: {
    height: 50,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
  },
  controlWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  btnWrapper: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 999,
    position: 'absolute',
    bottom: 0,
    left: 170,
    margin: 10,
  },
  submitBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 50,
    borderRadius: 50,
    backgroundColor: 'red',
  },
});
