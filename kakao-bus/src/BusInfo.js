import { View, Text } from "react-native"

import BookMarkButton from "./BookMarkButton";
import { COLOR } from "./color";
import AlarmButton from './AlarmButton';
import NextBusInfo from "./NextBusInfo";

export default ({
  isBookmarked, 
  onPressBookmark,
  num,
  directionDescription,
  numColor,
  processedNextBusInfos
}) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ 
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        {/* 북마크 */}
        <BookMarkButton 
          size={20}
          isBookmarked={isBookmarked} 
          onPress={onPressBookmark}
          style={{ paddingHorizontal: 10 }}
        />

        {/* 버스번호, 방향 */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: numColor, fontSize: 20 }}>{num}</Text>
          <Text style={{ fontSize: 13, color: COLOR.GRAY_3 }}>{directionDescription} 방향</Text>
        </View>
      </View>

      <View style={{ 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center'
      }}>
        {/* M분 S초 / N번째 전 / 여유 */}
        <View style={{ flex: 1 }}>
          {processedNextBusInfos.map((info, index) => (
            <NextBusInfo
              key={`next-bus-info${index}`}
              hasInfo={info.hasInfo}
              remainedTimeText={info.remainedTimeText}
              numOfRemainedStops={info.numOfRemainedStops}
              seatStatusText={info.seatStatusText}
            />
          ))}
        </View>
        
        {/* 알림아이콘 */}
        <AlarmButton onPress={() => {}} style={{ paddingHorizontal: 15 }}/>
      </View>
    </View>
  );
}