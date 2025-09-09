import { MdCalendarMonth, MdBookmark } from "react-icons/md"
import { FaHome, FaBell, FaBookmark, FaCog } from "react-icons/fa"

interface Task {
  id: string
  name: string
  status: "In Progress" | "Completed" | "Pending" | "Critical"
  deadline: string
  time: string
  assignees: Array<{ profilePic: string; name: string }>
  attachment?: string
}

interface ChatMessage {
  id: string
  user: string
  message: string
  time: string
  avatar: string
  color: string
}

const mockTasks: Task[] = [
  {
    id: "1",
    name: "Update Homepage Design",
    status: "In Progress",
    deadline: "2025-08-10",
    time: "3:00 p.m.",
    assignees: [
      { profilePic: "/abstract-geometric-shapes.png", name: "User 1" },
      { profilePic: "/abstract-geometric-shapes.png", name: "User 2" },
      { profilePic: "/diverse-group-collaborating.png", name: "User 3" },
    ],
  },
  {
    id: "2",
    name: "Revamp Navigation Structure",
    status: "Completed",
    deadline: "2025-08-05",
    time: "4:30 p.m.",
    assignees: [
      { profilePic: "/abstract-geometric-shapes.png", name: "User 1" },
      { profilePic: "/abstract-geometric-shapes.png", name: "User 2" },
    ],
    attachment: "nav_flow_diagram.png",
  },
  {
    id: "3",
    name: "Refresh About page text with updated information",
    status: "Pending",
    deadline: "2025-08-09",
    time: "11:59 p.m.",
    assignees: [
      { profilePic: "/abstract-geometric-shapes.png", name: "User 1" },
      { profilePic: "/abstract-geometric-shapes.png", name: "User 2" },
    ],
    attachment: "about_draft.docx",
  },
  {
    id: "4",
    name: "Mobile Responsiveness Testing",
    status: "Critical",
    deadline: "2025-08-15",
    time: "12:00 a.m.",
    assignees: [
      { profilePic: "/abstract-geometric-shapes.png", name: "User 1" },
      { profilePic: "/abstract-geometric-shapes.png", name: "User 2" },
      { profilePic: "/diverse-group-collaborating.png", name: "User 3" },
    ],
  },
  {
    id: "5",
    name: "SEO Audit and Optimization",
    status: "In Progress",
    deadline: "2025-08-12",
    time: "3:40 a.m.",
    assignees: [{ profilePic: "/abstract-geometric-shapes.png", name: "User 1" }],
    attachment: "seo_checklist.xlsx",
  },
  {
    id: "6",
    name: "Final UI Design Handoff",
    status: "Pending",
    deadline: "2025-08-18",
    time: "5:00 p.m.",
    assignees: [
      { profilePic: "/abstract-geometric-shapes.png", name: "User 1" },
      { profilePic: "/abstract-geometric-shapes.png", name: "User 2" },
      { profilePic: "/diverse-group-collaborating.png", name: "User 3" },
    ],
    attachment: "ui_final_package.zip",
  },
  {
    id: "7",
    name: "Accessibility Improvements",
    status: "In Progress",
    deadline: "2025-08-11",
    time: "9:00 a.m.",
    assignees: [
      { profilePic: "/abstract-geometric-shapes.png", name: "User 1" },
      { profilePic: "/abstract-geometric-shapes.png", name: "User 2" },
      { profilePic: "/diverse-group-collaborating.png", name: "User 3" },
    ],
    attachment: "accessibility_report.pdf",
  },
]

const mockChatMessages: ChatMessage[] = [
  {
    id: "1",
    user: "Hi team 👋",
    message: "",
    time: "11:31 AM",
    avatar: "/abstract-geometric-shapes.png",
    color: "bg-blue-500",
  },
  {
    id: "2",
    user: "How's the work going ?",
    message: "",
    time: "11:31 AM",
    avatar: "/abstract-geometric-shapes.png",
    color: "bg-blue-500",
  },
  {
    id: "3",
    user: "John",
    message: "Currently working on SEO",
    time: "11:35 AM",
    avatar: "/thoughtful-man-in-library.png",
    color: "bg-gray-100",
  },
  {
    id: "4",
    user: "@Kalis can u help it",
    message: "",
    time: "11:31 AM",
    avatar: "/abstract-geometric-shapes.png",
    color: "bg-blue-500",
  },
  {
    id: "5",
    user: "Kalis",
    message: "Sure ! I am into it.",
    time: "11:35 AM",
    avatar: "/kalis.png",
    color: "bg-gray-100",
  },
]

function StatusBadge({ status }: { status: Task["status"] }) {
  const statusStyles = {
    "In Progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Completed: "bg-green-500/20 text-green-400 border-green-500/30",
    Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Critical: "bg-red-500/20 text-red-400 border-red-500/30",
  }

  return <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}>{status}</span>
}

export default function ProjectDetailLayout({
  projectId,
  projectTitle,
}: {
  projectId: string
  projectTitle: string
}) {
  const completedTasks = mockTasks.filter((task) => task.status === "Completed").length
  const totalTasks = mockTasks.length
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-[rgba(51,51,51,0.3)] border-b border-[#505258] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="text-blue-400 text-2xl font-bold">SS</div>
              <span className="text-white text-xl font-semibold">DASHBOARD</span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search Projects"
                className="bg-[rgba(51,51,51,0.5)] border border-[#505258] rounded-full px-4 py-2 pl-10 text-white placeholder-gray-400 w-80"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center text-white">
                <FaHome className="text-xl" />
                <span className="text-xs">home</span>
              </div>
              <div className="flex flex-col items-center text-white">
                <FaBell className="text-xl" />
                <span className="text-xs">notifications</span>
              </div>
              <div className="flex flex-col items-center text-white">
                <FaBookmark className="text-xl" />
                <span className="text-xs">saved</span>
              </div>
              <div className="flex flex-col items-center text-white">
                <FaCog className="text-xl" />
                <span className="text-xs">settings</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-semibold">Steven Smith</span>
              <img
                src="/steven.png"
                className="w-10 h-10 rounded-full border-2 border-blue-400"
                alt="Steven Smith"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-[rgba(51,51,51,0.3)] border-r border-[#505258] min-h-screen p-4">
          <div className="mb-6">
            <div className="text-white text-sm mb-2">Wednesday, 25 July 2025</div>
            <div className="text-gray-400 text-sm">11:45 p.m.</div>
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg mb-6 flex items-center gap-2">
            <span>+</span>
            Add Tasks
          </button>

          <div className="mb-4">
            <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm inline-block mb-4">
              Role : Project Manager
            </div>
          </div>

          <nav className="space-y-2">
            <div className="text-blue-400 font-semibold mb-2 flex items-center gap-2">📋 All Projects</div>
            <div className="space-y-1 ml-4">
              <div className="text-yellow-400 text-sm">● Website Redesign Project</div>
              <div className="text-red-400 text-sm">● Website Bug Fixing</div>
              <div className="text-green-400 text-sm">● Mobile App Development</div>
              <div className="text-purple-400 text-sm">● Product Feature Roadmap</div>
              <div className="text-orange-400 text-sm">● Marketing Campaign Launch</div>
              <div className="text-teal-400 text-sm">● Flyer Series</div>
              <div className="text-yellow-400 text-sm">● Quarterly Sales Review</div>
            </div>
          </nav>

          <div className="mt-8">
            <div className="text-white font-semibold mb-2 flex items-center gap-2">🏃 On Going</div>
            <div className="text-white font-semibold mb-2 flex items-center gap-2">✅ Completed</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Project Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-white text-3xl font-bold">{projectTitle}</h1>
              <MdBookmark className="text-white text-2xl" />
            </div>
            <p className="text-gray-300 text-lg mb-4">
              Revamping the company's main website for improved UX, modern UI, and mobile responsiveness.
            </p>

            <div className="flex items-center gap-6 mb-4">
              <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded border border-red-500/30 flex items-center gap-2">
                <MdCalendarMonth />
                Deadline : 20th August 2025 at 3.00 p.m.
              </div>
              <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded border border-blue-500/30">
                Task Completion Percentage : {completionPercentage}%
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-white font-semibold">TEAM :</span>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`/diverse-professional-team.png?height=40&width=40&query=team${i}`}
                    className="w-10 h-10 rounded-full border-2 border-blue-400"
                    alt={`Team member ${i}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Tasks Table */}
          <div className="bg-[rgba(51,51,51,0.3)] border border-[#505258] rounded-lg overflow-hidden">
            <div className="bg-[rgba(51,51,51,0.5)] px-6 py-4 border-b border-[#505258]">
              <div className="grid grid-cols-5 gap-4 text-white font-semibold">
                <div>Task</div>
                <div>Status</div>
                <div>Deadline</div>
                <div>Assignees</div>
                <div>Attachments</div>
              </div>
            </div>
            <div className="divide-y divide-[#505258]">
              {mockTasks.map((task) => (
                <div key={task.id} className="px-6 py-4 hover:bg-[rgba(51,51,51,0.2)]">
                  <div className="grid grid-cols-5 gap-4 items-center">
                    <div className="text-white">{task.name}</div>
                    <div>
                      <StatusBadge status={task.status} />
                    </div>
                    <div className="text-gray-300 text-sm">
                      {task.deadline}
                      <br />
                      {task.time}
                    </div>
                    <div className="flex -space-x-2">
                      {task.assignees.map((assignee, idx) => (
                        <img
                          key={idx}
                          src={assignee.profilePic || "/placeholder.svg"}
                          className="w-8 h-8 rounded-full border-2 border-blue-400"
                          alt={assignee.name}
                        />
                      ))}
                    </div>
                    <div className="text-gray-300 text-sm">{task.attachment || "-"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-[rgba(51,51,51,0.3)] border-l border-[#505258] min-h-screen p-4">
          {/* Task Completion Chart */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-4">Overall Task Completion</h3>
            <div className="relative w-48 h-48 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#374151" strokeWidth="8" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#10B981"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${completionPercentage * 2.51} 251`}
                  className="transition-all duration-500"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#3B82F6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(((totalTasks - completedTasks - 1) * 2.51) / totalTasks) * 100} 251`}
                  strokeDashoffset={`-${completionPercentage * 2.51}`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-2xl font-bold">{completionPercentage}%</div>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-white">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-white">In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-white">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-white">Critical</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mb-6 text-sm">
            📊 Click Here to View Team Workload Visualization
          </button>

          {/* Team Chat */}
          <div className="bg-[rgba(51,51,51,0.5)] rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold">Website Redesign Project</h4>
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={`/stylized-chat-bubbles.png?height=24&width=24&query=chat${i}`}
                    className="w-6 h-6 rounded-full border border-blue-400"
                    alt={`Chat member ${i}`}
                  />
                ))}
              </div>
              <span className="text-gray-400">•••</span>
            </div>

            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {mockChatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.color === "bg-blue-500" ? "justify-end" : "justify-start"}`}
                >
                  {msg.color !== "bg-blue-500" && (
                    <img src={msg.avatar || "/placeholder.svg"} className="w-6 h-6 rounded-full flex-shrink-0" alt="" />
                  )}
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${msg.color === "bg-blue-500" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"}`}
                  >
                    {msg.color !== "bg-blue-500" && <div className="font-semibold text-xs mb-1">{msg.user}</div>}
                    <div className="text-sm">{msg.message || msg.user}</div>
                    <div className="text-xs opacity-70 mt-1">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 bg-[rgba(51,51,51,0.5)] border border-[#505258] rounded-full px-4 py-2 flex items-center gap-2">
                <span className="text-gray-400">😊</span>
                <input
                  type="text"
                  placeholder="Start typing..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                />
                <span className="text-gray-400">📎</span>
              </div>
              <button className="text-blue-400 hover:text-blue-300">➤</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
