import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {login as loginapi} from '../../api';
import {Localization} from '../../helpers';
import {useSelector} from 'react-redux';

const login = ({navigation}) => {
  const [email, setEmail] = useState('biendou@example.com'); //
  const [password, setPassword] = useState('SuperSecretPassword!'); //'SuperSecretPassword!'

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{Localization.t('thisistheloginpage')}</Text>
      <TextInput
        value={email}
        placeholderTextColor={'black'}
        placeholder={Localization.t('enteremail')}
        style={styles.textinput}
        onChange={setEmail}
        autoCapitalize="false"
        // clearTextOnFocus="true"
      />
      <TextInput
        value={password}
        placeholderTextColor={'black'}
        placeholder={Localization.t('enterpassword')}
        style={styles.textinput}
        onChange={setPassword}
        autoCapitalize="false"
        secureTextEntry={true}
        // clearTextOnFocus="true"
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
            loginapi(email, password);
          }
        }}>
        <Text style={[styles.text, {fontSize: 20}]}>
          {Localization.t('login')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(Localization.t('signup'))}>
        <Text style={[styles.text, {fontSize: 20}]}>
          {Localization.t('gotosignup')}
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

export default login;
