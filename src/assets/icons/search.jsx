import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width = 32, height = 32, fill = '#3F58DD'} = props;
  return (
    <Svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M9.875 17.75a7.875 7.875 0 100-15.75 7.875 7.875 0 000 15.75zM15.5 15.5L20 20"
      stroke="#2F3032"
      strokeWidth={2.16}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
  );
}

export default SvgComponent;
