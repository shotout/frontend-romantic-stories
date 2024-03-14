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
import DescendingSvg from '../../assets/icons/descending.jsx';
import Button from '../buttons/Button';
import CloseSvg from '../../assets/icons/close';
import ChecklistSvg from '../../assets/icons/checklist';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {addNewCollection, updateMyCollection} from '../../shared/request';

function ModaNewLibrary({isVisible, onClose, restart, edit, data}) {
 
  const [collect, setCollect] = useState(!data?.name ?  '' : data?.name);
  const handleClose = () => {
    onClose();
  };

  const AddCollection = async () => {
    if(collect != ''){
      if(edit){
        const payload = {
          name: collect,
          _method: 'PATCH'
        }
        try {
          const res = await updateMyCollection(
            payload,
            data?.id,
          );
          restart()
        } catch (error) {
          if(__DEV__){
          console.log(error)
          }
        }
      }else{
        try {
          const res = await addNewCollection({
            name: collect,
          });
          restart()
        } catch (error) {}
      }
      
    }
    
  };

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
              <Pressable
                onPress={() => handleClose()}
                style={{alignItems: 'flex-end'}}>
                <CloseSvg width={15} height={15} />
              </Pressable>
              <View style={{alignItems: 'center', flex: 1}}>
                <LibrarySvg fill={code_color.splash} width={60} height={60} />
                <Text
                  style={{
                    color: code_color.blackDark,
                    marginTop: 10,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  New Collection
                </Text>
                <Text
                  style={{
                    color: code_color.blackDark,
                    marginTop: 10,
                    textAlign: 'center',
                    marginHorizontal: 40,
                  }}>
                  {edit ? 'Edit a name for your new collection. You can edit it later.' : 'Add a name for your new collection. You can edit it later.'}
                </Text>
                <TextInput
                  style={{
                    padding: 10,
                    borderColor: code_color.splash,
                    borderWidth: 1,
                    borderRadius: 10,
                    width: '90%',
                    marginVertical: 20,
                  }}
                  value={collect}
                  placeholder="Collection name"
                  onChangeText={text => setCollect(text)}
                />
                <Button
                  title={edit ? 'Edit collection' : 'Add collection'}
                  style={{
                    backgroundColor: !collect
                      ?
                      code_color.greyDefault :
                      code_color.yellow,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // height: 52,
                    padding: 10,
                    borderRadius: 12,
                    width: '90%',
                  }}
                  onPress={() => AddCollection()}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
}

ModaNewLibrary.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModaNewLibrary.defaultProps = {};

export default connect(states, dispatcher)(ModaNewLibrary);
