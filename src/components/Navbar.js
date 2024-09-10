import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'

import {UserNameContext, PasswordContext} from '../App'

const Navbar = () => {
    const navigate = useNavigate();
    const user = useContext(UserNameContext)
    const passwd = useContext(PasswordContext)

    return (
        <div className="bg-gray-800">
            <div className="h-16 px-8 flex items-center">
                <div className="font-bold text-red-200"> Employee Management System</div>
                <div className="h-16 px-8 flex items-center text-red-200 " >
                    <a style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>Home</a> </div>
                <div className="h-16 px-8 flex items-center text-red-200">
                    <a style={{ cursor: 'pointer' }} onClick={() => navigate("/PedroChart")}>Charts</a> 
                </div>
                <div className="h-16 px-8 flex items-center text-red-200">
                    <a style={{ cursor: 'pointer' }} onClick={() => navigate("/TestPage")}>Test Page</a> 
                </div>

                <div className="h-16 px-8 flex items-center text-red-200">
                    <a style={{ cursor: 'pointer' }} onClick={() => navigate("/PublishMessage")}>Publish Test Message</a> 
                </div>
                <div className="h-16 px-8 flex items-center text-red-200">
                    <a style={{ cursor: 'pointer' }} >Hello {user} </a> <div passwd="{passwd}"></div>
                </div>
                <div className="h-16 px-8 flex items-center text-red-200">
                    <a style={{ cursor: 'pointer' }} onClick={() => navigate("/perform_logout")}>Logout</a> 
                </div>
            </div>
        </div>
    );
}
export default Navbar