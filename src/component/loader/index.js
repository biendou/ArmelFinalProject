import {SafeAreaView} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {View, Image, StyleSheet} from 'react-native';

const Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require('./image.png')} />
    </SafeAreaView>
  ); // <ActivityIndicator size="large" color="#00ff00" />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#9BC1BC',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
});
export default Loading;
