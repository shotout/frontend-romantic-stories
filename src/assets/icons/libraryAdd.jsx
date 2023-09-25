import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function SvgComponent(props) {
    const {width = 37, height = 32, fill = '#fff'} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 37 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M9.288 3.023H1v27.988h8.288V3.023zM14.984 5.313H9.288v25.698h5.696V5.313zM22.02 7.392h-7.036V31.01h7.037V7.392zM14.984 14.191h7.037M14.984 22.344h7.037M5.144 13.787v8.076"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={29.0053}
        cy={7.99476}
        r={6.99476}
        stroke={fill}
        strokeWidth={1.5}
      />
      <Path
        d="M29.175 11.025v-5.72M26.315 8.164h5.72"
        stroke={fill}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
