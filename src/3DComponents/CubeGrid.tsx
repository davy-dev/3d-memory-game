import { useRef } from "react";
import { CubeT } from "../definition";
import Cube from "./Cube";
import { Group, Vector3 } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function CubeGrid({
  gameState,
  handleClick,
  disabled,
  color,

}: {
  gameState: CubeT[];
  handleClick: (cubeP: CubeT) => void;
  disabled: boolean;
  color: string;
}) {
  gsap.registerPlugin(useGSAP);
  const gridRef = useRef<Group>(null!);


  return (
    <group ref={gridRef}>
      {gameState.map((cubeP: CubeT, i: number) => (
        <Cube
          key={i}
          disabled={disabled}
          position={new Vector3(cubeP.x * 2, cubeP.y * 2, 0)}
          cubeP={cubeP}
          color={color}
          selectCube={handleClick}
        />
      ))}
    </group>
  );
}

export default CubeGrid;
