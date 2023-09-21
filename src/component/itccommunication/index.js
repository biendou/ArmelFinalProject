import {useState, useEffect} from 'react';
import {View, FlatList, TextInput, Button, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {usePubNub} from 'pubnub-react';
import {reset, freeall} from '../../redux/slices/message';
// import {useDebounce} from '../../helpers/bouncer';

const Itc = () => {
  const {bouncer} = useDebounce();
  const dispatch = useDispatch();
  const userIdRedux = JSON.parse(
    useSelector(state => state?.userR?.userID),
  ).uid;
  const pubnub = usePubNub();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const messages = useSelector(state => state.messR.message);
  console.log(messages);

  useEffect(() => {
    setData(messages.filter(item => item.channel === 'ITC'));
  }, [messages]);

  useEffect(() => {
    dispatch(reset('ITC'));

    return () => {
      dispatch(freeall());
    };
  }, []);

  const sendMessage = message => {
    if (message) {
      pubnub.publish({channel: 'ITC', message}).then(() => setMessage(''));
    }
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          if (item.publisher === userIdRedux) {
            return (
              <View
                style={{
                  backgroundColor: '#ffb6c1',
                  margin: 10,
                  padding: 10,
                  borderRadius: 10,
                  alignItems: 'flex-end',
                }}>
                <Text style={{fontSize: 20, color: 'black'}}>
                  {item.message}
                </Text>
              </View>
            );
          } else {
            return (
              <View
                style={{
                  backgroundColor: 'skyblue',
                  margin: 10,
                  padding: 10,
                  borderRadius: 10,
                  alignItems: 'flex-start',
                }}>
                <Text style={{fontSize: 20, color: 'black'}}>
                  {item.message}
                </Text>
              </View>
            );
          }
        }}
      />
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={{flex: 1, height: 40, borderColor: 'gray', borderWidth: 1}}
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

export default Itc;
