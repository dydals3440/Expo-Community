import { Link, Stack } from 'expo-router';
import Foundation from '@expo/vector-icons/Foundation';
import { colors } from '@/constants';

export default function AuthLayout() {
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
        name='index'
        options={{
          title: '로그인',
          headerShown: true,
          headerLeft: () => (
            // 이동할 떄 스크린 쌓는게 아닌, 대체되도록
            <Link href='/' replace style={{ paddingRight: 10 }}>
              <Foundation name='home' size={28} color='black' />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name='login'
        options={{
          title: '이메일 로그인',
          headerShown: true,
          //  < 로그인 (이전 스크린 이름 지우기)
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
      <Stack.Screen
        name='signup'
        options={{
          title: '회원가입',
          headerShown: true,
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack>
  );
}
