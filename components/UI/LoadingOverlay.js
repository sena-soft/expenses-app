import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/style";

function LoadingOverlay({message}) {
  return <View style={styles.container}>
    <ActivityIndicator size="large" color="white" />
    { message && <Text> {message} </Text> }
  </View>
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
});