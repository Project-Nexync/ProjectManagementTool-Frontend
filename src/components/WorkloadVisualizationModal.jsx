import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // get projectId from URL
import { IoClose } from "react-icons/io5";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import api from "../api.jsx";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function WorkloadVisualizationModal({ onClose }) {
  const { projectId } = useParams(); // automatically read from URL
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const fetchWorkload = async () => {
      try {
        if (!projectId) return;
        const res = await api.get(`/project/${projectId}/workload`);
        if (res.data.success && res.data.users) {
          const mappedData = res.data.users.map(user => ({
            name: user.name,
            avatar: "https://randomuser.me/api/portraits/lego/1.jpg", // placeholder
            percentage: parseFloat(user.contribution)
          }));
          setTeamData(mappedData);
        }
      } catch (err) {
        console.error("Error fetching workload:", err);
      }
    };

    fetchWorkload();
  }, [projectId]);

  const chartData = {
    labels: teamData.map(member => member.name),
    datasets: [
      {
        label: "Task Allocation (%)",
        data: teamData.map(member => member.percentage),
        backgroundColor: "#4b79dbff",
        borderColor: "#0a50e7ff",
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    indexAxis: "y",
    responsive: true,
    barThickness: 25,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Team Workload Visualization",
        font: { size: 24, weight: "bold" }
      },
      tooltip: {
        callbacks: {
          label: context => `${teamData[context.dataIndex].name}: ${teamData[context.dataIndex].percentage}%`
        }
      }
    },
    scales: {
      x: {
        min: 0,
        max: 100
      },
      y: {
        ticks: {
          callback: (value, index) => ` ${teamData[index]?.name || ""}`,
          font: { size: 14 }
        }
      }
    }
  };

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
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
