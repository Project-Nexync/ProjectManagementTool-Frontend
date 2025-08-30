import React from "react";
import { Line } from "react-chartjs-2";
import { IoClose } from "react-icons/io5";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const days = Array.from({ length: 31 }, (_, i) => `July ${i + 1}`);

// Example data for current and previous month
const currentMonthData = [0,1,2,3,2,4,3,4,2,3,4,5,4,3,2,3,4,5,6,5,4,5,6,7,6,5,4,3,2,1,0].map(v => v * 10 + 20);
const previousMonthData = [0,1,1,2,2,3,2,3,2,2,3,4,3,2,1,2,3,4,5,4,3,4,5,6,5,4,3,2,1,0,0].map(v => v * 8 + 15);

const data = {
  labels: days,
  datasets: [
    {
      label: "Current Month",
      data: currentMonthData,
      fill: true,
      backgroundColor: "rgba(185,28,28,0.18)",
      borderColor: "#b91c1c",
      pointRadius: 0,
      tension: 0.4,
    },
    {
      label: "Previous Month",
      data: previousMonthData,
      fill: true,
      backgroundColor: "rgba(37,99,235,0.10)",
      borderColor: "#2563eb",
      pointRadius: 0,
      tension: 0.4,
    },
  ],
};

// Custom plugin to color legend labels red and blue
const customLegendColorPlugin = {
  id: 'customLegendColorPlugin',
  afterDraw(chart) {
    if (chart.legend && chart.legend.legendItems) {
      chart.legend.legendItems.forEach((item, i) => {
        if (item.text.includes('Current Month')) {
          item.fontColor = '#b91c1c';
        } else if (item.text.includes('Previous Month')) {
          item.fontColor = '#2563eb';
        }
      });
    }
  }
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        color: "#222", // fallback
        font: { size: 18, weight: "semi-bold" },
        usePointStyle: true,
        padding: 24,
      },
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: ${context.parsed.y}`;
        },
      },
    },
  },
  scales: {
    y: {
      min: 0,
      max: 100,
      ticks: {
        color: "#6b7280",
        font: { size: 16 },
        stepSize: 20,
        callback: function (value) {
          switch (value) {
            case 0: return "free";
            case 20: return "low";
            case 40: return "moderate";
            case 60: return "high";
            case 80: return "very high";
            case 100: return "extreme";
            default: return "";
          }
        },
      },
      grid: {
        color: "#e5e7eb",
        drawBorder: false,
      },
    },
    x: {
      ticks: {
        color: "#6b7280",
        font: { size: 14 },
        maxRotation: 0,
        minRotation: 0,
        autoSkip: true,
        maxTicksLimit: 8,
      },
      grid: {
        color: "#f3f4f6",
        drawBorder: false,
      },
    },
  },
  elements: {
    line: {
      borderWidth: 2,
    },
  },
  maintainAspectRatio: false,
};

export default function WorkloadHeatmapModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-[900px] max-w-full z-10 flex flex-col items-center">
        <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-700 border-2 rounded-2xl border-black hover:text-gray-700 text-sm font-bold"
        >
            <IoClose />
        </button>
        <div className="font-black text-xl mb-2 mt-2 text-center text-black">Monthly Workload Heatmap</div>

        <div className="w-full h-[500px] bg-white rounded-xl">
          <Line data={data} options={options} plugins={[customLegendColorPlugin]} />
        </div>
        <div className="text-sm text-gray-600 mt-4 text-center">
          This heatmap visually represents your workload intensity over time, helping you manage workload and get ahead of the deadlines.
        </div>
      </div>
    </div>
  );
}
