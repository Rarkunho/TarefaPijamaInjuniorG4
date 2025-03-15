import { useState } from "react";


export default function useCounter(initialCondition: number, finalCondition: number) {
    const [counter, setCounter] = useState<number>(initialCondition)


    function increment() {
        if (counter < finalCondition ) { 
            setCounter((currentState) => currentState+1)
        }
    }

    function decrement() {
        if (counter > 1) {
            setCounter((currentState) => currentState-1)
        }
    }

    return {counter, increment, decrement, setCounter}
}