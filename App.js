import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text} from 'react-native';
import {Home, User} from './src/stack';
import auth from '@react-native-firebase/auth';

import {Localization} from './src/helpers';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import {useDispatch} from 'react-redux';
import {setUserID} from './src/redux/slices/userslice';
import {checkPermission, requestPermission} from './src/helpers/permissions';

const App = () => {
  useEffect(() => {
    checkPermission('android.permission.ACCESS_FINE_LOCATION');
    checkPermission('android.permission.ACCESS_COARSE_LOCATION');
    requestPermission('android.permission.ACCESS_FINE_LOCATION');
    requestPermission('android.permission.ACCESS_COARSE_LOCATION');
  }, []);
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

const Main = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    // console.log(user);
    dispatch(setUserID(JSON.stringify(user)));
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    ///// set localisation to a specific language
    Localization.locale = 'en';
    //////listen for authentication state to change
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>{!user ? <Home /> : <User />}</NavigationContainer>
  );
};
export default App;
