import React, {useState} from 'react'

import useDocumentTitle from './hooks/useDocumentTitle'

function DocTitleOne() {
    const [count, setCount] = useState(0)

    useDocumentTitle(count)

    return (
        <>
        <p> .....</p>
        <div className="border-solid border-2 border-indigo-600 hover:border-dotted">
        <p> Using cutom hooks now </p>
            <button onClick={()=>setCount(count + 1)} 
            class="bg-blue-300 hover:bg-blue-700 font-bold py-2 px-4 rounded">Count - {count}</button>
        </div>
        </>
    )
}
export default DocTitleOne