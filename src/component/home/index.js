import {useRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from 'react-native';
import {Localization} from '../../helpers';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {getCurrentPosition} from '../../helpers/geolocation';
import Config from 'react-native-config';
import {Icon} from 'react-native-elements';
import mapMarkers from './markers';

import Chat from './chat';

const postdata = (data, user) => {
  firestore()
    .collection(Config.FIREBASE_COLLECTION_FAVORITES_PLACES)
    .add({
      userId: user?.uid,
      userName: user?.email,
      longitude: data.lng,
      latitude: data.lat,
      placeName: data.main_text,
      author: 'Biendou',
    })
    .then(() => {
      ToastAndroid.show(
        Localization.t('Placeaddedsuccessfully'),
        ToastAndroid.LONG,
      );
    });
};

function HomeScreen({navigation}) {
  const user = JSON.parse(useSelector(state => state?.userR?.userID));
  const chat = useRef(null);
  const [refresh, setRefresh] = useState(false);
  const [position, setPosition] = useState(null);
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  console.log(
    '================================>location',
    Config,
    '====================>',
    Config.googleapikey,
  );
  const load = useRef(null);

  useEffect(() => {
    const subscriber = firestore()
      .collection(Config.FIREBASE_COLLECTION_SHARE_POSITION_BY_USERS)
      .onSnapshot(querySnapshot => {
        const positions = [];

        querySnapshot.forEach(documentSnapshot => {
          positions.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setPosition(positions);
        // console.log('=======>', positions);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  useEffect(() => {
    const echo = setInterval(() => {
      setRefresh(!refresh);
      getCurrentPosition(user?.uid);
    }, 10000); ///////// <----------------- change this to change the refresh rate
    return () => {
      clearInterval(echo);
    };
  }, []);

  return (
    <View style={styles.mainContainer}>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={location}>
        {position ? mapMarkers(chat, position) : mapMarkers()}
      </MapView>
      <View style={styles.organizer}>
        <View style={styles.subContainer1}>
          <TouchableOpacity
            style={styles.drawerButton}
            onPress={() => navigation.openDrawer()}>
            <Icon name="menu" type="material" color="white" />
          </TouchableOpacity>
          <GooglePlacesAutocomplete
            textInputProps={{
              placeholderTextColor: 'black',
            }}
            placeholder={Localization.t('Enterlocation')}
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            fetchDetails={true}
            styles={styleSearchBar}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true

              setLocation({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              });
              load.current = {
                ...details.geometry.location,
                ...data.structured_formatting,
              };
            }}
            query={{
              key: Config.GOOGLE_API_KEY,
              language: Localization.t('language'),
            }}
          />
        </View>
        <Chat ref={chat} />
        <TouchableOpacity
          style={styles.add}
          onPress={() => {
            if (!load.current) {
              ToastAndroid.show(
                Localization.t('pleaseselectalocation'),
                ToastAndroid.SHORT,
              );
              // alert('please enter a location');
            } else {
              postdata(load.current, user);
              navigation.navigate(Localization.t('myplace'));
            }
          }}>
          <Text style={styles.text}>{Localization.t('additem')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styleSearchBar = StyleSheet.create({
  container: {
    flexGrow: 1,
    position: 'absolute',
    backgroundColor: 'black',
    position: 'relative',
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    color: 'black',
    backgroundColor: '#FFFFFF',
    height: 44,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  },
  powered: {},
  listView: {},
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  description: {color: 'black'},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  subContainer1: {flexDirection: 'row', backgroundColor: 'black'},
  drawerButton: {
    backgroundColor: 'black',
    height: 44,
    borderRadius: 5,
    paddingVertical: 5,
    width: 30,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  add: {
    backgroundColor: 'mediumaquamarine',
    height: 50,
    width: 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 20,
    borderRadius: 10,
  },

  Button: {
    backgroundColor: 'red',
    height: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
  },
  container: {
    // opacity: 0,
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  organizer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
