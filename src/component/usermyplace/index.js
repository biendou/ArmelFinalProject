import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Icon} from 'react-native-elements';
import React, {useState, useEffect} from 'react';
import {Localization} from '../../helpers';
import firestore from '@react-native-firebase/firestore';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';

function NotificationsScreen({route, navigation}) {
  const {Item, otherParam} = route.params;
  console.log('item', Item);
  console.log('otherParam', otherParam);
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users
  const user = JSON.parse(useSelector(state => state?.userR?.userID));
  useEffect(() => {
    const subscriber = firestore()
      .collection(Config.FIREBASE_COLLECTION_FAVORITES_PLACES)
      .where('userId', '==', Item.userId)
      .onSnapshot(querySnapshot => {
        const data = [];

        querySnapshot.forEach(documentSnapshot => {
          data.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(data);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{flex: 1, alignItems: 'strech'}}>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={users}
          renderItem={({item}) => (
            <View style={styles.card}>
              <TouchableOpacity
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  navigation.navigate(Localization.t('favoritemap'), {
                    Item: item,
                    otherParam: 'anything you want here',
                  });
                }}>
                <Icon
                  name="map"
                  type="material"
                  color={'blue'}
                  size={70}
                  style={{alignSelf: 'flex-end'}}
                />
                <Text style={styles.title}>{item.placeName}</Text>
                <Text style={styles.description}>
                  Latitude: {item.latitude.toFixed(5)}
                </Text>
                <Text style={styles.description}>
                  Longitude: {item.longitude.toFixed(5)}
                </Text>
                <Text style={styles.description}>{item.userName}</Text>
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
  container: {
    height: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
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
    backgroundColor: 'bisque',
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
export default NotificationsScreen;
