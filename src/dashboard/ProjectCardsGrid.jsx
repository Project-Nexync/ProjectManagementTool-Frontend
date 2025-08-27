import ProjectCard from './ProjectCard';
import { useContext } from 'react';

// Context for search value
const SearchContext = window.__NEXYNC_SEARCH_CONTEXT__ || { search: "" };

export default function ProjectCardsGrid({ search }) {
  const innerShadowColors = [
    'rgba(255,255,0,0.25)', // yellow
    'rgba(0,255,255,0.25)', // cyan
    'rgba(255,0,255,0.25)', // magenta
    'rgba(255,128,0,0.25)', // orange
    'rgba(0,255,128,0.25)', // green
    'rgba(128,0,255,0.25)', // purple
  ];
  const projects = [
    { title: "Website Redesign Project", description: "Revamping the company’s main website for improved UX, modern UI, and mobile responsiveness.", due: "12 August, 2025", time: "3.00 p.m.", progress: 10, users: 4, completed: 5, total: 9, attachments: 4, unreadMessages: 3, team: [
      { profilePic: "https://randomuser.me/api/portraits/men/1.jpg" },
      { profilePic: null },
      { profilePic: "https://randomuser.me/api/portraits/women/2.jpg" },
    ] },
    { title: "Website Bug Fixing", description: "Fixing the marked bugs of the overall website and run full walkthrough again.", due: "20 July, 2025", time: "11.59 a.m.", progress: 100, users: 4, completed: 5, total: 9, attachments: 2, unreadMessages: 1, team: [
      { profilePic: null },
      { profilePic: "https://randomuser.me/api/portraits/men/3.jpg" },
    ] },
    { title: "Mobile App Development", description: "Developing and testing core features of a new iOS/Android app within a set sprint cycle.", due: "15 August, 2025", time: "12.00 a.m.", progress: 10, users: 4, completed: 2, total: 10, attachments: 1, unreadMessages: 0, team: [
      { profilePic: "https://randomuser.me/api/portraits/men/4.jpg" },
    ] },
    { title: "Marketing Campaign", description: "Planning and executing a digital marketing campaign across social media.", due: "21 September, 2025", time: "11.59 p.m.", progress: 2, users: 1, completed: 1, total: 12, attachments: 0, unreadMessages: 0, team: [
      { profilePic: null },
    ] },
    { title: "Product Feature Roadmap", description: "Mapping out planned features, releases, and milestones for the product development lifecycle.", due: "30 July, 2025", time: "4.45 p.m.", progress: 90, users: 4, completed: 5, total: 9, attachments: 0, unreadMessages: 0, team: [
      { profilePic: "https://randomuser.me/api/portraits/women/5.jpg" },
      { profilePic: null },
    ] },
    { title: "Flyer Series", description: "Design a post a comprehensive flyer series to cover the Nexync mobile app launch.", due: "30 September, 2025", time: "12.00 p.m.", progress: 80, users: 3, completed: 4, total: 8, attachments: 0, unreadMessages: 0, team: [
      { profilePic: null },
    ] },
    { title: "Quarterly Sales Review", description: "Reviewing sales and refining strategies for the upcoming quarter based on key metrics.", due: "1 October, 2025", time: "6.00 p.m.", progress: 25, users: 3, completed: 2, total: 8, attachments: 0, unreadMessages: 0, team: [
      { profilePic: "https://randomuser.me/api/portraits/men/6.jpg" },
    ] },
  ];
  // Debug: log progress values for each project
  projects.forEach((p, i) => {
    // eslint-disable-next-line no-console
    console.log(`Project ${i}: title=${p.title}, progress=`, p.progress);
  });
  // Filter projects by search (title or description)
  const filtered = search
    ? projects.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      )
    : projects;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-10 flex-1 px-2 md:px-6 lg:px-8 xl:px-16 2xl:px-32">
      {filtered.map((p, i) => (
        <ProjectCard
          key={i}
          {...p}
          innerShadowColor={innerShadowColors[i % innerShadowColors.length]}
        />
      ))}
    </div>
  );
}
