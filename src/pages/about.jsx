"use client"

import { useState } from "react"
import { Plus, Minus, Twitter, MessageCircle, Github, Facebook, Instagram } from "lucide-react"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import Navbar from "../components/navbar"
import backgroundImage from "../assets/bg-screen.png";



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
]

export default function AboutPage() {
  const [expandedFaq, setExpandedFaq] = useState(null) // default null or 2 if you want third open

const toggleFaq = (index) => {
  setExpandedFaq(expandedFaq === index ? null : index)
}


  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Full-screen background image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-12 px-6 py-12 max-w-7xl mx-auto">
        {/* Left Side - Brand Description */}
        <div className="lg:w-1/2 space-y-8">
         
          {/* Description Paragraphs */}
          <div className="space-y-6 text-gray-300 leading-relaxed">
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
          <div className="flex gap-4 pt-8">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors">
              register now
              <div className="text-xs text-blue-200 mt-1">to get started</div>
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 rounded-lg transition-colors bg-transparent"
            >
              login
              <div className="text-xs text-gray-400 mt-1">and let's go</div>
            </Button>
          </div>
        </div>

        {/* Right Side - FAQ */}
        <div className="lg:w-1/2">
          <h2 className="text-white text-2xl font-bold mb-8">FAQ</h2>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-700/30 transition-colors"
                >
                  <span className="text-gray-300 font-medium pr-4">
                    {faq.question.replace("Nexync", "")}
                    <span className="text-blue-400">Nexync</span>
                    {faq.question.includes("different from") && " different from other project management tools?"}
                    {faq.question.includes("different roles") && " projects?"}
                    {faq.question.includes("AI task") && "'s AI task suggestion feature work?"}
                    {faq.question.includes("notified") && " if a deadline is approaching?"}
                    {faq.question.includes("suitable") && " suitable for academic or professional projects?"}
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
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
          <Twitter className="w-5 h-5 text-white" />
        </div>
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
          <Github className="w-5 h-5 text-white" />
        </div>
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
          <Facebook className="w-5 h-5 text-white" />
        </div>
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
          <Instagram className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  )
}
