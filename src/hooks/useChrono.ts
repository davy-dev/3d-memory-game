import { useEffect, useState } from 'react'



function useChrono() {

    const [miliseconds, setMiliseconds] = useState(0);
    const [secondes, setSecondes] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if(isRunning){
            requestAnimationFrame(run);
        }
    }, [isRunning, miliseconds, reset]);


    function run() {

        if (isRunning) {
            setMiliseconds(miliseconds + 1.5);
            if (miliseconds >= 100) {
                setSecondes(sec => sec + 1);
                setMiliseconds(0);
            }
            if (secondes >= 60) {
                setMinutes(min => min + 1);
                setSecondes(0);
            }
        }

    }

    function reset() {
        setSecondes(0);
        setMinutes(0);
        setMiliseconds(0);
    }
    const fullChrono = `${minutes < 10 ? "0" : ""}${minutes}:${secondes < 10 ? "0" : ""}${secondes}:${miliseconds < 10 ? "0" : ""}${Math.floor(miliseconds)}`;

    return { miliseconds, secondes, minutes, fullChrono,isRunning, setIsRunning, reset };
}

export default useChrono