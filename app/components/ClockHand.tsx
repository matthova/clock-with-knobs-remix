function hexToPixel(
  hex: [number, number],
  radius: number,
  externalRadius: number
) {
  const x = radius * Math.sqrt(3) * (hex[0] + hex[1] / 2);
  const y = ((radius * 3) / 2) * hex[1];
  return [x + externalRadius, y + externalRadius];
}

function generateHexGrid(externalRadius: number, radius: number, gap: number) {
  const N =
    Math.ceil(
      externalRadius / 2 / radius +
        (externalRadius / 2 / radius / Math.sqrt(3)) * Math.sqrt(3)
    ) + 2;
  const gridPoints = [];
  for (let a = -N; a <= N; a++) {
    for (let b = -N; b <= N; b++) {
      for (let c = -N; c <= N; c++) {
        if (a + b + c === 0) {
          gridPoints.push(hexToPixel([a, c], radius - gap / 2, externalRadius));
        }
      }
    }
  }
  return gridPoints;
}

function RhombiiDef({
  gap,
  cellDiameter,
}: {
  gap: number;
  cellDiameter: number;
}) {
  let pathString = ``;

  // top
  pathString += `M
    ${0},${(cellDiameter / 2 - (gap / Math.sqrt(3)) * 2).toFixed(3)}
  L ${(
    ((cellDiameter / 2 - (gap / Math.sqrt(3)) * 2 - gap / Math.sqrt(3)) / 2) *
    Math.sqrt(3)
  ).toFixed(3)},${(
    (cellDiameter / 2 - (gap / Math.sqrt(3)) * 2 - gap / Math.sqrt(3)) / 2 +
    gap / Math.sqrt(3)
  ).toFixed(3)}
  L ${0},${(gap / Math.sqrt(3)).toFixed(3)}
  L ${(
    -((cellDiameter / 2 - (gap / Math.sqrt(3)) * 2 - gap / Math.sqrt(3)) / 2) *
    Math.sqrt(3)
  ).toFixed(3)},${(
    (cellDiameter / 2 - (gap / Math.sqrt(3)) * 2 - gap / Math.sqrt(3)) / 2 +
    gap / Math.sqrt(3)
  ).toFixed(3)}
  z`;

  // bottom right
  pathString += `M
  ${(gap / 2).toFixed(3)},${(-gap / 2 / Math.sqrt(3)).toFixed(3)}
  L ${((cellDiameter / 4) * Math.sqrt(3) - gap).toFixed(3)},${(
    ((cellDiameter / 4) * Math.sqrt(3) - gap - gap / 2) / Math.sqrt(3) -
    gap / 2 / Math.sqrt(3)
  ).toFixed(3)}
  L ${((cellDiameter / 4) * Math.sqrt(3) - gap).toFixed(3)},${(
    -cellDiameter / 4 +
    gap / Math.sqrt(3)
  ).toFixed(3)}
  L ${(gap / 2).toFixed(3)},${
    -cellDiameter / 2 + gap / Math.sqrt(3) + (gap / 2) * Math.sqrt(3)
  }
  z`;

  // bottom left
  pathString += `M
  ${(-gap / 2).toFixed(3)},${(-gap / 2 / Math.sqrt(3)).toFixed(3)}
  L ${(-(cellDiameter / 4) * Math.sqrt(3) + gap).toFixed(3)},${(
    ((cellDiameter / 4) * Math.sqrt(3) - gap - gap / 2) / Math.sqrt(3) -
    gap / 2 / Math.sqrt(3)
  ).toFixed(3)}
  L ${(-(cellDiameter / 4) * Math.sqrt(3) + gap).toFixed(3)},${(
    -cellDiameter / 4 +
    gap / Math.sqrt(3)
  ).toFixed(3)}
  L ${(-gap / 2).toFixed(3)},${
    -cellDiameter / 2 + gap / Math.sqrt(3) + (gap / 2) * Math.sqrt(3)
  }
  z`;

  return <path id="rhombii" fill="black" stroke="0" d={pathString} />;
}

export default function ClockHand({
  id,
  diameter,
  cellDiameter,
  gap,
  outerThickness,
  isHourHand,
  padding,
}: {
  id: string;
  diameter: number;
  cellDiameter: number;
  gap: number;
  outerThickness: number;
  isHourHand: boolean;
  padding: number;
}) {
  let handDiameter = diameter / 18;
  let handLength = isHourHand ? diameter / 6 : diameter / 3;
  let handGap = 1.6;

  return (
    <svg
      id={id}
      width={diameter}
      height={diameter}
      viewBox={`0 0 ${diameter + padding * 2} ${diameter + padding * 2}`}
    >
      <defs>
        <RhombiiDef cellDiameter={cellDiameter} gap={gap} />
        <mask id={`hole${isHourHand ? "Hour" : "Minute"}`}>
          <circle
            fill="white"
            cx={diameter / 2 + padding}
            cy={diameter / 2 + padding}
            r={diameter / 2}
          />
          {generateHexGrid(diameter / 2, cellDiameter / 2, gap).map(
            ([x, y]) => (
              <use
                key={`${x}/${y}`}
                href="#rhombii"
                x={(x + padding).toFixed(3)}
                y={(y + padding).toFixed(3)}
              />
            )
          )}
          <rect
            fill="black"
            width={handDiameter}
            height={handLength}
            x={padding + diameter / 2 - handDiameter / 2}
            y={padding + diameter / 2 - handLength - handDiameter}
          />
        </mask>
        <mask id={`hand${isHourHand ? "Hour" : "Minute"}`}>
          <rect
            fill="white"
            width={handDiameter}
            height={handLength}
            x={padding + diameter / 2 - handDiameter / 2}
            y={padding + diameter / 2 - handLength - handDiameter}
            mask={`url(#hand${isHourHand ? "Hour" : "Minute"})`}
          />
          <rect
            fill="black"
            width={handDiameter - handGap * 2}
            height={handLength - handGap * 2}
            x={padding + diameter / 2 - handDiameter / 2 + handGap}
            y={padding + diameter / 2 - handLength - handDiameter + handGap}
          />
        </mask>
      </defs>
      <circle
        mask={`url(#hole${isHourHand ? "Hour" : "Minute"})`}
        fill="black"
        cx={padding + diameter / 2}
        cy={padding + diameter / 2}
        r={diameter / 2}
      />
      <path
        fillRule="evenodd"
        fill="rgba(0,0,0,1)"
        id="circles"
        d={`M ${padding + diameter / 2} ${padding + diameter / 2} m -${
          diameter / 2
        }, 0 a ${diameter / 2},${diameter / 2} 0 1,0 ${diameter},0 a ${
          diameter / 2
        },${diameter / 2} 0 1,0 -${diameter},0 z M ${padding + diameter / 2} ${
          padding + diameter / 2
        } m -${diameter / 2 - outerThickness}, 0 a ${
          diameter / 2 - outerThickness
        },${diameter / 2 - outerThickness} 0 1,0 ${
          diameter - outerThickness * 2
        },0 a ${diameter / 2 - outerThickness},${
          diameter / 2 - outerThickness
        } 0 1,0 -${diameter - outerThickness * 2},0 z `}
      />
      <rect
        fill="black"
        width={handDiameter}
        height={handLength}
        x={padding + diameter / 2 - handDiameter / 2}
        y={padding + diameter / 2 - handLength - handDiameter}
        mask={`url(#hand${isHourHand ? "Hour" : "Minute"})`}
      />
    </svg>
  );
}
