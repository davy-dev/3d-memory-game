import { useGSAP } from "@gsap/react";
import { CubeT } from "../definition";
import { Mesh, Object3D, Object3DEventMap } from "three";
import gsap from "gsap";

function useCubeIntro({
  cubeP,
  cubeRef,
}: {
  cubeP: CubeT;
  cubeRef: Mesh | Object3D<Object3DEventMap> | null;
  tlRotate : gsap.core.Timeline | undefined
}) {
useGSAP(() => {
    const tlIntro = gsap.timeline();
    if (cubeP.url) {
      if (cubeRef && cubeP) {
        tlIntro
          ?.from(cubeRef?.position, {
            x: 0,
            y: 0,
            z: 900 * Math.random(),
            duration: 1.7,
            ease: "power1.inOut",
          })
          .from(
            cubeRef?.rotation,
            {
              x: 20 * Math.PI,
              y: 1.2 * Math.PI,
              z: 0 * Math.PI,
              duration: 1.7,
              ease: "power1.inOut",
            },
            "<0"
          )
          .from(
            cubeRef?.scale,
            {
              x: 0,
              y: 0,
              z: 0,
              duration: 1.7,
              ease: "power1.inOut",
            },
            "<0"
          );
      }
    }
  }, { dependencies: [cubeP.url, cubeRef], revertOnUpdate: true });
}

export default useCubeIntro;
