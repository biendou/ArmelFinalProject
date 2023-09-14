import * as React from 'react';
import {Button, View, Linking} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {Myplace, Home, Userprofile} from '../../component';
import {logout} from '../../api';
import {Localization} from '../../helpers';

// configuration of redux for language selector
import {useDispatch, useSelector} from 'react-redux';
import {setLang} from '../../redux/slices/langslice';

import {UserDetails} from '../';

const Logout = ({navigation}) => {
  navigation.goBack();
};

function CustomDrawerContent(props) {
  // const [update, setUpdate] = React.useState(false);
  const dispatch = useDispatch();
  const LocalizationUpdate = () => {
    // setUpdate(!update);
    if (Localization.locale === 'en') {
      Localization.locale = 'fr';
      dispatch(setLang('fr'));
    } else {
      Localization.locale = 'en';
      dispatch(setLang('en'));
    }
    console.log('hello');
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
            console.log('bye!');
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
      {/* <Drawer.Screen
        name={Localization.t('userprofile')}
        component={Userprofile}
        options={{headerShown: false, unmountOnBlur: true}}
      /> */}
    </Drawer.Navigator>
  );
};

export default App;
