import { StyleSheet, View } from 'react-native';
import { myProfile, friendProfiles } from "./src/data";
import Header from './src/Header';
import MyProfile from './src/MyProfile';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Division from './src/Division';
import Margin from './src/Margin';
import FriendSection from './src/FriendSection';

const statusBarHeight = getStatusBarHeight(true);

export default function App() {
  const onPressArrow = () => {
    console.log('clicked arrow');
  };

  return (
    <View style={styles.container}>
      <Header/>
      <View style={{ height: 10 }}/>
      <MyProfile
        uri={myProfile.uri}
        name={myProfile.name}
        introduction={myProfile.introduction}
      />
      <Margin height={15}/>
      <Division/>
      <FriendSection 
        friendProfileLen={friendProfiles.length}
        onPressArrow={onPressArrow}
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
