import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width = 28, height = 26, fill = 'white', style} = props;
  return (
    <Svg
      width={height}
      height={width}
      style={style}
      viewBox="0 0 28 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M13.8691 4.47256L13.0753 3.69175C11.7218 2.41178 9.92255 1.70995 8.05985 1.73536C6.19714 1.76077 4.41773 2.51141 3.09963 3.82781C1.78153 5.14422 1.0286 6.92266 1.0008 8.78534C0.972995 10.648 1.67251 12.4481 2.95073 13.8033L13.8691 24.7217L24.7875 13.7903C26.0657 12.4351 26.7652 10.635 26.7374 8.77232C26.7096 6.90965 25.9567 5.13121 24.6386 3.8148C23.3205 2.49839 21.5411 1.74775 19.6784 1.72235C17.8157 1.69694 16.0165 2.39877 14.6629 3.67873L13.8691 4.47256Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
