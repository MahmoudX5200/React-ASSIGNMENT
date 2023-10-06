import { createContext, useState } from "react";

export let Counter = createContext()

export default function CounterProvider(props) {

    let [count, setCount] = useState(0)
    function changeCount() {
        setCount(Math.random() * 10)
    }
    return <Counter.Provider value={{ count, changeCount }}>

        {props.children}

    </Counter.Provider>
}