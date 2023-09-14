import {SafeAreaView, StyleSheet, View} from 'react-native';

const Userprofile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.div}></View>
      <View style={styles.div}></View>
    </SafeAreaView>
  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  div: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
});

export default Userprofile;
