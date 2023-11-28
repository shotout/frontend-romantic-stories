import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  useProgress,
  useTrackPlayerEvents,
  Event,
  State,
} from 'react-native-track-player';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import styles from './styles';
import {code_color} from '../../utils/colors';
import {bgGetUnlimit} from '../../assets/images';
import {goBack, navigate} from '../../shared/navigationRef';

import CloseIcon from '../../assets/icons/close';
import LoveOutline from '../../assets/icons/loveOutline';
import Prev5 from '../../assets/icons/prev5';
import Pause from '../../assets/icons/pause';
import Next5 from '../../assets/icons/next5';
import ShareSvg from '../../assets/icons/share';
import {connect} from 'react-redux';
import {sizing} from '../../shared/styling';

function ScreenMedia({route, stepsTutorial, handleSetSteps}) {
  const [play, setPlay] = useState(false);
  const {position, duration} = useProgress();
  const [info, setInfo] = useState({});
  const track1 = {
    url: require('../../assets/music/seeyouagain.mp3'),
    title: 'See You Again',
    artist: 'Wiz Khalifa',
    album: 'While(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00',
    artwork: 'http://example.com/cover.png',
    duration: 402,
  };
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  }
  const fetchMedia = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add([track1]);
    } catch (error) {
      console.error('Error setting up media player:', error);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const playing = async () => {
    try {
      if (play) {
        await TrackPlayer.play();
        setTrackInfo();
      } else {
        await TrackPlayer.pause();
      }
    } catch (error) {
      console.error('Error handling playback:', error);
    }
  };

  useEffect(() => {
    playing();
  }, [play]);

  async function setTrackInfo() {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    const info = await TrackPlayer.getTrack(currentTrack);
    setInfo(info);
  }

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.ctnContent}>
      <View style={styles.row}>
        <Text style={styles.textTitle} />
        <TouchableOpacity
          onPress={() => {
            goBack();
            TrackPlayer.stop();
          }}>
          <CloseIcon fill={code_color.white} />
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={bgGetUnlimit}
          resizeMode="cover"
          style={{
            width: sizing.getDimensionWidth(0.9),
            height: sizing.getDimensionWidth(0.9),
            borderRadius: 8,
            marginBottom: 40,
          }}
        />
        <Text
          allowFontScaling={false}
          style={{
            color: code_color.white,
            marginBottom: 10,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {info?.title}
        </Text>
        <Text
          allowFontScaling={false}
          style={{color: code_color.white, marginBottom: 40, fontSize: 14}}>
          {info?.album}
        </Text>
        <Slider
          step={1}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#B2B6BB"
          thumbTintColor="#fff"
          onValueChange={async value => {
            await TrackPlayer.seekTo(value);
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <Text
            allowFontScaling={false}
            style={{
              color: code_color.white,
              marginBottom: 40,
              fontSize: 14,
              flex: 1,
            }}>
            {formatTime(position)}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              color: code_color.white,
              marginBottom: 40,
              fontSize: 14,
              flex: 1,
              textAlign: 'right',
            }}>
            {formatTime(duration - position)}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LoveOutline style={{marginRight: 40}} />
        <TouchableOpacity onPress={() => TrackPlayer.seekTo(position - 5)}>
          <Prev5 style={{marginHorizontal: 5}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPlay(prev => !prev)}>
          <Pause style={{marginHorizontal: 40}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => TrackPlayer.seekTo(position + 5)}>
          <Next5 style={{marginHorizontal: 5}} />
        </TouchableOpacity>
        <ShareSvg style={{marginLeft: 40}} />
      </View>
    </LinearGradient>
  );
}

export default connect(states, dispatcher)(ScreenMedia);
