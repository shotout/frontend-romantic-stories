import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    const {width = 32, height = 32, fill = '#fff'} = props;
  return (
    <Svg
      width={18}
      height={16}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5.294 11.765H.588v-7.53h4.706L10 .471V15.53l-4.706-3.765zM14.706 2.127a7.53 7.53 0 010 11.765M12.165 3.733a5.503 5.503 0 011.572 1.9A5.29 5.29 0 0114.298 8a5.29 5.29 0 01-.56 2.367 5.503 5.503 0 01-1.573 1.9"
        stroke="#fff"
        strokeWidth={1.06667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
