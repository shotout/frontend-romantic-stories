import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width = 20, height = 20, fill = '#fff'} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M20 10c0-5.5-4.5-10-10-10S0 4.5 0 10c0 5 3.65 9.15 8.45 9.9v-7H5.9V10h2.55V7.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.25.2 2.25.2v2.45h-1.25c-1.25 0-1.65.75-1.65 1.55V10h2.75l-.45 2.9h-2.35v7C16.35 19.15 20 15 20 10z"
        fill="#fff"
      />
      <Path
        d="M13.9 12.9l.45-2.9H11.6V8.1c0-.8.4-1.55 1.65-1.55h1.25V4.1s-1.15-.2-2.25-.2c-2.3 0-3.8 1.4-3.8 3.9V10H5.9v2.9h2.55v7c.5.1 1.05.1 1.55.1s1.05-.05 1.55-.1v-7h2.35z"
        fill={fill}
      />
    </Svg>
  );
}

export default SvgComponent;
