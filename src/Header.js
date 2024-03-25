import { View, Text, StyleSheet } from "react-native"

  return (
    <View>
      <Text>친구</Text>

export default () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>친구</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',

  },
})