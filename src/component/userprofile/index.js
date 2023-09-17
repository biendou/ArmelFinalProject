import {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Slider from './colorpicker';
import Localisation from '../../helpers/localization';
import firestore from '@react-native-firebase/firestore';
import {Icon} from 'react-native-elements';

const changeinput1 = (seteditable, editable, value) => {
  if (editable) {
    seteditable(!editable);
    firestore()
      .collection('UsersPosition')
      .doc('userIdBiendouYepdieu')
      .update({
        firstName: value,
      })
      .then(() => {
        console.log('User updated!');
        ToastAndroid.show(Localisation.t('userupdated'), ToastAndroid.SHORT);
      });
  }
  seteditable(!editable);
};

const changeinput2 = (seteditable, editable, value) => {
  if (editable) {
    firestore()
      .collection('UsersPosition')
      .doc('userIdBiendouYepdieu')
      .update({
        lastName: value,
      })
      .then(() => {
        console.log('User updated!');
        ToastAndroid.show(Localisation.t('userupdated'), ToastAndroid.SHORT);
      });
  }
  seteditable(!editable);
};

const getdata = async () => {
  return await firestore()
    .collection('UsersPosition')
    .doc('userIdBiendouYepdieu')
    .get();
};

const UserProfile = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [colorinit, setColorinit] = useState('#000000');
  const [edit1, setEdit1] = useState(false);
  const [edit2, setEdit2] = useState(false);
  const [ready1, setReady1] = useState(false);

  useEffect(() => {
    getdata()
      .then(userDocument => {
        setInput1(userDocument._data.firstName);
        setInput2(userDocument._data.lastName);
        setColorinit(userDocument._data.userColor);
        console.log(userDocument._data, '============>', colorinit);
        setReady1(true);
      })
      .catch(error => {
        console.log(error);
      });
    // console.log(userDocument);
  }, []);

  if (!ready1) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.area1}>
        <Icon
          style={styles.headIcon}
          size={200}
          name="face"
          type="material"
          color={colorinit}
        />
      </View>
      <View style={styles.area2}>
        <View style={styles.area21}>
          <View style={styles.area211}>
            <TextInput
              value={input1}
              style={styles.input}
              editable={edit1}
              onChangeText={text => {
                setInput1(text);
              }}
            />
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                changeinput1(setEdit1, edit1, input1);
              }}>
              {!edit1 ? (
                <Icon name="edit" type="material" color="red" size={20} />
              ) : (
                <Icon name="done" type="material" color="black" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.area212}>
            <TextInput
              value={input2}
              style={styles.input}
              editable={edit2}
              onChangeText={text => {
                setInput2(text);
              }}
            />
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                changeinput2(setEdit2, edit2, input2);
              }}>
              {!edit2 ? (
                <Icon name="edit" type="material" color="red" size={20} />
              ) : (
                <Icon name="done" type="material" color="green" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.area22}>
          <View style={styles.area221}>
            <Slider init={colorinit} set={setColorinit} />
          </View>
          <View style={styles.area222}></View>
        </View>
      </View>
    </View>
  );
};

styles = {
  container: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  area1: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 50,
  },
  area2: {
    flex: 2,
    backgroundColor: 'white',
  },
  area21: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  area211: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    // marginBottom: 20,
    // marginTop: 10,
    // borderRadius: 10,
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  area212: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white',

    // marginBottom: 20,
    // marginTop: 20,
  },
  area22: {
    flex: 1,

    flexDirection: 'Column',
    backgroundColor: 'white',
  },
  area221: {
    flex: 1,
    backgroundColor: 'white',
  },
  area222: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 5,
  },
  input: {
    width: 200,
    height: 50,
    backgroundColor: 'antiquewhite',
    alignContent: 'center',
    borderRadius: 10,
  },
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 50,
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 50,
  },
  headIcon: {
    color: 'white',
    width: 200,
    height: 200,
    fontSize: 500,
  },
};

export default UserProfile;
