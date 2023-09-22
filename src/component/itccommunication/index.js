import {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TextInput,
  Button,
  Text,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {usePubNub} from 'pubnub-react';
import {reset, freeall} from '../../redux/slices/message';
import Config from 'react-native-config';
// import {useDebounce} from '../../helpers/bouncer';

const Common_Communication = () => {
  // redux
  const dispatch = useDispatch();
  const userIdRedux = JSON.parse(
    useSelector(state => state?.userR?.userID),
  ).uid;

  // pubnub
  const pubnub = usePubNub();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');

  //message
  const messages = useSelector(state => state.messR.message);

  useEffect(() => {
    setData(
      messages.filter(item => item.channel === Config.PUBNUB_COMMON_CHANNEL),
    );
  }, [messages]);

  useEffect(() => {
    dispatch(reset(Config.PUBNUB_COMMON_CHANNEL));

    return () => {
      dispatch(freeall());
    };
  }, []);

  const sendMessage = message => {
    if (message) {
      pubnub
        .publish({channel: Config.PUBNUB_COMMON_CHANNEL, message})
        .then(() => setMessage(''));
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item}) => {
          if (item.publisher === userIdRedux) {
            return (
              <View style={styles.viewflatlistSend}>
                <Text style={styles.textflatlist}>{item.message}</Text>
              </View>
            );
          } else {
            return (
              <View style={styles.viewflatlistreceive}>
                <Text style={styles.textflatlist}>{item.message}</Text>
              </View>
            );
          }
        }}
      />
      <View style={styles.containerInput}>
        <TextInput
          style={styles.textinput}
          onChangeText={text => setMessage(text)}
          value={message}
        />
        <Button
          onPress={() => {
            sendMessage(message);
          }}
          title="Send"
          color="#841584"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  viewflatlistreceive: {
    backgroundColor: 'skyblue',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  viewflatlistSend: {
    backgroundColor: '#ffb6c1',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'flex-end',
  },
  textflatlist: {
    fontSize: 20,
    color: 'black',
  },
  containerInput: {flexDirection: 'row'},
  textinput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default Common_Communication;
