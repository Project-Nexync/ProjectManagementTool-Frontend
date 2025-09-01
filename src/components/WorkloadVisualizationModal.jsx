import React from "react";
import { IoClose } from "react-icons/io5";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const teamData = [
  { name: "Steve Smith", avatar: "https://randomuser.me/api/portraits/men/1.jpg", percentage: 85.71 },
  { name: "Kallis Jaques", avatar: "https://randomuser.me/api/portraits/women/2.jpg", percentage: 22.41 },
  { name: "McCullum", avatar: "https://randomuser.me/api/portraits/men/3.jpg", percentage: 68 },
  { name: "Lana", avatar: "https://randomuser.me/api/portraits/women/4.jpg", percentage: 59.3 },
];

const chartData = {
  labels: teamData.map((member) => member.name),
  datasets: [
    {
      label: "Task Allocation (%)",
      data: teamData.map((member) => member.percentage),
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  indexAxis: "y", // Horizontal bars
  responsive: true,
  barThickness: 25, // Reduce the width of the bars
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Team Workload Visualization",
      font: {
        size: 24,
        weight: "bold",
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const member = teamData[context.dataIndex];
          return `${member.name}: ${member.percentage}%`;
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: (value, index) => {
          const member = teamData[index];
          return ` ${member.name}`;
        },
        font: {
          size: 14,
        },
      },
    },
  },
};

export default function WorkloadVisualizationModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-[750px] max-w-full z-10">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 border-2 rounded-2xl border-black hover:text-gray-700 text-sm font-bold"
        >
          <IoClose />
        </button>
        <p className="text-sm text-gray-600 text-center mb-0">
          Total Team Members: {teamData.length}
        </p>

        {/* Chart */}
        <div className="flex flex-col gap-4">
          <Bar
            data={chartData}
            options={{
              ...chartOptions,
              scales: {
                y: {
                  ticks: {
                    callback: (value, index) => {
                      const member = teamData[index];
                      return ` ${member.name}`;
                    },
                    font: {
                      size: 14,
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
