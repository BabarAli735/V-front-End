import React, { useEffect, useRef, useState } from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { Video } from "expo-av";
import { Feather } from "react-native-vector-icons";
import VideoControllers from "./VideoControllers";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";
const { height, width } = Dimensions.get("window");
export default function VideoPlayer(props) {
  const { videoUri, styles } = props;
  const playbackInstance = useRef(null);
  const max = useSharedValue(100);
  const min = useSharedValue(0);
  const progress = useSharedValue(0);
  const [duration, setDuration] = useState(0);
  const [loading, setIsLoading] = useState(true);
  const [playbackInstanceInfo, setPlaybackInstanceInfo] = useState({
    position: 0,
    duration: 0,
    state: "Buffering",
  });
  useEffect(() => {
    return () => {
      if (playbackInstance?.current) {
        playbackInstance?.current.setStatusAsync({
          shouldPlay: false,
        });
      }
    };
  }, []);
  useEffect(() => {
    playbackInstance.current.pauseAsync();
  }, []);
  const togglePlay = async () => {
    const shouldPlay = playbackInstanceInfo.state !== "Playing";
    if (playbackInstance.current !== null) {
      await playbackInstance.current.setStatusAsync({
        shouldPlay,
        ...(playbackInstanceInfo.state === "Ended" && { positionMillis: 0 }),
      });
      setPlaybackInstanceInfo({
        ...playbackInstanceInfo,
        state: playbackInstanceInfo.state === "Playing" ? "Paused" : "Playing",
      });
    }
  };
  const updatePlaybackCallback = (status) => {
   
    if (status.isLoaded) {
      setPlaybackInstanceInfo({
        ...playbackInstanceInfo,
        position: status?.positionMillis,
        duration: status?.durationMillis || 0,
        state: status?.didJustFinish
          ? "Ended"
          : status?.isBuffering
          ? "Buffering"
          : status?.shouldPlay
          ? "Playing"
          : "Paused",
      });
    } else {
      if (status?.isLoaded === false && status?.error) {
        const errorMsg = `Encountered a fatal error during playback: ${status.error}`;
        console.log(errorMsg, "error");
        // setErrorMessage(errorMsg)
      }
    }
  };

  const onLoadStart = () => {
    setIsLoading(true);
  };
  const onLoad = data => {
    setDuration(data.duration);
    max.value = data.duration;
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  
  return (
    <View style={{}}>
      <View style={[{}]}>
        <Video
        onLoadStart={onLoadStart}
          ref={playbackInstance}
          onLoad={onLoad}
          style={{ height: height / 3.5, width: width }}
          source={{ uri: videoUri }}
          resizeMode="cover"
          onPlaybackStatusUpdate={updatePlaybackCallback}
        />
      </View>

      <VideoControllers
        state={playbackInstanceInfo.state}
        playbackInstance={playbackInstance.current}
        playbackInstanceInfo={playbackInstanceInfo}
        setPlaybackInstanceInfo={setPlaybackInstanceInfo}
        togglePlay={togglePlay}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  video: {
    alignSelf: "center",
    width: width,
    height: height / 1.6,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  controlsContainer: {
    position: "absolute",
    bottom: 10,
  },
});
