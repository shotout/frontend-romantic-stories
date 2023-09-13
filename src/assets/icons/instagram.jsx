import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    const {width = 20, height = 20, fill = '#fff'} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.2 10A3.2 3.2 0 1110 6.8a3.21 3.21 0 013.2 3.2zM20 5.6v8.8a5.6 5.6 0 01-5.6 5.6H5.6A5.6 5.6 0 010 14.4V5.6A5.6 5.6 0 015.6 0h8.8A5.6 5.6 0 0120 5.6zM14.8 10a4.8 4.8 0 10-9.6 0 4.8 4.8 0 009.6 0zm1.6-5.2a1.2 1.2 0 10-2.4 0 1.2 1.2 0 002.4 0z"
        fill={fill}
      />
    </Svg>
  )
}

export default SvgComponent
