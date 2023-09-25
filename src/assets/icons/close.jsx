import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    const {width = 20, height = 21, fill = '#292929'} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.686 10.792l7.988-7.989a1.118 1.118 0 000-1.577 1.118 1.118 0 00-1.577 0L9.993 9.33l-8.09-8.104a1.118 1.118 0 00-1.577 0 1.118 1.118 0 000 1.577l7.988 7.989L.326 18.78a1.118 1.118 0 000 1.578 1.118 1.118 0 001.577 0l8.09-8.09 8.104 8.09a1.118 1.118 0 001.577 0 1.118 1.118 0 000-1.578l-7.988-7.988z"
        fill={fill}
      />
    </Svg>
  )
}

export default SvgComponent
