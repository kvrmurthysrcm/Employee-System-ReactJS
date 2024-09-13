import axios from "axios";
import { Buffer } from 'buffer';

const HOST = "http://localhost";

const EMPLOYEE_API_BASE_URL = HOST + ":9091"
const EMPLOYEE_MSG_BASE_URL = HOST + ":9091/sqs"
const EMPLOYEE_ADDRESS_BASE_URL = HOST + ":9091/api/v1"

const EMPLOYEE_TOKEN_URL = HOST + ":9091/token"

const username = "KVRM"
const password = "password"
// Base64 encode the username and password
const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

// Create the config object with the Authorization header
const config = {
    headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token") ,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin' : 'http://localhost:3000/'
    }
};

const instance = axios.create(
{
    baseURL: "",
    withCredentials: true,
    headers: {
        'Authorization': `basic ${token}`,
        'Access-Control-Allow-Origin' : ' http://localhost:3000',
        'Accept': 'application/json',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
    }
})

//window.location.host

class EmployeeService{

    saveEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL + "/api/v1/employees", employee, config);
    }

    getEmployees() {
console.log("Inside getEmployees()..@EmployeeService calling getToken().............. ");
// console.log("Inside getEmployees()..@EmployeeService Token:: " + sessionStorage.getItem("token") );

        //TODO: get these in app.js, set as context variable, use it in the caller component 
        // pass the HOST value as param to this methods in this class..
        //console.log("1. @EmployeeService: window.location.hostname: " + window.location.hostname)
        //console.log("2. @EmployeeService: window.location.hostname:port : " + window.location.host)
        const employees = axios.get(EMPLOYEE_API_BASE_URL + "/api/v1/employees", config)
        .catch(error =>{
                 console.log("2. Error occured while fetching Employees " + error)
         })
        return employees;
    }

    getToken(token, setToken) {
        instance.post(EMPLOYEE_API_BASE_URL + "/token", { username, password })
            .then((response) => {
                var localToken = response.data

                if(localToken != null){
                    console.log("3A. EmployeeService:getToken():: localToken != null " );
                    //setToken(localToken)
                    sessionStorage.setItem("token",localToken)
                } else {
                    setToken("Token not found !!!")
                }
                //console.log("3A. EmployeeService:getToken():: localToken: " + localToken);
                 return localToken;
            })
            .catch(error => {  
                console.log("3. EmployeeService:getToken():: Error occured while fetching TOKEN " + error);
            });
    }

    deleteEmployee(id) {
        //console.log("Inside deleteEmployee()..@EmployeeService Token:: " + sessionStorage.getItem("token") );
        return axios.delete(EMPLOYEE_API_BASE_URL + "/api/v1/employees/" + id, config);
    }
    getEmployeeById(id) {
        console.log("Inside EmployeeService.getEmployeeById");
       // console.log("Inside getEmployeeById()..@EmployeeService Token:: " + sessionStorage.getItem("token") );
        return axios.get(EMPLOYEE_API_BASE_URL + "/api/v1/employees/" + id, config);
    }
    updateEmployee(employee, id) {
       // console.log("Inside updateEmployee()..@EmployeeService Token:: " + sessionStorage.getItem("token") );
        return axios.put(EMPLOYEE_API_BASE_URL + "/api/v1/employees/" + id, employee, config);
    }

    publishSQSMessage(message) {
        console.log('publishSQSMessage @ Employee Service:' + message);
        // console.log("Calling: POST on" + EMPLOYEE_MSG_BASE_URL + "/send");
        return axios.post(EMPLOYEE_MSG_BASE_URL + "/send" , message, config);
    }
    // Get all the associated address objectes related to the specific Employee;
    getAllAddressByEmpID(id) {
       // console.log("Inside getAllAddressByEmpID()..@EmployeeService Token:: " + sessionStorage.getItem("token") );
        console.log('getAllAddressByEmpID @ Employee Service:' + id);
        console.log("Calling: GET on" + EMPLOYEE_ADDRESS_BASE_URL + "/address/" + id);
        return axios.get(EMPLOYEE_ADDRESS_BASE_URL + "/address/" + id , config);
    }

    deleteAddress(id) {
        console.log('deleteAddress @ Employee Service:' + id);
        console.log("Calling: GET on" + EMPLOYEE_ADDRESS_BASE_URL + "/address/delete/" + id);
       // console.log("Inside deleteAddress()..@EmployeeService Token:: " + sessionStorage.getItem("token") );
        return axios.delete(EMPLOYEE_ADDRESS_BASE_URL + "/address/delete/" + id, config);
    }

}
export default new EmployeeService();