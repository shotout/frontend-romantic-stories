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
} from 'react-native';
import {bg, cover1, cover2, libraryAdd, logo} from '../../assets/images';
import {code_color} from '../../utils/colors';
import i18n from '../../i18n/index';
import {getDefaultLanguange} from '../../utils/devices';
import Button from '../../components/buttons/Button';
import {navigate} from '../../shared/navigationRef';
import LibrarySvg from '../../assets/icons/bottom/library.jsx';
import SearchSvg from '../../assets/icons/search.jsx';
import DescendingSvg from '../../assets/icons/descending.jsx';
import BackRightSvg from '../../assets/icons/backRight.jsx';
import LibraryAddSvg from '../../assets/icons/libraryAdd';
import ShareSvg from '../../assets/icons/share';
import DeleteSvg from '../../assets/icons/delete';
import EditSvg from '../../assets/icons/edit';
import DotSvg from '../../assets/icons/dot.jsx';
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

const LibraryScreen = ({colorTheme}) => {
  const [bgTheme, setBgTheme] = useState(colorTheme);
  const [showModal, setShowModal] = useState(false);
  const [showModalNew, setShowModalNew] = useState(false);
  const [showModalSort, setShowModalSort] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [listCollection, setListCollection] = useState([]);
  const [keyword, setKeyword] = useState('')
  const [listLibrary, setListLibrary] = useState([
   
  ]);

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
              {item?.item?.content_en}
            </Text>
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

  const deleteRowCollection =  async (rowMap) => {
    try {
      const res = await deleteMyCollection(rowMap.item.id)
      handleRestart()
    } catch (error) {
      
    }
  };
  const handleEditCollect = (rowMap) => {
    setId(rowMap.item)
    setShowModalNew(true)
    setEdit(true)
  }
  useEffect(() => {
    handleRestart();
  }, [keyword]);
  const handleRestart = async () => {
    setShowModalNew(false);
    try {
      let params = {
        keyword
      }
      const res = await getMyCollection(params);
      setListCollection(res.data);
      setListLibrary(res.outsides);
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  };
  return (
    <View style={{flex: 0, height: 500, backgroundColor: bgTheme}}>
      <ModalLibrary isVisible={showModal} onClose={() => setShowModal(false)} />
      <ModalNewLibrary
        isVisible={showModalNew}
        onClose={() => setShowModalNew(false)}
        restart={() => {
          setEdit(false)
          handleRestart();
        }}
        edit={edit}
        data={id}
      />
      <ModalSorting
        isVisible={showModalSort}
        onClose={() => setShowModalSort(false)}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
        }}>
        <Pressable onPress={() => setShowModalNew(true)}>
          <Image source={libraryAdd} />
        </Pressable>

        <View
          style={{
            backgroundColor: code_color.white,
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
            allowFontScaling={false}
            value={keyword}
            onChangeText={(value) => setKeyword(value)}
            style={{marginLeft: 10, fontSize: 14}}
          />
        </View>
        <Pressable onPress={() => setShowModalSort(true)}>
          <DescendingSvg fill={code_color.white} />
        </Pressable>
      </View>
      <ScrollView>
      <SwipeListView
        data={listCollection}
        renderItem={item => renderContentCollection(item)}
        renderHiddenItem={(_data, _rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={[styles.backLeftCollectBtn, styles.backLeftBtnCollect]}
              onPress={() => handleEditCollect(_data)}>
              <EditSvg />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.backRightCollectBtn, styles.backRightBtnCollect]}
              onPress={() => {
                Alert.alert(
                  'Are you sure you want to remove this collection?',
                  '',
                  [
                    {
                      text: 'Yes',
                      onPress: () => {
                        deleteRowCollection(_data)
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
              onPress={() => deleteRow(_rowMap, _data.id)}>
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
    height: 69
  },
  backRightCollectBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 60,
    height: 69
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
};

LibraryScreen.defaultProps = {
  activeVersion: null,
};

export default connect(states, dispatcher)(LibraryScreen);
