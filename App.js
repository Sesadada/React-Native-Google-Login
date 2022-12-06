import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
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
    }
  }, []);

  const fectUserInfo = async () => {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = await response.json();
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
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
