import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import React, { useRef } from "react";
import { PerspectiveCamera } from "three";

function useCameraTraveling({
  cameraRef,
  setDisabled,
  setIsRunning,
  isRunning,
  checkNeedTorun,
}: {
  cameraRef: PerspectiveCamera | null;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  isRunning: boolean;
  checkNeedTorun: boolean;
}) {
  gsap.registerPlugin(useGSAP);
  const tl = useRef<gsap.core.Timeline>();

  useGSAP(() => {
    if (cameraRef && !isRunning) {
      tl.current = gsap.timeline().to(cameraRef?.position, {
        z: 20,
        duration: 2,
        ease: "power1.inOut",
        onStart: !checkNeedTorun
          ? () => {
              setDisabled(true);
            }
          : undefined,
        onComplete: !checkNeedTorun
          ? () => {
              setTimeout(() => {
                setIsRunning(true);
                setDisabled(false);
              }, 600);
            }
          : undefined,
      });
      tl?.current.restart();
    }
    if (isRunning && tl.current) {
      tl?.current.pause();
    }
  }, {dependencies: [cameraRef, isRunning, checkNeedTorun]});

  return tl.current;
}

export default useCameraTraveling;
