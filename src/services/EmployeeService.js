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
// const token = "";
// Create the config object with the Authorization header
const config = {
    headers: {
        'Authorization': `basic ${token}`,
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
        // Login first using :  http://localhost:9091/login
       //const login = instance.get("http://localhost:9091/login", {username, password})
       //         .then((response) => 
       //         console.log("1A. login: " +  response + " : " + JSON.stringify(response))
               // axios.get("http://localhost:9091/login", {username, password}).then((response) => 
                //    console.log("1A. login: " +  response + " : " + JSON.stringify(response)))
       //     )
       //     .catch(error =>{
        //        console.log("1A. login: " +  error)
       //     })

        // console.log("1A. login: " + login)
 // const EMP_TOKEN = axios.post(EMPLOYEE_TOKEN_URL, config)

  this.getToken();

// console.log("3AA. EMP_TOKEN = " + EMP_TOKEN)

        //TODO: get these in app.js, set as context variable, use it in the caller component 
        // pass the HOST value as param to this methods in this class..
        console.log("1. window.location.hostname: " + window.location.hostname)
        console.log("2. window.location.hostname:port : " + window.location.host)
        const employees = instance.get(EMPLOYEE_API_BASE_URL + "/api/v1/employees", {username, password})
        .catch(error =>{
                 console.log("2. Error occured while fetching Employees " + error)
         })
       // console.log("EMPLOYEE_TOKEN_URL : " + EMPLOYEE_TOKEN_URL)

       
       // console.log("EMP_TOKEN : " + EMP_TOKEN);

        return employees;
    }
    getToken() {
        instance.post(EMPLOYEE_API_BASE_URL + "/token", { username, password })
            .then((response) => {
                console.log("3. tokens: " + response + " : " + JSON.stringify(response.data));
                return response.data;
            })
            .catch(error => {
                console.log("3. Error occured while fetching TOKEN ");
            });
    }

    deleteEmployee(id) {
        return axios.delete(EMPLOYEE_API_BASE_URL + "/api/v1/employees/" + id, config);
    }
    getEmployeeById(id) {
        console.log("Inside EmployeeService.getEmployeeById");
        return axios.get(EMPLOYEE_API_BASE_URL + "/api/v1/employees/" + id, config);
    }
    updateEmployee(employee, id) {
        return axios.put(EMPLOYEE_API_BASE_URL + "/api/v1/employees/" + id, employee, config);
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

    deleteAddress(id) {
        console.log('deleteAddress @ Employee Service:' + id);
        console.log("Calling: GET on" + EMPLOYEE_ADDRESS_BASE_URL + "/address/delete/" + id);
        return axios.delete(EMPLOYEE_ADDRESS_BASE_URL + "/address/delete/" + id, config);
    }

}
export default new EmployeeService();