"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { Button } from "../components/loginButton"
import SignUpModal from "../components/SignUpModal";
import SignInModal from "../components/SignInModal";
import Navbar from "../components/navbar"
import backgroundImage from "../assets/bg-screen.png";
import SocialBar from "../components/socialMedia"
import React from "react"

const faqData = [
  {
    question: "What makes Nexync different from other project management tools?",
    answer:
      "Nexync combines AI-powered task allocation, real-time workload visualization, and seamless Google Calendar integration in one platform. Our intelligent suggestions and dynamic team structures set us apart from traditional project management tools.",
  },
  {
    question: "Can I use different roles in different Nexync projects?",
    answer:
      "Yes! Nexync supports dynamic team structures, allowing role flexibility per project. Whether you're a student team, growing startup, or large distributed organization, Nexync adapts to your needs.",
  },
  {
    question: "How does the Nexync's AI task suggestion feature work?",
    answer:
      "Our AI analyzes team members' skills, current workload, and task requirements to suggest the best-suited person for each task. Remember, these are only suggestions – managers can always assign tasks manually if needed.",
  },
  {
    question: "Will I get notified by Nexync if a deadline is approaching?",
    answer:
      "Nexync automatically sends timely email reminders for upcoming task deadlines, overdue items, and important project milestones. These reminders are personalized for each team member based on their task assignments.",
  },
  {
    question: "Is Nexync suitable for academic or professional projects?",
    answer:
      "Yes, Nexync is designed to be simple for anyone to use, yet powerful enough to manage even the most complex workflows. It works perfectly for both academic projects and professional enterprise-level work.",
  },
];

export default function About() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-24 px-4 py-28 max-w-[90rem] mx-auto"> 
      {/* Added py-28 to prevent overlap with Navbar */}

        {/* Left Side - Brand Description */}
        <div className="lg:w-1/2 flex flex-col justify-start space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 mb-4">
            About Us
          </h1>

          <div className="space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base text-left lg:text-justify">
            <p>
              Bring clarity to your team's chaos with Nexync, an all-in-one project management platform built for the next generation of work. From intelligent task allocation and Google Calendar sync to real-time dashboards and workload heatmaps, Nexync gives your team the tools to stay aligned, meet deadlines, and deliver results.
            </p>

            <p>
              Designed to be simple for anyone to use, yet powerful enough to manage even the most complex workflows, Nexync combines user-friendliness with enterprise-level functionality. No more juggling between spreadsheets, chat apps, and reminders - everything you need to manage your projects lives in one place.
            </p>

            <p>
              Nexync supports dynamic team structures, allowing role flexibility per project. Whether you're a student team, a growing startup, or a large distributed organization, Nexync adapts to your needs - not the other way around.
            </p>
          </div>

        </div>

        {/* Right Side - FAQ */}
        <div className="lg:w-1/2 flex flex-col space-y-4 lg:pr-40"> {/* Avoid overlapping SocialBar */}
          <h2 className="text-[#B5B5B5] text-2xl font-bold mb-4 mt-0 sm:mt-0">FAQ</h2> {/* Align top with About Us */}

          <div className="space-y-6 sm:space-y-8">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-slate-700/30 transition-colors"
                >
                  <span className="text-gray-300 font-medium pr-4">
                    {faq.question.split("Nexync").map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && <span className="text-blue-400">Nexync</span>}
                      </React.Fragment>
                    ))}
                  </span>
                  {expandedFaq === index ? (
                    <Minus className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  )}
                </button>

                {expandedFaq === index && (
                  <div className="px-4 pb-4 sm:px-6">
                    <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="absolute top-1/4 right-0 z-10">
        <SocialBar />
      </div>

      
    </div>
  )
}
