// import React from "react";
// import FeatureCard from "../components/featureCard";
// import Navbar from "../components/navbar";
// import backgroundImage from "../assets/bg-screen.png";
// import SocialBar from "../components/socialMedia";

// // Load all images in the features folder
// const images = import.meta.glob('../assets/featurespage/*.{png,jpg,svg}', { eager: true });

// // Map: filename → URL
// const imagesMap = {};
// Object.entries(images).forEach(([path, module]) => {
//   const filename = path.split('/').pop(); // e.g., "1.png"
//   imagesMap[filename] = module.default;
// });

// const features = [
//   {
//     title: "AI based task allocation suggestions",
//     description:
//       "Tired of Human Bias? Nexync uses AI to recommend the best-suited team member for each task based on skillsets and current workload. This ensures smarter assignments and faster project delivery without burnout.",
//   },
//   {
//     title: "Workload heat-maps for each project",
//     description:
//       "Visualize task distribution with intuitive heatmaps. Spot overloaded team members, redistribute tasks, and maintain balanced team performance with just a glance.",
//   },
//   {
//     title: "Interactive progress dashboards",
//     description:
//      "Track overall project health with visual dashboards. Monitor task completion, deadline adherence, and performance trends in real-time to stay ahead of delays. Ensure resource allocation aligns with project goals for top efficiency.",
//   },
//   {
//     title: "Deadline reminders via e-mail",
//     description:
//       "Nexync automatically sends timely email reminders for upcoming task deadlines, overdue items, and important project milestones. These reminders are personalized for each team member based on their task assignments.",
//   },
//   {
//     title: "Google calendar auto-sync",
//     description:
//       "Never miss a date. Nexync automatically syncs project timelines with each team member’s Google Calendar, ensuring real-time updates across personal and professional schedules.",
//   },
//   {
//     title: "Personal workload managing",
//     description:
//       "Nexync gives each user a clear overview of their current tasks, deadlines, and priority level, all in one place. Combined with visual indicators and calendar views, this feature empowers users to stay focused on what matters most.",
//   },
// ];

// const featuresWithImages = features.map((feature, idx) => ({
//   ...feature,
//   imageSrc: imagesMap[`${idx + 1}.png`],
// }));

// export default function FeaturesPage() {
//   return (
//         <div className="relative min-h-screen w-full overflow-x-hidden">
//       {/* Background */}
//       <div
//         className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
//         style={{ backgroundImage: `url(${backgroundImage})` }}
//       />

//       {/* Navbar */}
//   <Navbar />

//   {/* Main content */}
//   <div className="flex flex-col items-center px-4 pt-16"> {/* pt-16 = 64px, matches navbar */}
//     {/* Heading */}
//     <h1 className="text-4xl md:text-6xl font-light text-white mb-6 text-center">
//       What's <span className="text-blue-400 font-normal">Exciting</span>?
//     </h1>

//     {/* Features Grid */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 justify-center w-full max-w-7xl">
//       {featuresWithImages.map((feature, idx) => (
//         <FeatureCard
//           key={idx}
//           title={feature.title}
//           imageSrc={feature.imageSrc}
//           description={feature.description}
//         />
//       ))}
//     </div>

//     {/* Social Bar */}
//     <div className="mt-6">
//       <SocialBar />
//     </div>
//   </div>
// </div>

//   );
// }


import React from "react";
import FeatureCard from "../components/featureCard";
import Navbar from "../components/navbar";
import backgroundImage from "../assets/bg-screen.png";
import SocialBar from "../components/socialMedia";

// Load all images in the features folder
const images = import.meta.glob('../assets/featurespage/*.{png,jpg,svg}', { eager: true });

// Map: filename → URL
const imagesMap = {};
Object.entries(images).forEach(([path, module]) => {
  const filename = path.split('/').pop(); // e.g., "1.png"
  imagesMap[filename] = module.default;
});

const features = [
  {
    title: "AI based task allocation suggestions",
    description:
      "Tired of Human Bias? Nexync uses AI to recommend the best-suited team member for each task based on skillsets and current workload. This ensures smarter assignments and faster project delivery without burnout.",
  },
  {
    title: "Workload heat-maps for each project",
    description:
      "Visualize task distribution with intuitive heatmaps. Spot overloaded team members, redistribute tasks, and maintain balanced team performance with just a glance.",
  },
  {
    title: "Interactive progress dashboards",
    description:
     "Track overall project health with visual dashboards. Monitor task completion, deadline adherence, and performance trends in real-time to stay ahead of delays. Ensure resource allocation aligns with project goals for top efficiency.",
  },
  {
    title: "Deadline reminders via e-mail",
    description:
      "Nexync automatically sends timely email reminders for upcoming task deadlines, overdue items, and important project milestones. These reminders are personalized for each team member based on their task assignments.",
  },
  {
    title: "Google calendar auto-sync",
    description:
      "Never miss a date. Nexync automatically syncs project timelines with each team member's Google Calendar, ensuring real-time updates across personal and professional schedules.",
  },
  {
    title: "Personal workload managing",
    description:
      "Nexync gives each user a clear overview of their current tasks, deadlines, and priority level, all in one place. Combined with visual indicators and calendar views, this feature empowers users to stay focused on what matters most.",
  },
];

const featuresWithImages = features.map((feature, idx) => ({
  ...feature,
  imageSrc: imagesMap[`${idx + 1}.png`],
}));

export default function FeaturesPage() {
  return (
    <div className="min-h-screen w-full">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Navbar - Scrolls with content (not fixed) */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col items-center px-4 py-8">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-light text-white mb-12 text-center">
          What's <span className="text-blue-400 font-normal">Exciting</span>?
        </h1>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center w-full max-w-7xl">
          {featuresWithImages.map((feature, idx) => (
            <FeatureCard
              key={idx}
              title={feature.title}
              imageSrc={feature.imageSrc}
              description={feature.description}
            />
          ))}
        </div>

        {/* Social Bar */}
        <div className="mt-12">
          <SocialBar />
        </div>
      </div>
    </div>
  );
}