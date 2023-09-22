import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text} from 'react-native';
import {Home, User} from './src/stack';
import auth from '@react-native-firebase/auth';

import {Loader} from './src/component';

import {Localization} from './src/helpers';

// configuration of redux
import store from './src/redux/store';
import {Provider} from 'react-redux';

// import to use redux
import {useDispatch, useSelector} from 'react-redux';

// import to use redux slice User
import {setUserID} from './src/redux/slices/userslice';

// import to use redux slice Lang
import {setLangToogler} from './src/redux/slices/langslice';
import {checkPermission, requestPermission} from './src/helpers/permissions';
import Video from './src/component/video';

import {permission} from './src/helpers/permissions';

////
import Config from 'react-native-config';

import PubNub from 'pubnub';
import {PubNubProvider} from 'pubnub-react';

const pubnub = new PubNub({
  publishKey: Config.PUBNUB_PUBLISH_KEY,
  subscribeKey: Config.PUBNUB_SUBSCRIBE_KEY,
  uuid: Config.PUBNUB_UUID,
});

const App = () => {
  ////Spalsh screen
  const [loading, setLoading] = useState(true);

  // permission
  useEffect(() => {
    checkPermission('android.permission.ACCESS_FINE_LOCATION');
    checkPermission('android.permission.ACCESS_COARSE_LOCATION');
    requestPermission('android.permission.ACCESS_FINE_LOCATION');
    requestPermission('android.permission.ACCESS_COARSE_LOCATION');

    // Loader timer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <Provider store={store}>
      <PubNubProvider client={pubnub}>
        <Main />
      </PubNubProvider>
    </Provider>
  );
};

const Main = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const lang = useSelector(state => state.langR.lang);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    // console.log(user);

    dispatch(setUserID(JSON.stringify(user)));
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    // dispatch(setLangToogler());   <-------------------------- language maker for testing
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
