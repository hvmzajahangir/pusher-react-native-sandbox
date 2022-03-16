import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import Pusher from "pusher-js/react-native";
import chatApi from "../services/chatApi";

export default function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    chatApi
      .get("/message/sync")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(messages);

  useEffect(() => {
    const pusher = new Pusher("10b8f07c1a28d2afe9d3", {
      cluster: "eu",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      console.log(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
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

registerRootComponent(App);
