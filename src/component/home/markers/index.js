import {Marker} from 'react-native-maps';
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
      {/* <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 40,
          backgroundColor: 'red',
        }}>
        <Text>a</Text>
      </View> */}
    </Marker>
  ));
};

export default mapMarkers;
