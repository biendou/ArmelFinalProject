import {useState, useEffect} from 'react';
import {Button, View, Linking, Text} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {Myplace, Home, UserProfile, Itccommunication} from '../../component';
import {logout} from '../../api';
import {Localization} from '../../helpers';

// configuration of redux for language selector
import {useDispatch, useSelector} from 'react-redux';
import {setLang} from '../../redux/slices/langslice';

import {UserDetails} from '../';

import {usePubNub} from 'pubnub-react';

import {update} from '../../redux/slices/message';

import firestore from '@react-native-firebase/firestore';
import Config from 'react-native-config';

const Logout = ({navigation}) => {
  navigation.goBack();
};

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const LocalizationUpdate = () => {
    if (Localization.locale === 'en') {
      Localization.locale = 'fr';
      dispatch(setLang('fr'));
    } else {
      Localization.locale = 'en';
      dispatch(setLang('en'));
    }
  };
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <DrawerItemList {...props} />

        <DrawerItem
          label={Localization.t('logout')}
          onPress={() => {
            logout();
          }}
        />
        <DrawerItem
          style={{
            backgroundColor:
              Localization.locale == 'en' ? 'skyblue' : 'palegreen',
            alignSelf: 'bottom',
          }}
          label={Localization.t('language')}
          onPress={LocalizationUpdate}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const App = () => {
  const pubnub = usePubNub();
  const dispatch = useDispatch();
  const [channels, setChannels] = useState([Config.PUBNUB_COMMON_CHANNEL]);
  const value = useSelector(state => state.messR.counter).find(
    element => element.id === Config.PUBNUB_COMMON_CHANNEL,
  )?.count;

  useEffect(() => {
    const subscriber = firestore()
      .collection('UsersPosition')
      .onSnapshot(querySnapshot => {
        const data = [];

        querySnapshot.forEach(documentSnapshot => {
          data.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        const userID = [Config.PUBNUB_COMMON_CHANNEL];
        data.forEach(item => {
          if (!userID.includes(item.userId)) {
            userID.push(item.userId);
          }
        });

        setChannels(userID);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const handleMessage = event => {
    const message = event.message;
    if (typeof message === 'string' || message.hasOwnProperty('text')) {
      dispatch(update(event));
    }
  };

  useEffect(() => {
    pubnub.addListener({message: handleMessage});
    return () => {
      pubnub.removeListener({message: handleMessage});
    };
  }, []);

  useEffect(() => {
    pubnub.subscribe({channels});
    return () => {
      pubnub.unsubscribeAll();
    };
  }, [pubnub, channels]);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name={Localization.t('home')}
        component={Home}
        options={{headerShown: false, unmountOnBlur: true}}
      />
      <Drawer.Screen name={Localization.t('myplace')} component={Myplace} />
      <Drawer.Screen
        name={Localization.t('UserDetails')}
        component={UserDetails}
        options={{headerShown: false, unmountOnBlur: true}}
      />
      <Drawer.Screen
        name={Localization.t('userprofile')}
        component={UserProfile}
        options={{unmountOnBlur: true}}
      />
      <Drawer.Screen
        name={Localization.t(Config.PUBNUB_COMMON_CHANNEL)}
        component={Itccommunication}
        options={{
          unmountOnBlur: true,
          drawerLabel: props => (
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'black'}}>
                {Localization.t(Config.PUBNUB_COMMON_CHANNEL)}
              </Text>
              {value > 0 && (
                <Text
                  style={{
                    color: 'red',
                    fontWeight: 900,
                    marginLeft: 5,
                    backgroundColor: 'gold',
                    paddingLeft: 5,
                    paddingRight: 5,
                    borderRadius: 20,
                  }}>
                  {value}
                </Text>
              )}
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default App;
