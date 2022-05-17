import React from "react";
import ClockHand from "~/components/ClockHand";
// import Controls from "~/components/Controls";

export default function Index() {
  let diameter = 1000;
  let cellDiameter = 7;
  let outerThickness = 1.6;
  let gap = 0.8;
  let padding = 20;

  return (
    <div style={{ height: "100%" }}>
      {/* <div>
        <Controls />
      </div> */}
      <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
        <ClockHand
          id="clock"
          diameter={diameter}
          cellDiameter={cellDiameter}
          gap={gap}
          outerThickness={outerThickness}
          isHourHand={false}
          padding={padding}
        />
        <ClockHand
          id="clock2"
          diameter={diameter}
          cellDiameter={cellDiameter}
          gap={gap}
          outerThickness={outerThickness}
          isHourHand
          padding={padding}
        />
      </div>
    </div>
  );
}
