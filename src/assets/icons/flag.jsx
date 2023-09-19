import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {width = 21, height = 18, fill = '#fff'} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 21 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fill={fill}
        d="M19.9474 16.3682C16.7895 16.3682 16.7895 14.2629 13.6316 14.2629C10.4737 14.2629 10.4737 16.3682 7.31579 16.3682C4.15789 16.3682 4.15789 14.2629 1 14.2629V1.63135C4.15789 1.63135 4.15789 3.73661 7.31579 3.73661C10.4737 3.73661 10.4737 1.63135 13.6316 1.63135C16.7895 1.63135 16.7895 3.73661 19.9474 3.73661V16.3682Z"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill={fill}
        d="M1 10.0522C4.15789 10.0522 4.15789 12.1575 7.31579 12.1575C10.4737 12.1575 10.4737 10.0522 13.6316 10.0522C16.7895 10.0522 16.7895 12.1575 19.9474 12.1575"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill={fill}
        d="M1 5.8418C4.15789 5.8418 4.15789 7.94706 7.31579 7.94706C10.4737 7.94706 10.4737 5.8418 13.6316 5.8418C16.7895 5.8418 16.7895 7.94706 19.9474 7.94706"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="21"
  height="18"
  viewBox="0 0 21 18"
  fill="none">
  <path
    d="M19.9474 16.3682C16.7895 16.3682 16.7895 14.2629 13.6316 14.2629C10.4737 14.2629 10.4737 16.3682 7.31579 16.3682C4.15789 16.3682 4.15789 14.2629 1 14.2629V1.63135C4.15789 1.63135 4.15789 3.73661 7.31579 3.73661C10.4737 3.73661 10.4737 1.63135 13.6316 1.63135C16.7895 1.63135 16.7895 3.73661 19.9474 3.73661V16.3682Z"
    stroke="black"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M1 10.0522C4.15789 10.0522 4.15789 12.1575 7.31579 12.1575C10.4737 12.1575 10.4737 10.0522 13.6316 10.0522C16.7895 10.0522 16.7895 12.1575 19.9474 12.1575"
    stroke="black"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M1 5.8418C4.15789 5.8418 4.15789 7.94706 7.31579 7.94706C10.4737 7.94706 10.4737 5.8418 13.6316 5.8418C16.7895 5.8418 16.7895 7.94706 19.9474 7.94706"
    stroke="black"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>;
