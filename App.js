import { StyleSheet, View } from 'react-native';
import { myProfile } from "./src/data";
import Header from './src/Header';
import MyProfile from './src/MyProfile';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const statusBarHeight = getStatusBarHeight(true);

export default function App() {
  return (
    <View style={styles.container}>
      <Header/>
      <View style={{ height: 10 }}/>
      <MyProfile
        uri={myProfile.uri}
        name={myProfile.name}
        introduction={myProfile.introduction}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: statusBarHeight,
  },
});
