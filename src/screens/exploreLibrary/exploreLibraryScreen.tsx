/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
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
import {cover2, imgStep4} from '../../assets/images';
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
import {getExploreStory} from '../../shared/request';
import {BACKEND_URL} from '../../shared/static';
import { handleSetSteps } from '../../store/defaultState/actions';
import i18n from '../../i18n';
import Button from '../../components/buttons/Button';
import StepHeader from '../../layout/step/stepHeader';
const swipeupIcon = require('../../assets/lottie/swipe_up.json');

const ExploreLibraryScreen = ({colorTheme, categories, isPremium}) => {
  const [bgTheme, setBgTheme] = useState(colorTheme);
  const [showModalSort, setShowModalSort] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getExploreStory({search: ''});
        setData(res);
      } catch (error) {
        setData(null);
      }
    }
    fetchData();
  }, [keyword]);

  const renderProgress = () => <StepHeader currentStep={5} />;
  const renderTutorial = () => {
    return (
      <SafeAreaView
        style={{
          position: 'absolute',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          top: 30,
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
          
        {renderProgress()}
        <View
          style={{
            backgroundColor: '#3F58DD',
            borderRadius: 10,
            padding: 10,
            marginHorizontal: 40,
            alignItems: 'center',
            marginTop: '50%',
            paddingTop: 50,
          }}>
          <Image
            source={imgStep4}
            resizeMode="contain"
            style={{width: 100, height: 200, position: 'absolute', top: -100}}
          />
          <Text
            style={{
              color: code_color.white,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {`Explore hundreds of other\nStories and dive deeper\ninto the World of\nRomance.`}
          </Text>
          
          <Button
            style={{
              backgroundColor: code_color.yellow,
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
            }}
            title={i18n.t('Next')}
            onPress={() => {
              // setTutorial({
              //   ...isTutorial,
              //   step: isTutorial.step + 1,
              // });
              handleSetSteps(5 + 1)
              navigate('Main')
            }}
          />
        </View>
      </SafeAreaView>
    )
  }
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
        {data?.most_read?.length > 0 && (
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
                <Text
                  style={{fontSize: 16, fontWeight: '600', marginBottom: 16}}>
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
                {data?.most_read.map((itm: any, idx) => (
                  <View style={{width: 95}} key={idx}>
                    {itm.is_free === 0 && (
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
                      source={{
                        uri: `${BACKEND_URL}${itm?.category?.cover?.url}`,
                      }}
                      resizeMode="cover"
                      style={{height: 130, width: 95, borderRadius: 6}}
                    />
                    <Text
                      allowFontScaling={false}
                      style={{fontSize: 10, fontWeight: '600', marginTop: 6}}>
                      {itm.content_en.substring(0, 28) + '...'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        fontWeight: '400',
                        marginTop: 6,
                        opacity: 0.8,
                      }}>
                      {itm.category.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        )}

        {data?.category?.length > 0 && (
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
                <Text
                  style={{fontSize: 16, fontWeight: '600', marginBottom: 16}}>
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
                {data?.category.map((itm: any, idx: number) => (
                  <View style={{width: 95}} key={idx}>
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
                      source={{uri: `${BACKEND_URL}${itm?.image?.url}`}}
                      resizeMode="cover"
                      style={{height: 130, width: 95, borderRadius: 6}}
                    />
                    <Text
                      style={{fontSize: 10, fontWeight: '600', marginTop: 6}}>
                      {itm.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        )}
        {data?.most_share?.length > 0 && (
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
                <Text
                  style={{fontSize: 16, fontWeight: '600', marginBottom: 16}}>
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
                {data.most_share.map((itm: any, idx: number) => (
                  <View style={{width: 95}} key={idx}>
                    {itm.is_free === 0 && (
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
                      source={{
                        uri: `${BACKEND_URL}${itm?.category?.cover?.url}`,
                      }}
                      resizeMode="cover"
                      style={{height: 130, width: 95, borderRadius: 6}}
                    />
                    <Text
                      style={{fontSize: 10, fontWeight: '600', marginTop: 6}}>
                      {itm.content_en.substring(0, 28) + '...'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        fontWeight: '400',
                        marginTop: 6,
                        opacity: 0.8,
                      }}>
                      {itm?.category?.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        )}
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
      {renderTutorial()}
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
