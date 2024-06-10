import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width = 23, height = 20, fill = '#ffffff', style} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 23 20"
      fill="none"
      style={style}
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M6.12879 1.96621H1V19.2858H6.12879V1.96621Z"
        stroke="#3F58DD"
        strokeWidth="0.953993"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.65383 3.38338H6.12878V19.2858H9.65383V3.38338Z"
        stroke="#3F58DD"
        strokeWidth="0.953993"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.0086 4.6695H9.65393V19.2858H14.0086V4.6695Z"
        stroke="#3F58DD"
        strokeWidth="0.953993"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.65393 8.87723H14.0086"
        stroke="#3F58DD"
        strokeWidth="0.953993"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.65393 13.9228H14.0086"
        stroke="#3F58DD"
        strokeWidth="0.953993"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.56433 8.62723V13.625"
        stroke="#3F58DD"
        strokeWidth="0.953993"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx="18.3309"
        cy="5.04287"
        r="3.87651"
        stroke="#3F58DD"
        strokeWidth="0.904312"
      />
      <Path
        d="M18.436 6.91808V3.37804"
        stroke="#3F58DD"
        strokeWidth="0.904312"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.6662 5.1478H20.2062"
        stroke="#3F58DD"
        strokeWidth="0.904312"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
