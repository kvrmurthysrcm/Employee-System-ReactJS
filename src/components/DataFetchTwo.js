import React, {useReducer, useEffect, useState} from 'react'
import axios from 'axios'

const initialState = {
    loadingTwo: true,
    error: '',
    post: {}
}

const reducer = (state, action) => {
    switch(action.type){
        case 'FETCH_SUCCESS':
            console.log("FETCH_SUCCESS: " + JSON.stringify(action))
            console.log("FETCH_SUCCESS: " + JSON.stringify(action.payload))
            return {
                loadingTwo: false,
                error: '',
                post: action.payload
            }
        case 'FETCH_ERROR':
            console.log("FETCH_ERROR....................: ")
            return {
                loadingTwo: false,
                error: 'Something went wrong !',
                post: {}
            }
        default:
            return state
    }
}

function DataFetchTwo() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [localCounter, setLocalCounter] = useState('')

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => {
                console.log("1. state: " + JSON.stringify(response.data))
                dispatch({type: 'FETCH_SUCCESS', payload: response.data})
            })
            .catch(error =>{
                console.log("2. Error occured while fetching data... ")
                dispatch({type: 'FETCH_ERROR'})
            })
    }, [])

    return (
        <div> <b>Using reducer() now:</b>
            {console.log("3. state: " + JSON.stringify(state) )}
            
            { state.loadingTwo ? 'loadingTwo' : state.post.title }
            { state.error ? state.error : "Error"}
        </div>
    )
}

export default DataFetchTwo