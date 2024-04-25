import dayjs from "dayjs";

export const busStop = {
  id: 23284,
  name: '강남역12번출구',
  directionDescription: '강남역.강남역사거리',
  buses: [
    {
      num: 146,
      type: 'B',
      directionDescription: '강남역.강남역사거리',
      isBookmarked: false,
      nextBusInfos: [
        {
          arrivalTime: dayjs().add(8, 'minute'),
          numOfRemainedStops: 5,
          numOfPassengers: 3,
        }, 
        {
          arrivalTime: dayjs().add(21, 'minute').add(3, 'second'),
          numOfRemainedStops: 11,
          numOfPassengers: 5,
        }
      ]
    }
  ]
}