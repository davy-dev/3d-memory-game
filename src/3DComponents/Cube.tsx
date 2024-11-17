import { Decal, useTexture } from "@react-three/drei";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";
import { CubeT } from "../definition";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useCubeRotation from "../hooks/useCubeRotation";
import useCubeIntro from "../hooks/useCubeIntro";

gsap.registerPlugin(useGSAP);

function Box({
  position,
  cubeP,
  selectCube,
  disabled,
  color,
}: {
  position: Vector3;
  cubeP: CubeT;
  disabled: boolean;
  color: string;
  selectCube: (cubeP: CubeT) => void;
}) {
  const ref = useRef<Mesh | null>(null!);

const tl = useCubeRotation({ cubeP, cubeRef: ref?.current });

 useCubeIntro({
    cubeP,
    cubeRef: ref?.current,
    tlRotate: tl
  });

  return (
    <mesh
      onClick={() => cubeP.lock || (disabled === false && selectCube(cubeP))}
      scale={1.7}
      ref={ref}
      position={position}
      rotation={[0, 0, 0]}
    >
      {" "}
      <Decal
        position={[0, 0, -0.1]}
        rotation={[0, 0, 0]}
        /*debug*/
      >
        {" "}
        <meshPhysicalMaterial
          transparent
          map={useTexture(`img/${cubeP.url}.png`)}
          roughness={1}
        />
      </Decal>
      <boxGeometry></boxGeometry>
      <meshPhysicalMaterial
        clearcoat={1}
        color={color}
        clearcoatRoughness={0}
        roughness={0}
        metalness={0.5}
      />
    </mesh>
  );
}

export default Box;
