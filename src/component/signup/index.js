import {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{Localization.t('thisistheSignuppage')}</Text>
      <TextInput
        placeholderTextColor={'black'}
        placeholder={Localization.t('enteremail')}
        style={styles.textinput}
        onChange={setEmail}
      />
      <TextInput
        placeholderTextColor={'black'}
        placeholder={Localization.t('enterpassword')}
        style={styles.textinput}
        onChange={setPassword}
      />
      <TouchableOpacity
        style={[styles.button, {backgroundColor: 'yellow'}]}
        onPress={() => {
          const x = generateRandomCredentials();
          console.log(x.email, x.password);
          signupapi(x.email, x.password);
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
