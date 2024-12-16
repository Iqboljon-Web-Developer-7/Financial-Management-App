import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(...registerables);

const AnimatedChart = ({
  incomeData,
  outcomeData,
  labels,
  currencyConverter,
  selectedCurrency,
}) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Income",
        data: [],
        fill: false,
        borderColor: "green",
        tension: 0.1,
      },
      {
        label: "Outcome",
        data: [],
        fill: false,
        borderColor: "red",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    if (labels.length && incomeData.length && outcomeData.length) {
      // Convert incomeData and outcomeData to the selected main currency
      const convertedIncomeData = incomeData.map((income) =>
        currencyConverter(income, selectedCurrency)
      );
      const convertedOutcomeData = outcomeData.map((outcome) =>
        currencyConverter(outcome, selectedCurrency)
      );

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Income",
            data: convertedIncomeData,
            fill: false,
            borderColor: "green",
            tension: 0.1,
          },
          {
            label: "Outcome",
            data: convertedOutcomeData,
            fill: false,
            borderColor: "red",
            tension: 0.1,
          },
        ],
      });
    }
  }, [incomeData, outcomeData, labels, currencyConverter, selectedCurrency]);

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <motion.div
      className="line-graph"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Line data={chartData} options={chartOptions} />
    </motion.div>
  );
};

export default AnimatedChart;
