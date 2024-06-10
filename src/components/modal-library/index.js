import React, {useEffect, useState} from 'react';
import {Modal, View, Text, Pressable, Image, TextInput} from 'react-native';
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
import ChecklistSvg from '../../assets/icons/checklist';
import {addToCollection} from '../../shared/request';
import {imgSearchNull, libraryAdd} from '../../assets/images';
import {sizing} from '../../shared/styling';
import ModalSorting from '../modal-sorting';
import ModalNewLibrary from '../modal-new-library';
import {hp} from '../../utils/screen';
import {moderateScale} from 'react-native-size-matters';

function ModalLibrary({
  isVisible,
  onClose,
  data,
  storyId,
  colorTheme,
  keyword,
  setKeyword,
  setItems,
  handleRestart,
}) {
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
      <View
        style={{flexDirection: 'row', alignItems: 'center', margin: hp(10)}}>
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
            color: code_color.white,
            marginLeft: 10,
            fontSize: moderateScale(18),
            fontWeight: 'bold',
          }}>
          Move to Collection
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: hp(10),
        }}>
        <Pressable
          onPress={() => setShowModalNew(true)}
          style={{
            height: hp(30),
            width: hp(30),
            backgroundColor: code_color.white,
            borderRadius: hp(15),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={libraryAdd}
            resizeMode="contain"
            style={{width: hp(20), height: hp(20)}}
          />
        </Pressable>
        <View
          style={{
            backgroundColor: code_color.white,
            flex: 1,
            borderRadius: hp(10),
            margin: hp(10),
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: hp(10),
            height: hp(40),
          }}>
          <SearchSvg height={hp(20)} width={hp(20)} />
          <TextInput
            value={keyword}
            onChangeText={text => setKeyword(text)}
            placeholder="Search"
            placeholderTextColor={'black'}
            allowFontScaling={false}
            style={{marginLeft: hp(10), fontSize: moderateScale(16)}}
          />
        </View>
        <Pressable onPress={() => setShowModalSort(true)}>
          <DescendingSvg
            fill={code_color.white}
            height={hp(30)}
            width={hp(30)}
          />
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
              margin: hp(20),
              borderBottomColor: code_color.blackDark,
              paddingBottom: hp(10),
              borderBottomWidth: 1,
            }}>
            <LibrarySvg
              fill={code_color.blackDark}
              width={hp(20)}
              height={hp(20)}
            />
            <Text
              allowFontScaling={false}
              style={{marginLeft: hp(20), flex: 1, color: code_color.blackDark,}}>
              {item.name}
            </Text>
            <Pressable
              onPress={() => setSelect(item)}
              style={{
                borderWidth: 1,
                borderColor: code_color.blackDark,
                backgroundColor:
                  select?.name === item.name ? code_color.splash : null,
                width: hp(30),
                height: hp(30),
                borderRadius: hp(20),
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
          <View style={{borderRadius: hp(30)}}>
            <Image
              resizeMode="contain"
              source={imgSearchNull}
              style={{width: hp(100), height: hp(100)}}
            />
          </View>

          <Text
            style={{
              color: code_color.black,
              fontSize: moderateScale(16),
              fontWeight: '400',
              textAlign: 'center',
              lineHeight: 21,
              marginTop: hp(22),
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
              height: hp(52),
              margin: hp(20),
              borderRadius: hp(12),
              position: 'absolute',
              bottom: hp(20),
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
        items={value => {
          setShowModalSort(false);
          setItems(value);
        }}
      />
      <ModalNewLibrary
        isVisible={showModalNew}
        onClose={() => setShowModalNew(false)}
        restart={() => {
          setShowModalNew(false);
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
