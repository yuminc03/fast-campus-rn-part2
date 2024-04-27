import { RefreshControl, SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';

import { busStop, getBusNumColorByType, getSections, getRemainedTimeText, getSeatStatusText } from './src/data';
import { COLOR } from './src/color';
import BusInfo from './src/BusInfo';
import Margin from './src/Margin';
import BookMarkButton from './src/BookMarkButton';
import { useTheme } from './src/use-theme';

const busStopBootmarkSize = 20;
const busStopBootmarkPadding = 6;

export default function App() {
  const sections = getSections(busStop.buses);
  const [now, setNow] = useState(dayjs());
  const [refreshing, setRefreshing] = useState(false);

  const { isDark, NEWCOLOR, toggleIsDark } = useTheme();

  const onPresssBusStopBookmark = () => {
    // TODO
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newNow = dayjs();
      setNow(newNow);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (refreshing) {
      setRefreshing(false);
      // setTimeout(() => {
      //   // API refretch 완료
      //   setRefreshing(false);
      // }, 3000);
    }
  }, [refreshing]);

  const ListHeaderComponent = () => (
    <View style={{ 
      backgroundColor: COLOR.GRAY_3,
      height: 170,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* 정류소 번호, 이름, 방향 */}
      <Margin height={10}/>
        <Text style={{ color: NEWCOLOR.WHITE_BLACK, fontSize: 13 }}>{busStop.id}</Text>
        <Margin height={4}/>
        <Text style={{ color: NEWCOLOR.WHITE_BLACK, fontSize: 20 }}>{busStop.name}</Text>
        <Margin height={4}/>
        <Text style={{ color: NEWCOLOR.GRAY_1_GRAY_2, fontSize: 14 }}>{busStop.directionDescription}</Text>
        <Margin height={20}/>
        {/* 북마크 */}
        <BookMarkButton
          NEWCOLOR={NEWCOLOR}
          size={busStopBootmarkSize}
          isBookmarked={busStop.isBookmarked}
          onPress={onPresssBusStopBookmark}
          style={{ 
            borderTopWidth: 0.3, 
            borderTopColor: COLOR.GRAY_3, 
            borderRadius: (busStopBootmarkSize + (busStopBootmarkPadding * 2)) / 2, // 25 + 5 + 5
            padding: busStopBootmarkPadding
          }}
        />
        <Switch
          value={isDark} 
          onValueChange={() => {
            toggleIsDark();
          }}
        />
    </View>
  );
  const renderSectionHeader = ({ section: { title } }) => (
    <View style={{ 
      paddingLeft: 13, 
      paddingVertical: 3, 
      backgroundColor: NEWCOLOR.GRAY_1_GRAY_4,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: NEWCOLOR.GRAY_2_GRAY_3,
      borderBottomColor: NEWCOLOR.GRAY_2_GRAY_3
    }}>
      <Text style={{ fontSize: 12, color: NEWCOLOR.GRAY_4_GRAY_1 }}>{title}</Text>
    </View>
  );
  const renderItem = ({ item: bus }) => {
    const numColor = getBusNumColorByType(bus.type);

    /**
     * Start
     */
    // undefined ?? null -> null 
    // { ... } ?? null -> { ... }
    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null; 
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos =
      !firstNextBusInfo && !secondNextBusInfo
        ? [null]
        : [firstNextBusInfo, secondNextBusInfo];

    // if (bus.num === 2000) {
    //   console.log(bus.num, 'newNextBusInfos', newNextBusInfos); // TODO: 확인
    // }

    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if (!info)
        return {
          hasInfo: false,
          remainedTimeText: "도착 정보 없음",
        };

      const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
      const remainedTimeText = getRemainedTimeText(now, arrivalTime);
      const seatStatusText = getSeatStatusText(bus.type, numOfPassengers);
      return {
        hasInfo: true,
        remainedTimeText,
        numOfRemainedStops,
        seatStatusText,
      };
    });
    /**
     * End
     */
    return (
      <BusInfo
        NEWCOLOR={NEWCOLOR}
        isBookmarked={bus.isBookmarked}
        onPressBookmark={() => {}} // TODO
        num={bus.num}
        directionDescription={bus.directionDescription}
        numColor={numColor}
        processedNextBusInfos={processedNextBusInfos}
      />
    );
  };
  const ItemSeparatorComponent = () => (
    <View style={{ width: '100%', height: 1, backgroundColor: NEWCOLOR.GRAY_1_GRAY_4 }}/>
  )
  const ListFooterComponent = () => (
    <Margin height={30}/>
  );
  const onRefresh = () => {
    setRefreshing(true);
  };

  return (
    <View style={{
      ... styles.container,
      backgroundColor: NEWCOLOR.WHITE_BLACK
    }}>
      {/* 뒤로 가기 & 홈 아이콘 */}
      <View style={{ backgroundColor: NEWCOLOR.GRAY_3_GRAY_2, width: '100%' }}>
        <SafeAreaView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ padding: 10 }}>
              <SimpleLineIcons name="arrow-left" size={20} color={NEWCOLOR.WHITE_BLACK}/>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10 }}>
              <SimpleLineIcons name="home" size={20} color={NEWCOLOR.WHITE_BLACK}/>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View style={{ 
          position: 'absolute', 
          width: '100%', 
          height: 500, 
          backgroundColor: COLOR.GRAY_3,
          zIndex: -1,
        }}/>
      </View>
     
      <SectionList
        style={{ flex: 1, width: '100%' }}
        sections={sections}
        ListHeaderComponent={ListHeaderComponent}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
