import * as use from "react-use";

export default function Controls() {
  const [falsyDiameter, setDiameter] = use.useLocalStorage(
    "clock_diameter",
    800
  );
  let diameter = falsyDiameter ?? 800;
  const [falsyCellDiameter, setCellDiameter] = use.useLocalStorage(
    "cell_diameter",
    40
  );
  let cellDiameter = falsyCellDiameter ?? 5;
  const [falsyOuterThickness, setOuterThickness] = use.useLocalStorage(
    "outer_thickness",
    10
  );
  let outerThickness = falsyOuterThickness ?? 10;
  const [falsyGap, setGap] = use.useLocalStorage("gap", 1);
  let gap = falsyGap ?? 11;

  return (
    <>
      <div>
        <input
          type="range"
          min={10}
          max={2000}
          step={1}
          value={diameter}
          onChange={(e) => setDiameter(Number(e.target.value))}
        />
        <input
          type="number"
          min={10}
          max={2000}
          step={1}
          value={diameter}
          onChange={(e) => setDiameter(Number(e.target.value))}
        />
        <label>Clock Diameter</label>
      </div>
      <div>
        <input
          type="range"
          min={40}
          max={200}
          step={1}
          value={cellDiameter}
          onChange={(e) => setCellDiameter(Number(e.target.value))}
        />
        <input
          type="number"
          min={40}
          max={200}
          step={1}
          value={cellDiameter}
          onChange={(e) => setCellDiameter(Number(e.target.value))}
        />
        <label>Cell Diameter</label>
      </div>
      <div>
        <input
          type="range"
          min={1}
          max={50}
          step={1}
          value={outerThickness}
          onChange={(e) => setOuterThickness(Number(e.target.value))}
        />
        <input
          type="number"
          min={10}
          max={50}
          step={1}
          value={outerThickness}
          onChange={(e) => setOuterThickness(Number(e.target.value))}
        />
        <label>Outer Thickness</label>
      </div>
      <div>
        <input
          type="range"
          min={1}
          max={10}
          step={0.1}
          value={gap}
          onChange={(e) => setGap(Number(e.target.value))}
        />
        <input
          type="number"
          min={1}
          max={10}
          step={0.1}
          value={gap}
          onChange={(e) => setGap(Number(e.target.value))}
        />
        <label>Gap</label>
      </div>
    </>
  );
}
