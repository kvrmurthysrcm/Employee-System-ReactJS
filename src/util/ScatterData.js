

export const scatterChartData = {
    labels: ["hello", "yeah"],
    datasets: [
      {
         label: "diastolic",
        data: [
          {
            x: 10,
            y: 180
          },
          { x: 35, y: 110 },
          { x: 5, y: 50 },
          { x: 11, y: 90 },
          { x: 25, y: 100 },
          { x: 56, y: 67 },
          { x: 115, y: 60 }
        ],
        backgroundColor: ["rgba(255, 99, 132, 1)", "blue"]
      },
       {
         label: "systolic",
         data: [
           {
             x: 20,
             y: 120,
             r: 3
           },
           { x: 35, y: 85 }
         ],
         backgroundColor: "blue"
       }
    ]
  };