import { useState } from "react";
import TopNav from './TopNav';
import ProjectCardsGrid from './ProjectCardsGrid';
import CalendarPanel from './CalendarPanel';
import TaskCompletionChart from './TaskCompletionChart';

export default function MainContent() {
const [user] = useState({ profilePic: null }); // or your actual user data
  return (
    <main className="flex-1 flex flex-col p-8 pt-4">
      <TopNav user={user} />
      <div className="flex flex-row gap-8 mt-6">
        <ProjectCardsGrid />
        <div className="flex flex-col gap-6 w-80">
          <CalendarPanel />
          <TaskCompletionChart />
        </div>
      </div>
    </main>
  );
}
