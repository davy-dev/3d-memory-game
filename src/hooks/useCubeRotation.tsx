import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { Mesh, Object3D, Object3DEventMap } from "three";
import gsap from "gsap";
import { CubeT } from "../definition";
gsap.registerPlugin(useGSAP);
function useCubeRotation({
  cubeP,
  cubeRef,

}: {
  cubeP: CubeT;
  cubeRef: Mesh | Object3D<Object3DEventMap> | null;
}) {
  const [tl, setTl] = useState<gsap.core.Timeline>();

  const { contextSafe } = useGSAP(() => {
    const tl = gsap.timeline();
    if (cubeP && cubeP?.selected && cubeRef) {
      tl?.to(cubeRef?.rotation, {
        y: Math.PI,
        delay: 0,
        duration: 0.13,
        ease: "power1.inOut",
      });
      tl?.play();
    }
    if (cubeP && !cubeP?.selected && cubeRef) {
      toggleTimeline();
    }
    setTl(tl);
  },[cubeP.selected, cubeRef, cubeP.url]);

  const toggleTimeline = contextSafe(() => {
    tl?.reversed(!tl.reversed());
  });
return tl
}

export default useCubeRotation;
