/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SelectableText} from '@astrocoders/react-native-selectable-text';
import styles from './styles';
import {sizing} from '../../utils/styling';
import {ava1} from '../../assets/images';
import {code_color} from '../../utils/colors';
import ModalShare from '../modal-share';
export default function QuotesContent({
  item,
  themeUser,
  source,
  isActive,
  isAnimationStart,
  fontSize,
  bgTheme,
  bg,
}) {
  const [showModalShare, setShowModalShare] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [startEndText, setStartEndText] = useState({start: 0, end: 0});
  const [isRepeat, setRepeat] = useState(
    item?.repeat?.time != undefined || item?.isRepeat ? true : false,
  );
  const [folded, setFolded] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const counter = useRef(0);
  const activeStatus = useRef(false);
  const contentData = `Matahari bersinar terik di Lampung. Sinarnya terhalang rimbunnya pepohonan, sehingga hanya menyisakan berkas tipis. Burung-burung berkicau seolah sedang menyanyikan lagu untuk alam. Bunyi riak jernih sungai beradu dengan batu kali berpadu dengan sahutan dari beberapa penghuni hutan yang lainnya. Ya, inilah tempat tinggal Bora, si anak gajah Lampung yang sekarang tengah asyik bermain bersama teman-temannya di sebuah sungai.
  Ketika Bora menyemprotkan air ke arah Dodo—anak gajah lainnya—dengan belalainya, ia pun memekik nyaring. Sampai akhirnya, kegembiraan mereka terpecah oleh bunyi bising dari sebelah utara hutan. Bunyi bising itu bercampur dengan deru sesuatu yang sama sekali tidak Bora kenal.
  “Hei, lihat itu!”
  Semua serentak menghentikan kegiatan mereka dan menengok ke langit yang ditunjuk Dodo. Asap hitam tebal yang membumbung tinggi dari sana. Asap itu semakin tebal dan terus menebal. Itu merupakan fenomena aneh yang baru pertama kali mereka saksikan. Selama ini yang mereka .
`;

  useEffect(() => {
    if (isActive && isAnimationStart) {
      // startAnimation();
      // activeStatus.current = true;
      // } else {
      //   // stopAnimation();
    }
  }, [isActive, isAnimationStart]);
  const startAnimation = () => {
    setFolded(!folded);

    Animated.timing(animationValue, {
      toValue: folded ? 0 : 1,
      duration: 100,
      useNativeDriver: false, // Set this to true for better performance, but note that not all properties are supported with native driver
    }).start();
    // animationValue.stopAnimation();
  };

  const rotation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  function renderBackgroundImage() {
    if (isActive) {
      return (
        <Image
          source={ava1}
          // style={[styles.ctnAbsolute]}
        />
      );
    }
    return null;
  }
  return (
    <View
      style={{
        position: 'relative',
        paddingHorizontal: 30,
        paddingTop: 30,
        flex: 1,
      }}>
      <ModalShare
        isVisible={showModalShare}
        onClose={() => setShowModalShare(false)}
        selectedContent={selectedText}
        start={contentData.substring(
          startEndText.start - 30,
          startEndText.start,
        )}
        end={contentData.substring(startEndText.end, startEndText.end + 30)}
      />
      <Animated.View
        style={{
          width: '100%',
          height: sizing.getDimensionHeight(0.84),
          transform: [{translateY: translateX}],
        }}>
        <View
          style={{
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            justifyContent: 'center',
          }}>
          <Image
            source={ava1}
            resizeMode="contain"
            style={{
              width: 100,
              height: 200,
              opacity: 0.6,
            }}
          />
        </View>
        <Text
          allowFontScaling={false}
          style={{
            marginHorizontal: 50,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: Number(fontSize),
            fontFamily: themeUser?.theme?.font_family,
            color: bg === '#2C3439' ? code_color.white : code_color.blackDark,
          }}>
          {themeUser?.language_id === '2' ? item?.title_id : item?.title_en}
        </Text>
        <View style={{borderWidth: 1, borderColor: bgTheme, marginTop: 10}} />
        <View style={styles.ctnIcon}>
          <View style={styles.quotesWrapper}>
            <View style={styles.txtQuotesWrapper}>
              {/* <Text
                selectable
                userSelect
                selectionColor={code_color.splash}
                allowFontScaling={false}
                suppressHighlighting
                style={[
                  styles.ctnQuotes,
                  {
                    fontFamily: themeUser?.theme?.font_family,
                    fontSize: Number(fontSize),
                    color:
                      bg === '#2C3439'
                        ? code_color.white
                        : code_color.blackDark,
                  },
                ]}>
                {themeUser?.language_id === "2"
                  ? item?.content_id
                  : item?.content_en}
                {contentData}
              </Text> */}
              <SelectableText
                style={[
                  styles.ctnQuotes,
                  {
                    fontFamily: themeUser?.theme?.font_family,
                    fontSize: Number(fontSize),
                    color:
                      bg === '#2C3439'
                        ? code_color.white
                        : code_color.blackDark,
                  },
                ]}
                menuItems={['Share']}
                onSelection={({
                  eventType,
                  content,
                  selectionStart,
                  selectionEnd,
                }) => {
                  setStartEndText({start: selectionStart, end: selectionEnd});
                  setSelectedText(content);
                  setShowModalShare(true);
                }}
                value={contentData}
              />
            </View>
          </View>
        </View>

        {/* </ImageBackground> */}
      </Animated.View>
    </View>
  );
}
