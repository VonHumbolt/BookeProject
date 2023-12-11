import { ActivityIndicator, FlatList, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import PostDetail from "./PostDetail";
import PostService from "../services/PostService";

const Posts = ({ postsData, reader }) => {
  const navigation = useNavigation();
  const postService = new PostService();

  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [stopGetData, setStopGetData] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getUserFollowsPost = () => {
    if (!stopGetData)
      postService
        .getUserFollowsPost(reader?.userId, pageNo + 5, pageSize + 5)
        .then((response) => {
          if (response.data.success) {
            if (response.data.data.length == 0) {
              setStopGetData(true);
              return;
            }
            if (posts.length == 0) {
              setPosts([...postsData, ...response.data.data]);
            } else {
              setPosts([...posts, ...response.data.data]);
            }
            setPageNo(pageNo + 5);
            setPageSize(pageSize + 5);
          }
        });
  };

  const handleRefresh = () => {
    setStopGetData(false);
    setIsRefreshing(true);
    postService.getUserFollowsPost(reader?.userId, 0, 5).then((response) => {
      if (response.data.success) {
        setPosts(response.data.data);
        setPageNo(0);
        setPageSize(5);
        setIsRefreshing(false);
      }
    });
  };

  return (
    <FlatList
      className="bg-gray-100 mb-28"
      data={posts.length > 0 ? posts : postsData}
      keyExtractor={(item) => item.postId}
      onRefresh={handleRefresh}
      refreshing={isRefreshing}
      renderItem={({ item, index }) => (
        <View className="bg-white">
          <PostDetail
            key={item.postId}
            post={item}
            reader={reader}
            navigation={navigation}
          />
        </View>
      )}
      onEndReached={() => getUserFollowsPost()}
      onEndReachedThreshold={0.01}
      ListFooterComponent={() =>
        !stopGetData && (
          <ActivityIndicator className="mt-3" size="large" color="#81B29A" />
        )
      }
    />
  );
};

export default Posts;
