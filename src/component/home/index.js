import {useRef, useEffect} from 'react';
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Localization} from '../../helpers';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const styles = StyleSheet.create({
  container: {
    // opacity: 0,
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

function HomeScreen({navigation}) {
  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText('');
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}></MapView>
      <View style={{flexDirection: 'row', backgroundColor: 'black'}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            height: 44,
            borderRadius: 5,
            paddingVertical: 5,
            width: 30,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.openDrawer()}>
          <Text style={{color: 'white'}}>!</Text>
        </TouchableOpacity>
        {/* <Button
          style={{backgroundColor: 'red', f}}
          onPress={() => navigation.navigate(Localization.t('myplace'))}
          title="X"
        /> */}
        <GooglePlacesAutocomplete
          ref={ref}
          textInputProps={{
            placeholderTextColor: 'black',
          }}
          placeholder="Enter Location"
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          styles={{
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
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: 'AIzaSyD-kAyJVWxMBF1M0hFf8LnZsXRdEUk2YAI',
            language: 'en',
          }}
        />
      </View>
    </View>
  );
}

export default HomeScreen;
