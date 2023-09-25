import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width = 20, height = 26, fill = '#3F58DD'} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M3.334 6.668A6.674 6.674 0 0110.002 0a6.674 6.674 0 016.667 6.668 6.674 6.674 0 01-6.667 6.668 6.675 6.675 0 01-6.668-6.668zm12.159 8.098a3.066 3.066 0 00-2.228.29 6.718 6.718 0 01-6.524 0 3.082 3.082 0 00-2.227-.29c-2.66.67-4.514 3.08-4.514 5.86v1.348c0 .85.227 1.683.657 2.407.35.59 1.007.957 1.713.957h15.26c.706 0 1.363-.367 1.713-.957.43-.724.657-1.557.657-2.407v-1.347c0-2.78-1.854-5.191-4.51-5.861h.003z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
