import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/api/post";
import { queryKeys } from "@/constants";

function useGetPost(id: number) {
  return useQuery({
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    queryFn: () => getPost(Number(id)),
    // id가 존재할떄만 가져옴
    enabled: Boolean(id),
  });
}

export default useGetPost;
