import { useState } from "react";
import TopNav from '../components/DashboardNav';
import ProjectCardsGrid from './ProjectCardsGrid';
import CalendarPanel from './CalendarPanel';
import TaskCompletionChart from './TaskCompletionChart';
import WorkloadHeatmapModal from './WorkloadHeatmapModal';
import { MdOutlineAutoGraph } from "react-icons/md";
export default function MainContent() {
  const [user] = useState({ profilePic: null });
  const [section, setSection] = useState('ongoing'); // 'ongoing', 'completed', 'all'
  const [showHeatmap, setShowHeatmap] = useState(false);

  // Filtering logic for projects
  function filterType(project) {
    if (section === 'all') return true;
    if (section === 'ongoing') {
      // Ongoing: progress < 100
      return project.progress < 100;
    }
    if (section === 'completed') {
      // Completed: progress === 100
      return project.progress === 100;
    }
    return true;
  }

  return (
    <main className="flex-1 flex flex-col p-8 pt-4">
      <TopNav user={user} />
      <div className="flex flex-row gap-8 mt-6">
        <ProjectCardsGrid filterType={filterType} />
        <div className="flex flex-col gap-6 w-80">
          <CalendarPanel />
          <button
            className="
            flex items-center justify-center gap-2 
            bg-[#9D1C1D] text-[#FFB7B7] 
            rounded-lg py-2 px-4 
            shadow-[0_4px_0_#6b1010,0_6px_12px_rgba(0,0,0,0.4)] 
            hover:translate-y-[1px] hover:shadow-[0_2px_0_#6b1010,0_4px_8px_rgba(0,0,0,0.4)] 
            active:translate-y-[2px] active:shadow-[0_0px_0_#6b1010,0_2px_4px_rgba(0,0,0,0.4)]
            transition-all duration-150"
            onClick={() => setShowHeatmap(true)}
          >
            <MdOutlineAutoGraph className="w-5 h-5" />
            <span>View Personal Workload Heatmap</span>
          </button>
          <TaskCompletionChart />
        </div>
      </div>
      <WorkloadHeatmapModal open={showHeatmap} onClose={() => setShowHeatmap(false)} />
    </main>
  );
}
