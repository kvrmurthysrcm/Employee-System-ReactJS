import React, {useReducer} from 'react'

const initialState = {
    firstCounter: 0
}

const reducer = (state, action) => {
    // alert('Inside reduce function...action:' + JSON.stringify(action))
    switch (action.type) {
        case 'increment':
            return {firstCounter: state.firstCounter + action.value}
        case 'decrement':
            return {firstCounter: state.firstCounter - action.value}  
        case 'reset':
            return initialState
        default:
            return state
    }
}

function CounterTwo() {
    const [count, dispatch] = useReducer(reducer, initialState)

    return (
        <>
        <p> .....</p>
        <div className="border-solid border-2 border-indigo-600 hover:border-dotted">
            <div> useReducer() using an object!!</div>
            <div> Count - {count.firstCounter}</div>

            <div className="flex max-w-2xl mx-auto shadow border-b space-x-10" > 
                <button onClick={()=> dispatch({type: 'increment', value: 1 })}
                class="bg-blue-300 hover:bg-blue-700 font-bold py-2 px-4 rounded"> Increment </button>
                <button onClick={()=> dispatch({type: 'decrement', value: 1 })}
                class="bg-blue-300 hover:bg-blue-700 font-bold py-2 px-4 rounded"> Decrement </button>

                <button onClick={()=> dispatch({type: 'increment', value: 5 })}
                class="bg-blue-300 hover:bg-blue-700 font-bold py-2 px-4 rounded"> Increment 5</button>
                <button onClick={()=> dispatch({type: 'decrement', value: 5 })}
                class="bg-blue-300 hover:bg-blue-700 font-bold py-2 px-4 rounded"> Decrement 5</button>

                <button onClick={()=> dispatch({type: 'reset' })}
                class="bg-blue-300 hover:bg-blue-700 font-bold py-2 px-4 rounded"> Reset 5</button>
            </div>
        </div>
        </>
    )
}

export default CounterTwo
