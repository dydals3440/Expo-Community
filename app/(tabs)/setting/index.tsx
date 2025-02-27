import { SafeAreaView, Text } from "react-native";
import AuthRoute from "@/components/AuthRoute";
import useAuth from "@/hooks/queries/useAuth";

// tabs/setting
export default function SettingsScreen() {
  const { logout } = useAuth();
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text onPress={logout}>로그아웃</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}
