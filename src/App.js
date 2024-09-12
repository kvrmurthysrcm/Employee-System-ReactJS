import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import Navbar from './components/Navbar';
import EmployeeList from "./components/EmployeeList";
import MyCharts from "./components/MyCharts";
import PedroChart from "./components/PedroChart";

import ErrorPage from "./components/ErrorPage";
import TestPage from "./components/TestPage";
import PublishMessage from "./components/PublishMessage";
import Address from "./components/Address";

export const UserNameContext = React.createContext()
export const PasswordContext = React.createContext()

function App() {

    return (
        <UserNameContext.Provider value={'KVRM'}>
        <PasswordContext.Provider value={'My passwd'}>

        <div className="App"> 
        <BrowserRouter basename='/empui'>
        <Navbar/> 
        <Routes>
            <Route index element={<EmployeeList/>} />
            <Route path="/" element={<EmployeeList/>} />
            <Route path="/employeeList" element={<EmployeeList/>} />
            <Route path="/addEmployee" element={<AddEmployee/>} />
            <Route path="/editEmployee/:id" element={<UpdateEmployee/>} />
            <Route path="/address/:id" element={<Address/>} />
            
            <Route path="/MyCharts" element={<MyCharts/>} />
            <Route path="/PedroChart" element={<PedroChart/>} />
            <Route path="/ErrorPage/:statusCode" element={<ErrorPage />} />
            <Route path="/TestPage" element={<TestPage />} />
            <Route path="/PublishMessage" element={<PublishMessage />} />
        </Routes>
        </BrowserRouter></div>
    </PasswordContext.Provider>
    </UserNameContext.Provider>
    );
}
export default App;