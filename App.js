import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { friendProfiles, myProfile } from "./src/data";
import Header from './src/Header';
import Profile from './src/Profile';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Division from './src/Division';
import Margin from './src/Margin';
import FriendSection from './src/FriendSection';
import FriendList from './src/FriendList';
import TabBar from './src/TabBar';

const statusBarHeight = getStatusBarHeight(true);

export default function App() {
  const [ isOpened, setIsOpened ] = useState(true);
  const [ selectedTabIndex, setSelectedTabIndex ] = useState(0);
  const ItemSeparatorComponent = () => <Margin height={13}/>;
  const renderItem = ({ item }) => (
    <View>
      <Profile
        uri={item.uri}
        name={item.name}
        introduction={item.introduction}
        isMe={false}
      />
    </View>
  );
  const ListHeaderComponent = () => (
    <View style={{ backgroundColor: 'white' }}>
      <Header/>
      <Margin style={{ height: 10 }}/>
      <Profile
        uri={myProfile.uri}
        name={myProfile.name}
        introduction={myProfile.introduction}
        isMe={true}
      />
      <Margin height={15}/>
      <Division/>
      <Margin height={12}/>
      <FriendSection
        friendProfileLen={friendProfiles.length}
        onPressArrow={onPressArrow}
        isOpened={isOpened}
      />
      <Margin height={5}/>
    </View>
  );
  const ListFooterComponent = () => null;
  
  const onPressArrow = () => {
    // console.log('clicked arrow');
    setIsOpened(!isOpened);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={['top', 'right', 'bottom', 'left']} // 예외없이 모두 안전영역 적용
      >
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 15 }}
          data={isOpened ? friendProfiles : []}
          keyExtractor={(_, index) => index}
          stickyHeaderIndices={[0]}
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          showsVerticalScrollIndicator={false}
        />
        <TabBar
          selectedTabIndex={selectedTabIndex}
          setSelectedTabIndex={setSelectedTabIndex}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );

  return (
    <View style={styles.container}>
      <View style={{
          flex: 1,
          paddingHorizontal: 15,
      }}>
        <FriendList data={friendProfiles} isOpened={isOpened} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
