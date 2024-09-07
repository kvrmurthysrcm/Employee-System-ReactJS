import { Bar } from "react-chartjs-2"
import { barChartData } from "../util/BarData";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const BarChart = () => {

    const options = {};
    return <Bar  options={options} data={barChartData}/>;
};