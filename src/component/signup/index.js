import {SafeAreaView, Text} from 'react-native';

const signup = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 50,
        }}>
        This is the Signup page
      </Text>
    </SafeAreaView>
  );
};

export default signup;
