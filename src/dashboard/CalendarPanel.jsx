export default function CalendarPanel() {
  return (
    <div className="bg-[#232b3e] rounded-2xl p-6 text-white">
      {/* Render calendar here, highlight dates as in your image */}
      <div className="font-bold mb-2">July 2025</div>
      {/* ...calendar grid... */}
      <div className="mt-4">
        <div className="flex items-center mb-1">
          <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
          UI design task was due
        </div>
        <div className="flex items-center mb-1">
          <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
          Mobile responsiveness task is due
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
          Marketing plan is due
        </div>
      </div>
      <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg font-bold">
        Click Here to View Personal Workload Heatmap
      </button>
    </div>
  );
}
