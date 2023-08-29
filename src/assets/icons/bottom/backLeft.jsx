import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={7}
      height={12}
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_1_2034)">
        <Path
          d="M5.972 10.608L1.355 5.99l4.617-4.617"
          stroke="#243676"
          strokeWidth={1.90797}
          strokeMiterlimit={10}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_2034">
          <Path
            fill="#fff"
            transform="translate(0 .705)"
            d="M0 0H6.63974V10.5892H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
