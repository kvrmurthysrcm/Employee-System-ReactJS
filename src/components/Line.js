import { Line } from "react-chartjs-2"
import { lineChartData } from "../util/LineData";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const LineGraph = () => {

    const options = {
        responsive: true,
        plugins: {
            Legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "This is a Line Graph representation of daily steps!",
                position: "bottom"
            },
        },
    };

    return <Line options={options} data={lineChartData} /> 
};