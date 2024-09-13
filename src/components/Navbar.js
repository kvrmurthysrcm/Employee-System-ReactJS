import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import {UserNameContext, PasswordContext} from '../App'
import EmployeeService from '../services/EmployeeService';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const user = useContext(UserNameContext)
    const passwd = useContext(PasswordContext)

    const[token, setToken] = useState(null);
    const[loading, setLoading] = useState(true);
    const noChange = true;

    // need to use useMemo for this const to avoid reload of token every time.
    useEffect(() => {
        if(sessionStorage.getItem("token") != null){
            // console.log("111. Token in Navbar.js..." + sessionStorage.getItem("token") );
            console.log("111. Valid Token exist in Navbar.js..."  );
            return;
        }
        const fetchData = async () => {
            setLoading(true); 
            try{
                // const response = 
                EmployeeService.getToken(token, setToken)
                //console.log("33. Token in Navbar.js..." + sessionStorage.getItem("token") );
            } catch(error){
                console.log("@useEffect()::Navbar:: error:: " + error);
            }
        };
        fetchData();
        console.log("44. Token in Navbar.js..." + sessionStorage.getItem("token") ); // print the TOKEN finally....
    });

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