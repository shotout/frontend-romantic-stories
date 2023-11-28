import React from 'react';
import {Image, View} from 'react-native';
import {imgStep2} from '../../assets/images';
import * as Animatable from 'react-native-animatable';
import {code_color} from '../../utils/colors';
import i18n from '../../i18n/index';
import Button from '../../components/buttons/Button';

const Step2 = ({handleNext}) => {
  return (
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
        source={imgStep2}
        resizeMode="contain"
        style={{
          width: 100,
          height: 200,
          position: 'absolute',
          top: -100,
        }}
      />
      <Animatable.Text
        delay={200}
        duration={2000}
        animation={'fadeIn'}
        style={{
          color: code_color.white,
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 20,
          marginTop: 20,
          lineHeight: 25,
        }}>
        {'Like & save your\r\nfavorite Stories.'}
      </Animatable.Text>
      <Animatable.View delay={2200} animation={'fadeIn'} duration={2000}>
        <Button
          style={{
            backgroundColor: code_color.yellow,
            padding: 10,
            paddingHorizontal: 40,
            borderRadius: 20,
            marginVertical: 10,
          }}
          title={i18n.t('Next')}
          onPress={handleNext}
        />
      </Animatable.View>
    </View>
  );
};

export default Step2;
