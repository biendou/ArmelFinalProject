import * as React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const GOOGLE_PLACES_API_KEY = ''; // never save your real api key in a snack!

const App = () => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Enter Location"
        minLength={2}
        autoFocus={false}
        returnKeyType={'default'}
        fetchDetails={true}
        textInputProps={{
          placeholderTextColor: 'black',
        }}
        styles={{
          container: {
            flex: 1,
          },
          textInputContainer: {
            flexDirection: 'row',
          },
          textInput: {
            backgroundColor: 'green',
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
            padding: 13,
            height: 44,
            flexDirection: 'row',
          },
          separator: {
            height: 0.5,
            backgroundColor: '#c8c7cc',
          },
          description: {
            color: 'black',
          },
          loader: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 20,
          },
        }}
        query={{
          key: 'AIzaSyD-kAyJVWxMBF1M0hFf8LnZsXRdEUk2YAI',
          language: 'en', // language of the results
        }}
        onPress={(data, details = null) => console.log(data)}
        onFail={error => console.error(error)}
        requestUrl={{
          url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web',
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'red',
  },
});

export default App;
