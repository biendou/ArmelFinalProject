import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Icon} from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import {Localization} from '../../helpers';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import Config from 'react-native-config';

function UserView({navigation}) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users
  const user = JSON.parse(useSelector(state => state?.userR?.userID));

  useEffect(() => {
    const subscriber = firestore()
      .collection(Config.FIREBASE_COLLECTION_FAVORITES_PLACES)
      .onSnapshot(querySnapshot => {
        const data = [];

        querySnapshot.forEach(documentSnapshot => {
          data.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        const userID = [];
        const Items = [];
        data.forEach(item => {
          if (!userID.includes(item.userId)) {
            userID.push(item.userId);
            Items.push(item);
          }
        });

        setUsers(Items);

        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View Style={{backgroundColor: 'red', flex: 1}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={users}
          renderItem={({item, index}) => (
            <View style={styles.card} key={index}>
              <TouchableOpacity
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  navigation.navigate(Localization.t('FavoritePlaces'), {
                    Item: item,
                  });
                }}>
                <Icon
                  name="person"
                  type="material"
                  color={'burlywood'}
                  size={70}
                  style={{alignSelf: 'flex-start'}}
                />

                <Text style={styles.title}>{item.userName}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  add: {
    backgroundColor: 'green',
    height: 50,
    width: 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 20,
    borderRadius: 10,
  },
  container: {flex: 1, alignItems: 'strech'},
  Button: {
    backgroundColor: 'red',
    height: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  card: {
    backgroundColor: 'aliceblue',
    elevation: 4, // Add elevation for a shadow effect
    padding: 16,
    margin: 8,
    borderRadius: 8,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
});
export default UserView;
