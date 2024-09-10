import React, { useState, useReducer, useCallBack } from 'react'
import { useNavigate } from 'react-router-dom';
import  EmployeeService  from '../services/EmployeeService'
import DataFetchOne from './DataFetchOne'
import DataFetchTwo from './DataFetchTwo'
import FocusInput from './FocusInput'
import HookTimer from './HookTimer'
import DocTitleOne from './DocTitleOne'
import CounterTwo from './CounterTwo'
import TestReactAPI from './TestReactAPI'

const initialState = 0;
const reducer = (state, action) => {
    console.log("Inside reducer() in TestPage.js ....................: ")
        switch(action){
            case 'increment':
                return state + 1
            case 'decrement':
                return state - 1
            case 'reset':
                return initialState
            default:
                return state
        }
}
const TestPage = () => {

    const [count, dispatch] = useReducer(reducer, initialState)

    const [employee, setEmployee] = useState({
        id: "",
        emailId: "",
        firstName: "",
        lastName: "",
    });

    const navigate = useNavigate();

    return (
        <>
        <div className="flex max-w-2xl mx-auto shadow border-b" width="100%">Count - {count}</div>
        <div className="flex max-w-2xl mx-auto shadow border-b">
            <div className="flex max-w-2xl mx-auto shadow border-b space-x-10" >
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=> dispatch('increment')}>Increment</button>    
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=> dispatch('decrement')}>Decrement</button>    
                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={()=> dispatch('reset')}>Reset</button> 
            </div>
        </div>
         <DataFetchOne/>
        <DataFetchTwo/>

        <FocusInput/>
        <HookTimer/>
        
        <DocTitleOne/>
        <CounterTwo/>

        <TestReactAPI/>
        </>
    )
}
export default TestPage