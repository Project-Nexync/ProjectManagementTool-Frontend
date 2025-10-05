import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ✅ missing import
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import api from "../API.jsx"; // adjust path if needed

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProjectTaskCompletionChart() {
  const { projectId } = useParams(); // get projectId dynamically
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;

    const fetchProgress = async () => {
      try {
        const response = await api.get(`/project/${projectId}/progress`);
        if (response.data.success) {
          setProgressData(response.data);
        } else {
          setProgressData(null);
        }
      } catch (error) {
        console.error("Error fetching progress data:", error);
        setProgressData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [projectId]); 
  if (loading) {
    return (
      <div className="text-center text-gray-300 p-6">
        Loading chart data...
      </div>
    );
  }

  if (!progressData) {
    return (
      <div className="text-center text-red-400 p-6">
        Failed to load project progress data.
      </div>
    );
  }

  const completed = progressData.completedTask || 0;
  const ongoing = progressData.ongoingTask || 0;
  const pending = progressData.pendingTask || 0;
  

  const data = {
    labels: ["Completed", "Ongoing", "Pending"],
    datasets: [
      {
        label: "Tasks",
        data: [completed, ongoing, pending],
        backgroundColor: ["#22C55E", "#3B82F6", "#FBBF24"],
        borderColor: "#222A34",
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "start",
        labels: {
          boxWidth: 18,
          boxHeight: 18,
          font: { size: 16, weight: "medium" },
          color: "#f3f4f6",
          padding: 18,
          generateLabels: function (chart) {
            const dataset = chart.data.datasets[0];
            const total = dataset.data.reduce((a, b) => a + b, 0);
            return chart.data.labels.map((label, i) => {
              const value = dataset.data[i];
              const percent = total ? ((value / total) * 100).toFixed(0) : 0;
              return {
                text: `${label}: ${value} (${percent}%)`,
                fillStyle: dataset.backgroundColor[i],
                strokeStyle: dataset.borderColor,
                lineWidth: dataset.borderWidth,
                hidden:
                  isNaN(dataset.data[i]) ||
                  chart.getDataVisibility(i) === false,
                index: i,
              };
            });
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percent = total ? ((value / total) * 100).toFixed(0) : 0;
            return `${label}: ${value} (${percent}%)`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  const legendLabelWhitePlugin = {
    id: "legendLabelWhitePlugin",
    beforeDraw(chart) {
      const legend = chart.legend;
      if (legend && legend.legendItems) {
        legend.legendItems.forEach((item) => {
          item.fontColor = "#A6CFFE";
        });
      }
    },
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 w-full shadow-[0_4px_30px_rgba(0,0,0,0.6)] border border-white/10 ring-1 ring-white/5">
      <div className="font-bold text-xl mb-4 text-center">
        Project Task Completion
      </div>
      <div className="flex flex-row items-start w-full justify-center gap-8">
        <div className="flex-1 flex items-start justify-center">
          <div className="w-full max-w-[400px] aspect-square flex items-start justify-center">
            <Pie
              data={data}
              options={options}
              plugins={[legendLabelWhitePlugin]}
            />
          </div>
        </div>
      </div>
      <div
        className="text-xs text-center text-gray-200 mt-2 italic"
        style={{ fontFamily: "sans-serif" }}
      >
        A visual overview of task completion across this project.
      </div>
    </div>
  );
}
