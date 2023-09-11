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

function NotificationsScreen({navigation}) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users

  useEffect(() => {
    const subscriber = firestore()
      .collection('UserMyPlaces')
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
      <View style={styles.container}>
        <Text style={styles.text}>placeName </Text>
        <Text style={styles.text}>Latitude: </Text>
        <Text style={styles.text}>Longitude: </Text>
        <Text style={styles.text}>userId: </Text>
      </View>
      <View Style={{backgroundColor: 'red', flex: 1}}>
        <FlatList
          data={users}
          renderItem={({item}) => (
            <View style={styles.container}>
              <Text style={styles.text}>placeName: {item.name}</Text>
              <Text style={styles.text}>Latitude: {item.latitude}</Text>
              <Text style={styles.text}>Longitude: {item.longitude}</Text>
              <Text style={styles.text}>userId: {item.name}</Text>
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
  },
});
export default NotificationsScreen;
