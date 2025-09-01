
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProjectTaskCompletionChart() {
  // Data and labels for the chart
  const data = {
    labels: ['Completed', 'In Progress', 'Not Started', 'Critical'],
    datasets: [
      {
        label: 'Tasks',
        data: [3, 2, 1, 1],
        backgroundColor: [
          '#22C55E', // green-500
          '#3B82F6', // blue-500
          '#FBBF24', // yellow-500
          '#EF4444', // red-500
        ],
        borderColor: '#222A34',
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };


  const options = {
    responsive: true,
    cutout: '70%', // for doughnut, use 0 for pie
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'start',
        labels: {
          boxWidth: 18,
          boxHeight: 18,
          font: {
            size: 20,
            weight: 'medium',
          },
          color: '#f3f4f6',
          padding: 18,
          generateLabels: function(chart) {
            const data = chart.data;
            const dataset = data.datasets[0];
            const total = dataset.data.reduce((a, b) => a + b, 0);
            return data.labels.map((label, i) => {
              const value = dataset.data[i];
              const percent = total ? ((value / total) * 100).toFixed(0) : 0;
              return {
                text: `${label}: ${value} (${percent}%)`,
                fillStyle: dataset.backgroundColor[i],
                strokeStyle: dataset.borderColor,
                lineWidth: dataset.borderWidth,
                hidden: isNaN(dataset.data[i]) || chart.getDataVisibility(i) === false,
                index: i
              };
            });
          },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percent = total ? ((value / total) * 100).toFixed(0) : 0;
            return `${label}: ${value} (${percent}%)`;
          }
        }
      },
    },
    layout: {
      padding: 0,
    },
    maintainAspectRatio: false,
  };

  // Plugin to force legend label color to white
  const legendLabelWhitePlugin = {
    id: 'legendLabelWhitePlugin',
    beforeDraw(chart) {
      const legend = chart.legend;
      if (legend && legend.legendItems) {
        legend.legendItems.forEach(item => {
          item.fontColor = '#A6CFFE';
        });
      }
    }
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
              width={undefined}
              height={undefined}
            />
          </div>
        </div>
      </div>
        <div className="text-xs text-center text-gray-200 mt-2 italic" style={{ fontFamily: 'sans-serif' }}>
      a visual overview of task completion across this project.
    </div>
    </div>
  );
}
