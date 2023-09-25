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
        d="M3.12 7.003v-1.5A4.515 4.515 0 017.624 1h4.502a4.515 4.515 0 014.502 4.502v1.5"
        stroke={fill}
        strokeWidth={1.53488}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 19.696h15c1.375 0 2.5-1.135 2.5-2.522V9.609c0-1.387-1.125-2.522-2.5-2.522h-15C1.125 7.087 0 8.222 0 9.609v7.565c0 1.387 1.125 2.522 2.5 2.522zm7.374-8.093h1.125a.652.652 0 010 1.305h-.473v1.598a.652.652 0 01-1.304 0v-1.598h-.474a.652.652 0 010-1.305H9.874z"
        fill={fill}
      />
    </Svg>
  )
}

export default SvgComponent
