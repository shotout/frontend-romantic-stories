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
  Alert,
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import BackLeft from '../../assets/icons/bottom/backLeft';
import {code_color} from '../../utils/colors';
import LibrarySvg from '../../assets/icons/bottom/library.jsx';
import SearchSvg from '../../assets/icons/search.jsx';
import DescendingSvg from '../../assets/icons/descending.jsx';
import Button from '../buttons/Button';
import BackRightSvg from '../../assets/icons/backRight';
import ChecklistSvg from '../../assets/icons/checklist';
import {addToCollection} from '../../shared/request';
import {imgSearchNull, libraryAdd} from '../../assets/images';
import {sizing} from '../../shared/styling';
import ModalSorting from '../modal-sorting';
import ModalNewLibrary from '../modal-new-library';

function ModalLibrary({
  isVisible,
  onClose,
  data,
  storyId,
  colorTheme,
  keyword,
  setKeyword,
  setItems,
  handleRestart
}) {
  const [listLibrary, setList] = useState(data);
  const [id, setId] = useState(storyId);
  const [select, setSelect] = useState(null);
  const [showModalSort, setShowModalSort] = useState(false);
  const [showModalNew, setShowModalNew] = useState(false);
  const handleClose = () => {
    // if (typeof onClose === 'function') {
    //   onClose();
    // }
  };

  useEffect(() => {}, [keyword]);
  const header = () => (
    <View style={{backgroundColor: colorTheme}}>
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
            <BackLeft width={20} height={20} fill={colorTheme} />
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
         <Pressable
            onPress={() => setShowModalNew(true)}
            style={{
              height: 30,
              width: 30,
              backgroundColor: code_color.white,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={libraryAdd}
              resizeMode="contain"
              style={{width: 20, height: 20}}
            />
          </Pressable>
        <View
          style={{
            backgroundColor: code_color.white,
            flex: 1,
            borderRadius: 10,
            margin: 10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
            height: 40,
          }}>
          <SearchSvg />
          <TextInput
            value={keyword}
            onChangeText={text => setKeyword(text)}
            placeholder="Search"
            placeholderTextColor={'black'}
            allowFontScaling={false}
            style={{marginLeft: 10, fontSize: 14}}
          />
        </View>
        <Pressable onPress={() => setShowModalSort(true)}>
          <DescendingSvg fill={code_color.white} />
        </Pressable>
      </View>
    </View>
  );

  const renderList = () => (
    <View>
      {data.length > 0 ? (
        data?.map(item => (
          <Pressable
            onPress={() => setSelect(item)}
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
              onPress={() => setSelect(item)}
              style={{
                borderWidth: 1,
                borderColor: code_color.blackDark,
                backgroundColor:
                  select?.name === item.name ? code_color.splash : null,
                width: 30,
                height: 30,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {select?.name === item.name ? (
                <ChecklistSvg fill={code_color.white} />
              ) : null}
            </Pressable>
          </Pressable>
        ))
      ) : (
        <View style={{alignItems: 'center'}}>
          <View style={{borderRadius: 30}}>
            <Image
              resizeMode="contain"
              source={imgSearchNull}
              style={{width: 100, height: 100}}
            />
          </View>

          <Text
            style={{
              color: code_color.black,
              fontSize: 16,
              fontWeight: '400',
              textAlign: 'center',
              lineHeight: 21,
              marginTop: 22,
              width: sizing.getDimensionWidth(0.9),
            }}>
            {'We can’t find that title in your collection.'}
          </Text>
        </View>
      )}
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
            onPress={() => {
              addToCollection(select?.id, storyId);
              setTimeout(() => {
                onClose();
              }, 200);
            }}
          />
        </View>
      </View>
      <ModalSorting
        isVisible={showModalSort}
        onClose={() => setShowModalSort(false)}
        items={(value: any) => {
          setShowModalSort(false);
          setItems(value);
        }}
      />
      <ModalNewLibrary
          isVisible={showModalNew}
          onClose={() => setShowModalNew(false)}
          restart={() => {
            setShowModalNew(false)
            handleRestart();
          }}
          edit={false}
          data={id}
        />
    </Modal>
  );
}

ModalLibrary.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalLibrary.defaultProps = {};

export default connect(states, dispatcher)(ModalLibrary);
