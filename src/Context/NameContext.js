import { createContext, useState } from "react";


export let NameContext = createContext()

export default function NameContextProvider(props) {
    let [name, setName] = useState("")
    function changeName(value) {
        setName(value)
    }
    return <NameContext.Provider value={{ name, changeName }}>

        {props.children}
    </NameContext.Provider>
}