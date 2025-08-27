
import Logo from "./Logo";
import DateTimeDisplay from "./DateTimeDisplay";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-transparent shadow-2xl text-white flex flex-col p-6">
      <Logo />
      <DateTimeDisplay />
      <button className="mt-6 bg-[#2ecc40] text-black font-bold py-3 rounded-lg text-lg">+ Start New Project</button>
      <nav className="mt-8 flex-1">
        <div className="font-bold text-lg mb-2 flex items-center">
          <span className="bg-blue-500 w-2 h-2 rounded-full mr-2"></span>
          All Projects
        </div>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="bg-blue-400 w-3 h-3 rounded mr-2"></span>
            Website Redesign Project
          </li>
          {/* ...other projects */}
        </ul>
      </nav>
      <div className="mt-8">
        <div className="font-bold mb-2">Status</div>
        <div className="flex items-center mb-1">
          <span className="mr-2">⏳</span> On Going
        </div>
        <div className="flex items-center">
          <span className="mr-2">✔️</span> Completed
        </div>
      </div>
    </aside>
  );
}

