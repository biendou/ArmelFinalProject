import {forwardRef, useImperativeHandle} from 'react';
import {
  Modal,
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {useState} from 'react';

const Chat = (props, ref) => {
  const [modalVisible, setModalVisible] = useState(false);
  const actionSheetRef = useRef(null);
  useImperativeHandle(ref, () => {
    return {
      setModalVisible: () => {
        actionSheetRef.current?.show();
      },
    };
  });

  return (
    <ActionSheet ref={actionSheetRef}>
      <Text>Hi, I am here.</Text>
    </ActionSheet>
  );
};
export default forwardRef(Chat);
