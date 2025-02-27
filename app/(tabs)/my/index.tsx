import { SafeAreaView, Text } from "react-native";
import AuthRoute from "@/components/AuthRoute";

// tabs/my
export default function MyScreen() {
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text>내 정보 스크린</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}
