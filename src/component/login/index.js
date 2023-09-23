import {useState} from 'react';
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
import Config from 'react-native-config';

const Login = ({navigation}) => {
  const [email, setEmail] = useState(Config.DEVELOPMENT_SAVE_EMAIL); //
  const [password, setPassword] = useState(
    Config.DEVELOPMENT_SAVE_EMAIL_PASSWORD,
  ); //'SuperSecretPassword!'

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.text}>{Localization.t('thisistheloginpage')}</Text> */}
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
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={[styles.button, {backgroundColor: 'mistyrose'}]}
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
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={[styles.text, {fontSize: 20}]}>
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
    backgroundColor: 'blanchedalmond',
  },
  textinput: {
    /// General shape informations
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
    textAlign: 'center',
    textAlignVertical: 'center',
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

export default Login;
