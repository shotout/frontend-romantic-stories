import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width = 24, height = 24, fill = '#fff', style} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      style={style}
      xmlns="http://www.w3.org/2000/svg">
      <Path d="M20 12.0829L6 20.1658L6 4L20 12.0829Z" fill="white" />
    </Svg>
  );
}

export default SvgComponent;
