import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function SvgComponent(props) {
    const {width = 22, height = 22, fill = '#3F58DD'} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={width} height={height} rx={5} fill="#fff" />
      <Path
        d="M8 9.957l-.308-.272a2.967 2.967 0 00-1.95-.68 2.95 2.95 0 00-1.926.728c-.512.457-.805 1.076-.816 1.724-.01.648.261 1.274.758 1.745L8 17l4.242-3.802c.497-.472.768-1.098.758-1.746-.011-.647-.304-1.266-.816-1.724A2.95 2.95 0 0010.257 9a2.968 2.968 0 00-1.949.68L8 9.958zM16 5.718l-.247-.204a2.474 2.474 0 00-1.559-.51 2.453 2.453 0 00-1.541.545c-.41.344-.644.808-.653 1.294-.008.486.209.955.606 1.309L16 11l3.394-2.852c.397-.353.614-.823.606-1.309-.009-.486-.243-.95-.653-1.293A2.453 2.453 0 0017.806 5a2.474 2.474 0 00-1.56.51L16 5.719z"
        fill={fill}
      />
    </Svg>
  )
}

export default SvgComponent
