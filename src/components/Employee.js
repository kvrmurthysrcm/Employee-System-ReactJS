import React from 'react'
import { useNavigate } from 'react-router-dom';

const Employee = ({employee, deleteEmployee}) => {

    const navigate = useNavigate();

    const editEmployee = (e, id) => {
        e.preventDefault();
        // console.log("/editEmployee/" + id);
        navigate("/editEmployee/" + id);
    };
    const address = (e, id) => {
        e.preventDefault();
        console.log("/address/" + id);
        navigate("/address/" + id);
    };
    

    return (
        <tr key={employee.id}>
            <td className="text-left py-4 px-6">
                <div className="text-sm text-gray-500">{employee.firstName}</div>
            </td>
            <td className="text-left py-4 px-6">
                <div className="text-sm text-gray-500">{employee.lastName}</div>
            </td>
            <td className="text-left py-4 px-6">
                <div className="text-sm text-gray-500">{employee.emailId}</div>
            </td>
            <td className="text-right py-4 px-6 whitespace-nowrap font-medium text-sm">
                <a 
                 onClick={(e,id) => editEmployee(e, employee.id)}
                className="text-indigo-600 hover:text-indigo-800 px-4 py-2 hover:cursor-pointer">Edit</a>
                <a 
                onClick={(e,id) => deleteEmployee(e, employee.id)}
               className="text-indigo-600 hover:text-indigo-800 px-4 py-2 hover:cursor-pointer">Delete</a>

                <a 
                onClick={(e,id) => address(e, employee.id)}
               className="text-indigo-600 hover:text-indigo-800 px-4 py-2 hover:cursor-pointer">Address</a>


            </td>
        </tr>
    )
}
export default Employee