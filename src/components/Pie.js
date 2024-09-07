import { Pie } from "react-chartjs-2"
import { pieChartData } from "../util/PieData";

import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
);

export const PieChart = () => {

    const options = {};
    return <Pie options={options} data={pieChartData}/>;
};