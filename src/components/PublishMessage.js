import React, { useState, useReducer, useCallBack } from 'react'
import { useNavigate } from 'react-router-dom';
import  EmployeeService  from '../services/EmployeeService'


const PublishMessage = () => {

    const [message, setMessage] = useState("Test")
    const [result, setResult] = useState("")
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
       console.log("handleChange():: e.target.name" + e.target.name + ", value = " + value);
       setMessage({value});
    };

    const publishMessage = (e) => {
        e.preventDefault();
        const value = e.target.value;
        console.log("Inside publishMessage()...");
        console.log("Need to call SQS Queue to publish Message..." + message.value);

        EmployeeService.publishSQSMessage(message.value).then((response) => {
            console.log('publishSQSMessage succesfully done:');
            setResult("Message succesfully sent to SQS Queue!")
            // navigate("/employeeList");
         })
         .catch((error) => {
             let statusCode = "000";
             let errorMessage = "Unknown error occured";
 
             // forward to an error page!!
             if(error.response){
                 statusCode = error.response.status;
                 errorMessage = error.message;
                 console.log("publishSQSMessage() Status code = " + error.response.status);
                 console.log('publishSQSMessage() Error:', errorMessage);
                 console.log('publishSQSMessage() Error:', error);
                 
             } else if(error.request){
             // The request was made but no response was received
                 console.log('publishSQSMessage(): No response received');
                 } else {
                 // Something happened in setting up the request that triggered an Error
                 console.log('Error:', error.message);
                 
             }
             const errorUrl = `/ErrorPage/${statusCode}?message=${encodeURIComponent(errorMessage)}`;
             navigate(errorUrl);
         })
    };

    return (
        <>
        <div>
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Publish test message: {result} </label>
            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 
            rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
             dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
              dark:focus:border-blue-500" placeholder="{Publish test message}"
              onChange={(e) => handleChange(e)}>
            </textarea>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={publishMessage}  >Publish</button>
        </div>
        </>
    )
}
export default PublishMessage