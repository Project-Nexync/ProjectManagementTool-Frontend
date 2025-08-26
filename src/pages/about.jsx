"use client"

import { useState } from "react"
import { Plus, Minus, Twitter, MessageCircle, Github, Facebook, Instagram } from "lucide-react"
import { Button } from "../components/loginButton"
import Navbar from "../components/navbar"
import backgroundImage from "../assets/bg-screen.png";
import SocialBar from "../components/socialMedia"
import Logo from '../assets/nexync.png';
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
  const [expandedFaq, setExpandedFaq] = useState(null)

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      {/* Full-screen background image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <Navbar />

      {/* Main Content */}
  <div className="flex flex-col lg:flex-row gap-40 px-4 py-16 max-w-[90rem] lg:ml-40 pt-40">

        {/* Left Side - Brand Description */}
        <div className="lg:w-1/2 space-y-6">
          <img src={Logo} alt="Nexync Logo" className="h-32 mb-1" />

          <div className="space-y-6 text-gray-300 leading-loose mt-2">
            <p>
              <span className="text-blue-400 font-medium">Bring clarity to your team's chaos with Nexync</span>, an
              all-in-one project management platform built for the next generation of work. From intelligent task
              allocation and Google Calendar sync to real-time dashboards and workload heatmaps, Nexync gives your team
              the tools to stay aligned, meet deadlines, and deliver results.
            </p>

            <p>
              Designed to be{" "}
              <span className="text-blue-400 font-medium">
                simple for anyone to use, yet powerful enough to manage even the most complex workflows
              </span>
              , Nexync combines user-friendliness with enterprise-level functionality. No more juggling between
              spreadsheets, chat apps, and reminders — everything you need to manage your projects lives in one place.
            </p>

            <p>
              Nexync supports <span className="text-blue-400 font-medium">dynamic team structures</span>, allowing role
              flexibility per project. Whether you're a student team, a growing startup, or a large distributed
              organization, Nexync adapts to your needs — not the other way around.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-8 pt-8">
            <Button title="Register Now" subtitle="to get started" />
            <Button title="Login" subtitle="and let's go" />
          </div>
        </div>

        {/* Right Side - FAQ */}
        <div className="lg:w-1/2 space-y-4">
          <h2 className="text-[#B5B5B5] text-2xl font-bold mb-4 mt-8">FAQ</h2>

          <div className="space-y-12">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-700/30 transition-colors"
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
                  <div className="px-4 pb-4">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Media Icons */}
      <SocialBar />
    </div>
  )
}
