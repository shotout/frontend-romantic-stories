/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, Fragment, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  bg,
  cover1,
  cover2,
  imgStep2,
  imgStep4,
  libraryAdd,
  logo,
} from '../../assets/images';
import {code_color} from '../../utils/colors';
import i18n from '../../i18n/index';
import {getDefaultLanguange} from '../../utils/devices';
import Button from '../../components/buttons/Button';
import {goBack, navigate} from '../../shared/navigationRef';
import LibrarySvg from '../../assets/icons/bottom/library.jsx';
import SearchSvg from '../../assets/icons/search.jsx';
import DescendingSvg from '../../assets/icons/descending.jsx';
import BackRightSvg from '../../assets/icons/backRight.jsx';
import LibraryAddSvg from '../../assets/icons/libraryAdd';
import ShareSvg from '../../assets/icons/share';
import DeleteSvg from '../../assets/icons/delete';
import EditSvg from '../../assets/icons/edit';
import DotSvg from '../../assets/icons/dot.jsx';
import EmptyLibrary from '../../assets/icons/emptyLibrary';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {connect} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import ModalLibrary from '../../components/modal-library';
import ModalNewLibrary from '../../components/modal-new-library';
import ModalSorting from '../../components/modal-sorting';
import {deleteMyCollection, getMyCollection} from '../../shared/request';
import {BACKEND_URL} from '../../shared/static';
import {moderateScale} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';
import StepHeader from '../../layout/step/stepHeader';
import ModalShareStory from '../../components/modal-share-story';
import ModalNewStory from '../../components/modal-new-story';
import {handleNativePayment} from '../../helpers/paywall';
import {sizing} from '../../shared/styling';

const LibraryScreen = ({
  colorTheme,
  handleSomeAction,
  stepsTutorial,
  handleSetSteps,
  isPremium,
}) => {
  const [bgTheme, setBgTheme] = useState(colorTheme);
  const [showModal, setShowModal] = useState(false);
  const [showModalNew, setShowModalNew] = useState(false);
  const [showModalSort, setShowModalSort] = useState(false);
  const [showModalShareStory, setShowModalShareStory] = useState(false);
  const [sharedStory, setSharedStory] = useState<any>(null);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [listCollection, setListCollection] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [items, setItems] = useState(null);
  const [listLibrary, setListLibrary] = useState([]);
  const [isSwipingLeft, setIsSwipingLeft] = useState(false);
  const [isSwipingRight, setIsSwipingRight] = useState(false);
  const [showModalNewStory, setShowModalNewStory] = useState(false);
  const [products, setProducts] = useState([]);
  const productIds = ['unlock_story_1_week_only'];
  // useEffect(() => {
  //   const initializeConnection = async () => {
  //     try {
  //       await initConnection();
  //       if (Platform.OS === "android") {
  //         await flushFailedPurchasesCachedAsPendingAndroid();
  //       }
  //     } catch (error) {
  //       console.error("An error occurred", error.message);
  //     }
  //   }
  //   const purchaseUpdate = purchaseUpdatedListener(
  //     async (purchase) => {
  //       const receipt = purchase.transactionReceipt;

  //       if (receipt) {
  //         try {
  //           await finishTransaction({ purchase, isConsumable: true });
  //         } catch (error) {
  //           console.error("An error occurred", error.message);
  //         }
  //       }
  //     });

  //   const purchaseError = purchaseErrorListener((error) =>
  //     console.error('Purchase error', error.message));
  //   initializeConnection();
  //   new purchaseUpdate();
  //   new purchaseError();
  //   fetchProducts();
  //   return () => {
  //     endConnection();
  //     purchaseUpdate.remove();
  //     purchaseError.remove();
  //   }
  // }, []);
  // const fetchProducts = async () => {
  //   try {
  //     const products = await getProducts({
  //       skus: Platform.select({
  //         ios: ['unlock_story_1_week_only'],
  //         android: ['com.rniap.product100', 'com.rniap.product200'],
  //       })
  //     });
  //     setProducts(products);
  //   } catch (error) {
  //     console.error("Error occurred while fetching products", error.message);
  //   }
  // };

  const renderCollect = item => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
      }}>
      <LibrarySvg fill={code_color.white} width={20} height={20} />
      <Text allowFontScaling={false} style={{marginLeft: 20, flex: 1}}>
        {item.name}
      </Text>
      <BackRightSvg />
    </View>
  );

  const renderContent = item => {
    return (
      <View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: bgTheme,
            borderColor: '#778DFF',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            paddingVertical: 10,
          }}>
          <Image
            source={{uri: `${BACKEND_URL}${item?.item?.category?.cover?.url}`}}
            style={{width: 100, height: 100}}
            resizeMode="contain"
          />
          <View
            style={{
              marginLeft: 20,
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Text allowFontScaling={false} style={{color: code_color.white}}>
              {item?.item?.title_en}
            </Text>
            <Text allowFontScaling={false} style={{color: code_color.white}}>
              {item?.item?.content_en?.substring(0, 48)}
            </Text>
            {!isPremium && (
              <View
                style={{
                  backgroundColor: '#ED5267',
                  padding: 5,
                  borderRadius: 10,
                  marginVertical: 5,
                  width: 150,
                }}>
                <Text
                  allowFontScaling={false}
                  style={{color: code_color.white, fontSize: 10}}>
                  USD 0,50 For 1 Week Access
                </Text>
              </View>
            )}
          </View>

          <DotSvg />
        </View>
        {/* <View
        style={{borderColor: '#778DFF', borderWidth: 1, paddingVertical: 10, backgroundColor: bgTheme}}
      /> */}
      </View>
    );
  };
  const renderContentCollection = item => {
    return (
      <View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: bgTheme,
            borderColor: '#778DFF',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            paddingVertical: 10,
          }}>
          <LibrarySvg fill={'white'} width={30} height={30} />
          <View
            style={{
              marginLeft: 20,
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Text
              allowFontScaling={false}
              style={{color: code_color.white, paddingVertical: 15}}>
              {item?.item?.name}
            </Text>
          </View>

          <BackRightSvg />
        </View>
      </View>
    );
  };

  const closeRow = (rowMap, rowKey) => {
    // if (rowMap[rowKey]) {
    //     rowMap[rowKey].closeRow();
    // }
    setShowModal(true);
  };

  const deleteRow = (rowMap, rowKey) => {
    // closeRow(rowMap, rowKey);
    // const [section] = rowKey.split('.');
    // const newData = [...listData];
    // const prevIndex = listData[section].data.findIndex(
    //     item => item.key === rowKey
    // );
    // newData[section].data.splice(prevIndex, 1);
    // setListData(newData);
  };

  const deleteRowCollection = async rowMap => {
    try {
      const res = await deleteMyCollection(rowMap.item.id);
      handleRestart();
    } catch (error) {}
  };
  const handleEditCollect = rowMap => {
    setId(rowMap.item);
    setShowModalNew(true);
    setEdit(true);
  };
  useEffect(() => {
    handleRestart();
  }, [keyword, items]);
  const handleRestart = async () => {
    setShowModalNew(false);
    try {
      let params = {
        search: keyword,
        column: items?.column,
        dir: items?.value,
      };
      const res = await getMyCollection(params);
      setListCollection(res.data);
      setListLibrary(res.outsides);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  const handleTouchStart = e => {
    // Mendapatkan posisi sentuhan
    const touchX = e.nativeEvent.locationX;
    // Menghitung setengah lebar layar
    const halfScreenWidth = Dimensions.get('window').width / 2;
    // Jika sentuhan terjadi di sebelah kiri, set isSwipingLeft ke true
    if (touchX < halfScreenWidth) {
      console.log('masuk kiri');
      handleSetSteps(3 - 1);
      navigate('Main');
      setIsSwipingLeft(true);
    }
    // Jika sentuhan terjadi di sebelah kanan, set isSwipingRight ke true
    else {
      console.log('masuk kanan');
      handleSetSteps(3 + 1);
      navigate('ExploreLibrary');
      setIsSwipingRight(true);
    }
  };
  const handleTouchEnd = () => {
    // Reset status swipe saat sentuhan selesai
    setIsSwipingLeft(false);
    setIsSwipingRight(false);
  };
  const renderProgress = () => <StepHeader currentStep={3} />;
  const renderTutorial = () => {
    if (stepsTutorial === 3) {
      return (
        <SafeAreaView
          // onTouchStart={handleTouchStart}
          // onTouchEnd={handleTouchEnd}
          style={{
            position: 'absolute',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            top: '-70%',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          {renderProgress()}
          <View
            style={{
              backgroundColor: '#3F58DD',
              borderRadius: 20,
              padding: 10,
              marginHorizontal: 40,
              alignItems: 'center',
              marginTop: '40%',
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
                marginBottom: 20,
              }}>
              {
                'Re-discover your favorite\nStories that are saved\nin your Library.'
              }
            </Text>

            <Button
              style={{
                backgroundColor: code_color.yellow,
                padding: 10,
                paddingHorizontal: 40,
                borderRadius: 20,
                marginVertical: 10,
              }}
              title={i18n.t('Next')}
              onPress={() => {
                // setTutorial({
                //   ...isTutorial,
                //   step: isTutorial.step + 1,
                // });
                handleSetSteps(3 + 1);
                navigate('ExploreLibrary');
              }}
            />
          </View>
        </SafeAreaView>
      );
    }
  };

  return (
    <View>
      <View style={{flex: 0, height: 500, backgroundColor: bgTheme}}>
        <ModalLibrary
          isVisible={showModal}
          onClose={() => setShowModal(false)}
        />
        <ModalNewLibrary
          isVisible={showModalNew}
          onClose={() => setShowModalNew(false)}
          restart={() => {
            setEdit(false);
            handleRestart();
          }}
          edit={edit}
          data={id}
        />
        <ModalSorting
          isVisible={showModalSort}
          onClose={() => setShowModalSort(false)}
          items={(value: any) => setItems(value)}
        />
        <ModalShareStory
          storyData={sharedStory}
          isVisible={showModalShareStory}
          onClose={() => {
            setShowModalShareStory(false);
            setSharedStory(null);
          }}
        />
        <ModalNewStory
          isVisible={showModalNewStory}
          onClose={() => setShowModalNewStory(false)}
          onWatchAds={() => {
            setShowModalNewStory(false);
            setShowModal(true);
          }}
          onUnlock={() => {
            setShowModalNewStory(false);
            handleNativePayment('unlock_story_1_week_only');
          }}
          onGetUnlimit={() => {
            setShowModalNewStory(false);

            // setShowModalSuccessPurchase(true);
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <Pressable onPress={() => setShowModalNewStory(true)}>
            <Image source={libraryAdd} />
          </Pressable>

          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              flex: 1,
              // padding: 10,
              borderRadius: 10,
              margin: 10,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
              height: 40,
            }}>
            <SearchSvg />
            <TextInput
              placeholder="Search"
              placeholderTextColor={code_color.black}
              allowFontScaling={false}
              value={keyword}
              onChangeText={value => setKeyword(value)}
              style={{marginLeft: 10, fontSize: 14}}
            />
          </View>
          <Pressable onPress={() => setShowModalSort(true)}>
            <DescendingSvg fill={code_color.white} />
          </Pressable>
        </View>

        {listCollection && listCollection?.length > 0 ? (
          <ScrollView>
            <SwipeListView
              data={listCollection}
              renderItem={item => renderContentCollection(item)}
              renderHiddenItem={(_data, _rowMap) => (
                <View style={styles.rowBack}>
                  <TouchableOpacity
                    style={[
                      styles.backLeftCollectBtn,
                      styles.backLeftBtnCollect,
                    ]}
                    onPress={() => handleEditCollect(_data)}>
                    <EditSvg />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.backRightCollectBtn,
                      styles.backRightBtnCollect,
                    ]}
                    onPress={() => {
                      Alert.alert(
                        'Are you sure you want to remove this collection?',
                        '',
                        [
                          {
                            text: 'Yes',
                            onPress: () => {
                              deleteRowCollection(_data);
                              // handleDelete(item.id);
                            },
                          },
                          {text: 'Cancel', onPress: () => {}},
                        ],
                      );
                    }}>
                    <DeleteSvg />
                  </TouchableOpacity>
                </View>
              )}
              rightOpenValue={-120}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
            />
            <SwipeListView
              data={listLibrary}
              renderItem={item => renderContent(item)}
              renderHiddenItem={(_data, _rowMap) => (
                <View style={styles.rowBack}>
                  <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnLeft]}
                    onPress={() => setShowModal()}>
                    <LibraryAddSvg />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightCenter]}
                    onPress={() => {
                      setSharedStory(_data);
                      setShowModalShareStory(true);
                    }}>
                    <ShareSvg />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                    onPress={() => {
                      Alert.alert(
                        'Are you sure you want to remove this story from your library?',
                        '',
                        [
                          {
                            text: 'Yes',
                            onPress: () => {
                              // handleDelete(item.id);
                            },
                          },
                          {text: 'Cancel', onPress: () => {}},
                        ],
                      );
                    }}>
                    <DeleteSvg />
                  </TouchableOpacity>
                </View>
              )}
              rightOpenValue={-180}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
            />
          </ScrollView>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <EmptyLibrary />
            <Text
              style={{
                color: code_color.white,
                fontSize: 14,
                fontWeight: '400',
                textAlign: 'center',
                lineHeight: 21,
                marginTop: 22,
                width: sizing.getDimensionWidth(0.9),
              }}>
              {
                'You don’t have any Stories saved in your library yet.\nTap the “♥︎“-icon on the main screen to save your\nfavorite Stories in your Library.'
              }
            </Text>
          </View>
        )}
        <View
          style={{
            width: sizing.getDimensionWidth(1),
            alignItems: 'center',
            backgroundColor: bgTheme,
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: -5,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 8,
          }}>
          <TouchableOpacity
            onPress={() => handleSomeAction('ExploreLibrary')}
            style={{
              backgroundColor: code_color.yellow,
              marginTop: moderateScale(20),
              padding: moderateScale(10),
              borderRadius: 8,
              width: sizing.getDimensionWidth(0.9),
              marginBottom: moderateScale(20),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LibrarySvg fill={code_color.black} width={20} height={20} />
            <Text
              style={{
                color: code_color.black,
                fontWeight: 500,
                fontSize: moderateScale(14),
                marginLeft: 20,
              }}>
              Explore more Stories
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {renderTutorial()}
    </View>
  );
};

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    // backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backLeftCollectBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 60,
    height: 69,
  },
  backRightCollectBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 60,
    height: 69,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 60,
    // height: 40
  },
  backLeftBtnCollect: {
    backgroundColor: '#FF932F',
    right: 60,
  },
  backRightBtnCollect: {
    backgroundColor: '#FF453B',
    right: 0,
  },
  backRightBtnLeft: {
    backgroundColor: '#797BFE',
    right: 120,
  },
  backRightCenter: {
    backgroundColor: '#3493FD',
    right: 60,
  },
  backRightBtnRight: {
    backgroundColor: '#FF453B',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
});

LibraryScreen.propTypes = {
  activeVersion: PropTypes.any,
  handleSomeAction: PropTypes.func,
};

LibraryScreen.defaultProps = {
  activeVersion: null,
};

export default connect(states, dispatcher)(LibraryScreen);
