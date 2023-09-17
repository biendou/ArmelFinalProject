import {forwardRef, useImperativeHandle} from 'react';
import {
  Modal,
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useState} from 'react';

const Chat = (props, ref) => {
  const [modalVisible, setModalVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      setModalVisible: () => {
        setModalVisible(true);
      },
    };
  });

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View
        style={{flex: 2, ropacity: 0}}
        onPress={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(false);
          }}></TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          flexDirection: 'column',
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'green',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}></View>
        <View
          style={{backgroundColor: 'red', height: 70, flexDirection: 'row'}}>
          <TextInput style={{height: '90%', width: '80%'}} />
          <TouchableOpacity
            Style={{backgroundColor: 'gold', height: 50, width: 50}}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default forwardRef(Chat);
