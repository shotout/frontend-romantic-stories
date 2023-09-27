import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width = 26, height = 26, fill = '#fff'} = props;
  return (
    <Svg
    width={width}
    height={height}
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M2.055 25.893l-.123-.74 6.232-1.038a2.567 2.567 0 001.373-.712s0 0 0 0l9.864-9.878-6.518-6.519-9.877 9.865-.951 9.022zm0 0l-.123-.74h0a.633.633 0 01-.1.003.603.603 0 01-.575-.684m.798 1.421l-.799-1.42m0 0l1.038-6.23c.093-.52.337-.997.712-1.372l-1.75 7.601zm22.131-21.46h0l.007.006a4.523 4.523 0 011.356 3.256 4.523 4.523 0 01-1.356 3.255l-.003.004-1.062 1.061-6.517-6.518 1.061-1.062h0l.004-.003a4.521 4.521 0 013.255-1.356c1.236 0 2.385.474 3.255 1.356z"
      stroke={fill}
      strokeWidth={1.5}
    />
  </Svg>
  );
}

export default SvgComponent;
