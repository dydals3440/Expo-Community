import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, postLogin, postSignup } from "@/api/auth";
import { router } from "expo-router";
import { deleteSecureStore, saveSecureStore } from "@/utils/secureStore";
import { removeHeader, setHeader } from "@/utils/header";
import queryClient from "@/api/queryClient";
import { useEffect } from "react";

function useGetMe() {
  const { data, isError } = useQuery({
    queryFn: getMe,
    queryKey: ["auth", "getMe"],
  });

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
      // 내 정보를 가져오는 훅을 호출
      queryClient.fetchQuery({
        queryKey: ["auth", "getMe"],
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
    queryClient.resetQueries({ queryKey: ["auth"] });
  };

  return {
    auth: {
      id: data?.id || "",
    },
    loginMutation,
    signupMutation,
    logout,
  };
}

export default useAuth;
