import React from 'react'

const SearchResults = ({employee}) => {
    console.log("Inside SearchResults...");
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
        </tr>
    )
}
export default SearchResults