import {Marker, Callout} from 'react-native-maps';
import {Icon} from 'react-native-elements';
import {View, Text, Button, Touchable} from 'react-native';

const mapMarkers = (
  chatRef,
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
      title={marker.userName}
      description={JSON.stringify(marker.speed)}>
      <View style={{flexDirection: 'row'}}>
        <Icon name="thunderstorm" type="material" color={marker.userColor} />
        <Icon
          style={{positionTop: -30}}
          name="sms"
          type="material"
          color={'red'}
        />
      </View>
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
      <Callout
        tooltip={true}
        onPress={() => {
          chatRef.current.setModalVisible();
        }}>
        <View style={{width: 110}}>
          <Button color={marker.userColor} title={'Message me'}></Button>
        </View>
      </Callout>
    </Marker>
  ));
};

export default mapMarkers;
