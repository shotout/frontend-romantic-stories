import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width = 10, height = 16, fill = '#fff', style} = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 10 16"
      fill="none"
      style={style}
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.669 15.531a1.6 1.6 0 010-2.262L5.937 8 .67 2.731A1.6 1.6 0 112.93.47l6.4 6.4a1.6 1.6 0 010 2.262l-6.4 6.4a1.6 1.6 0 01-2.262 0z"
        fill={fill}
      />
    </Svg>
  );
}

export default SvgComponent;
