import {Marker} from 'react-native-maps';
import {Icon} from 'react-native-elements';
import {View, Text} from 'react-native';

const mapMarkers = (
  markers = [
    {
      currentLatitude: 48.858844,
      currentLongitude: 2.294351, // Eiffel Tower
      author: 'Eiffel Tower',
      userName: 'A famous monument in Paris, France',
    },
    {
      currentLatitude: 40.431908,
      currentLongitude: 116.570375, // Great Wall of China
      author: 'Great Wall of China',
      userName: 'An iconic wall in China',
    },
    {
      currentLatitude: 27.175015,
      currentLongitude: 78.042155, // Taj Mahal
      author: 'Taj Mahal',
      userName: 'A beautiful mausoleum in India',
    },
  ],
) => {
  return markers.map((marker, index) => (
    <Marker
      // style={{width: 100, height: 100, backgroundColor: 'red'}}
      key={index}
      coordinate={{
        latitude: marker.currentLatitude ? marker.currentLatitude : index * 10,
        longitude: marker.currentLongitude
          ? marker.currentLongitude
          : index * 10,
      }}
      title={marker.author}
      description={marker.userName}>
      <View>
        <Icon name="thunderstorm" type="material" color="red" />
        <Text
          style={{
            color: 'black',
            fontSize: 10,
            textShadowColor: 'white',
            textShadowRadius: 20,
            textShadowOffset: {width: -1, height: 1},
            shadowOpacity: 1,
            elevation: 1,
          }}>
          {marker.userName}
        </Text>
      </View>
    </Marker>
  ));
};

export default mapMarkers;
