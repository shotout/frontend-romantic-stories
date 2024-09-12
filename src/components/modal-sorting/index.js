import React, {useEffect, useState} from 'react';
import {
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  View,
  Text,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import BackLeft from '../../assets/icons/bottom/backLeft';
import {code_color} from '../../utils/colors';
import {libraryAdd} from '../../assets/images';
import LibrarySvg from '../../assets/icons/libraryAdd';
import SearchSvg from '../../assets/icons/search.jsx';
import Button from '../buttons/Button';
import CloseSvg from '../../assets/icons/close';
import ChecklistSvg from '../../assets/icons/checklist';
import Assending from '../../assets/icons/assending';
import Descending from '../../assets/icons/dessending';
import Newest from '../../assets/icons/newest';
import Oldest from '../../assets/icons/oldest';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function ModalSorting({isVisible, onClose, items, colorTheme}) {
  const [select, setSelect] = useState('A to Z');
  const [selectItem, setSelectItem] = useState(null);
  const [listSort, setSort] = useState([
    {
      name: 'A to Z',
      value: 'asc',
      column: 'name',
      icon: Assending,
    },
    {
      name: 'Z to A',
      value: 'desc',
      column: 'name',
      icon: Descending,
    },
    {
      name: 'Newest First',
      value: 'desc',
      column: 'id',
      icon: Newest,
    },
    {
      name: 'Oldest First',
      value: 'asc',
      column: 'id',
      icon: Oldest,
    },
  ]);
  const handleClose = () => {
    onClose();
  };

  const handleSelect = item => {
    setSelect(item.name);
    setSelectItem(item);
    items(item);
    handleClose();
  };
  const renderList = () => (
    <View style={{alignItems: 'center', flex: 1}}>
      {listSort.map((item, idx) => (
        <Pressable
          key={idx}
          onPress={() => {
            handleSelect(item);
          }}
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            flex: 1,
            paddingBottom: 10,
            marginVertical: 10,
          }}>
          <item.icon fill={colorTheme} width={30} height={30} />

          <Text
            allowFontScaling={false}
            style={{flex: 1, fontSize: 16, marginLeft: 10, color: code_color.blackDark}}>
            {item.name}
          </Text>

          <Pressable
            onPress={() => {
              handleSelect(item);
            }}
            style={{
              borderWidth: 1,
              borderColor: select === item.name ? colorTheme : '#B2B6BB',
              backgroundColor: select === item.name ? colorTheme : null,
              width: 30,
              height: 30,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {select ? (
              <ChecklistSvg fill={code_color.white} height={14} width={14} />
            ) : null}
          </Pressable>
        </Pressable>
      ))}
    </View>
  );
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={handleClose}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          style={{flex: 1}}
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <View
            style={{
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '70%',
                backgroundColor: code_color.white,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
                borderRadius: 10,
                padding: 10,
              }}>
              <View style={{alignItems: 'flex-end'}}>
                <Pressable
                  onPress={() => handleClose()}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 30,
                    width: 30,
                  }}>
                  <CloseSvg width={20} height={20} />
                </Pressable>
              </View>

              <View style={{alignItems: 'center', flex: 1}}>
                <Text
                  style={{
                    color: code_color.blackDark,
                    marginVertical: 10,
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  Sort by
                </Text>
                {renderList()}
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
}

ModalSorting.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalSorting.defaultProps = {};

export default connect(states, dispatcher)(ModalSorting);
