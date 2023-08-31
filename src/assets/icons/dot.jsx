import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width = 32, height = 32, fill = '#3F58DD'} = props;
  return (
    <Svg
      width={7}
      height={31}
      viewBox="0 0 7 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M3.333 30.5a3.333 3.333 0 100-6.667 3.333 3.333 0 000 6.667zM3.333 18.834a3.333 3.333 0 100-6.667 3.333 3.333 0 000 6.667zM3.333 7.167a3.333 3.333 0 100-6.667 3.333 3.333 0 000 6.667z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
