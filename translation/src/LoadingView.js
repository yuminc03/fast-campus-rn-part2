import { View } from "react-native";
import LottieView from 'lottie-react-native';
// import { useEffect, useRef } from "react";

export default () => {
  // const ref = useRef(null);

  // useEffect(() => {
  //   setTimeout(() => {
  //     ref.current?.play();
  //   }, 2000);
  // }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LottieView
        autoPlay
        style={{ width: 150, height: 150 }}
        source={require('../assets/loading.json')} // https://lottiefiles.com/animations/loading-spinner-dots-d1QHolDFMF?from=search 
      />
    </View>
  );
}