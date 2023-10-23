import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import Icon, {Icons} from '@/Components/Icons';

import Animated, {useSharedValue} from 'react-native-reanimated';

export const {width, height} = Dimensions.get('window');

import {Slider} from 'react-native-awesome-slider/src/index';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import Icon, {Icons} from '../../../Icons';
import playerHandler from './PlayerHandler';

function App(props) {
  const {
    navigation,
    route,
    videoTime,
    ContinueWatch,
    saveWatchMovie,
    showAds,
  } = playerHandler(props);

  const {params} = route;

  const [paused, setpaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoadEnd, setIsLoadEnd] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [showControler, setshowControler] = useState(false);
  const [thumbWidth, setthumbWidth] = useState(12);
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [showCounter, setshowCounter] = useState(false);
  const [debouncedTime, setdebouncedTime] = useState(0);
  const [timer, settimer] = useState(5);

  const videoPlayer = useRef(null);
  const isSeeking = useRef(false);
  const controlViewOpacity = useSharedValue(1);
  const isScrubbing = useSharedValue(false);
  const max = useSharedValue(100);
  const min = useSharedValue(0);
  const progress = useSharedValue(0);

  let uri = params?.movie_url;

  // useEffect(() => {
  //   let find = ContinueWatch.find(x => x.id === params?.id);

  //   if (find) {
  //     if (find?.continue_watch > 0) {
  //       console.log('find?.continue_watch', find?.continue_watch);
  //       seekTo(Number(find?.continue_watch));
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (timer > 0) {
  //     setTimeout(() => {
  //       settimer(timer - 1);
  //     }, 1000);
  //   } else {
  //   }
  // }, [timer]);

  const onBackTo = id => {
    let temp = [];
    ContinueWatch.map((item, index) => {
      if (item?.id === params?.id) {
        temp.push({...item, continue_watch: videoTime});
      } else {
        temp.push(item);
      }
    });
    saveWatchMovie(temp);

    setTimeout(() => {
      navigation.goBack();
    }, 200);
  };

  const onReplyVideo = () => {
    setIsLoadEnd(false);
    setIsLoading(false);

    setpaused(false);

    seekTo(0);
    setCurrentTime(0);
    progress.value = 0;
  };

  const togglePlay = () => {
    if (!showControler) {
      setshowControler(true);
      setTimeout(() => {
        setshowControler(false);
      }, 2000);
    }
  };

  const seekTo = (time = 0) => {
    setCurrentTime(time);
    videoPlayer.current?.seek(time);
  };

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const onLoad = data => {
    setDuration(data?.duration);
    max.value = data?.duration;
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const onSeek = data => {
    // if (isScrubbing.value) {
    //   if (!isSeeking.current) {
    //     setControlTimeout();
    //     pause();
    //   }
    //   isSeeking.current = false;
    //   isScrubbing.value = false;
    //   setCurrentTime(data.currentTime);
    // } else {
    //   isSeeking.current = false;
    // }
    // if (onPostSeek) {
    //   onPostSeek(data);
    // }
  };

  const onEnd = () => {
    setIsLoadEnd(true);

    setIsLoading(true);
    setpaused(true);
  };

  const onProgress = data => {
    const {currentTime: cTime} = data;
    if (!isScrubbing.value) {
      if (!isSeeking.current) {
        progress.value = cTime;
      }
      setCurrentTime(cTime);
      if (parseInt(cTime)) {
        const ten = Boolean(parseInt(cTime) % 450 == 0);

        if (ten) {
          const current = Math.floor(cTime);

          if (current !== debouncedTime) {
            setdebouncedTime(current);
            setshowCounter(true);
            settimer(5);

            setTimeout(() => {
              showAds();
              setpaused(true);
              setshowCounter(false);
            }, 4800);
          }
        }
      }
    }
  };

  const onSlidingComplete = val => {
    isSeeking.current = true;
    seekTo(val);
  };

  const onSlidingStart = () => {};

  const onTapSlider = () => {
    setthumbWidth(30);
    setTimeout(() => {
      setthumbWidth(12);
    }, 3000);
  };

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Animated.View style={[styles.container]}>
          <View style={styles.backgroundVideo}>
            <Video
              onLoadStart={onLoadStart}
              resizeMode={orientation === 'LANDSCAPE' ? 'cover' : 'contain'}
              ref={videoPlayer}
              source={{uri: uri}}
              style={styles.backgroundVideo}
              paused={paused}
              onLoad={onLoad}
              onSeek={onSeek}
              onEnd={onEnd}
              onProgress={onProgress}
            />
            {loading && (
              <View
                style={{
                  height: '100%',
                  width: '100%',

                  position: 'absolute',
                }}>
                <Image
                  style={{flex: 1}}
                  resizeMode="contain"
                  source={{
                    uri: params?.thumbnail,
                  }}
                />
              </View>
            )}
          </View>

          {showCounter ? (
            <Animated.View
              style={[
                StyleSheet.absoluteFillObject,
                {
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  bottom: 25,
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#2E2B2B',
                  paddingLeft: 5,
                  borderRadius: 2,
                }}>
                <Text style={{color: '#fff'}}> {timer} </Text>
                <Image
                  style={{height: 40, width: 80}}
                  resizeMode="contain"
                  source={{
                    uri: params?.thumbnail,
                  }}
                />
              </View>
            </Animated.View>
          ) : (
            <>
              {/* controler view */}
              <Animated.View style={StyleSheet.absoluteFillObject}>
                
                <View
                  style={{
                    zIndex: 1,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 30,

                    justifyContent: 'center',
                  }}>
                  {showControler && (
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() => {
                        onBackTo();
                      }}>
                      <Icon
                        type={Icons.Ionicons}
                        name={'close'}
                        color={'#fff'}
                      />
                    </TouchableOpacity>
                  )}

                  {showControler && (
                    <Text
                      style={{
                        color: '#ffffff',
                        position: 'absolute',
                        alignSelf: 'center',
                      }}>
                      {params?.film_name}
                    </Text>
                  )}
                </View>
                <Animated.View style={[{flex: 1, flexDirection: 'row'}]}>
                  {/* skip-backward button */}
                  <TouchableOpacity
                    onPress={() => {
                      if (showControler) {
                        seekTo(currentTime - 10);
                        progress.value = currentTime - 10;
                      } else {
                        togglePlay();
                      }
                    }}
                    activeOpacity={0.85}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {showControler && (
                      <Icon
                        type={Icons.MaterialCommunityIcons}
                        name="skip-backward-outline"
                        size={40}
                        color={'#ffffff'}
                      />
                    )}
                  </TouchableOpacity>

                  {/* center play button */}
                  <TouchableOpacity
                    activeOpacity={0.85}
                    disabled={showControler}
                    onPress={() => {
                      togglePlay();
                    }}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {showControler &&
                      (isLoadEnd ? (
                        <TouchableOpacity
                          activeOpacity={0.85}
                          onPress={() => {
                            onReplyVideo();
                          }}>
                          <Icon
                            type={Icons.MaterialIcons}
                            name={'replay'}
                            size={40}
                            color={'#ffffff'}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          activeOpacity={0.85}
                          onPress={() => {
                            setIsLoadEnd(false);

                            setpaused(!paused);
                          }}>
                          <Icon
                            type={Icons.Ionicons}
                            name={
                              paused
                                ? 'play-circle-outline'
                                : 'pause-circle-outline'
                            }
                            size={40}
                            color={'#ffffff'}
                          />
                        </TouchableOpacity>
                      ))}
                  </TouchableOpacity>

                  {/* skip-forward button */}
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => {
                      if (showControler) {
                        seekTo(currentTime + 10);
                        progress.value = currentTime + 10;
                      } else {
                        togglePlay();
                      }
                    }}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {showControler && (
                      <Icon
                        type={Icons.MaterialCommunityIcons}
                        name="skip-forward-outline"
                        size={40}
                        color={'#ffffff'}
                      />
                    )}
                  </TouchableOpacity>
                </Animated.View>

                {showControler && (
                  <View
                    style={{
                      alignSelf: 'center',

                      zIndex: 1,
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 25,
                    }}>
                    <View style={{marginBottom: 10}}>
                      <Text style={{color: '#fff'}}>
                        {' '}
                        {secondToTime(currentTime)}/ {secondToTime(duration)}{' '}
                      </Text>
                    </View>

                    <Animated.View style={[styles.slider]}>
                      {duration > 0 && (
                        <Slider
                          theme={{
                            disableMinTrackTintColor: '#fff',
                            maximumTrackTintColor: '#fff',
                            minimumTrackTintColor: 'red',
                            cacheTrackTintColor: '#333',
                            bubbleBackgroundColor: '#666',
                          }}
                          progress={progress}
                          onSlidingComplete={onSlidingComplete}
                          onSlidingStart={onSlidingStart}
                          minimumValue={min}
                          maximumValue={max}
                          isScrubbing={isScrubbing}
                          bubble={value => {
                            return secondToTime(value);
                          }}
                          disableTapEvent
                          onTap={onTapSlider}
                          thumbScaleValue={controlViewOpacity}
                          thumbWidth={thumbWidth}
                          sliderHeight={2}
                          style={{width: '90%', alignSelf: 'center'}}
                        />
                      )}
                    </Animated.View>
                  </View>
                )}
              </Animated.View>
            </>
          )}
        </Animated.View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  controlView: {
    backgroundColor: 'rgba(0,0,0,.6)',
    justifyContent: 'center',
    overflow: 'hidden',
    ...StyleSheet.absoluteFillObject,
  },
  backgroundVideo: {
    height: '100%',
    width: '100%',
    backgroundColor: '#000',
  },
  headerBarTitle: {
    marginLeft: 20,
    maxWidth: height / 2,
  },
  slider: {
    width: '100%',
  },

  stopBackView: {
    height: '100%',
    position: 'absolute',
    width: 40,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 12,
    width: '100%',
  },
  topFullscreenControls: {
    top: 32,
  },
  video: {
    width: '100%',
    height: '100%',
  },

  back: {
    width: 16,
    height: 16,
  },

  more: {
    width: 24,
    height: 24,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    elevation: 10,
    justifyContent: 'center',
    zIndex: 10,
  },
});

export default App;

const secondToTime = (seconds: number): string => {
  const hour = Math.floor(seconds / 3600);
  const residualFromHour = seconds % 3600;
  const minute = `${Math.floor(residualFromHour / 60)}`.padStart(2, '0');
  const second = `${Math.floor(residualFromHour % 60)}`.padStart(2, '0');
  let output = `${minute}:${second}`;
  hour && (output = `${hour}:${output}`);
  return output;
};