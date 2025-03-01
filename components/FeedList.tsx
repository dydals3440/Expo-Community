import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import FeedItem from "@/components/FeedItem";
import { colors } from "@/constants";
import { Post } from "@/types";
import useGetInfinitePosts from "@/hooks/queries/useGetInfinitePosts";
import { useScrollToTop } from "@react-navigation/native";

const FeedList = () => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfinitePosts();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const ref = useRef<FlatList | null>(null);
  // 홈 클릭시 위로
  useScrollToTop(ref);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <>
      <FlatList
        ref={ref}
        data={posts?.pages?.flat()}
        keyExtractor={(item) => String(item?.id)}
        renderItem={({ item }) => <FeedItem post={item as Post} />}
        contentContainerStyle={styles.contentContainer}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </>
  );
};

export default FeedList;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});
