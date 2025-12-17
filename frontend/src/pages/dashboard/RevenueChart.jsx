import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = ({ revenueData }) => {
  const getChartData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dataPoints = new Array(12).fill(0);

    if (revenueData && Array.isArray(revenueData)) {
      revenueData.forEach((item) => {
        if (item._id) {
            const monthIndex = parseInt(item._id.split('-')[1], 10) - 1;
            if (monthIndex >= 0 && monthIndex < 12) {
              dataPoints[monthIndex] = item.totalSales;
            }
        }
      });
    }

    return { labels: months, datasets: dataPoints };
  };

  const { labels, datasets } = getChartData();

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Revenue (USD)',
        data: datasets,
        backgroundColor: 'rgba(34, 197, 94, 0.7)', 
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Fix: Allow chart to shrink/grow with container
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Revenue' },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="w-full h-full p-4 bg-white shadow-lg rounded-lg flex flex-col justify-center">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Monthly Revenue</h2>
      {/* FIX: Removed 'hidden md:block' and added a height wrapper */}
      <div className='h-[300px] w-full'> 
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueChart;