
import React from "react";
import DashboardNav from "../components/DashboardNav";
import Logo from "../dashboard/Logo";
import DateTimeDisplay from "../dashboard/DateTimeDisplay";
import ProjectCard from "../dashboard/ProjectCard";
import backgroundImage from "../assets/bg-screen.png";

// Example static data
const savedProjects = [
  {
    id: 1,
    title: "Website Redesign Project",
    description: "Revamping the company's main website for improved UX, modern UI, and mobile responsiveness.",
    dueDate: "12 August, 2025",
    dueTime: "3.00 p.m.",
    progress: 41,
    completed: false,
    team: ["/src/assets/usericon.png", "/src/assets/usericon.png", "/src/assets/usericon.png", "K"],
    tasks: 5,
    comments: 3,
    attachments: 4,
    completedTasks: 5,
    totalTasks: 9,
    color: "blue"
  },
  {
    id: 2,
    title: "Website Bug Fixing",
    description: "Fixing the marked bugs of the overall website and run full walkthrough again",
    dueDate: "20 July, 2025",
    dueTime: "11.59 p.m.",
    progress: 100,
    completed: true,
    team: ["/src/assets/usericon.png", "/src/assets/usericon.png", "K"],
    tasks: 3,
    comments: 3,
    attachments: 4,
    completedTasks: 5,
    totalTasks: 9,
    color: "green"
  },
  // ...add more projects as needed
];

export default function SavedProjects() {
  return (
    <div
      className="min-h-screen w-full bg-[#0a1834]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex flex-row items-center px-8 pt-4">
        <Logo />
        <div className="ml-8 flex-1">
          <DashboardNav />
        </div>
      </div>
      <div className="flex flex-row items-center px-8 mt-6 gap-20">
        <div className="-mt-12">
        <DateTimeDisplay />
        </div>
        <div className="flex flex-col gap-0">
          <h1 className="text-4xl font-bold text-white">Saved Projects</h1>
          <span className="text-lg text-blue-200">Keep your most important projects saved here to easier access</span>
        </div>
      </div>
      <div className="px-8 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-start">
          {savedProjects.map(project => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
