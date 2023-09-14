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
import Video from '../video';

function generateRandomCredentials() {
  const randomIndex = Math.floor(Math.random() * 1000000000); // Generate a random number between 0 and 999999
  const email = `user${randomIndex}@example.com`;
  const password = `password${randomIndex}`;
  return {email, password};
}

const Signup = ({navigation}) => {
  let dummyCredentials = generateRandomCredentials();

  const [email, setEmail] = useState(dummyCredentials.email);
  const [password, setPassword] = useState(dummyCredentials.password);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Video /> */}
      {/* 
      <Text style={styles.text}>{Localization.t('thisistheSignuppage')}</Text> */}
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
        style={styles.button}
        onPress={() => {
          if (!email || !password) {
            ToastAndroid.show(
              Localization.t('EmailandPasswordarerequired'),
              ToastAndroid.SHORT,
            );
            // errors.email = 'Email is required.';
          } else if (!/\S+@\S+\.\S+/.test(email) || password.length < 6) {
            // errors.email = 'Email is invalid.';
            ToastAndroid.show(
              Localization.t('EmailorpasswordisinvalidPleasecheckyourentries'),
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
    backgroundColor: 'blanchedalmond',
  },
  textinput: {
    width: 200,
    height: 50,
    backgroundColor: 'antiquewhite',
    marginBottom: 10,
    color: 'lightslategrey',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'bisque',
    fontWeight: 'bold',
    borderRadius: 10,
    elevation: 5,
  },
  text: {
    color: 'black',
    fontSize: 50,
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: 'olive',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    fontWeight: 'bold',
    elevation: 5,
  },
});
export default Signup;
