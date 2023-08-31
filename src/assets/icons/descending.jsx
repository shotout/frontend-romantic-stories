import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width = 32, height = 32, fill = '#3F58DD'} = props;
  return (
    <Svg
      width={25}
      height={32}
      viewBox="0 0 25 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6.667 2v28M2 25.334L6.667 30l4.666-4.666M19.111 30V2M23.778 6.667L19.11 2l-4.667 4.667"
        stroke="#fff"
        strokeWidth={2.33333}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
