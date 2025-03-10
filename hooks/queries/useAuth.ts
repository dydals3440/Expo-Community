import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, postLogin, postSignup } from "@/api/auth";
import { router } from "expo-router";
import {
  deleteSecureStore,
  getSecureStore,
  saveSecureStore,
} from "@/utils/secureStore";
import { removeHeader, setHeader } from "@/utils/header";
import queryClient from "@/api/queryClient";
import { useEffect } from "react";
import { queryKeys } from "@/constants";

function useGetMe() {
  const { data, isError, isSuccess } = useQuery({
    queryFn: getMe,
    queryKey: [queryKeys.AUTH, queryKeys.GET_ME],
  });

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        const accessToken = await getSecureStore("accessToken");
        setHeader("Authorization", `Bearer ${accessToken}`);
      }
    })();
  }, []);

  useEffect(() => {
    if (isError) {
      removeHeader("Authorization");
      deleteSecureStore("accessToken");
    }
  }, [isError]);

  return { data };
}

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setHeader("Authorization", `Bearer ${accessToken}`);
      await saveSecureStore("accessToken", accessToken);
      console.log(accessToken);
      // 내 정보를 가져오는 훅을 호출
      queryClient.fetchQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ME],
      });
      router.replace("/");
    },
    onError: () => {
      //
    },
  });
}

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => router.replace("/auth/login"),
    onError: () => {},
  });
}

function useAuth() {
  const { data } = useGetMe();
  const loginMutation = useLogin();
  const signupMutation = useSignup();

  const logout = () => {
    removeHeader("Authorization");
    deleteSecureStore("accessToken");
    queryClient.resetQueries({
      queryKey: [queryKeys.AUTH],
    });
  };

  return {
    auth: {
      id: data?.id || "",
      nickname: data?.nickname || "",
    },
    loginMutation,
    signupMutation,
    logout,
  };
}

export default useAuth;
