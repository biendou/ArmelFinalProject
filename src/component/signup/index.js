import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {signup as signupapi} from '../../api';
import {Localization} from '../../helpers';

function generateRandomCredentials() {
  const randomIndex = Math.floor(Math.random() * 1000000000); // Generate a random number between 0 and 999999
  const email = `user${randomIndex}@example.com`;
  const password = `password${randomIndex}`;
  return {email, password};
}

const signup = ({navigation}) => {
  let dummyCredentials = generateRandomCredentials();

  const [email, setEmail] = useState(dummyCredentials.email);
  const [password, setPassword] = useState(dummyCredentials.password);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{Localization.t('thisistheSignuppage')}</Text>
      <TextInput
        value={email}
        placeholderTextColor={'black'}
        placeholder={Localization.t('enteremail')}
        style={styles.textinput}
        onChange={setEmail}
      />
      <TextInput
        value={password}
        placeholderTextColor={'black'}
        placeholder={Localization.t('enterpassword')}
        style={styles.textinput}
        onChange={setPassword}
      />
      <TouchableOpacity
        style={[styles.button, {backgroundColor: 'yellow'}]}
        onPress={() => {
          if (!email || !password) {
            ToastAndroid.show(
              'Email and  Password is required.',
              ToastAndroid.SHORT,
            );
            // errors.email = 'Email is required.';
          } else if (!/\S+@\S+\.\S+/.test(email) || password.length < 6) {
            // errors.email = 'Email is invalid.';
            ToastAndroid.show(
              'Email or password is invalid, Please check your entries.',
              ToastAndroid.SHORT,
            );
          } else {
            signupapi(email, password);
          }
        }}>
        <Text style={[styles.text, {fontSize: 20}]}>
          {Localization.t('signup')}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  textinput: {
    width: 200,
    height: 50,
    backgroundColor: 'green',
    marginBottom: 10,
    color: 'black',
  },
  text: {
    color: 'black',
    fontSize: 50,
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: 'red',
    marginBottom: 10,
  },
});
export default signup;
