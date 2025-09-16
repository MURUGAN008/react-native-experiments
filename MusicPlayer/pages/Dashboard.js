import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useAudioPlayer } from "expo-audio";

const song = require("../music-files/one-love-song/song.mp3");
const songImage = require("../music-files/one-love-song/one-love.jpg");

const Dashboard = () => {
  // wrap in function for expo-audio
  const player = useAudioPlayer(() => song);

  return (
    <View style={styles.dashboard}>
      <Text style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>
        Enjoy the Music!
      </Text>

      <Image
        source={songImage}
        style={{ width: 200, height: 200, marginBottom: 30 }}
      />

      {/* Play */}
      <TouchableOpacity style={styles.playButton} onPress={() => player.play()}>
        <Text style={styles.playButtonText}>▶ Play</Text>
      </TouchableOpacity>

      {/* Pause */}
      <TouchableOpacity
        style={[styles.playButton, { marginTop: 20 }]}
        onPress={() => player.pause()}
      >
        <Text style={styles.playButtonText}>⏸ Pause</Text>
      </TouchableOpacity>

      {/* Stop */}
      <TouchableOpacity
        style={[styles.playButton, { marginTop: 20, backgroundColor: "#D32F2F" }]}
        onPress={() => player.stop()}
      >
        <Text style={styles.playButtonText}>⏹ Stop</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
  },
  playButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
