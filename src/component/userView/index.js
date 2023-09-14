import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import {Localization} from '../../helpers';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

function UserView({navigation}) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users
  const user = JSON.parse(useSelector(state => state?.userR?.userID));
  console.log('heo', user?.uid);
  useEffect(() => {
    const subscriber = firestore()
      .collection('UserMyPlaces')
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
        console.log(userID);
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
              <TouchableOpacity
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  navigation.navigate(Localization.t('FavoritePlaces'), {
                    Item: item,
                    otherParam: 'anything you want here',
                  });
                }}>
                <Text style={styles.title}>{item.userId}</Text>
                <Text style={styles.title}>{item.userName}</Text>
                {/* <Text style={styles.description}>
                Latitude: {item.latitude.toFixed(5)}
              </Text>
              <Text style={styles.description}>
                Longitude: {item.longitude.toFixed(5)}
              </Text>
              <Text style={styles.description}>{item.userName}</Text> */}
              </TouchableOpacity>
            </View>
          )}
        />
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
export default UserView;
