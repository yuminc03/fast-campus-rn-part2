import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { friendProfiles, myProfile } from "./src/data";
import Header from './src/Header';
import Profile from './src/Profile';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Division from './src/Division';
import Margin from './src/Margin';
import FriendSection from './src/FriendSection';
import FriendList from './src/FriendList';

const statusBarHeight = getStatusBarHeight(true);

export default function App() {
  const [ isOpened, setIsOpened ] = useState(true);
  const onPressArrow = () => {
    console.log('clicked arrow');
    setIsOpened(!isOpened);
  };

  return (
    <View style={styles.container}>
      <Header/>
      <Margin style={{ height: 10 }}/>
      <Profile
        uri={myProfile.uri}
        name={myProfile.name}
        introduction={myProfile.introduction}
      />
      <Margin height={15}/>
      <Division/>
      <Margin height={12}/>
      <FriendSection
        friendProfileLen={friendProfiles.length}
        onPressArrow={onPressArrow}
        isOpened={isOpened}
      />
      <FriendList data={friendProfiles} isOpened={isOpened}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: statusBarHeight,
    paddingHorizontal: 15,
  },
});
