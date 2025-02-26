import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView, Text } from 'react-native';

// tabs/my
export default function MyScreen() {
  // 화면이 포커스 됐을 떄 작업 가능
  useFocusEffect(() => {
    // 로그인이 됐을 떄만 가는 코드로 변경 가능 isLoggedIn ? router.replace('auth') : router.replace('my')
    router.replace('/auth');
  });

  return (
    <SafeAreaView>
      <Text>내 정보 스크린</Text>
    </SafeAreaView>
  );
}
