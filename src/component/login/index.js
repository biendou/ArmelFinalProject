import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {login as loginapi} from '../../api';
import {Localization} from '../../helpers';
import {useSelector} from 'react-redux';

const login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{Localization.t('thisistheloginpage')}</Text>
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
          loginapi(email, password);
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
