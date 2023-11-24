import * as React from 'react';
import Svg, {Ellipse, Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width = 37, height = 37, fill = '#fff', bg = '#5873FF', style} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 37 37"
      fill="none"
      style={style}
      xmlns="http://www.w3.org/2000/svg">
      <Ellipse cx="18.5001" cy="18.7621" rx="17.887" ry="17.8871" fill={bg} />
      <Path
        d="M28.8894 12.4725C28.4124 12.0014 27.6373 12.0014 27.22 12.4725L16.0108 23.5433L9.80992 17.419C9.39256 17.0657 8.67708 17.0657 8.25972 17.419L8.08085 17.6546C7.66348 18.0668 7.66348 18.7145 8.08085 19.1268L15.176 26.1344C15.5934 26.5466 16.2493 26.5466 16.6666 26.1344L16.7859 26.0166C16.8455 25.9577 16.9647 25.8988 17.0244 25.8399L28.8894 14.1213C29.3664 13.6502 29.3664 12.9436 28.8894 12.4725Z"
        fill={fill}
      />
    </Svg>
  );
}

export default SvgComponent;
