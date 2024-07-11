import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  PanResponder,
  Modal,
  ActivityIndicator,
  AppState,
  ScrollView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  useProgress,
  useTrackPlayerEvents,
  Event,
  State,
  AppKilledPlaybackBehavior,
  Capability,
  IOSCategoryOptions,
} from 'react-native-track-player';
import ModalShareStory from '../../components/modal-share-story';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import styles from './styles';
import {code_color} from '../../utils/colors';
import {bgGetUnlimit, imgHearts} from '../../assets/images';
import {goBack, navigate} from '../../shared/navigationRef';
import LoveSvg from '../../assets/icons/bottom/love.jsx';
import CloseIcon from '../../assets/icons/close';
import LoveOutline from '../../assets/icons/loveOutline';
import Prev5 from '../../assets/icons/prev5';
import Pause from '../../assets/icons/pause';
import Play from '../../assets/icons/play';
import Next5 from '../../assets/icons/next5';
import ShareSvg from '../../assets/icons/share';
import {connect} from 'react-redux';
import {sizing} from '../../shared/styling';
import {BACKEND_URL} from '../../shared/static';
import StepHeader from '../../layout/step/stepHeader';
import {Step3} from '../../layout/tutorial';
import {fixedFontSize, hp, wp} from '../../utils/screen';
import {addStory, deleteMyStory, getStoryDetail} from '../../shared/request';
import {handleSetStory} from '../../store/defaultState/actions';
import store from '../../store/configure-store';
import {
  ADD_STORY_TO_LIBRARY,
  AUDIO_PLAYED,
  eventTracking,
} from '../../helpers/eventTracking';
import ImageColors from 'react-native-image-colors';
import { moderateScale } from 'react-native-size-matters';

function ScreenMedia({route, stepsTutorial, handleSetSteps, userStory, userProfile}) {
  const [play, setPlay] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const {position, duration} = useProgress();
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState(null);
  const [info, setInfo] = useState({});
  const track1 = {
    url: `${BACKEND_URL}${userStory?.audio?.audio_en}`,
    title: userStory?.category?.name,
    artist: userStory?.title_id,
    album: 'While(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00',
    artwork: 'http://example.com/cover.png',
    duration: 10,
  };
  // console.log(JSON.stringify(userStory))
  const [showModalShareStory, setShowModalShareStory] = useState(false);
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  }
  
  
  useEffect(() => {
    const remoteDuckListener = TrackPlayer.addEventListener(Event.RemotePause, () => {
      TrackPlayer.pause();
    }
    );
  
    const remotePlayListener = TrackPlayer.addEventListener(
      Event.RemotePlay,
      () => {
        TrackPlayer.play();
      }
    );
  
    return () => {
      remoteDuckListener.remove();
      remotePlayListener.remove();
    };
  }, []);
  useEffect(() => {
    const init = async () => {
     await TrackPlayer.setupPlayer() 
    }
    
    let isPlayerInitialized = false;
    const fetchMedia = async () => {
     
      try {
        setLoading(true);
        // Dapatkan URL MP3 terbaru
       
        const newMp3Url = `${BACKEND_URL}${userStory?.audio?.audio_en}`;
       console.log('MP3'+newMp3Url)
        // Hentikan pemutaran sebelumnya dan reset pemutaran
        await TrackPlayer.stop();
        await TrackPlayer.reset();
       
        // Tambahkan dan konfigurasi lagu baru
        
        await TrackPlayer.updateOptions({
        
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SeekTo,
            Capability.Stop,
          ],
          notificationCapabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SeekTo,
            Capability.Stop,
          ],
          compactCapabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SeekTo,
            Capability.Stop,
          ],
          // ios: {
          //   category: 'Playback',
          //   audioSessionCategory: 'Playback',
          // },
          // android: {
          //   // This is the default behavior
          //   appKilledPlaybackBehavior:
          //     AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
          // },
        });
        await TrackPlayer.add({
          id: 'track1',
          url: newMp3Url,
          title: userStory?.category?.name,
          artist: userStory?.title_id,
          album: 'While(1<2)',
          genre: 'Progressive House, Electro House',
          date: '2014-05-20T07:00:00+00:00',
          artwork:  `${BACKEND_URL}${userStory?.category?.cover_audio?.url}`,
          duration: 10,
        });
      
        // Jalankan pemutaran baru
        setLoading(false);
      
        await TrackPlayer.play();
        isPlayerInitialized = true;
        setPlay(true)
      } catch (error) {
        console.error('Error setting up media player:', error);
        init()
        fetchMedia()
      } finally {
        setLoading(false);
      }
    };
    init()
    fetchMedia();
  }, []);

  useEffect(() => {
    const url = `${BACKEND_URL}${userStory?.category?.cover_audio?.url}`;
    const getColor = async () => {
      const result: any = await ImageColors.getColors(url, {
        fallback: '#ffffff',
        cache: false,
        key: 'unique_key',
      });
      setColors(result?.primary);
    };
    getColor();
  }, []);

  const playing = async () => {
   
    try {
      if (play) {
        eventTracking(AUDIO_PLAYED);
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    } catch (error) {
      // console.error('Error handling playback:', error);
    
      //   Platform.OS === 'android' ?  await TrackPlayer.setupPlayer() : null
     
    }
  };

  useEffect(() => {
    playing();
  }, [play]);

  useEffect(() => {
    if (position != 0) {
      setLoading(false);
    }
    if (position != 0 && position === duration) {
      TrackPlayer.seekTo(0);
      setLoading(false);
      TrackPlayer.reset();
      navigate('Main', {successListen: true});
    }
  }, [position, duration]);

  const handleFetchSave = async () => {
    if (userStory?.is_collection === null) {
      const response = await addStory(userStory?.id);
      if (response.status === 'success') {
        try {
          const resp = await getStoryDetail(userStory?.id);
          store.dispatch(handleSetStory(resp.data));
          eventTracking(ADD_STORY_TO_LIBRARY);
        } catch (error) {}
      }
      setVisibleModal(true);
      setTimeout(() => {
        setVisibleModal(false);
      }, 2500);
    } else {
      const data = await deleteMyStory(userStory?.id);
      if (data.status === 'success') {
        try {
          const resp = await getStoryDetail(userStory?.id);
          store.dispatch(handleSetStory(resp.data));
        } catch (error) {}
      }
    }
  };
  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height

  return (
    // <LinearGradient colors={['#E4B099', '#6B7C8C']} style={styles.ctnContent}>

<LinearGradient
      colors={[colors || '#E4B099', '#6B7C8C']}
      style={styles.ctnContent}>
      <ModalShareStory
        storyData={userStory}
        isVisible={showModalShareStory}
        onClose={() => {
          setShowModalShareStory(false);
          // setSharedStory(null);
        }}
        type={userProfile?.data?.type}
      />
      <Modal
        visible={visibleModal}
        animationType="fade"
        transparent
        onDismiss={() => setVisibleModal(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'black',
              padding: wp(20),
              borderRadius: wp(20),
              alignItems: 'center',
            }}>
            <Image
              source={imgHearts}
              resizeMode="contain"
              style={{width: wp(30), height: hp(30)}}
            />

            <Text
              allowFontScaling={false}
              style={{
                color: code_color.white,
                textAlign: 'center',
                fontSize: fixedFontSize(15),
              }}>
              {'Story saved &\nadded to library'}
            </Text>
          </View>
        </View>
      </Modal>
      <View style={styles.row}>
        <Text style={styles.textTitle} />
        <TouchableOpacity
          onPress={() => {
            goBack();
            TrackPlayer.stop();
            Platform.OS === 'android' ?   TrackPlayer.reset() : null
          }}>
          <CloseIcon fill={code_color.white} />
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={{
            uri: `${BACKEND_URL}${'/assets/images/categories/realistic/covers/audio/relationship.png'}`,
          }}
          resizeMode="cover"
          style={{
            width: hp(width === 375 && height === 667 ? 200 : 352),
            height: hp(width === 375 && height === 667 ? 200 : 350),
            borderRadius: hp(8),
          }}
        />
        <Text
          allowFontScaling={false}
          style={{
            color: code_color.white,
            marginBottom: 10,
            marginTop: 40,
            fontSize: moderateScale(14),
          }}>
          {userStory?.category?.name}
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            color: code_color.white,
            marginBottom: 40,
            fontSize: moderateScale(16),
            fontWeight: 'bold',
          }}>
          {userStory?.title_id}
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
              fontSize: moderateScale(14),
              flex: 1,
            }}>
            {formatTime(position)}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              color: code_color.white,
              marginBottom: 40,
              fontSize: moderateScale(14),
              flex: 1,
              textAlign: 'right',
            }}>
            -{formatTime(duration - position)}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: sizing.getDimensionWidth(0.9),
        }}>
        <TouchableOpacity onPress={() => handleFetchSave()}>
          {userStory?.is_collection === null ? (
            <LoveOutline width={hp(35)} height={hp(35)} />
          ) : (
            <LoveSvg width={hp(35)} height={hp(35)} fill={code_color.white} />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => TrackPlayer.seekTo(position - 5)}>
          <Prev5 width={hp(35)} height={hp(35)} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPlay(prev => !prev)}>
          {play ? (
            <Pause width={hp(55)} height={hp(55)} />
          ) : (
            <View
              style={{
                width: hp(55),
                height: hp(55),
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
              }}>
              <Play fill={'#6B7C8C'} width={hp(35)} height={hp(35)} />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => TrackPlayer.seekTo(position + 5)}>
          <Next5 width={hp(35)} height={hp(35)} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowModalShareStory(true)}>
          <ShareSvg width={hp(30)} height={hp(30)} />
        </TouchableOpacity>
      </View>
      {/* {renderTutorial()} */}
      <Modal visible={loading} animationType="fade" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              alignItems: 'center',
              padding: 20,
              borderRadius: 20,
            }}>
            <Text style={{fontSize: 16, color: code_color.blackDark}}>
              Loading
            </Text>
            <ActivityIndicator color={code_color.blueDark} size={20} />
          </View>
        </View>
      </Modal>
    </LinearGradient>
  
    
  );
}

export default connect(states, dispatcher)(ScreenMedia);
