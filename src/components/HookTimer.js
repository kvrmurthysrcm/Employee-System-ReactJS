import React, {useState, useEffect, useRef} from 'react'

function HookTimer() {
    const [timer, setTimer] = useState(0)
    const intervalRef = useRef()

    useEffect( () => {
        intervalRef.current = setInterval( () => {
            setTimer(prevTimer => prevTimer + 1)
        }, 1000)
        return () => {
            clearInterval(intervalRef.current)
        };
    }, [])

    return (
        <>
        <p> .....</p>
        <div className="border-solid border-2 border-indigo-600 hover:border-dotted">
        <p><b>Using the example of useRef(), set and clear timer using button onClick event</b></p> 
            HookTimer! {timer}
            <button onClick={()=> clearInterval(intervalRef.current)} class="bg-blue-300 hover:bg-blue-700 font-bold py-2 px-4 rounded">Clear/Stop Timer</button>
        </div>
        </>
    )
}
export default HookTimer