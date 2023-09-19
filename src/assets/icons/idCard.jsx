import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width = 19, height = 17, fill = '#fff'} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M18 1.5H3C1.89543 1.5 1 2.39543 1 3.5V16.5C1 17.6046 1.89543 18.5 3 18.5H18C19.1046 18.5 20 17.6046 20 16.5V3.5C20 2.39543 19.1046 1.5 18 1.5Z"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.5 9C8.60457 9 9.5 8.10457 9.5 7C9.5 5.89543 8.60457 5 7.5 5C6.39543 5 5.5 5.89543 5.5 7C5.5 8.10457 6.39543 9 7.5 9Z"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M4.5 15V14C4.5 13.4696 4.71071 12.9609 5.08579 12.5858C5.46086 12.2107 5.96957 12 6.5 12H8.5C9.03043 12 9.53914 12.2107 9.91421 12.5858C10.2893 12.9609 10.5 13.4696 10.5 14V15"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.5 6H13.5"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.5 10H13.5"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.5 14H13.5"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
