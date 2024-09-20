import * as React from 'react';
import {ActivityIndicator, Dimensions, Platform, View} from 'react-native';
import Svg, {
  Rect,
  Path,
  Defs,
  ClipPath,
  G,
  Ellipse,
  Image,
} from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  level1,
  level10,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
  level8,
  level9,
  realistic_autumn_1,
  realistic_beach_1,
  realistic_beach_2,
  realistic_beach_4,
  realistic_casual_1,
  realistic_casual_3,
  realistic_cocktail_2,
  realistic_cocktail_5,
  realistic_professional_6,
} from '../images';
function SvgComponent(props) {
  const {
    width = Dimensions.get('window').width,
    height = 280,
    bgTheme = '#3F58DD',
    profileUrl = '',
    levelUrl = '',
    isIPad,
    style,
    typeImage
  } = props;
    const [online, setOnline] = React.useState(false)
  const getImageByAvatarAndPage = (avatarMale) => {
   
    if(typeImage === 'realistic'){
      if (avatarMale.includes('realistic/1')) return realistic_beach_1;
      if (avatarMale.includes('realistic/2')) return realistic_cocktail_2;
      if (avatarMale.includes('realistic/3')) return realistic_casual_3;
      if (avatarMale.includes('realistic/4')) return realistic_beach_4;
      if (avatarMale.includes('realistic/5')) return realistic_cocktail_5;
      if (avatarMale.includes('realistic/6')) return realistic_professional_6;
    }else{
      if (avatarMale.includes('anime/1')) return avatar1;
      if (avatarMale.includes('anime/2')) return avatar2;
      if (avatarMale.includes('anime/3')) return avatar3;
      if (avatarMale.includes('anime/4')) return avatar4;
      if (avatarMale.includes('anime/5')) return avatar5;
      if (avatarMale.includes('anime/6')) return avatar6;
    }
     
     
    
   // Default or fallback image if no conditions match
  };

  const fetchOnline = () => {
    fetch().then(async state => {
      if (state.isConnected) {
        setOnline(true)
      } else {
        setOnline(false)
      }
    });
  }

  React.useEffect(() => {
    fetchOnline()
  }, [])
  return (
    <Svg
      width={width}
      height={isIPad ? height + 300 : Platform.OS === 'android' && Dimensions.get('window').height > 1000 ? height + 100 : Dimensions.get('window').height === 932 ? height + 20 : Platform.OS === 'android' && Dimensions.get('window').height > 900 &&   Dimensions.get('window').height < 960 ? height + 20  :  height}
      viewBox="0 0 390 264"
      fill="none"
      style={style}
      xmlns="http://www.w3.org/2000/svg">
      {/* <Rect width={width} height={height} fill={bgTheme} /> */}
      <Path
        d="M41.1005 62.7675C40.598 44.8135 36.3687 33.6527 20.2369 24.7631C2.4548 14.9641 -18.7251 19.2005 -26.9472 34.1161C-41.8952 61.2329 -24.607 106.114 -7.38695 150.728C39.7139 141.558 86.7054 132.132 101.667 104.99C109.889 90.0744 102.34 70.0066 84.5579 60.2076C68.4261 51.3181 56.7298 53.7031 41.1005 62.7675Z"
        fill="#FFD12F"
      />
      <Path
        d="M349.515 62.7675C350.017 44.8135 354.246 33.6527 370.378 24.7631C388.16 14.9641 409.34 19.2005 417.562 34.1161C432.51 61.2329 415.222 106.114 398.002 150.728C350.901 141.558 303.91 132.132 288.948 104.99C280.726 90.0744 288.275 70.0066 306.057 60.2076C322.189 51.3181 333.885 53.7031 349.515 62.7675Z"
        fill="#FFD12F"
      />
      <Path
        d="M0 82.2014C0 82.2014 117.09 62.1588 193.015 62.001C270.48 61.8399 390 82.2014 390 82.2014V264H0V82.2014Z"
        fill="white"
      />
      {/* <Ellipse cx="195" cy="81" rx="70" ry="10" fill="#EDEDED" /> */}
      {/* <Rect x="192" y="25" width="56" height="56" rx="28" fill="#2C3439" /> */}

      <Image
        href={
          levelUrl.includes('1')
            ? level1
            : levelUrl.includes('2')
            ? level2
            : levelUrl.includes('3')
            ? level3
            : levelUrl.includes('4')
            ? level4
            : levelUrl.includes('5')
            ? level5
            : levelUrl.includes('6')
            ? level6
            : levelUrl.includes('7')
            ? level7
            : levelUrl.includes('8')
            ? level8
            : levelUrl.includes('9')
            ? level9
            : levelUrl.includes('10')
            ? level10
            : level1
        }
        x={
          Platform.OS === 'android' &&  Dimensions.get('window').height > 1000
            ? '-27'
            : profileUrl.includes('3')
            ? '140'
            : profileUrl.includes('2')
            ? '142'
            : profileUrl.includes('5')
            ? '147'
            :  '138'
        }
        y={
          Platform.OS === 'android'
            ? '15'
            : profileUrl.includes('3')
            ? '-18'
            : profileUrl.includes('2')
            ? '-15'
            : profileUrl.includes('4')
            ? '-20'
            : '-40'
        }
        width="56"
        height="56"
        rx="28"
        x="192"
        y="25"
      />

      {/* <Path
        d="M220.046 69.4197C198.452 64.7918 194.55 44.2703 204.412 38.0245C213.173 32.4647 220.046 41.3866 220.046 41.3866C220.046 41.3866 226.92 32.4647 235.681 38.0245C245.543 44.2703 241.641 64.7918 220.046 69.4197Z"
        fill="#FF9F2F"
      />
      <Path
        d="M220.194 61.5708C216.616 61.5708 215.347 58.8599 215.295 58.7453C215.24 58.625 215.235 58.4879 215.282 58.364C215.328 58.2402 215.421 58.1398 215.542 58.085C215.662 58.0301 215.799 58.0253 215.923 58.0716C216.047 58.1178 216.147 58.2114 216.202 58.3316C216.247 58.4313 217.281 60.5742 220.189 60.5742C223.236 60.5742 224.532 58.384 224.584 58.2918C224.617 58.2348 224.66 58.1849 224.712 58.1448C224.764 58.1048 224.824 58.0753 224.887 58.0582C224.951 58.0411 225.017 58.0366 225.082 58.045C225.147 58.0535 225.21 58.0747 225.267 58.1074C225.324 58.1401 225.374 58.1837 225.414 58.2358C225.454 58.2878 225.483 58.3472 225.5 58.4106C225.517 58.474 225.522 58.5401 225.513 58.6052C225.505 58.6704 225.484 58.7332 225.451 58.7901C224.886 59.6663 224.105 60.3825 223.184 60.8703C222.262 61.3581 221.231 61.601 220.189 61.5758L220.194 61.5708Z"
        fill="black"
      />
      <Path
        d="M215.622 51.1571C215.622 53.0963 214.795 54.6684 213.773 54.6684C212.752 54.6684 211.925 53.0963 211.925 51.1571C211.925 49.218 212.752 47.6465 213.773 47.6465C214.795 47.6465 215.622 49.218 215.622 51.1571Z"
        fill="#221E1F"
      />
      <Path
        d="M215.205 49.8124C215.205 50.6479 214.858 51.3246 214.429 51.3246C214.001 51.3246 213.654 50.6479 213.654 49.8124C213.654 48.9774 214.001 48.3008 214.429 48.3008C214.858 48.3008 215.205 48.9774 215.205 49.8124Z"
        fill="white"
      />
      <Path
        d="M213.362 50.7768C213.362 51.0787 213.236 51.3236 213.081 51.3236C212.926 51.3236 212.801 51.0787 212.801 50.7768C212.801 50.4744 212.926 50.2295 213.081 50.2295C213.236 50.2295 213.362 50.4744 213.362 50.7768Z"
        fill="white"
      />
      <Path
        d="M214.215 52.1079C214.215 52.4103 214.09 52.6547 213.935 52.6547C213.78 52.6547 213.654 52.4103 213.654 52.1079C213.654 51.8055 213.78 51.5605 213.935 51.5605C214.09 51.5605 214.215 51.8055 214.215 52.1079Z"
        fill="white"
      /> */}
      {/* <Path
        d="M227.926 51.1571C227.926 53.0963 227.098 54.6684 226.077 54.6684C225.056 54.6684 224.229 53.0963 224.229 51.1571C224.229 49.218 225.056 47.6465 226.077 47.6465C227.098 47.6465 227.926 49.218 227.926 51.1571Z"
        fill="#221E1F"
      />
      <Path
        d="M227.51 49.8124C227.51 50.6479 227.163 51.3246 226.734 51.3246C226.306 51.3246 225.959 50.6479 225.959 49.8124C225.959 48.9774 226.306 48.3008 226.734 48.3008C227.163 48.3008 227.51 48.9774 227.51 49.8124Z"
        fill="white"
      />
      <Path
        d="M225.668 50.7768C225.668 51.0787 225.542 51.3236 225.387 51.3236C225.232 51.3236 225.106 51.0787 225.106 50.7768C225.106 50.4744 225.232 50.2295 225.387 50.2295C225.542 50.2295 225.668 50.4744 225.668 50.7768Z"
        fill="white"
      />
      <Path
        d="M226.52 52.1079C226.52 52.4103 226.394 52.6547 226.24 52.6547C226.084 52.6547 225.959 52.4103 225.959 52.1079C225.959 51.8055 226.084 51.5605 226.24 51.5605C226.394 51.5605 226.52 51.8055 226.52 52.1079Z"
        fill="white"
      /> */}
      {/* <Path
        d="M214.431 55.0829C214.431 55.4583 213.737 55.7625 212.881 55.7625C212.024 55.7625 211.33 55.4583 211.33 55.0829C211.33 54.7081 212.024 54.4033 212.881 54.4033C213.737 54.4033 214.431 54.7081 214.431 55.0829Z"
        fill="#DA6182"
      />
      <Path
        d="M228.522 55.0829C228.522 55.4583 227.828 55.7625 226.972 55.7625C226.115 55.7625 225.421 55.4583 225.421 55.0829C225.421 54.7081 226.115 54.4033 226.972 54.4033C227.828 54.4033 228.522 54.7081 228.522 55.0829Z"
        fill="#DA6182"
      />
      <Path
        d="M213.664 45.6483C213.635 45.6425 213.504 45.6197 213.318 45.6197C213.068 45.6197 212.71 45.6608 212.371 45.8547L212.371 45.8548C212.029 46.0507 211.72 46.3998 211.574 46.9841L211.574 46.9841L211.574 46.9851C211.555 47.0628 211.602 47.1415 211.681 47.1607L211.705 47.0635M213.664 45.6483L212.417 45.9343C212.417 45.9343 212.417 45.9343 212.417 45.9343C212.417 45.9343 212.417 45.9343 212.417 45.9343C212.095 46.119 211.805 46.4431 211.663 47.0063C211.663 47.0063 211.663 47.0063 211.663 47.0063C211.663 47.0064 211.663 47.0064 211.663 47.0065L211.663 47.0065L211.663 47.0071C211.663 47.0069 211.663 47.0067 211.663 47.0065C211.663 47.0064 211.663 47.0064 211.663 47.0063C211.663 47.0063 211.663 47.0063 211.663 47.0063C211.666 46.9957 211.671 46.9868 211.679 46.9799C211.676 46.9893 211.674 46.9988 211.671 47.0083C211.671 47.0084 211.671 47.0085 211.671 47.0086C211.671 47.0088 211.671 47.009 211.671 47.0092C211.666 47.0338 211.68 47.0576 211.705 47.0635M213.664 45.6483L213.664 45.6483C213.744 45.6639 213.793 45.7422 213.778 45.8191L213.778 45.8219L213.778 45.8219C213.761 45.8987 213.686 45.9491 213.607 45.9342L213.602 45.9331L213.602 45.933L213.6 45.9326L213.6 45.9324L213.596 45.9317L213.589 45.9305C213.577 45.9285 213.557 45.9257 213.532 45.9229L213.531 45.9228L213.531 45.9228C213.481 45.9167 213.407 45.9111 213.318 45.9111H213.318C213.098 45.9105 212.793 45.9482 212.516 46.1077L212.516 46.1077C212.243 46.2645 211.986 46.5429 211.857 47.0553M213.664 45.6483L211.857 47.0553M211.705 47.0635C211.729 47.07 211.754 47.0552 211.76 47.0309M211.705 47.0635L211.679 47.1601C211.757 47.181 211.837 47.1338 211.857 47.0553M211.76 47.0309L211.857 47.0553M211.76 47.0309C211.76 47.0308 211.76 47.0306 211.76 47.0305L211.76 47.0309ZM211.76 47.0296C211.762 47.0204 211.765 47.0114 211.767 47.0024C211.77 47.0116 211.771 47.0217 211.768 47.0316L211.76 47.0296Z"
        fill="#221E1F"
        stroke="black"
        strokeWidth="0.2"
      /> */}
      {/* <Path
        d="M225.457 46.0056L225.459 46.0051L225.459 46.005C225.474 45.9975 225.669 45.9063 225.938 45.8658L225.925 45.776M225.457 46.0056C225.386 46.0412 225.298 46.013 225.262 45.9402C225.225 45.8666 225.257 45.7801 225.327 45.7452L225.333 45.7424L225.333 45.7425C225.336 45.7407 225.394 45.7131 225.481 45.6818C225.575 45.6483 225.708 45.6086 225.865 45.583C226.179 45.5312 226.601 45.5337 227.005 45.7668C227.257 45.9127 227.497 46.1458 227.692 46.4978L227.605 46.5463L227.692 46.4974C227.731 46.5667 227.708 46.6563 227.636 46.6959M225.457 46.0056L225.416 45.924L225.457 46.0056ZM225.925 45.776C226.207 45.7335 226.566 45.7443 226.905 45.94C227.123 46.0662 227.338 46.2716 227.517 46.5946C227.517 46.5947 227.517 46.5947 227.517 46.5947C227.517 46.5947 227.517 46.5948 227.517 46.5949L227.517 46.5949L227.517 46.5953C227.517 46.5952 227.517 46.595 227.517 46.5949C227.517 46.5948 227.517 46.5947 227.517 46.5947C227.517 46.5947 227.517 46.5946 227.517 46.5946C227.512 46.5855 227.51 46.5751 227.511 46.5649C227.333 46.255 227.124 46.0561 226.909 45.9319C226.568 45.7349 226.207 45.7246 225.924 45.7669M225.925 45.776C225.925 45.776 225.925 45.776 225.925 45.776M225.925 45.776L225.924 45.7669M225.924 45.7669C225.914 45.7683 225.905 45.7697 225.896 45.7712C225.896 45.7712 225.896 45.7712 225.896 45.7712C225.672 45.8082 225.501 45.8768 225.438 45.9043C225.433 45.9121 225.427 45.9186 225.418 45.9231C225.418 45.9231 225.418 45.9231 225.418 45.9231C225.418 45.9232 225.418 45.9232 225.418 45.9233C225.418 45.9233 225.418 45.9232 225.418 45.9231C225.418 45.9231 225.418 45.9231 225.418 45.9231C225.457 45.9052 225.64 45.8223 225.898 45.7804L225.898 45.7803C225.907 45.7788 225.916 45.7774 225.925 45.776M225.924 45.7669L225.925 45.776M225.925 45.776L225.938 45.8658C226.209 45.8256 226.544 45.8366 226.859 46.0185C227.063 46.1361 227.264 46.3285 227.438 46.6389L227.438 46.6391C227.476 46.7073 227.563 46.7359 227.636 46.6959M227.636 46.6959C227.636 46.6958 227.636 46.6957 227.636 46.6956L227.587 46.6083L227.635 46.6962C227.635 46.6961 227.635 46.696 227.636 46.6959Z"
        fill="#221E1F"
        stroke="black"
        strokeWidth="0.2"
      /> */}
      <G clipPath="url(#clip0_2133_2044)">
        <Rect x="142" y="25" width="56" height="56" rx="28" fill="#FFD12F" />
        {/* <FastImage // Mengganti Image dengan FastImage
          source={{
            uri: profileUrl,
            priority: FastImage.priority.high, // Prioritas tinggi
          }}
          style={{ width: '10%', height: '10%', borderRadius: 28 }} // Ganti width dan height menjadi '100%' dan tambahkan borderRadius
        /> */}
        <Image
          
          href={online ? profileUrl : getImageByAvatarAndPage(profileUrl)}
          x={
            profileUrl.includes('realistic/1')  ?
            '143' :
            profileUrl.includes('realistic/2') || profileUrl.includes('realistic/6') ||  profileUrl.includes('realistic/4')  ?
            '145' :
            profileUrl.includes('realistic/3')?
            '144' :
            profileUrl.includes('realistic') ?
            '140' :
            Platform.OS === 'android' &&  Dimensions.get('window').height > 1000 &&  width === 480  && profileUrl.includes('2')?
                '-25' :
            Platform.OS === 'android' &&  Dimensions.get('window').height > 1000
              ? '-32'
              : Platform.OS === 'android' &&  Dimensions.get('window').height > 900 &&  Dimensions.get('window').height < 950
              ? '-25'
              : Platform.OS === 'android' 
              ? '-27'
              : profileUrl.includes('3')
              ? '140'
              : profileUrl.includes('2')
              ? '142'
              : profileUrl.includes('5')
              ? '147'
              : '138'
          }
          y={
            profileUrl.includes('realistic/1')  ||  profileUrl.includes('realistic/3') || profileUrl.includes('realistic/5') || profileUrl.includes('realistic/4') || profileUrl.includes('realistic/6')  ? '-55' :
            profileUrl.includes('realistic') ?
            '-30' :
            Platform.OS === 'android' &&  Dimensions.get('window').height > 1000
              ? '30'
              : Platform.OS === 'android' &&  Dimensions.get('window').height > 900 &&  Dimensions.get('window').height < 950
              ? '25'
              : Platform.OS === 'android' 
              ? '15'
              : profileUrl.includes('3')
              ? '-18'
              : profileUrl.includes('2')
              ? '-15'
              : profileUrl.includes('4')
              ? '-20'
              : '-40'
          }
          width="100%"
          height={ Platform.OS === 'android' &&  Dimensions.get('window').height > 1000 ? "200" : "300"}
          rx="28"
        />
      </G>
      <Rect
        x="143"
        y="26"
        width="54"
        height="54"
        rx="27"
        stroke="white"
        strokeWidth="2"
      />
      <Defs>
        <ClipPath id="clip0_2133_2044">
          <Rect x="142" y="25" width="56" height="56" rx="28" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
