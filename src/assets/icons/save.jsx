import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width = 45, height = 45, fill = 'none'} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M20 38.3334C30.1252 38.3334 38.3333 30.1253 38.3333 20.0001C38.3333 9.87486 30.1252 1.66675 20 1.66675C9.87474 1.66675 1.66663 9.87486 1.66663 20.0001C1.66663 30.1253 9.87474 38.3334 20 38.3334Z"
        fill="#5873FF"
      />
      <Path
        d="M20 8.33325V23.3333"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 23.3333V26.3333C10 27.4378 10.8954 28.3333 12 28.3333H28C29.1046 28.3333 30 27.4378 30 26.3333V23.3333"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.1653 17.4867L20.0047 23.3228L25.833 17.498"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
