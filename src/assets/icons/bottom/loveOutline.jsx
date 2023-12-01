import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = props => {
  const {width = 13, height = 12, fill = '#3F58DD'} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 33 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16.611 4.11l-.925-.883A8.487 8.487 0 009.84 1.015 8.473 8.473 0 004.06 3.381a7.973 7.973 0 00-2.447 5.604 7.958 7.958 0 002.273 5.673L16.611 27l12.727-12.357A7.958 7.958 0 0031.61 8.97a7.973 7.973 0 00-2.446-5.604 8.473 8.473 0 00-5.782-2.365 8.487 8.487 0 00-5.845 2.211l-.926.898z"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export default SVGComponent;

