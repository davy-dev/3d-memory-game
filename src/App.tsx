import { Environment, PerspectiveCamera as PerCam } from "@react-three/drei";
import { PerspectiveCamera } from "three";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import useGameLogic from "./hooks/useGameLogic";
import { bindProperties } from "./utils/suffleCubeOrder";
import randomColor from "./utils/randomColor";
import useChrono from "./hooks/useChrono";
import Text from "./3DComponents/Text";
import CubeGrid from "./3DComponents/CubeGrid";
import useCameraTraveling from "./hooks/useCameraTraveling";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const defaultGameSet = bindProperties(8);
function App() {
  const [color, setColor] = useState(randomColor());
  const cameraRef = useRef<PerspectiveCamera | null>(null!);
  gsap.registerPlugin(useGSAP);
  const {
    setGameState,
    gameState,
    handleClick,
    disabled,
    hit,
    setDisabled,
    handleReset,
  } = useGameLogic();

  const { fullChrono, setIsRunning, reset, isRunning } = useChrono();

  useEffect(() => {
    if (gameState?.every((c) => c.selected)) {
      setIsRunning(false);
    }
  }, [gameState]);

  const tl = useCameraTraveling({
    cameraRef: cameraRef.current,
    setDisabled,
    setIsRunning,
    isRunning,
    checkNeedTorun: gameState?.every((c) => c.selected),
  });

  function reloadCtx() {
    setIsRunning(false);
    reset();
  }

  useEffect(() => {
      setGameState(defaultGameSet)
  }, []);

  useEffect(() => {
    if ((gameState.length, cameraRef.current)) {
      tl?.play();
    }
  }, []);

  return (
    <div>
      {gameState?.every((c) => c.selected) && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <Suspense fallback={<p>LOADING...</p>}>
        <Canvas
          camera={{ fov: 35, near: 50 }}
          style={{ position: "relative", width: "100dvw", height: "100dvh" }}
        >
          <ambientLight />
          <PerCam ref={cameraRef} makeDefault position={[5, 4, 90]} />
          <Text
            fullChrono={fullChrono}
            hit={hit}
            handleReset={handleReset(reloadCtx, bindProperties(8), setColor)}
          />
          <CubeGrid
            gameState={gameState}
            handleClick={handleClick}
            disabled={disabled}
            color={color}
          />
          <Environment preset="sunset" blur={0.5} />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
