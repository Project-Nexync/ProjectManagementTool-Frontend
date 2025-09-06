import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import api from "../API.jsx"; // make sure api.jsx exports default api

export default function ProjectCardsGrid({ search }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const innerShadowColors = [
    "rgba(255,255,0,0.25)",
    "rgba(0,255,255,0.25)",
    "rgba(255,0,255,0.25)",
    "rgba(255,128,0,0.25)",
    "rgba(0,255,128,0.25)",
    "rgba(128,0,255,0.25)",
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/project/viewAllproject");
        const mapped = res.data.projects.map((p) => ({
          project_id: p.project_id,
          title: p.name,
          description: p.description,
          due: new Date(p.end_date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          time: new Date(p.end_date).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          progress: 0,
          attachments: 0,
          unreadMessages: 0,
          completed: 0,
          total: 0,
          team: p.members?.map((m) => ({ profilePic: null })) || [],
        }));
        setProjects(mapped);
      } catch (err) {
        console.error(err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = search
    ? projects.filter(
        (p) =>
          p.title?.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase())
      )
    : projects;

  if (loading) return <p className="text-center">Loading projects...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-2 max-w-7xl mx-auto">
      {filteredProjects.map((p, i) => (
        <div key={p.project_id || i} className="w-full min-h-0">
          <ProjectCard
            {...p}
            innerShadowColor={innerShadowColors[i % innerShadowColors.length]}
          />
        </div>
      ))}
    </div>
  );
}
