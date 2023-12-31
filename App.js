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

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    checkPermission('android.permission.ACCESS_FINE_LOCATION');
    checkPermission('android.permission.ACCESS_COARSE_LOCATION');
    requestPermission('android.permission.ACCESS_FINE_LOCATION');
    requestPermission('android.permission.ACCESS_COARSE_LOCATION');

    // Loader timer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <Provider store={store}>
      <Main />
      {/* <Video /> */}
    </Provider>
  );
};

const Main = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const lang = useSelector(state => state.langR.lang);
  console.log('######', lang);

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
