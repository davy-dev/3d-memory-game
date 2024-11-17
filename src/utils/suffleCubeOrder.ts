import { CubeT } from "../definition";
import { coordinatesAfterShuffle } from "../cubesP";

export function* range(n: number) {
    for (let i = 0; i < n; i++) {
        yield i + 1;
    }
}

function shuffle(array: number[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function bindProperties(cubeNumber: number): CubeT[] {
    return shuffle(
        [...range(cubeNumber), ...range(cubeNumber)]
    ).map((url:
        number, i: number) => ({
            i,
            url,
            selected: false,
            lock: false,
            x: coordinatesAfterShuffle[i]?.x,
            y: coordinatesAfterShuffle[i]?.y,
        }));
}

