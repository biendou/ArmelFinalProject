import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Signup} from '../../component';
import {Localization} from '../../helpers';

const Stack = createNativeStackNavigator();

function home() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Localization.t('login')}
        component={Login}
        options={{headerShown: false, unmountOnBlur: true}}
      />
      <Stack.Screen
        name={Localization.t('signup')}
        component={Signup}
        options={{headerShown: false, unmountOnBlur: true}}
      />
    </Stack.Navigator>
  );
}

export default home;
