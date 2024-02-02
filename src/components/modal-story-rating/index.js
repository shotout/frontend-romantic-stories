/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {code_color} from '../../utils/colors';
import {
  cover1,
  imgLoveLeft,
  imgLoveRight,
  imgUnlockPremium,
  imgRating,
} from '../../assets/images';
import LibrarySvg from '../../assets/icons/libraryAdd';
import Reading from '../../assets/icons/reading.jsx';
import {
  addNewCollection,
  submitRating,
  updateMyCollection,
} from '../../shared/request';
import {moderateScale} from 'react-native-size-matters';
import {navigate} from '../../shared/navigationRef';
import {BACKEND_URL} from '../../shared/static';
import StarRating, {StarIconProps} from 'react-native-star-rating-widget';
import {Path, Svg} from 'react-native-svg';

function ModalStoryRating({isVisible, onClose, nextStory, handleSuccess}) {
  const [rating, setRating] = useState(0);
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async () => {
    const data = {
      value: rating,
    };
    try {
      const resp = await submitRating(nextStory?.id, data);
      if (resp) {
        handleSuccess();
        setRating(0);
      }
    } catch (error) {
      console.log('error rating', error)
      setRating(0);
      handleSuccess();
    
    }
  };
  const handleRating = rated => {
    // Kustom logika yang ingin Anda terapkan saat peringkat berubah
    console.log(`Rated: ${rated}`);
    setRating(rated);
  };
  const HeartEmpty = props => (
    <Svg
      width="44"
      height="41"
      viewBox="0 0 44 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M20.2718 1.46718C21.0432 0.142642 22.9568 0.142642 23.7282 1.46718L29.3152 11.0594C29.5978 11.5446 30.0714 11.8887 30.6201 12.0075L41.4694 14.3569C42.9675 14.6813 43.5588 16.5011 42.5375 17.6441L35.1412 25.9218C34.767 26.3405 34.5862 26.8972 34.6427 27.4559L35.7609 38.5001C35.9154 40.0251 34.3673 41.1498 32.9646 40.5317L22.8065 36.0554C22.2927 35.829 21.7073 35.829 21.1935 36.0554L11.0354 40.5317C9.6327 41.1498 8.08465 40.0251 8.23905 38.5001L9.35727 27.4559C9.41384 26.8972 9.23295 26.3405 8.85883 25.9218L1.46255 17.6441C0.441237 16.5011 1.03254 14.6813 2.53065 14.3569L13.3799 12.0075C13.9287 11.8887 14.4022 11.5446 14.6848 11.0594L20.2718 1.46718Z"
        fill="#B2B6BB"
      />
    </Svg>
  );

  const HeartHalf = props => (
    <Svg viewBox="0 0 512 512" {...props}>
      <Path d="M119.4 44.1c44.7-7.59 92 7.27 124.6 39.9l11.1 12 12-11.98C300.6 51.37 347 36.51 392.6 44.1c68.9 11.48 119.4 71.1 119.4 141v5.8c0 41.5-17.2 81.2-47.6 109.5L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9L47.59 300.4C17.23 272.1 0 232.4 0 190.9v-5.8C0 115.2 50.52 55.58 119.4 44.09v.01zm135.7 119.8v265.4l176.6-164c20.6-19.2 32.3-46.2 32.3-74.4v-5.8c0-46.4-33.6-86.03-79.3-93.66-30.3-5.04-61.1 4.84-82.8 25.66l-46.8 46.8z" />
    </Svg>
  );

  const HeartFull = props => (
    <Svg
      width="44"
      height="41"
      viewBox="0 0 44 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M20.2718 1.46718C21.0432 0.142642 22.9568 0.142642 23.7282 1.46718L29.3152 11.0594C29.5978 11.5446 30.0714 11.8887 30.6201 12.0075L41.4694 14.3569C42.9675 14.6813 43.5588 16.5011 42.5375 17.6441L35.1412 25.9218C34.767 26.3405 34.5862 26.8972 34.6427 27.4559L35.7609 38.5001C35.9154 40.0251 34.3673 41.1498 32.9646 40.5317L22.8065 36.0554C22.2927 35.829 21.7073 35.829 21.1935 36.0554L11.0354 40.5317C9.6327 41.1498 8.08465 40.0251 8.23905 38.5001L9.35727 27.4559C9.41384 26.8972 9.23295 26.3405 8.85883 25.9218L1.46255 17.6441C0.441237 16.5011 1.03254 14.6813 2.53065 14.3569L13.3799 12.0075C13.9287 11.8887 14.4022 11.5446 14.6848 11.0594L20.2718 1.46718Z"
        fill="#FFD12F"
      />
    </Svg>
  );
  const HeartIcon = ({color, size, type}) => {
    if (type === 'empty') {
      return <HeartEmpty fill={color} width={size} height={size} />;
    }

    return <HeartFull fill={color} width={size} height={size} />;
  };
  
  const renderPremium = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: code_color.white,
            width: '90%',
            borderRadius: moderateScale(24),
          }}>
          <Image
            source={imgRating}
            style={{
              height: 100,
              width: '100%',
              aspectRatio: '2/1',
              alignSelf: 'center',
              marginTop: moderateScale(20),
            }}
          />
          <Text
            style={{
              fontSize: moderateScale(15),
              color: code_color.black,
              fontWeight: 700,
              textAlign: 'center',
              marginTop: moderateScale(25),
              marginBottom: moderateScale(20),
            }}>
            {`We want to improve our content,
how did you like your previous story?`}
          </Text>

          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#F0F2FF',
              borderRadius: moderateScale(24),
              margin: moderateScale(10),
            }}>
            <View
              style={{
                width: '100%',
                padding: moderateScale(14),
                paddingHorizontal: moderateScale(20),
                borderRadius: moderateScale(8),
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{
                    uri: `${BACKEND_URL}${nextStory?.category?.cover?.url}`,
                  }}
                  resizeMode="contain"
                  style={{
                    width: 65,
                    height: 87,
                    marginRight: moderateScale(10),
                  }}
                />
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      color: '#3F58DD',
                      marginTop: 10,
                      fontWeight: 400,
                      fontSize: 14,
                    }}>
                    {nextStory?.category?.name}
                  </Text>
                  <Text
                    style={{
                      color: code_color.blueDark,
                      marginTop: 10,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    {nextStory?.title_en}
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  color: code_color.blackDark,
                  fontSize: 12,
                  marginTop: moderateScale(16),
                }}>
                {nextStory?.content_en.substring(0, 100)}...
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                borderTopColor: code_color.greyDefault,
                borderTopWidth: 1,
                paddingTop: 10,
              }}>
              <StarRating
                rating={rating}
                onChange={setRating}
                StarIconComponent={HeartIcon}
                color="tomato"
                starSize={40}
              />
            </View>

            <View
              style={{
                marginBottom: moderateScale(20),
              }}>
              <TouchableOpacity
              disabled={rating === 0 ? true : false}
                onPress={() => handleSubmit()}
                style={{
                  backgroundColor: code_color.yellow,
                  marginTop: moderateScale(20),
                  padding: moderateScale(12),
                  alignItems: 'center',
                  borderRadius: 8,
                  width: moderateScale(280),
                  flex: 0,
                  opacity: rating === 0 ? 0.5 : 1
                }}>
                <Text
                  style={{
                    color: code_color.black,
                    fontWeight: 600,
                    fontSize: moderateScale(14),
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={handleClose}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        {renderPremium()}
      </View>
    </Modal>
  );
}

ModalStoryRating.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalStoryRating.defaultProps = {};

export default connect(states, dispatcher)(ModalStoryRating);
