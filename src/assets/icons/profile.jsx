import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width = 19, height = 17, fill = '#fff'} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fill={fill}
        d="M10.5 20.5C15.7467 20.5 20 16.2467 20 11C20 5.75329 15.7467 1.5 10.5 1.5C5.25329 1.5 1 5.75329 1 11C1 16.2467 5.25329 20.5 10.5 20.5Z"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill={fill}
        d="M10.5 11C11.8807 11 13 9.88071 13 8.5C13 7.11929 11.8807 6 10.5 6C9.11929 6 8 7.11929 8 8.5C8 9.88071 9.11929 11 10.5 11Z"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill={fill}
        d="M5.5 19.075V18C5.5 16.9391 5.92143 15.9217 6.67157 15.1716C7.42172 14.4214 8.43913 14 9.5 14H11.5C12.5609 14 13.5783 14.4214 14.3284 15.1716C15.0786 15.9217 15.5 16.9391 15.5 18V19.075"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
