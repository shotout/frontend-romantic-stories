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
import LibrarySvg from '../../assets/icons/bottom/library.jsx';
import SearchSvg from '../../assets/icons/search.jsx';
import DescendingSvg from '../../assets/icons/descending.jsx';
import Button from '../buttons/Button';
import BackRightSvg from '../../assets/icons/backRight';
import ChecklistSvg from '../../assets/icons/checklist';

function ModalLibrary({isVisible, onClose}) {
  const [listLibrary, setList] = useState([
    {
      name: 'Recently added collection',
      icon: <LibrarySvg />,
      iconRight: <BackRightSvg />,
      type: 1,
      title: '',
      desc: '',
      price: '',
    },
  ]);
  const [select, setSelect] = useState(null);
  const handleClose = () => {
    // if (typeof onClose === 'function') {
    //   onClose();
    // }
  };

  const header = () => (
    <View style={{backgroundColor: code_color.splash}}>
      <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
        <Pressable
          onPress={() => onClose()}
          style={{
            backgroundColor: code_color.white,
            width: 30,
            height: 30,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <BackLeft width={20} height={20} fill={code_color.splash} />
          </View>
        </Pressable>
        <Text
          allowFontScaling={false}
          style={{
            color: code_color.white,
            marginLeft: 10,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Move to Collection
        </Text>
      </View>
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
         
      
            borderRadius: 10,
            margin: 10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
            height: 40
          }}>
          <SearchSvg />
          <TextInput
            placeholder="Search"
            allowFontScaling={false}
            style={{marginLeft: 10, fontSize: 14}}
          />
        </View>
        <DescendingSvg fill={code_color.white} />
      </View>
    </View>
  );

  const renderList = () => (
    <View>
      {listLibrary.map(item => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 20,
            borderBottomColor: code_color.blackDark,
            paddingBottom: 10,
            borderBottomWidth: 1,
          }}>
          <LibrarySvg fill={code_color.blackDark} width={20} height={20} />
          <Text allowFontScaling={false} style={{marginLeft: 20, flex: 1}}>
            {item.name}
          </Text>
          <Pressable
            onPress={() => setSelect(item.name)}
            style={{
              borderWidth: 1,
              borderColor: code_color.blackDark,
              backgroundColor: select ? code_color.splash : null,
              width: 30,
              height: 30,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {select ? <ChecklistSvg fill={code_color.white} /> : null}
          </Pressable>
        </View>
      ))}
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onDismiss={handleClose}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            height: '60%',
            backgroundColor: code_color.white,
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}>
          {header()}
          {renderList()}
          <Button
            title={'Move the story to this collection'}
            style={{
              backgroundColor: select
                ? code_color.yellow
                : code_color.greyDefault,
              alignItems: 'center',
              justifyContent: 'center',
              height: 52,
              margin: 20,
              borderRadius: 12,
              position: 'absolute',
              bottom: 20,
              width: '90%',
            }}
            onPress={() => {}}
          />
        </View>
      </View>
    </Modal>
  );
}

ModalLibrary.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalLibrary.defaultProps = {};

export default connect(states, dispatcher)(ModalLibrary);
