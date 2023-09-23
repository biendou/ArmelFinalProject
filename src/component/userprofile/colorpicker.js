import React, {useState} from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  View,
  ToastAndroid,
  Text,
  TouchableOpacity,
} from 'react-native';
import Localisation from '../../helpers/localization';
import firestore from '@react-native-firebase/firestore';
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';
import Config from 'react-native-config';

export default function App({init, set}) {
  const [showModal, setShowModal] = useState(false);
  const [color, setColor] = useState('#000000');
  const onSelectColor = ({hex}) => {
    setColor(hex);
    console.log(hex);
  };
  const onOk = () => {
    setShowModal(false);
    firestore()
      .collection(Config.FIREBASE_COLLECTION_SHARE_POSITION_BY_USERS)
      .doc(Config.FIREBASE_DOCUMENT_SHARE_POSITION_BY_USERS)
      .update({
        userColor: color,
      })
      .then(() => {
        set(color);
        console.log('User updated!');
        ToastAndroid.show(Localisation.t('userupdated'), ToastAndroid.SHORT);
      })
      .catch(error => {
        console.log(error);
      });
  };

  onCancel = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        title={Localisation.t('colorpicker')}
        onPress={() => setShowModal(true)}
        style={styles.button}>
        <Text style={styles.text}>{Localisation.t('colorpicker')}</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide">
        <ColorPicker
          style={{width: '100%'}}
          value={init}
          onComplete={onSelectColor}>
          <Preview />
          <Panel1 />
          <HueSlider />
          <OpacitySlider />
          <Swatches />
        </ColorPicker>

        <View style={styles.container}>
          <TouchableOpacity style={styles.button1} onPress={onOk}>
            <Text style={styles.text}>{Localisation.t('ok')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={onCancel}>
            <Text style={styles.text}>{Localisation.t('cancel')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'mediumaquamarine',
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  button1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 10,
    height: 50,
    width: 200,
    margin: 5,
  },
  button2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    height: 50,
    width: 200,
    margin: 5,
  },

  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
