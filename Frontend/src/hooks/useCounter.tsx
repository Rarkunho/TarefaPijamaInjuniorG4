import { useState } from "react";


export default function useCounter(initialCondition: number) {
    const [counter, setCounter] = useState<number>(initialCondition)


    function increment() {
        if (counter < 8 ) { //mudar isso aqui depois
            setCounter((currentState) => currentState+1)
        }
    }

    function decrement() {
        if (counter > 0) {
            setCounter((currentState) => currentState-1)
        }
    }

    return {counter, increment, decrement}
}