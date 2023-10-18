/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {cover2} from '../../assets/images';
import {code_color} from '../../utils/colors';
import SearchSvg from '../../assets/icons/search.jsx';
import LockFree from '../../assets/icons/lockFree';
import DescendingSvg from '../../assets/icons/descending.jsx';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {connect} from 'react-redux';
import BackRight from '../../assets/icons/backRight';
import {navigate} from '../../shared/navigationRef';
import AnimatedLottieView from 'lottie-react-native';
import {moderateScale} from 'react-native-size-matters';
const swipeupIcon = require('../../assets/lottie/swipe_up.json');

const ExploreLibraryScreen = ({colorTheme, categories, isPremium}) => {
  const [bgTheme, setBgTheme] = useState(colorTheme);
  const [showModalSort, setShowModalSort] = useState(false);
  const [keyword, setKeyword] = useState('');

  return (
    <SafeAreaView style={{backgroundColor: bgTheme}}>
      <View
        style={{
          flex: 0,
          backgroundColor: bgTheme,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <Pressable
            onPress={() => navigate('Library')}
            style={{
              width: 35,
              height: 35,
              backgroundColor: code_color.white,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(180deg)',
            }}>
            <BackRight fill={bgTheme} />
          </Pressable>
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              flex: 1,
              borderRadius: 20,
              margin: 10,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
              height: 40,
            }}>
            <SearchSvg />
            <TextInput
              placeholder="Search"
              allowFontScaling={false}
              value={keyword}
              onChangeText={value => setKeyword(value)}
              placeholderTextColor={code_color.black}
              style={{marginLeft: 10, fontSize: 14, color: code_color.black}}
            />
          </View>
          <Pressable onPress={() => setShowModalSort(true)}>
            <DescendingSvg fill={code_color.white} />
          </Pressable>
        </View>
      </View>
      <ScrollView
        style={{
          backgroundColor: code_color.white,
          height: '100%',
        }}>
        <ScrollView horizontal style={{flex: 0, height: 270}}>
          <View
            style={{
              backgroundColor: '#F0F2FF',
              marginTop: 11,
              marginHorizontal: 13,
              height: 250,
              minWidth: Dimensions.get('screen').width - 26,
              borderRadius: 8,
              padding: 16,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 16}}>
                🔥 Most Read
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: 'auto',
                justifyContent: 'center',
                gap: 16,
              }}>
              {[1, 2, 3, 4].map(itm => (
                <View style={{width: 95}} key={itm}>
                  {!isPremium && (
                    <LockFree
                      height={16}
                      width={55}
                      style={{
                        marginBottom: -20,
                        marginTop: 4,
                        marginLeft: 4,
                        zIndex: 1,
                      }}
                    />
                  )}
                  <Image
                    source={cover2}
                    resizeMode="cover"
                    style={{height: 130, width: 95, borderRadius: 6}}
                  />
                  <Text style={{fontSize: 10, fontWeight: '600', marginTop: 6}}>
                    Lorem Ipsum dol dolor Series...
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: '400',
                      marginTop: 6,
                      opacity: 0.8,
                    }}>
                    Relationship
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <ScrollView horizontal style={{flex: 0, height: 250}}>
          <View
            style={{
              backgroundColor: '#F0F2FF',
              marginTop: 11,
              marginHorizontal: 13,
              height: 230,
              minWidth: Dimensions.get('screen').width - 26,
              borderRadius: 8,
              padding: 16,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 16}}>
                📚 Try different story category
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: 'auto',
                gap: 16,
              }}>
              {['Relationship', 'I miss you', 'Dirty Mind'].map(itm => (
                <View style={{width: 95}} key={itm}>
                  <View
                    style={{
                      height: 18,
                      width: 18,
                      backgroundColor: code_color.white,
                      borderRadius: 15,
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      zIndex: 1,
                    }}
                  />
                  {!isPremium && (
                    <LockFree
                      height={16}
                      width={55}
                      style={{
                        marginBottom: -20,
                        marginTop: 4,
                        marginLeft: 4,
                        zIndex: 1,
                      }}
                    />
                  )}
                  <Image
                    source={cover2}
                    resizeMode="cover"
                    style={{height: 130, width: 95, borderRadius: 6}}
                  />
                  <Text style={{fontSize: 10, fontWeight: '600', marginTop: 6}}>
                    {itm}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <ScrollView horizontal style={{flex: 0, height: 270}}>
          <View
            style={{
              backgroundColor: '#F0F2FF',
              marginTop: 11,
              marginHorizontal: 13,
              height: 250,
              minWidth: Dimensions.get('screen').width - 26,
              borderRadius: 8,
              padding: 16,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 16}}>
                ❤️ You might also like
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: 'auto',
                gap: 16,
              }}>
              {[1, 2, 3, 4, 5].map(itm => (
                <View style={{width: 95}} key={itm}>
                  {!isPremium && (
                    <LockFree
                      height={16}
                      width={55}
                      style={{
                        marginBottom: -20,
                        marginTop: 4,
                        marginLeft: 4,
                        zIndex: 1,
                      }}
                    />
                  )}
                  <Image
                    source={cover2}
                    resizeMode="cover"
                    style={{height: 130, width: 95, borderRadius: 6}}
                  />
                  <Text style={{fontSize: 10, fontWeight: '600', marginTop: 6}}>
                    Lorem Ipsum dol dolor Series...
                  </Text>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: '400',
                      marginTop: 6,
                      opacity: 0.8,
                    }}>
                    Relationship
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            height: moderateScale(100),
            width: moderateScale(100),
            backgroundColor: bgTheme,
            alignSelf: 'center',
            marginBottom: 100,
            borderRadius: moderateScale(8),
          }}>
          <AnimatedLottieView
            source={swipeupIcon}
            // style={styles.animationStyle}
            autoPlay
            // ref={firstStepTutorial}
            duration={3000}
            loop={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

ExploreLibraryScreen.propTypes = {
  activeVersion: PropTypes.any,
};

ExploreLibraryScreen.defaultProps = {
  activeVersion: null,
};

export default connect(states, dispatcher)(ExploreLibraryScreen);
