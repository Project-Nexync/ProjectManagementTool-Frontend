import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function TaskCompletionChart() {
  const data = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [
      {
        data: [4, 14, 2],
        backgroundColor: [
          '#22C55E', // green-500
          '#3B82F6', // blue-500
          '#EF4444', // red-500
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: true,
        position: 'left',
        align: 'start',
        labels: {
          boxWidth: 16,
          boxHeight: 16,
          font: {
            size: 12,
            weight: 'bold',
          },
          color: '#d1d5db', // Tailwind gray-300
          padding: 18,
        },
      },
      tooltip: { enabled: true },
    },
    layout: {
      padding: 0,
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-[rgba(51,51,51,0.3)] border border-[#505258] shadow-[2px_2px_6px_#23272f,-2px_-2px_6px_#3a3f4b] p-4 flex flex-col gap-2 w-[300px] h-[300px] transition-shadow duration-300 hover:shadow-[4px_4px_12px_#23272f,-4px_-4px_12px_#3a3f4b] cursor-pointer">
      <div className="flex flex-row items-start w-full justify-center gap-8">
        <div className="flex flex-col items-center justify-start">
          <div className="font-bold text-2xl mb-4 text-center">
            Overall Task Completion
          </div>
          <div className="h-64 w-64 min-w-[16rem] min-h-[16rem] bg-transparent flex items-center justify-center mb-4">
            <Doughnut
              data={data}
              options={options}
              width={256}
              height={256}
            />
          </div>
        </div>
        {/* Legend is rendered by Chart.js, but the header is now in the same flex row */}
      </div>
      <div className="text-xs text-center text-gray-200 mt-2">
        a visual overview of task completion across all assigned projects.
      </div>
    </div>
  );
}
