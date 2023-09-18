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
} from 'react-native';
import {usePubNub} from 'pubnub-react';

const Item = ({title, position}) => {
  if (position) {
    return (
      <View style={{backgroundColor: '#ffebcd', borderRadius: 20}}>
        <Text style={{color: 'black', alignSelf: 'flex-end'}}>
          {JSON.stringify(title)}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={{backgroundColor: '#ffebcd', borderRadius: 20}}>
        <Text style={{color: 'black', alignSelf: 'flex-start'}}>
          {JSON.stringify(title)}
        </Text>
      </View>
    );
  }
};

const Chat = (props, ref) => {
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
            backgroundColor: '#faebd7',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
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
          style={{backgroundColor: 'black', height: 50, flexDirection: 'row'}}>
          <TextInput
            style={{
              width: '80%',
              backgroundColor: 'white',
              borderRadius: 20,
            }}
            value={message}
            onChangeText={text => {
              setMessage(text);
            }}
          />
          <View
            Style={{
              backgroundColor: 'gold',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <TouchableOpacity
              Style={{
                backgroundColor: 'gold',
                height: 20,
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                sendMessage(message);
              }}>
              <Text style={{color: 'white', fontSize: 30}}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default forwardRef(Chat);
