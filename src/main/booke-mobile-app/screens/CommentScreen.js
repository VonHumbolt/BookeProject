import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  StarIcon,
  HandThumbUpIcon as SolidTumbsUp,
} from "react-native-heroicons/solid";
import {
  ChatBubbleBottomCenterTextIcon,
  HandThumbUpIcon,
} from "react-native-heroicons/outline";
import PostService from "../services/PostService";
import convertDate from "../utils/dateConverter/convertDate";

const CommentScreen = ({ route }) => {
  const { post, readerId, readerName, isLiked } = route.params;
  const postService = new PostService();
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [commentIsLiked, setCommentIsLiked] = useState("");
  const [likeCount, setLikeCount] = useState(post?.likeCount);

  useEffect(() => {
    setComments(post?.comments);
    setCommentIsLiked(isLiked);
  }, []);

  const addComment = () => {
    if (message.trim().length > 0) {
      const comment = {
        message: message,
        commentOwnerName: readerName,
      };
      postService.addCommentToPost(post.postId, comment).then((res) => {
        if (res.data.success) {
          setComments([...comments, res.data.data]);
          setMessage("");
        }
      });
    }
  };

  const likeOrUnlikePost = () => {
    if (commentIsLiked) {
      postService.unlikePost(readerId, post.postId).then((res) => {
        if (res.data.success) {
          setCommentIsLiked(false);
          setLikeCount(likeCount - 1);
        }
      });
    } else {
      postService.likePost(readerId, post.postId).then((res) => {
        if (res.data.success) {
          setCommentIsLiked(true);
          setLikeCount(likeCount + 1);
        }
      });
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <View className="py-5 px-6 border-b border-[#3D405B]/20 bg-white shadow-md">
        <Text className="text-xs text-right text-gray-500">
          {convertDate(post?.publishedDate)}
        </Text>
        <View className="flex-row items-center">
          {/* <View className="border-2 border-[#C44536] w-12 h-12 rounded-full p-1"> */}
            <Image
              source={{ uri: post?.profilePictureUrl }}
              className="w-9 h-9 rounded-full"
            />
          {/* </View> */}
          <View className="flex-row items-center space-x-2 px-3 ">
            <Text className="text-base font-medium">
              {post?.fullName}{" "}
              <Text className="font-normal">{post?.activity}</Text>{" "}
              <Text>{post?.bookName}</Text>
            </Text>
          </View>
        </View>
        <View className="flex-row mt-4 px-6 space-x-6">
          <Image
            source={{ uri: post?.bookImageUrl }}
            className="w-24 h-40 rounded-md"
          />
          <View className="mt-2 pr-3">
            <Text className="text-lg font-semibold mr-10">{post?.bookName}</Text>
            <Text className="text-base">{post?.authorName}</Text>
            <View className="flex-row items-center space-x-1 mt-2">
              <StarIcon size={20} color="#E07A5F" />
              <Text className="text-base">{post?.meanOfRating}</Text>
            </View>
            <View className="my-3 w-52 border border-gray-500/20" />

            <View className="flex-row space-x-4 justify-center mt-2 items-center mr-8">
              <View>
                <TouchableOpacity
                  className="flex-row items-center space-x-1"
                  onPress={likeOrUnlikePost}
                >
                  {commentIsLiked ? (
                    <SolidTumbsUp size={24} color="#81B29A" />
                  ) : (
                    <HandThumbUpIcon size={24} color="#3D405B" />
                  )}
                  <Text className="text-center text-[#3D405B]">
                    {likeCount}
                  </Text>
                  <Text className="text-base text-[#3D405B]">Like</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row items-center space-x-1">
                <ChatBubbleBottomCenterTextIcon size={24} color="#3D405B" />
                <Text className="text-center text-[#3D405B]">
                  {post?.comments?.length} Comments
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* Comments */}
      <ScrollView className="pt-4 mb-3">
        {comments.length == 0 ? (
          <View>
            <Text className="text-lg text-center text-gray-500">
              There is no comment
            </Text>
            <Text className="text-lg text-center text-gray-500">
              Write first comment
            </Text>
          </View>
        ) : (
          comments.map((comment) => (
            <View key={comment?.commentId} className="px-5 py-3">
              {/* User and star */}
              <View className="flex-row items-center justify-between">
                <Text className="text-[#3D405B] font-semibold">
                  {comment?.commentOwnerName}
                </Text>
                <Text className="text-xs text-gray-500">
                  {convertDate(comment?.publishedDate)}
                </Text>
              </View>

              <Text className="my-3 px-4 text-[#3D405B] text-base">
                {comment?.message}
              </Text>

              <View className="w-full mt-3 mx-auto border border-[#DBDBDB]/30" />
            </View>
          ))
        )}
      </ScrollView>
      <View className="flex-row items-center space-x-1 px-4 mb-8">
          <View className="flex-1">
              <TextInput
                className="px-2 text-base border flex-1 rounded-lg"
                placeholder="Write Comment"
                value={message}
                autoFocus={true}
                onChangeText={(text) => setMessage(text)}
              />
          </View>
          <TouchableOpacity
            className="bg-[#81B29A] p-2 rounded-md"
            onPress={() => addComment()}
          >
            <Text className="text-white font-semibold">Comment</Text>
          </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  );
};

export default CommentScreen;
