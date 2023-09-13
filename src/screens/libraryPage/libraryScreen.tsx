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
import DotSvg from '../../assets/icons/dot.jsx';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {connect} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
const LibraryScreen = ({colorTheme}) => {
  const [bgTheme, setBgTheme] = useState(colorTheme);
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
      <Text style={{marginLeft: 20, flex: 1}}>{item.name}</Text>
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
        }}>
        <Image source={cover1} />
        <View
          style={{
            marginLeft: 20,
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Text style={{color: code_color.white}}>Fistful of Reefer</Text>
          <Text style={{color: code_color.white}}>I Miss You</Text>
          <View
            style={{
              backgroundColor: '#ED5267',
              padding: 5,
              borderRadius: 10,
              marginVertical: 5,
              width: 150,
            }}>
            <Text style={{color: code_color.white, fontSize: 10}}>
              USD 0,50 For 1 Week Access
            </Text>
          </View>
        </View>

        <DotSvg />
      </View>
      <View
        style={{borderColor: '#778DFF', borderWidth: 1, marginVertical: 10}}
      />
    </View>
  );

  const closeRow = (rowMap, rowKey) => {
    // if (rowMap[rowKey]) {
    //     rowMap[rowKey].closeRow();
    // }
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
        }}>
        <Image source={libraryAdd} />
        <View
          style={{
            backgroundColor: code_color.white,
            flex: 1,
            padding: 10,
            borderRadius: 10,
            margin: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <SearchSvg />
          <Text style={{marginLeft: 10, fontSize: 14}}>Search</Text>
        </View>
        <DescendingSvg fill={code_color.white} />
      </View>
      <View
        style={{borderColor: '#778DFF', borderWidth: 1, marginVertical: 10}}
      />
      <SwipeListView
        data={listLibrary}
        renderItem={item => renderContent(item)}
        renderHiddenItem={(_data, _rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnLeft]}
              onPress={() => closeRow(_rowMap, _data.name)}>
              <Text style={styles.backTextWhite}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={() => deleteRow(_rowMap, _data.name)}>
              <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-150}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />

      {/* <View
        style={{borderColor: '#778DFF', borderWidth: 1, marginVertical: 10}}
      />

      <View
        style={{borderColor: '#778DFF', borderWidth: 1, marginVertical: 10}}
      />
      <View
        style={{
          marginHorizontal: 10,
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image source={cover2} />
        <View
          style={{
            marginLeft: 20,
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Text style={{color: code_color.white}}>Fistful of Reefer</Text>
          <Text style={{color: code_color.white}}>I Miss You</Text>
          <View
            style={{
              backgroundColor: '#ED5267',
              padding: 5,
              borderRadius: 10,
              marginVertical: 5,
              width: 150,
            }}>
            <Text style={{color: code_color.white, fontSize: 10}}>
              USD 0,50 For 1 Week Access
            </Text>
          </View>
        </View>

        <DotSvg />
      </View>
      <View
        style={{borderColor: '#778DFF', borderWidth: 1, marginVertical: 10}}
      /> */}
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
    width: 75,
    // height: 40
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
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
