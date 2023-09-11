import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import {Localization} from '../../helpers';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

function NotificationsScreen({navigation}) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users
  const user = JSON.parse(useSelector(state => state?.userR?.userID));
  console.log('heo', user?.uid);
  useEffect(() => {
    const subscriber = firestore()
      .collection('UserMyPlaces')
      .where('userID', '==', user?.uid)
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
        console.log(users);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* <Button onPress={() => navigation.goBack()} title="Go back home" /> */}
      {/* <View style={styles.container}>
        <Text style={styles.text}>placeName </Text>
        <Text style={styles.text}>Latitude: </Text>
        <Text style={styles.text}>Longitude: </Text>
        <Text style={styles.text}>userId: </Text>
      </View> */}
      <View Style={{backgroundColor: 'red', flex: 1}}>
        <FlatList
          data={users}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.placeName}</Text>
              <Text style={styles.description}>
                Latitude: {item.latitude.toFixed(5)}
              </Text>
              <Text style={styles.description}>
                Longitude: {item.longitude.toFixed(5)}
              </Text>
              <Text style={styles.description}>{item.userName}</Text>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.add}
          onPress={() => navigation.navigate(Localization.t('home'))}>
          <Text style={styles.text}>{Localization.t('additem')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

styles = StyleSheet.create({
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
