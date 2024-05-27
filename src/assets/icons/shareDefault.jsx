import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width = 20, height = 20, fill = '#3F58DD'} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 23 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      >
            <Path
        d="M7.67 16.316l7.855 4.577m-.011-12.627L7.67 12.843M21.942 6.53a3.45 3.45 0 11-6.9 0 3.45 3.45 0 016.9 0zm-13.8 8.05a3.45 3.45 0 11-6.9 0 3.45 3.45 0 016.9 0zm13.8 8.05a3.45 3.45 0 11-6.9 0 3.45 3.45 0 016.9 0z"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={fill}
      />
    </Svg>
  );
}

export default SvgComponent;
