import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width = 32, height = 34, fill = '#fff'} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 32 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M27.25 6.625l-1.594 22.781c-.187 1.969-1.781 3.469-3.75 3.469H10.094c-1.969 0-3.563-1.5-3.75-3.469L4.75 6.625M1 6.625h30M12.25 6.625v-3.75A1.88 1.88 0 0114.125 1h3.75a1.88 1.88 0 011.875 1.875v3.75M12.25 25.375v-11.25M19.75 25.375v-11.25"
        stroke={fill}
        strokeWidth={1.51569}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
