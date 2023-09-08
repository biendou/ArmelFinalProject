import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Signup} from '../../component';

const Stack = createNativeStackNavigator();

function home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

export default home;
