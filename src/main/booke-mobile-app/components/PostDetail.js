import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  ChatBubbleBottomCenterTextIcon,
  HandThumbUpIcon,
} from "react-native-heroicons/outline";
import {
  StarIcon,
  HandThumbUpIcon as SolidTumbsUp,
} from "react-native-heroicons/solid";
import PostService from "../services/PostService";
import convertDate from "../utils/dateConverter/convertDate";

const PostDetail = ({ post, reader, navigation }) => {
  const postService = new PostService();
  const [postIsLiked, setPostIsLiked] = useState(true);
  const [likeCount, setLikeCount] = useState(post?.likeCount);

  const unlikePost = () => {
    postService.unlikePost(reader.userId, post.postId).then((res) => {
      if (res.data.success) {
        setPostIsLiked(false);
        setLikeCount(likeCount - 1);
      }
    });
  };
  const likePost = () => {
    postService.likePost(reader.userId, post.postId).then((res) => {
      if (res.data.success) {
        setPostIsLiked(true);
        setLikeCount(likeCount + 1);
      }
    });
  };
  return (
    <View className="py-5 px-6 border-b border-[#3D405B]/10">
      {/* <View className="absolute left-5 top-4 z-20 border-2 border-[#C44536] rounded-full h-[48px] w-[48px]" /> */}
      <Text className="text-xs text-right text-gray-500">
        {convertDate(post?.publishedDate)}
      </Text>
      <View className="flex-row items-center">
        {/* <View className="border border-[#C44536] w-12 h-12 rounded-full p-[5px]"> */}
          <Image
            source={{ uri: post?.profilePictureUrl }}
            className="w-9 h-9 rounded-full"
          />
        {/* </View> */}
        <View className="flex-1 px-3">
          <Text className="text-base font-medium">
            {post?.fullName}{" "}
            <Text className="font-normal">{post?.activity}</Text>{" "}
            <Text>{post?.bookName}</Text>
          </Text>
        </View>
      </View>
      <View className="flex-row mt-4 px-4 space-x-6 ">
        <Image
          source={{ uri: post?.bookImageUrl }}
          className="w-24 h-40 rounded-md"
        />
        <View className="mt-2 pr-2">
          <Text className="text-lg font-semibold w-60">{post?.bookName}</Text>
          <Text className="text-base">{post?.authorName}</Text>
          <View className="flex-row items-center space-x-1 mt-2">
            <StarIcon size={20} color="#E07A5F" />
            <Text className="text-base">{post?.meanOfRating}</Text>
          </View>
          <View className="my-3 w-52 border border-gray-500/20" />

          <View className="flex-row space-x-4 justify-center items-center mt-2 mr-8">
            <View>
              <TouchableOpacity className="flex-row items-center space-x-1">
                {postIsLiked &&
                post?.usersWhoLikePost?.includes(reader?.userId) ? (
                  <SolidTumbsUp
                    size={24}
                    color="#81B29A"
                    onPress={() => unlikePost()}
                  />
                ) : (
                  <HandThumbUpIcon
                    size={24}
                    color="#3D405B"
                    onPress={() => likePost()}
                  />
                )}
                <Text className="text-center text-[#3D405B]">{likeCount}</Text>
                <Text className="text-[#3D405B]">Like</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                className="flex-row items-center space-x-1"
                onPress={() =>
                  navigation.navigate("Comment", {
                    post: post,
                    readerId: reader?.userId,
                    readerName: reader?.fullName,
                    isLiked: post?.usersWhoLikePost?.includes(reader?.userId),
                  })
                }
              >
                <ChatBubbleBottomCenterTextIcon size={24} color="#3D405B" />
                <Text className="text-center text-[#3D405B]">
                  {post?.comments?.length}{" "}
                </Text>
                <Text className="text-[#3D405B]">Comments</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostDetail;
