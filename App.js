import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";

//ClientIds sacadas de google cloud
//web: 1016554042795-fair6q1jnob9plj6s2589pqd87r8midd.apps.googleusercontent.com
// ios: 1016554042795-jr4njnmio8ckejd757rea4ithld00gmq.apps.googleusercontent.com
// android: 1016554042795-3edh0d6n5ahifelg8e3re9ghhks2eaf1.apps.googleusercontent.com

WebBrowser.maybeCompleteAuthSession();
export default function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [user, SetUser] = useState(null);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "1016554042795-fair6q1jnob9plj6s2589pqd87r8midd.apps.googleusercontent.com", // web
    iosClientId:
      "1016554042795-jr4njnmio8ckejd757rea4ithld00gmq.apps.googleusercontent.com", //ios
    androidClientId:
      "1016554042795-3edh0d6n5ahifelg8e3re9ghhks2eaf1.apps.googleusercontent.com", //android
  });

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken]);

  const fetchUserInfo = async () => {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = await response.json();
    SetUser(userInfo);
  };

  const UserComp = () => {
    if (user) {
      return (
        <View
          style={{
            backgroundColor: "pink",
            height: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: user.picture }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          ></Image>
          <Text>{user.name}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }}>Welcome!</Text>
      {user && <UserComp />}
      {user === null && (
        <TouchableOpacity
          disabled={!request}
          onPress={() => promptAsync()}
          style={{
            backgroundColor: "pink",
            height: 40,
            width: "80%",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text style={{ justifyContent: "center", alignItems: "center" }}>
            Login
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
