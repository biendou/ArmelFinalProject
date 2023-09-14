import auth from '@react-native-firebase/auth';
import {ToastAndroid} from 'react-native';

const login = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
};

const signup = (email, password) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
      ToastAndroid.show(
        'User account created & signed in!',
        ToastAndroid.SHORT,
      );
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        ToastAndroid.show(
          'That email address is already in use!',
          ToastAndroid.SHORT,
        );
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        ToastAndroid.show(
          'That email address is invalid!, Please check your entries.',
          ToastAndroid.SHORT,
        );
      }

      console.error(error);
    });
};

const logout = () => {
  auth()
    .signOut()
    .then(() => {
      console.log('User signed out!');
    });
};

export {login, signup, logout};
