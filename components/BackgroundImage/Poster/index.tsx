import Shape from "../Shape"
import type { ShapeType } from "../Shape"

const MarkerPoster = () => {
    const shape : ShapeType ={
      type: 'polygon',
      points: "1723.08 781.128 1832.84 763.259 2151.93 765.812 2139.17 1243.17 2037.06 1217.64 2037.06 1460.15 1835.4 1452.49 1720.52 1368.25",
    }
    return <Shape shape={shape} index="poster"/>
}

export default MarkerPoster;