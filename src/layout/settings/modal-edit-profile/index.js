/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  Pressable,
  Image,
  Switch,
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import BackLeft from '../../../assets/icons/bottom/backLeft';
import {code_color} from '../../../utils/colors';
import IdCardSvg from '../../../assets/icons/idCard';
import GenderSvg from '../../../assets/icons/gender';
import ProfileSvg from '../../../assets/icons/profile';
import PartnerSvg from '../../../assets/icons/partner';
import FlagSvg from '../../../assets/icons/flag';
import {BACKEND_URL} from '../../../shared/static';
import {moderateScale} from 'react-native-size-matters';
import {hp} from '../../../utils/screen';
import { avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, realistic_beach_1, realistic_beach_4, realistic_casual_3, realistic_cocktail_2, realistic_cocktail_5, realistic_professional_6 } from '../../../assets/images';

function ModalEditProfile({
  isVisible,
  onClose,
  handleOpenModal,
  userProfile,
  getAvatarFemale,
  getAvatarMale,
  colorTheme,
  backgroundColor,
  online,
  typeImage
}) {
  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const handleClick = tab => {
    if (typeof handleOpenModal === 'function') {
      handleOpenModal(tab);
    }
  };
  const getImageByAvatarAndPage = (avatarMale) => {
   
    if (avatarMale.includes('realistic/1')) return realistic_beach_1;
    if (avatarMale.includes('realistic/2')) return realistic_cocktail_2;
    if (avatarMale.includes('realistic/3')) return realistic_casual_3;
    if (avatarMale.includes('realistic/4')) return realistic_beach_4;
    if (avatarMale.includes('realistic/5')) return realistic_cocktail_5;
    if (avatarMale.includes('realistic/6')) return realistic_professional_6;
   
  
  return null; // Default or fallback image if no conditions match
};
const getImageByAvatarAndPageAnime = (avatarMale) => {
   
  if (avatarMale.includes('anime/1')) return avatar1;
  if (avatarMale.includes('anime/2')) return avatar2;
  if (avatarMale.includes('anime/3')) return avatar3;
  if (avatarMale.includes('anime/4')) return avatar4;
  if (avatarMale.includes('anime/5')) return avatar5;
  if (avatarMale.includes('anime/6')) return avatar6;
 

return null; // Default or fallback image if no conditions match
};
  const header = () => (
    <View
      style={{
        backgroundColor: colorTheme,
        borderTopLeftRadius: hp(20),
        borderTopRightRadius: hp(20),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: hp(14),
          marginVertical: hp(20),
        }}>
        <Pressable
          onPress={() => onClose()}
          style={{
            backgroundColor: code_color.white,
            width: hp(30),
            height: hp(30),
            borderRadius: hp(20),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <BackLeft width={hp(20)} height={hp(20)} fill={colorTheme} />
          </View>
        </Pressable>
        <Text
          allowFontScaling={false}
          style={{
            color: backgroundColor === '#2C3439' ? 'white' : 'white',
            marginLeft: 15,
            fontSize: moderateScale(18),
            fontWeight: 'bold',
          }}>
          Edit Profile
        </Text>
        {/* <Switch
          style={{marginLeft: 'auto'}}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isPremium ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => handleSetPremium(!isPremium)}
          value={isPremium}
        /> */}
      </View>
    </View>
  );

  const menuEditList = [
    {
      title: 'Edit Name',
      icon: (
        <IdCardSvg
          width={hp(24)}
          height={hp(24)}
          fill={backgroundColor === '#2C3439' ? 'white' : 'white'}
        />
      ),
      value: userProfile.name,
    },
    {
      title: 'Gender',
      icon: <GenderSvg width={hp(24)} height={hp(24)} fill={code_color.blackDark} />,
      value: userProfile.gender,
    },
    {
      title: 'Select your character',
      icon: <ProfileSvg width={hp(22)} height={hp(22)} />,
      value: getAvatarMale,
    },
    {
      title: 'Select partner character',
      icon: <PartnerSvg width={hp(20)} height={hp(20)} />,
      value: getAvatarFemale,
    },
    // {
    //   title: 'Select language',
    //   icon: <FlagSvg width={24} height={24} />,
    //   value: userProfile?.language?.name,
    // },
  ];
  const fetchImage = (me) => {
    let imageSource;
  
    if (online) {
      imageSource = {
        uri: `${BACKEND_URL}/${me}`,
        priority: FastImage.priority.high,
      };
    } else {
      if (me.includes('realistic')) {
        imageSource = getImageByAvatarAndPage(me);
      }else{
         imageSource = getImageByAvatarAndPageAnime(me);
        
      }
    }
  
    return imageSource;
  };
  const form = () => (
    <View
      style={{
        padding: hp(25),
        paddingTop: hp(10),
        height: '100%',
        backgroundColor: 'white',
      }}>
      {menuEditList.map((edit, i) => (
        <View key={i}>
          <TouchableOpacity
            onPress={() => handleClick(edit.title)}
            style={{flexDirection: 'row', alignItems: 'center', height: 70}}>
            {edit.icon}
            <Text
              style={{
                color: code_color.blackDark,
                marginLeft: 10,
                fontSize: moderateScale(16),
                fontWeight: '600',
              }}>
              {edit.title}
            </Text>
            {edit.title.includes('your') ? (
              <View
                style={{
                  width: hp(40),
                  height: hp(40),
                  borderRadius: hp(20),
                  marginLeft: 'auto',
                  backgroundColor: code_color.yellow,
                  position: 'relative',
                  overflow: 'hidden',
                  alignItems: 'center',
                }}>
                <Image
                  source={fetchImage(edit.value)}
                  style={{
                    width: hp(40),
                    height: hp(
                      edit.value === '/assets/images/avatars/anime/2.png' ? 160 : 150,
                    ),
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: hp(3),
                    right: hp(
                     
                      edit.value?.includes('realistic/6') ? -7 :
                      edit.value?.includes('realistic/4') || edit.value?.includes('realistic/2')  ||   edit.value?.includes('realistic/3') ? -3 :
                      edit.value?.includes('realistic/5') ? 2 :
                      edit.value === '/assets/images/avatars/anime/5.png'
                        ? -7
                        : edit.value === '/assets/images/avatars/anime/1.png'
                        ? 3.5
                        : edit.value === '/assets/images/avatars/anime/4.png'
                        ? 2
                        : 0,
                    ),
                  }}
                />
              </View>
            ) : edit.title.includes('partner') ? (
              <View
                style={{
                  width: hp(40),
                  height: hp(40),
                  borderRadius: hp(20),
                  marginLeft: 'auto',
                  backgroundColor: code_color.yellow,
                  position: 'relative',
                  overflow: 'hidden',
                  alignItems: 'center',
                }}>
                <Image
                  source={fetchImage(edit.value)}
                  style={{
                    width: hp(40),
                    height: hp(
                      edit.value === '/assets/images/avatars/anime/2.png' ? 160 : 150,
                    ),
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: hp(3),
                    right: hp(
                      edit.value?.includes('realistic/6')  ? -7 :
                      edit.value?.includes('realistic/4') || edit.value?.includes('realistic/2')  ||   edit.value?.includes('realistic/3') ? -3 :
                      edit.value?.includes('realistic/5')  ? 2 :
                      edit.value === '/assets/images/avatars/anime/5.png'
                        ? -7
                        : edit.value === '/assets/images/avatars/anime/1.png'
                        ? 3.5
                        : edit.value === '/assets/images/avatars/anime/4.png'
                        ? 2
                        : 0,
                    ),
                  }}
                />
              </View>
            ) : (
              <Text
                style={{
                  color: code_color.blackDark,
                  marginLeft: 'auto',
                  fontSize: moderateScale(14),
                  fontWeight: '400',
                }}>
                {edit.value}
              </Text>
            )}
          </TouchableOpacity>
          {i !== menuEditList.length - 1 && (
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: code_color.greyDefault,
              }}
            />
          )}
        </View>
      ))}
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={handleClose}>
      <TouchableOpacity
        onPress={handleClose}
        style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            height: moderateScale('60%'),
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}>
          {header()}
          {form()}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

ModalEditProfile.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
};

ModalEditProfile.defaultProps = {};

export default connect(states, dispatcher)(ModalEditProfile);
