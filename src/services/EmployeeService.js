import axios from "axios";
import { Buffer } from 'buffer'; 
import React, { useEffect } from 'react'

// const EMPLOYEE_API_BASE_URL = "http://3.131.95.185:9091/api/v1/employees"
const EMPLOYEE_API_BASE_URL = "http://localhost:9091/api/v1/employees"

const EMPLOYEE_MSG_BASE_URL = "http://localhost:9091/sqs"
const EMPLOYEE_ADDRESS_BASE_URL = "http://localhost:9091/api/v1"

const username = "KVRM"
const password = "password"
// Base64 encode the username and password
const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
// Create the config object with the Authorization header
const config = {
    headers: {
        'Authorization': `Basic ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin' : 'http://localhost:3000'
    }
};

class EmployeeService{

    saveEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee, config);
    }
    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL, config);       
    }
    deleteEmployee(id) {
        return axios.delete(EMPLOYEE_API_BASE_URL + "/" + id, config);
    }
    getEmployeeById(id) {
        console.log("Inside EmployeeService.getEmployeeById");
        return axios.get(EMPLOYEE_API_BASE_URL + "/" + id, config);
    }
    updateEmployee(employee, id) {
        return axios.put(EMPLOYEE_API_BASE_URL + "/" + id, employee, config);
    }

    publishSQSMessage(message) {
        console.log('publishSQSMessage @ Employee Service:' + message);
        console.log("Calling: POST on" + EMPLOYEE_MSG_BASE_URL + "/send");
        return axios.post(EMPLOYEE_MSG_BASE_URL + "/send" , message, config);
    }
    // Get all the associated address objectes related to the specific Employee;
    getAllAddressByEmpID(id) {
        console.log('getAllAddressByEmpID @ Employee Service:' + id);
        console.log("Calling: GET on" + EMPLOYEE_ADDRESS_BASE_URL + "/address/" + id);
        return axios.get(EMPLOYEE_ADDRESS_BASE_URL + "/address/" + id , config);
    }
}
export default new EmployeeService();