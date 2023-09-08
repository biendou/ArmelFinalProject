import {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>This is the login page</Text>
      <TextInput
        placeholderTextColor={'black'}
        placeholder={'enter your email ...'}
        style={styles.textinput}
        onChange={setEmail}
      />
      <TextInput
        placeholderTextColor={'black'}
        placeholder={'enter your password'}
        style={styles.textinput}
        onChange={setPassword}
      />
      <TouchableOpacity
        style={[styles.button, {backgroundColor: 'yellow'}]}
        onPress={() => {}}>
        <Text style={[styles.text, {fontSize: 20}]}>login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={[styles.text, {fontSize: 20}]}>Go to Signup</Text>
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
