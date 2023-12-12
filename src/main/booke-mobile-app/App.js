import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import EntryScreen from "./screens/EntryScreen";
import BookDetailScreen from "./screens/BookDetailScreen";
import ReviewModal from "./components/ReviewModal";
import TabNavigationMainScreen from "./screens/TabNavigationMainScreen";
import SearchUserScreen from "./screens/SearchUserScreen";
import ReaderProfileScreen from "./screens/ReaderProfileScreen";
import FriendsScreen from "./screens/FriendsScreen";
import BookScreen from "./screens/BookScreen";
import CommentScreen from "./screens/CommentScreen";
import StartChallengeModal from "./components/StartChallengeModal";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Entry"
          component={EntryScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="TabNavigation"
          component={TabNavigationMainScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="BookDetail"
          component={BookDetailScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: "modal",
          }}
          name="Review"
          component={ReviewModal}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: "transparentModal",
          }}
          name="StartChallenge"
          component={StartChallengeModal}
        />
        <Stack.Screen
          options={{
            title: "Find New Users",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#E07A5F",
            },
          }}
          name="SearchUser"
          component={SearchUserScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ReaderProfile"
          component={ReaderProfileScreen}
        />
        <Stack.Screen
          options={({ route }) => ({
            title: route.params.name,
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#E07A5F",
            },
          })}
          name="Friends"
          component={FriendsScreen}
        />
        <Stack.Screen
          options={({ route }) => ({
            title: route.params.name,
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#E07A5F",
            },
          })}
          name="Book"
          component={BookScreen}
        />
        <Stack.Screen
          options={{
            title: "Comments",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#E07A5F",
            },
          }}
          name="Comment"
          component={CommentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
