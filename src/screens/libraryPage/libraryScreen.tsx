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
import DotSvg from '../../assets/icons/dot.jsx';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {connect} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import ModalLibrary from '../../components/modal-library';
import ModalNewLibrary from '../../components/modal-new-library';
import ModalSorting from '../../components/modal-sorting';

const LibraryScreen = ({colorTheme}) => {
  const [bgTheme, setBgTheme] = useState(colorTheme);
  const [showModal, setShowModal] = useState(false);
  const [showModalNew, setShowModalNew] = useState(false);
  const [showModalSort, setShowModalSort] = useState(false);
  const [listLibrary, setListLibrary] = useState([
    {
      name: 'Recently added collection',
      icon: <LibrarySvg />,
      iconRight: <BackRightSvg />,
      type: 1,
      title: '',
      desc: '',
      price: '',
    },
    {
      name: '',
      icon: <LibrarySvg />,
      iconRight: <BackRightSvg />,
      type: 0,
      title: 'Fistful of Reefer',
      desc: 'I Miss You',
      price: 'USD 0,50 For 1 Week Access',
    },
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

  const renderContent = item => (
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
        <Image source={cover1} />
        <View
          style={{
            marginLeft: 20,
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Text allowFontScaling={false} style={{color: code_color.white}}>
            Fistful of Reefer
          </Text>
          <Text allowFontScaling={false} style={{color: code_color.white}}>
            I Miss You
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
  return (
    <View style={{flex: 0, height: 500, backgroundColor: bgTheme}}>
      <ModalLibrary isVisible={showModal} onClose={() => setShowModal(false)} />
      <ModalNewLibrary
        isVisible={showModalNew}
        onClose={() => setShowModalNew(false)}
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
            style={{marginLeft: 10, fontSize: 14}}
          />
        </View>
        <Pressable onPress={() => setShowModalSort(true)}>
        <DescendingSvg fill={code_color.white} />
        </Pressable>
      </View>
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
              onPress={() => deleteRow(_rowMap, _data.name)}>
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
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 60,
    // height: 40
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
