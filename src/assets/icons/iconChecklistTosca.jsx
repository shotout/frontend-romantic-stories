import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
import { code_color } from '../../utils/colors';

function SvgComponent(props) {
  const {width = 45, height = 45, fill = 'none'} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Circle cx="28.5" cy="28.5" r="28.5" fill={code_color.blueDark} />
      <Path
        d="M45.0537 18.478C44.2937 17.7274 43.0587 17.7274 42.3937 18.478L24.5337 36.1175L14.6537 26.3595C13.9887 25.7965 12.8487 25.7965 12.1837 26.3595L11.8987 26.7348C11.2337 27.3916 11.2337 28.4237 11.8987 29.0805L23.2037 40.2459C23.8687 40.9027 24.9137 40.9027 25.5787 40.2459L25.7687 40.0583C25.8637 39.9644 26.0537 39.8706 26.1487 39.7768L45.0537 21.1052C45.8137 20.3545 45.8137 19.2286 45.0537 18.478Z"
        fill="white"
      />
    </Svg>
  );
}

export default SvgComponent;
