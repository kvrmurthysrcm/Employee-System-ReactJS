import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Scatter } from "react-chartjs-2";
import {  } from "react-chartjs-2";

import { LineGraph } from "./Line";
import { BarChart } from "./Bar";
import { PieChart } from "./Pie";
import { ScatterChart } from "./ScatterChart";

import React, { useState } from 'react'

const PedroChart = () => {

    const [page, setPage] = useState("home");

    return (
        <>
        <div>            
            <ul>
            <li onClick={() => setPage("home")}><a class="active" >Home</a></li>
            <li onClick={() => setPage("line")}><a >Line Graph</a></li>
            <li onClick={() => setPage("bar")}><a >Bar Chart</a></li>
            <li onClick={() => setPage("pie")}><a >Pie Chart</a></li>
            <li onClick={() => setPage("scatter")}><a >scatter Chart</a></li>
            </ul>
        </div>
        {(page == "home" && 
            <div className="flex-auto  ">Home Tab  </div>
        )}
        {(page == "line" &&
            <div className="flex-auto  "> <LineGraph/></div>
        )}
        {(page == "bar" &&
            <div className="flex-auto  "><BarChart/></div>
        )}
        {(page == "pie" &&
            <div className="flex-auto  "><PieChart/></div>
        )}
        {(page == "scatter" &&
            <div className="flex-auto  "><ScatterChart/></div>
        )}
        </>
    );
}
export default PedroChart