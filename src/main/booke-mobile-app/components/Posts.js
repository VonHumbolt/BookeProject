import { View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PostDetail from "./PostDetail";

const Posts = ({ posts, reader }) => {
  const navigation = useNavigation();
  return (
    <View className="bg-white">
      {posts?.map((post) => (
        <PostDetail
          key={post.postId}
          post={post}
          reader={reader}
          navigation={navigation}
        />
      ))}
    </View>
  );
};

export default Posts;
