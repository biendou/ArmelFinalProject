import Geolocation from 'react-native-geolocation-service';
import firestore from '@react-native-firebase/firestore';

const getCurrentPosition = userID => {
  Geolocation.getCurrentPosition(
    position => {
      // let randomInteger = Math.floor(Math.random() * 11) + 10;
      console.log(position);
      firestore()
        .collection('UsersPosition')
        .doc(userID)
        .set({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: position.timestamp,
        })
        .then(() => {
          console.log('User position added!');
        });
    },
    error => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
};

export {getCurrentPosition};
