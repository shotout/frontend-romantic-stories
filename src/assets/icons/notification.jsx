import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width = 20, height = 23, fill = '#fff'} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M7.647 20.585h4.706c0 1.176-.844 2.352-2.353 2.352-1.509 0-2.353-1.176-2.353-2.352zm12.048-4.97l-1.302-2.17a5.287 5.287 0 01-.753-2.72v-3.09C17.643 3.422 14.214 0 10 0 5.786 0 2.36 3.423 2.36 7.634v3.09c0 .957-.259 1.897-.753 2.72L.305 15.616a2.097 2.097 0 00-.027 2.132 2.091 2.091 0 001.844 1.073h15.756a2.1 2.1 0 001.844-1.073c.38-.673.37-1.47-.027-2.132z"
        fill={fill}
      />
    </Svg>
  );
}

export default SvgComponent;
