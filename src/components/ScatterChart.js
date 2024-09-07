import { Scatter } from "react-chartjs-2"
import { scatterChartData } from "../util/ScatterData";

import {
    Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
    LinearScale, PointElement, LineElement, Tooltip, Legend
);

export const ScatterChart = () => {

    const options = {
        plugins: {
          tooltip: false,
          // filler: false,
          legend: {
            labels: {
              usePointStyle: true,
              boxWidth: 5,
              boxHeight: 5
            },
            position: "top",
            xlabels: "herre"
          }
        },
        // layout: {
        //   padding: {
        //     // top: 10,
        //     left: 150,
        //     right: 150
        //     // bottom: 0
        //   }
        // },
        scales: {
          x: {
            beginAtZero: true,
            max: 40,
            title: {
              display: true,
              text: "Time"
            },
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            max: 200,
            title: {
              display: true,
              text: "Readings"
            },
            grid: {
              display: false
            }
          }
        }
        // spriteText: true
      };
      
    return <Scatter options={options} data={scatterChartData}/>;
};