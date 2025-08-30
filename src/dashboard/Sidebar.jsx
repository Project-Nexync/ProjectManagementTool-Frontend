

import Logo from "./Logo";
import DateTimeDisplay from "./DateTimeDisplay";
import ProjectColorDot from "./ProjectColorDot";
import { useState } from "react";
import { CgSandClock } from "react-icons/cg";
import { SiTicktick } from "react-icons/si";
import { GiFullFolder } from "react-icons/gi";
import CreateProject from "../components/CreateProject";


// Project color mapping (should match ProjectCardsGrid)
const projectColors = [
  '#e7e94a', // Website Redesign Project (yellow)
  '#b94a4a', // Website Bug Fixing (red)
  '#4ae77a', // Mobile App Development (green)
  '#a14ae7', // Product Feature Roadmap (purple)
  '#e77a4a', // Marketing Campaign Launch (orange)
  '#4ae7b9', // Flyer Series (cyan/teal)
  '#e7e94a', // Quarterly Sales Review (yellow)
];
const ongoingProjects = [
  { name: 'Website Redesign Project', color: projectColors[0] },
  { name: 'Mobile App Development', color: projectColors[2] },
  { name: 'Product Feature Roadmap', color: projectColors[3] },
  { name: 'Marketing Campaign Launch', color: projectColors[4] },
  { name: 'Flyer Series', color: projectColors[5] },
];
const completedProjects = [
  { name: 'Website Bug Fixing', color: projectColors[1] },
  { name: 'Quarterly Sales Review', color: projectColors[6] },
];
const allProjects = [
  ...ongoingProjects,
  ...completedProjects,
];

const statusSections = [
  {
    label: 'On Going',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="inline-block mr-2 align-middle"><path d="M12 6v6l4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/></svg>
    ),
  },
  {
    label: 'Completed',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="inline-block mr-2 align-middle"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/><path d="M8 12l2.5 2.5L16 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
];


export default function Sidebar({ onSectionSelect }) {
  // Section expand/collapse state
  const [open, setOpen] = useState({
    ongoing: true,
    completed: false,
    all: false,
  });
  // Which section is selected for dashboard filtering
  const [selected, setSelected] = useState('ongoing');
  // Modal state
  const [showCreate, setShowCreate] = useState(false);

  // Helper for slug
  function slug(name) {
    return name.toLowerCase().replace(/\s+/g, "-");
  }

  // Arrow icons
  const DownArrow = (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
  );
  const UpArrow = (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M6 15l6-6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
  );

  // Section click handler (not arrow)
  function handleSectionClick(section) {
    setSelected(section);
    if (onSectionSelect) onSectionSelect(section);
  }

  // Arrow click handler
  function handleArrowClick(e, section) {
    e.stopPropagation();
    setOpen(prev => ({ ...prev, [section]: !prev[section] }));
  }

  return (
    <aside className="w-72 bg-transparent shadow-2xl text-white flex flex-col pt-4 px-6 min-h-screen">
      <Logo />
      <DateTimeDisplay />
      <button
        className="mt-6 bg-[#2ecc40] text-black font-bold py-3 rounded-lg text-lg shadow-md hover:bg-[#27ae38] transition"
        onClick={() => setShowCreate(true)}
      >
        + Start New Project
      </button>
      <CreateProject open={showCreate} onClose={() => setShowCreate(false)} />
      <nav className="mt-8 flex-1">
        {/* Ongoing Section */}
        <div
        className={`flex items-center gap-2 
              bg-transparent backdrop-blur-md 
              px-4 py-3 
              font-bold text-lg select-none 
              transition-all duration-300 ease-in-out transform
              shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_12px_rgba(59,130,246,0.25)]
              ${
                selected === 'ongoing'
                  ? 'bg-transparent text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_12px_rgba(59,130,246,0.25)] scale-110'
                  : 'text-gray-300 hover:bg-transparent hover:text-white'
              }`}
  style={{ cursor: 'pointer' }}
  onClick={() => handleSectionClick('ongoing')}
>
          <CgSandClock size={22} color="#fff" className="inline-block mr-2 align-middle" />
          <span>On Going</span>
          <span
            className="ml-auto"
            style={{ cursor: 'pointer' }}
            onClick={e => handleArrowClick(e, 'ongoing')}
          >
            {open.ongoing ? UpArrow : DownArrow}
          </span>
        </div>
        {open.ongoing && (
          <ul className="bg-transparent rounded-b-lg pt-4 divide-y divide-[#294372]">
            {ongoingProjects.map((p, i) => (
              <li key={p.name} className="flex items-center pl-8 py-2 cursor-pointer hover:bg-[#22304a] transition">
                <a href={`/project/${slug(p.name)}`} className="flex items-center w-full">
                  <ProjectColorDot color={p.color} />
                  <span className="text-sm font-medium">{p.name}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
        {/* Completed Section */}
        <div
          className={`flex items-center gap-2 
              bg-transparent backdrop-blur-md 
              px-4 py-3 
              font-bold text-lg select-none mt-4
              transition-all duration-300 ease-in-out transform
              shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_12px_rgba(59,130,246,0.25)]
              ${
                selected === 'completed'
                  ? 'bg-transparent text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_12px_rgba(59,130,246,0.25)] scale-110'
                  : 'text-gray-300 hover:bg-transparent hover:text-white'
              }`}
          style={{ cursor: 'pointer' }}
          onClick={() => handleSectionClick('completed')}
        >
          <SiTicktick size={22} color="#fff" className="inline-block mr-2 align-middle" />
          <span>Completed</span>
          <span
            className="ml-auto"
            style={{ cursor: 'pointer' }}
            onClick={e => handleArrowClick(e, 'completed')}
          >
            {open.completed ? UpArrow : DownArrow}
          </span>
        </div>
        {open.completed && (
          <ul className="bg-transparent rounded-b-lg pt-4 divide-y divide-[#294372]">
            {completedProjects.map((p, i) => (
              <li key={p.name} className="flex items-center pl-8 py-2 cursor-pointer hover:bg-[#22304a] transition">
                <a href={`/project/${slug(p.name)}`} className="flex items-center w-full">
                  <ProjectColorDot color={p.color} />
                  <span className="text-sm font-medium">{p.name}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
        {/* All Projects Section */}
        <div
          className={`flex items-center gap-2 
              bg-transparent backdrop-blur-md 
              px-4 py-3 
              font-bold text-lg select-none mt-4
              transition-all duration-300 ease-in-out transform
              shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_12px_rgba(59,130,246,0.25)]
              ${
                selected === 'all'
                  ? 'bg-transparent text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_12px_rgba(59,130,246,0.25)] scale-110'
                  : 'text-gray-300 hover:bg-transparent hover:text-white'
              }`}
          style={{ cursor: 'pointer' }}
          onClick={() => handleSectionClick('all')}
        >
          <GiFullFolder size={22} color="#fff" className="inline-block mr-2 align-middle" />
          <span>All Projects</span>
          <span
            className="ml-auto"
            style={{ cursor: 'pointer' }}
            onClick={e => handleArrowClick(e, 'all')}
          >
            {open.all ? UpArrow : DownArrow}
          </span>
        </div>
        {open.all && (
          <ul className="bg-transparent rounded-b-lg pt-4 divide-y divide-[#294372]">
            {allProjects.map((p, i) => (
              <li key={p.name} className="flex items-center pl-8 py-2 cursor-pointer hover:bg-[#22304a] transition">
                <a href={`/project/${slug(p.name)}`} className="flex items-center w-full">
                  <ProjectColorDot color={p.color} />
                  <span className="text-sm font-medium">{p.name}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
}

