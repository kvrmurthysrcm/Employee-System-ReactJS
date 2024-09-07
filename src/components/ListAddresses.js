import React, {useContext} from 'react'

import {ListAddressContext} from './Address'

function ListAddresses(localAddress) {

    const addressList = useContext(ListAddressContext)    

    // {JSON.stringify(addressList)} 
    //console.log("address: " + JSON.stringify(localAddress))
    console.log("address.street: " + localAddress.address.street)
    return (
        <div className="flex max-w-2xl mx-auto shadow border-b">
            <a href="#" key={localAddress.address.orderId}> {localAddress.address.street} 
            - {localAddress.address.city} - {localAddress.address.state} - {localAddress.address.zip}             
            </a>
        </div> 
    )
}

export default ListAddresses