import {View, Text, Button} from 'react-native';

import React, {useState, useEffect} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';

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
      <Button onPress={() => navigation.goBack()} title="Go back home" />
      <View Style={{backgroundColor: 'red', flex: 1}}>
        <FlatList
          data={users}
          renderItem={({item}) => (
            <View
              style={{
                height: 50,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Text style={{color: 'black'}}>key: {item.key}</Text>
              <Text style={{color: 'black'}}>Latitude: {item.latitude}</Text>
              <Text style={{color: 'black'}}>Longitude: {item.longitude}</Text>
              <Text style={{color: 'black'}}>placeName: {item.name}</Text>
              <Text style={{color: 'black'}}>userId: {item.name}</Text>
              <Text style={{color: 'black'}}>userName: {item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
export default NotificationsScreen;
