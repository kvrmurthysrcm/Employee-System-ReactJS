import React, {useState, useEffect} from 'react'
import axios from 'axios'

function DataFetchOne() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [post, setPost] = useState({})

    // const URL = "http://localhost:8000/users";
    const URL = "https://jsonplaceholder.typicode.com/posts/1";

    useEffect(() => {
        axios.get(URL)
            .then(response => {
                setLoading(false)
                setPost(response.data)
                setError('')
            })
            .catch(error =>{
                setLoading(false)
                setPost({})
                setError('Something went wrong !')
            })
    }, [])

    return (
        <div> <b>Using useEffecct() now:</b>
        <p><b>Using URL: {URL}</b></p>

            { loading ? 'Loading' : '<b>Response from API: </b>' + JSON.stringify(post) }
            <p>...</p>
            { error ? error : null}
        </div>
    )
}

export default DataFetchOne