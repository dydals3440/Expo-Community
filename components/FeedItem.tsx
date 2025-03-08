import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/constants";
import { Octicons, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Post } from "@/types";
import Profile from "@/components/Profile";
import useAuth from "@/hooks/queries/useAuth";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { useActionSheet } from "@expo/react-native-action-sheet";
import useDeletePost from "@/hooks/queries/useDeletePost";
import { router } from "expo-router";

interface FeedItemProps {
  post: Post;
  isDetail?: boolean;
}

const FeedItem = ({ post, isDetail }: FeedItemProps) => {
  const { auth } = useAuth();
  const likeUsers = post.likes.map((like) => Number(like.userId));
  const isLiked = likeUsers.includes(Number(auth?.id));
  const { showActionSheetWithOptions } = useActionSheet();
  const deletePost = useDeletePost();

  const handlePressOption = () => {
    const options = ["삭제", "수정", "취소"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            deletePost.mutate(post.id);
            break;
          case 1:
            router.push(`/post/update/${post.id}`);
            break;
          case cancelButtonIndex:
            break;
          default:
            break;
        }
      },
    );
  };

  const handlePressFeed = () => {
    if (!isDetail) {
      router.push(`/post/${post.id}`);
    }
  };

  const ContainerComponent = isDetail ? View : Pressable;

  return (
    <ContainerComponent style={styles.container} onPress={handlePressFeed}>
      <View style={styles.contentContainer}>
        <Profile
          imageUri={post.author.imageUri}
          nickname={post.author.nickname}
          createdAt={post.createdAt}
          onPress={() => {}}
          option={
            auth.id === post.author.id && (
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color={colors.BLACK}
                onPress={handlePressOption}
              />
            )
          }
        />
        <Text style={styles.title}>{post?.title}</Text>
        <Text numberOfLines={3} style={styles?.description}>
          {post.description}
        </Text>
      </View>
      <View style={styles.menuContainer}>
        <Pressable style={styles.menu}>
          <Octicons
            name={isLiked ? "heart-fill" : "heart"}
            size={16}
            color={isLiked ? colors.ORANGE_600 : colors.BLACK}
          />
          <Text style={isLiked ? styles.activeMenuText : styles.menu}>
            {post.likes.length || "좋아요"}
          </Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <MaterialCommunityIcons
            name="comment-processing-outline"
            size={16}
            color={colors.BLACK}
          />
          <Text style={isLiked ? styles.activeMenuText : styles.menu}>
            {post.commentCount || "댓글"}
          </Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <Ionicons name="eye-outline" size={16} color={colors.BLACK} />
          <Text style={isLiked ? styles.activeMenuText : styles.menu}>
            {post.viewCount || "조회수"}
          </Text>
        </Pressable>
      </View>
    </ContainerComponent>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    color: colors.BLACK,
    fontWeight: "600",
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: colors.BLACK,
    marginBottom: 14,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopColor: colors.GRAY_300,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    width: 33,
    gap: 4,
  },
  menuText: {
    fontSize: 14,
    color: colors.GRAY_700,
  },
  activeMenuText: {
    fontWeight: "500",
    color: colors.ORANGE_600,
  },
});
