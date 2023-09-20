import {useSelector} from 'react-redux';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Modal,
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  FlatList,
  Button,
} from 'react-native';
import {usePubNub} from 'pubnub-react';
import {useDispatch} from 'react-redux';
import {freeall} from '../../../redux/slices/message';

const Item = ({title, position}) => {
  if (position) {
    return (
      <View style={{backgroundColor: 'white', borderRadius: 20}}>
        <Text
          style={{
            color: 'black',
            alignSelf: 'flex-end',
            backgroundColor: '#fafad2',
            padding: 5,
            margin: 2,
            borderRadius: 20,
          }}>
          {JSON.stringify(title)}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={{backgroundColor: 'white', borderRadius: 20}}>
        <Text
          style={{
            color: 'black',
            alignSelf: 'flex-start',
            backgroundColor: '#66cdaa',
            padding: 5,
            margin: 2,
            borderRadius: 20,
          }}>
          {JSON.stringify(title)}
        </Text>
      </View>
    );
  }
};

const Chat = (props, ref) => {
  const dispatch = useDispatch();
  const userIdRedux = JSON.parse(
    useSelector(state => state?.userR?.userID),
  ).uid;
  const messages = useSelector(state => state.messR.message);

  const pubnub = usePubNub();
  const [userID, setUserID] = useState('');
  // console.log('message', messages);
  const [modalVisible, setModalVisible] = useState(false);
  const [usermessage, setUsermessage] = useState([]);
  const [message, setMessage] = useState('');

  useImperativeHandle(ref, () => {
    return {
      setModalVisible: userID => {
        setModalVisible(true);
        setUserID(userID);
        // console.log('userID', userID);
      },
    };
  });

  useEffect(() => {
    const data = messages.filter(
      message =>
        (message.channel === userIdRedux && message.publisher === userID) ||
        (message.channel === userID && message.publisher === userIdRedux),
    );
    setUsermessage(data);
    // console.log('usermessage', usermessage);
  }, [messages, userID]);

  const sendMessage = message => {
    if (message) {
      pubnub.publish({channel: userID, message}).then(() => setMessage(''));
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={{flex: 2, ropacity: 0}}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            setModalVisible(false);
            dispatch(freeall());
          }}></TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          flexDirection: 'column',
          // opacity: 0,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            // opacity: 0,
          }}>
          <FlatList
            style={{width: '80%', marginTop: 4}}
            data={usermessage}
            renderItem={({item}) => (
              <Item
                title={item?.message}
                position={item.publisher === userIdRedux}
              />
            )}
            keyExtractor={item => item?.timetoken}
          />
        </View>
        <View
          style={{
            backgroundColor: 'black',
            height: 50,
            flexDirection: 'row',

            alignItems: 'center',
          }}>
          <TextInput
            style={{
              height: '90%',
              width: '87%',
              backgroundColor: 'white',
              borderRadius: 20,
            }}
            value={message}
            onChangeText={text => {
              setMessage(text);
            }}
            onSubmitEditing={() => {
              sendMessage(message);
            }}
          />
          <View>
            <Button
              title="Send"
              color="#841584"
              onPress={() => {
                sendMessage(message);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default forwardRef(Chat);
