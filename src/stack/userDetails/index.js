import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';
import {UserView, FavoritePlaces, Favoritemap} from '../../component';
import {Localization} from '../../helpers';
import {Icon} from 'react-native-elements';

const Stack = createNativeStackNavigator();

const ButtonP = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <Icon
        name="menu"
        type="material"
        color="black"
        style={{marginRight: 10}}
      />
    </TouchableOpacity>
  );
};

function UserDetailsStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Localization.t('userView')}
        component={UserView}
        options={{
          unmountOnBlur: true,
          headerLeft: props => {
            return <ButtonP navigation={navigation} />;
          },
        }}
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
