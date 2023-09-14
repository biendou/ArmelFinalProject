import {ToastAndroid} from 'react-native';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const checkPermission = permission => {
  check(permission)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          ToastAndroid.show(
            'This feature is not available (on this device / in this context)',
            ToastAndroid.SHORT,
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );

          console.log('ping');
          ToastAndroid.show(
            'The permission has not been requested / is denied but requestable',
            ToastAndroid.SHORT,
          );
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          ToastAndroid.show(
            'The permission is limited: some actions are possible',
            ToastAndroid.SHORT,
          );

          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          ToastAndroid.show('The permission is granted', ToastAndroid.SHORT);

          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          ToastAndroid.show(
            'The permission is denied and not requestable anymore',
            ToastAndroid.SHORT,
          );
          break;
      }
    })
    .catch(error => {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    });
};

const requestPermission = permission => {
  request(permission).then(result => {
    ToastAndroid.show(result, ToastAndroid.SHORT);
  });
};
export {checkPermission, requestPermission};
