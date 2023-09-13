import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, Text} from 'react-native';
import {UserView, FavoritePlaces, Favoritemap} from '../../component';
import {Localization} from '../../helpers';

const Stack = createNativeStackNavigator();

function UserDetailsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Localization.t('userView')}
        component={UserView}
        options={{unmountOnBlur: true}}
      />
      <Stack.Screen
        name={Localization.t('FavoritePlaces')}
        component={FavoritePlaces}
        options={{unmountOnBlur: true}}
      />
      <Stack.Screen
        name={Localization.t('favoritemap')}
        component={Favoritemap}
        options={{unmountOnBlur: true}}
      />
    </Stack.Navigator>
  );
}

export default UserDetailsStack;
