import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text} from 'react-native';
import {Home, User} from './src/stack';
import auth from '@react-native-firebase/auth';

import {Localization} from './src/helpers';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
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
    //   <Home />
    <NavigationContainer>{!user ? <Home /> : <User />}</NavigationContainer>
  );
};
export default App;
