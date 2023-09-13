import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    const {width = 18, height = 14, fill = '#fff'} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.517 2.512L15.304.137 6.947 9.111 2.77 4.624.555 7l4.179 4.49 2.213 2.375 2.212-2.375 8.358-8.977z"
        fill={fill}
      />
    </Svg>
  )
}

export default SvgComponent;
