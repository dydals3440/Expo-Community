import { Link, router, Stack } from "expo-router";
import { colors } from "@/constants";
import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="write"
        options={{
          title: "글쓰기",
          headerShown: true,
          headerLeft: () => (
            // 이동할 떄 스크린 쌓는게 아닌, 대체되도록
            <Link href="/" replace>
              <Feather name="arrow-left" size={28} color="black" />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            // 이동할 떄 스크린 쌓는게 아닌, 대체되도록
            <Pressable
              onPress={() =>
                router.canGoBack() ? router.back() : router.replace("/")
              }
            >
              <Feather name="arrow-left" size={28} color="black" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="update/[id]"
        options={{
          title: "수정",
          headerShown: true,
          headerLeft: () => (
            // 이동할 떄 스크린 쌓는게 아닌, 대체되도록
            <Feather
              name="arrow-left"
              size={28}
              color="black"
              onPress={() => router.back()}
            />
          ),
        }}
      />
    </Stack>
  );
}
