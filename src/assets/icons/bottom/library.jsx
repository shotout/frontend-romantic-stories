import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
    const {width = 13, height = 12,  fill = '#3F58DD'} = props;
  return (
    
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      >
      <Path
        d="M4.28 1.192H.806v11.731H4.28V1.193zM6.667 2.152H4.28v10.771h2.387V2.153zM9.617 3.023h-2.95v9.9h2.95v-9.9zM12.867.88h-3.25v12.043h3.25V.88zM6.667 5.873h2.95M6.667 9.29h2.95M2.543 5.704v3.385M9.617 2.152h3.248"
        stroke={fill}
        strokeWidth={0.646154}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
