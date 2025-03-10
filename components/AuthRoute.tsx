import useAuth from '@/hooks/queries/useAuth';
import { router, useFocusEffect } from 'expo-router';
import { PropsWithChildren } from 'react';

export default function AuthRoute({ children }: PropsWithChildren) {
  const { auth } = useAuth();

  useFocusEffect(() => {
    !auth.id && router.replace('/auth');
  });

  return <>{children}</>;
}
