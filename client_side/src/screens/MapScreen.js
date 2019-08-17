import React, {Component} from 'react';
import {
  View, Image, Text, Modal, TouchableHighlight, StyleSheet
} from 'react-native';
import {debounce} from 'lodash';
import MapView from 'react-native-maps';
import {findPlaceFromLatLng} from '../services/google.service';
import Geolocation from 'react-native-geolocation-service';

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

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
      openModal: false,
      text: 'hello omega ka ka'
    };
    this.onPanDrag = debounce(this.onPanDrag, 1000, {
      leading: true,
      trailing: false,
    });
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta,
          longitudeDelta,
        };
        this.onRegionChangeComplete(region);
      },
      (error) => {
        console.log(JSON.stringify(error));
      },
      {enableHighAccuracy: false},
    );
  }

  onRegionChangeComplete = async (region) => {
    const {data} = await findPlaceFromLatLng(`${region.latitude},${region.longitude}`);
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
    const {
      region, isPanding, text, openModal,
    } = this.state;
    return (
      <View style={styles.container}>
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
        </View>
        <View
          style={[styles.markerFixed, isPanding ? styles.isPanding : null]}
          pointerEvents="none"
        >
          <Image style={styles.marker} resizeMode="contain"
                 source={{uri: 'https://cdn4.iconfinder.com/data/icons/iconsimple-places/512/pin_1-512.png'}}/>
        </View>

        <View style={styles.textSearch}>
          <TouchableHighlight
            onPress={() => {
              this.setState({
                openModal: true,
              });
            }}
          >
            <View style={styles.text}>
              <Text>{text}</Text>
            </View>
          </TouchableHighlight>
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={openModal}
          onRequestClose={() => {
            this.setState({
              openModal: false,
            });
          }}
        >
          <View style={{marginTop: 22}}>
            <View>
              <Text>This is modal search Google Places!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setState({
                    openModal: false,
                  });
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
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
  textSearch: {
    alignItems: 'center',
    position: 'absolute',
    flex: 1,
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexWrap: 'nowrap',
  },
  text: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
    height: 40,
    padding: 8,
    borderWidth: 0,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});

