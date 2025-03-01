import { colors } from "@/constants";
import { Pressable, SafeAreaView, StyleSheet } from "react-native";
import useAuth from "@/hooks/queries/useAuth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Colors } from "react-native/Libraries/NewAppScreen";
import FeedList from "@/components/FeedList";

export default function HomeScreen() {
  const { auth } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
      {auth.id && (
        <Pressable
          style={styles.writeButton}
          onPress={() => router.push("/post/write")}
        >
          <Ionicons name="pencil" size={32} color={colors.WHITE} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  writeButton: {
    position: "absolute",
    bottom: 16,
    right: 1,
    backgroundColor: colors.ORANGE_600,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0, // 그림자 넓이
      height: 2, // 그림자 높이 아래에만 살짝
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    elevation: 2,
  },
});
