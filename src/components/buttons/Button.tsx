/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {code_color} from '../../utils/colors';
import {moderateScale} from 'react-native-size-matters';
import {hp, wp} from '../../utils/screen';

export default function Button({
  style,
  onPress,
  title,
  colorsText,
  image,
}) {
  return (
    <>
      <TouchableOpacity
        onPress={() => onPress()}
        style={
          style != undefined
            ? style
            : {
                backgroundColor: code_color.yellow,
                alignItems: 'center',
                justifyContent: 'center',
                height: hp(45),
                margin: wp(20),
                borderRadius: wp(12),
                position: 'absolute',
                bottom: wp(20),
                width: hp(320),
              }
        }>
        <View>
          {image}
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: 'Robotto',
              fontWeight: 'bold',
              fontSize: moderateScale(14),
              color: !!colorsText ? colorsText : code_color.black,
            }}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
