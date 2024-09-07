import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import  EmployeeService  from '../services/EmployeeService'
import  ListAddresses  from './ListAddresses'

export const ListAddressContext = React.createContext()

const Address = () => {

     // employee ID that is passed to this:
    const {id} = useParams()
    console.log("1. employeeId: " + id);

    const [result, SetResult] =  useState()

    const [address, setAddress] = useState({
        orderId: "",
        empId: id,
        street: "",
        city: "",
        state: "",
        zip: "",
        action: "addAddress",
        billingAddress:0,
        defaultAddress:0
    });

    const navigate = useNavigate();

    const handleAddressChange = (e, id) => {
        //console.log("handleAddressChange():: e.target.name= " + e.target.name + ", id: " + id)
        // console.log("addresList: " + JSON.stringify(addresList))
        // Loop through the existing list of adderess and compare each Addreess if its the one to load using the ID.
        addresList.map((localAddress) => ( 
           setAddressLocally(localAddress, id)
        ))
    } // End of handleAddressChange()

    function setAddressLocally(localAddress, id){
        console.log("id: " +  id + ", localAddress.orderId: " +  localAddress.orderId )
        if(id == localAddress.orderId)
        {
            console.log("localAddress.orderId: " +  JSON.stringify(localAddress) )
            // using useState variable to set the addressvariable Object
            setAddress({...address, 
                orderId: localAddress.orderId,
                empId: localAddress.empId,
                street: localAddress.street,
                city: localAddress.city,
                state: localAddress.state,
                zip: localAddress.zip,
                action: "updateAddress",
                billingAddress: (localAddress.billingAddress) ? 1 : 0,
                defaultAddress: (localAddress.defaultAddress) ? 1 : 0
            })
        }
    } // End of setAddressLocally()

    const handleChange = (e) => {
        const value = e.target.value;
       console.log("handleChange():: e.target.name= " + e.target.name + ", value = " +  value
        + ", e.target.type: " + e.target.type);
       //e.target.checked
       // if(e.target.name == 'defaultAddress' || e.target.name == 'billingAddress'){
        if(e.target.type == 'checkbox'){
            console.log("1. handleChange():: e.target.name = " + e.target.name + ", checked = " +  e.target.checked);
            if(e.target.checked)
                setAddress({...address, [e.target.name]: 1});
            else
                setAddress({...address, [e.target.name]: 0});
            //console.log("2. handleChange() address= " + JSON.stringify(address));
        } 
        else{
            setAddress({...address, [e.target.name]: value});
            //console.log("3. handleChange() address= " + JSON.stringify(address));
        }
        console.log("4. handleChange() address= " + JSON.stringify(address));
    };

    const saveAddress = (e) => {
        e.preventDefault();
        //console.log("2. employeeId: " + id);

        setAddress({...address, empId: id}); // explicitly save Employee ID:

        console.log("EmployeeService address published to SQS Queue= " + JSON.stringify(address));
        // console.log("EmployeeService = " + EmployeeService);
        // PUBLISH the JSON format object as the message for SQS Queue.
        EmployeeService.publishSQSMessage(JSON.stringify(address)).then((response) => {
            SetResult("Succesfully sent the Address for saving!")
            console.log("EmployeeService address published to SQS Queue");
             // navigate("/employeeList"); // TODO: its a good idea to bring it back to Employee Linpm startst!
             navigate("/address/" + id); // reload the Add Address page..
        })
        .catch((error) => {
            let statusCode = "000";
            let errorMessage = "Unknown error occured";

            // forward to an error page!!
            if(error.response){
                statusCode = error.response.status;
                errorMessage = error.message;
                console.log("saveEmployee() Status code = " + error.response.status);
                console.log('saveEmployee() Error:', errorMessage);
                console.log('saveEmployee() Error:', error);
                
            } else if(error.request){
            // The request was made but no response was received
                console.log('saveEmployee(): No response received');
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error:', error.message);
                
            }
            const errorUrl = `/ErrorPage/${statusCode}?message=${encodeURIComponent(errorMessage)}`;
            navigate(errorUrl);
        })
    };

    const reset = (e) => {
        e.preventDefault();
        setAddress({
            id: "",
            empId: id,
            street: "",
            city: "",
            state: "",
            zip: "",
            action: "addAddress",
            billingAddress:false,
            defaultAddress:false
        });
    };

    const[addresList, setAddressList] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await EmployeeService.getAllAddressByEmpID(id);
           console.log("response = EmployeeService.getAllAddressByEmpID(id) " + response.data)
           setAddressList(response.data);
          } catch (error) {
              console.log(error);
          }
        };
        fetchData();
    }, []);

    return (
        <>
        {addresList !== null && (
            <div className="bg-white">
            <div className=" max-w-2xl mx-auto shadow border-b">
                <fieldset class='p-3 border border-black'>
                <legend>Saved addresses:</legend>
                {addresList.map((localAddress) => ( 
                    <div className="flex max-w-2xl mx-auto shadow border-b">
                        <a onClick={(e) => handleAddressChange(e, localAddress.orderId)} 
                            className="text-indigo-600 hover:text-indigo-800 px-4 py-2 hover:cursor-pointer"
                id={localAddress.orderId} key={localAddress.orderId} name="address" value={localAddress.orderId}> 
                        {localAddress.street}  - {localAddress.city} - {localAddress.state} - {localAddress.zip}             
                        </a>
                    </div>
                ))}
                </fieldset>
                </div>
            </div> 
        )}

<div className=" max-w-2xl mx-auto shadow border-b">
<fieldset class='p-3 border border-black'>
<legend>Add new address:</legend>

<table class="table-auto">
  <thead>
    <tr> <th></th>
      <th className="font-thin text-2xl tracking-wider">         
        
        </th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="block text-gray-600 text-sm font-normal align-middle">Street:</td>
      <td><input type="text" name="street" value={address.street}
                    onChange={(e) => handleChange(e)}
                    className="h-6 w-96 border mt-2 px-1 py-1"></input></td>
      <td></td>
    </tr>
    <tr>
      <td className="block text-gray-600 text-sm font-normal">City:</td>
      <td><input type="text" name="city" value={address.city} 
                     onChange={(e) => handleChange(e)} 
                     className="h-6 w-96 border mt-2 px-1 py-1"></input></td>
      <td></td>
    </tr>
    <tr>
      <td className="block text-gray-600 text-sm font-normal">State:</td>
      <td><input type="text" name="state" value={address.state} 
                     onChange={(e) => handleChange(e)} 
                     className="h-6 w-96 border mt-2 px-1 py-1"></input></td>
      <td></td>
    </tr>
    <tr>
      <td className="block text-gray-600 text-sm font-normal"> <label>ZIP:</label></td>
      <td><input type="numeric"  name="zip" value={address.zip}
                     onChange={(e) => handleChange(e)}
                    className="h-6 w-96 border mt-2 px-1 py-1"></input></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td className="block text-gray-600 text-sm font-normal">Defaut Address:
            <input type="checkbox"  name="defaultAddress" value={address.defaultAddress}
                    onChange={(e) => handleChange(e)}
                    checked={ (address.billingAddress || address.billingAddress == 1) ? "checked" : null}></input>
                     &nbsp; &nbsp; &nbsp;
                    Billing Address:<input type="checkbox" name="billingAddress" value={address.billingAddress}
                     onChange={(e) => handleChange(e)} key1="value1"
                     checked={ (address.billingAddress || address.billingAddress == 1) ? "checked" : null}></input>            
        </td>
      <td className="block text-gray-600 text-sm font-normal">
            </td><td></td>
    </tr>
    <tr>
    <td> </td>
      <td>  <button onClick={saveAddress} className="rounded 
                text-white font-semibold bg-blue-400 hover:bg-blue-700 py-1 px-6">Save</button> &nbsp; &nbsp;
            <button onClick={reset} className="rounded
             text-white font-semibold bg-gray-400 hover:bg-gray-700 py-1 px-6">Clear</button>
    </td>
      </tr>
      <tr>
        <td> </td>
        <td> <div > {result}...</div></td>
        <td> </td>
      </tr>
  </tbody>
</table>
</fieldset>
        <div></div>
        </div>
        </>
    ) 
}
export default Address 