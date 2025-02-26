import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FeedItem from '@/components/FeedItem';
import { colors } from '@/constants';
import { Post } from '@/types';

const dummyData = [
  {
    id: 1,
    userId: 1,
    title: '더미 제목입니다.',
    description:
      '더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다.  더미 내용입니다.더미 내용입니다.  더미 내용입니다. 더미 내용입니다.',
    createdAt: '2025-01-01',
    author: {
      id: 1,
      nickname: '닉네임',
      imageUri: '',
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
  ,
  {
    id: 2,
    userId: 1,
    title: '더미 제목입니다.',
    description:
      '더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다. 더미 내용입니다.  더미 내용입니다.더미 내용입니다.  더미 내용입니다. 더미 내용입니다.',
    createdAt: '2025-01-01',
    author: {
      id: 1,
      nickname: '닉네임',
      imageUri: '',
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 1,
    commentCount: 1,
    viewCount: 1,
  },
];

const FeedList = () => {
  return (
    <FlatList
      data={dummyData.filter((item) => item !== undefined)}
      keyExtractor={(item) => String(item?.id)}
      renderItem={({ item }) => <FeedItem post={item as Post} />}
      contentContainerStyle={styles.contentContainer}
    />
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
