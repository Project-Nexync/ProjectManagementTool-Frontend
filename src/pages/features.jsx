import {
  Twitter,
  Github,
  MessageCircle,
  Facebook,
  Instagram,
  Brain,
  BarChart3,
  Activity,
  Mail,
  Calendar,
  PieChart,
} from "lucide-react";

import Navbar from "../components/navbar";
import backgroundImage from "../assets/bg-screen.png";

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

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl h-full">
          {/* Feature Card Template */}
          {[
            {
              title: "AI based task allocation suggestions",
              icon: <Brain className="w-5 h-5 text-white" />,
              description:
                "Tired of Human Bias? Nexync uses AI to recommend the best-suited team member for each task based on skillsets and current workload.",
              color: "bg-blue-600",
            },
            {
              title: "Workload heat-maps for each project",
              icon: <BarChart3 className="w-5 h-5 text-white" />,
              description:
                "Visualize task distribution with intuitive heatmaps. Spot overloaded team members and redistribute tasks efficiently.",
              color: "bg-blue-600",
            },
            {
              title: "Interactive progress dashboards",
              icon: <Activity className="w-5 h-5 text-white" />,
              description:
                "Track project health with visual dashboards. Monitor task completion, deadlines, and performance trends in real-time.",
              color: "bg-blue-600",
            },
            {
              title: "Deadline reminders via e-mail",
              icon: <Mail className="w-5 h-5 text-white" />,
              description:
                "Nexync sends timely email reminders for upcoming task deadlines and important project milestones.",
              color: "bg-blue-600",
            },
            {
              title: "Google calendar auto-sync",
              icon: <Calendar className="w-5 h-5 text-white" />,
              description:
                "Never miss a date. Nexync syncs project timelines with each team member's Google Calendar.",
              color: "bg-gradient-to-br from-blue-500 to-green-500",
            },
            {
              title: "Personal workload managing",
              icon: <PieChart className="w-5 h-5 text-white" />,
              description:
                "Get a clear overview of tasks, deadlines, and priority levels in one place.",
              color: "bg-blue-600",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
               className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-3 flex items-start space-x-3 hover:bg-slate-800/70 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${feature.color}`}
              >
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-10">
        {[Twitter, MessageCircle, Github, Facebook, Instagram].map((Icon, idx) => (
          <a
            key={idx}
            href="#"
            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
          >
            <Icon className="w-4 h-4 text-white" />
          </a>
        ))}
      </div>
    </div>
  );
}
