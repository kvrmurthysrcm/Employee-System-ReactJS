import React, {useEffect, useRef} from 'react'

function FocusInput() {

    const inputRef = useRef(null)
    useEffect( () => {
        // focus input element!
        inputRef.current.focus()
    }, [])

    return (
        <>
        <p> .....</p>
        <div className="border-solid border-2 border-indigo-600 hover:border-dotted">
        <p><b>Using the example of useRef(), set focus to input field on load...</b> 
            <input ref={inputRef} type="text" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </p>
        </div>
        </>
    )
}
export default FocusInput