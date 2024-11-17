import { useState } from "react";
import { CubeT } from "../definition";
import useSound from "use-sound";
import pairFound from "/sounds/pair-found.wav";
import clickSound from "/sounds/click.mp3";
import victorySound from "/sounds/victory.wav";
import { useGSAP } from "@gsap/react";
import randomColor from "../utils/randomColor";

export default function useGameLogic() {

    const [gameState, setGameState] = useState<CubeT[]>([]);
    const [controlPair, setControlPair] = useState<CubeT[]>([]);
    const [disabled, setDisabled] = useState(true);
    const detectedVictory = gameState.length && gameState?.every((c) => c.selected);
    const [hit, setHit] = useState(0);
    const click = useSound(clickSound);
    const found = useSound(pairFound);
    const victory = useSound(victorySound);

    useGSAP(() => {
        
        const timeout = setTimeout(() => {
            if (
                controlPair.length === 2 &&
                controlPair[0]?.url === controlPair[1]?.url &&
                controlPair[0]?.i !== controlPair[1]?.i
            ) {
                found[0]();
                setHit(hit + 1);
                setDisabled(true);
                setGameState([
                    ...gameState.map((cubeP) =>
                        cubeP?.url === controlPair[0]?.url ||
                            cubeP?.url === controlPair[1]?.url
                            ? { ...cubeP, selected: true, lock: true }
                            : cubeP
                    ),
                ]);
                setControlPair([]);
            }
            if (
                controlPair.length === 2 &&
                controlPair[0].url !== controlPair[1].url
            ) {
                setHit(hit + 1);
                setDisabled(true);
                setGameState([
                    ...gameState.map((cubesP) =>
                        cubesP.url === controlPair[0].url ||
                            cubesP.url === controlPair[1].url
                            ? { ...cubesP, selected: false }
                            : cubesP
                    ),
                ]);
                setControlPair([]);
            }

        }, 400);
        setDisabled(false);
        return () => clearTimeout(timeout);
    }, [controlPair]);

    useGSAP(() => {
        if (detectedVictory){
            console.log("victory");
            victory[0]()};
    }, [detectedVictory]);

    function handleClick(selectedCube: CubeT) {

        if (controlPair.length <= 1 && controlPair[0]?.i !== selectedCube.i) {
            click[0]();
            setControlPair([...controlPair, selectedCube]);
            setGameState([
                ...gameState.map((c) => {
                    if (c.i === selectedCube.i) {
                        return { ...c, selected: true };
                    }
                    return c;
                }),
            ]);

        }

    }

    function handleReset(ctx: () => void, bindPosition: CubeT[], setColor: (color: string) => void) {   
        return function (){
            ctx();
            setControlPair([]);
            setColor(randomColor());
            setGameState(bindPosition);
            setHit(0);
        }
    }

    return { setGameState, gameState, handleClick, disabled, setDisabled, hit, handleReset }
}