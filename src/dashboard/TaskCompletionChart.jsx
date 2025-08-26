export default function TaskCompletionChart() {
  return (
    <div className="bg-[#232b3e] rounded-2xl p-6 text-white flex flex-col items-center">
      <div className="font-bold mb-2">Overall Task Completion</div>
      {/* Replace with a real chart or SVG */}
      <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-4">
        {/* Chart goes here */}
        <span className="text-gray-400">[Chart]</span>
      </div>
      <div className="flex flex-col gap-1 text-xs">
        <div><span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>On Going</div>
        <div><span className="inline-block w-3 h-3 bg-gray-400 rounded-full mr-2"></span>Not started</div>
        <div><span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-2"></span>Completed</div>
      </div>
    </div>
  );
}
