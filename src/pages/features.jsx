import FeatureCard from "../components/featureCard";
import Navbar from "../components/navbar";
import backgroundImage from "../assets/bg-screen.png";
import SocialBar from "../components/socialMedia";
import React from "react";

// Load all images in the features folder
const images = import.meta.glob('../assets/featurespage/*.{png,jpg,svg}', { eager: true });

// Create a map: filename → URL
const imagesMap = {};
Object.entries(images).forEach(([path, module]) => {
  const filename = path.split('/').pop(); // e.g., "1.png"
  imagesMap[filename] = module.default;
});

const features = [
  {
    title: "AI based task allocation suggestions",
    description:
      "Tired of Human Bias? Nexync uses AI to recommend the best-suited team member for each task based on skillsets and current workload.",
  },
  {
    title: "Workload heat-maps for each project",
    description:
      "Visualize task distribution with intuitive heatmaps. Spot overloaded team members and redistribute tasks efficiently.",
  },
  {
    title: "Interactive progress dashboards",
    description:
      "Track project health with visual dashboards. Monitor task completion, deadlines, and performance trends in real-time.",
  },
  {
    title: "Deadline reminders via e-mail",
    description:
      "Nexync sends timely email reminders for upcoming task deadlines and important project milestones.",

  },
  {
    title: "Google calendar auto-sync",
    description:
      "Never miss a date. Nexync syncs project timelines with each team member's Google Calendar.",
    color: "bg-gradient-to-br from-blue-500 to-green-500",
  },
  {
    title: "Personal workload managing",
    description:
      "Get a clear overview of tasks, deadlines, and priority levels in one place.",
  },
];

const featuresWithImages = features.map((feature, idx) => ({
  ...feature,
  imageSrc: imagesMap[`${idx + 1}.png`],
}));


export default function FeaturesPage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Full-screen background image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <Navbar />

      {/* Main Features Content */}
      <div className="h-full flex flex-col items-center justify-center px-4 pt-20">
        <h1 className="text-4xl md:text-5xl font-light text-white mb-8 text-center">
          what's <span className="text-blue-400 font-normal">exciting</span> ?
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl h-full">
          {featuresWithImages.map((feature, idx) => (
            <FeatureCard
              key={idx}
              title={feature.title}
              imageSrc={feature.imageSrc}
              description={feature.description}
            />
          ))}
        </div>

      {/* Social Media Icons */}
      <SocialBar />
      </div>
    </div>
  );
}
