import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      //  최신 상태가 아니라는 의미 (fresh -> 최신 상태, stale -> fresh X)
      // 데이터가 프레시한 상태에서 3초뒤에 스테일한 상태로 변경됨
      staleTime: 20 * 1000, // 20초
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
