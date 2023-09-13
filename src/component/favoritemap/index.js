import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

function Favoritemap({route, navigation}) {
  const {Item, otherParam} = route.params;
  const [location, setLocation] = useState({
    latitude: Item.latitude,
    longitude: Item.longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  console.log('item', Item);
  console.log('otherParam', otherParam);

  return (
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={location}></MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  add: {
    backgroundColor: 'green',
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

export default Favoritemap;
