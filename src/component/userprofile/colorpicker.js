import React, {useState} from 'react';
import {Button, Modal, StyleSheet, View, ToastAndroid} from 'react-native';
import Localisation from '../../helpers/localization';
import firestore from '@react-native-firebase/firestore';
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';

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
      .collection('UsersPosition')
      .doc('userIdBiendouYepdieu')
      .update({
        color: color,
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
  return (
    <View style={styles.container}>
      <Button title="Color Picker" onPress={() => setShowModal(true)} />

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

        <Button title="Ok" onPress={onOk} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
