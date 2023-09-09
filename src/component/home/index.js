import {View, Button} from 'react-native';
import {Localization} from '../../helpers';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate(Localization.t('myplace'))}
        title="Go to notifications"
      />
    </View>
  );
}

export default HomeScreen;
