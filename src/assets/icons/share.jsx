import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    const {width = 32, height = 32, fill = '#fff'} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6 21a5 5 0 100-10 5 5 0 000 10zM26 11a5 5 0 100-10 5 5 0 000 10zM26 31a5 5 0 100-10 5 5 0 000 10z"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22.417 22.517L11 16l11.417-6.517"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
