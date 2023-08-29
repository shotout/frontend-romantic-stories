import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = props => {
  const {width = 13, height = 12, fill = '#3F58DD'} = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 13 12"
      fill="none"
      >
      <Path
        d="M6.78007 1.80525L6.40838 1.43965C5.77462 0.840335 4.93218 0.511721 4.06001 0.523617C3.18784 0.535514 2.35467 0.886983 1.7375 1.50336C1.12033 2.11974 0.767786 2.95246 0.754768 3.82461C0.74175 4.69676 1.06928 5.53963 1.66778 6.17415L6.78007 11.2864L11.8924 6.16806C12.4909 5.53354 12.8184 4.69067 12.8054 3.81852C12.7924 2.94636 12.4398 2.11365 11.8226 1.49727C11.2055 0.88089 10.3723 0.52942 9.50013 0.517524C8.62796 0.505628 7.78551 0.834242 7.15176 1.43356L6.78007 1.80525Z"
        fill={fill}
      />
    </Svg>
  );
};
export default SVGComponent;
