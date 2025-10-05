import { MdCalendarMonth } from "react-icons/md";

function ProjectCard({ project_id, title, description, due, time }) {
  // Convert due date to short month form
  const formattedDue = new Date(due);
  const shortMonth = formattedDue.toLocaleString("en-US", { month: "short" });
  const day = formattedDue.getDate();
  const year = formattedDue.getFullYear();

  return (
    <a
      href={`/project/${project_id}`}
      className="block focus:outline-none"
      style={{ textDecoration: "none" }}
    >
      <div
        className="bg-[rgba(51,51,51,0.3)] border border-[#505258] 
                   shadow-[2px_2px_6px_#23272f,-2px_-2px_6px_#3a3f4b] 
                   pt-4 px-4 pb-2 sm:pt-5 sm:px-5 sm:pb-3 lg:pt-6 lg:px-6 lg:pb-4 
                   rounded-4xl flex flex-col gap-3 w-full 
                   transition-shadow duration-300 hover:shadow-[4px_4px_12px_#23272f,-4px_-4px_12px_#3a3f4b] cursor-pointer"
      >
        {/* Title */}
        <div className="text-white font-bold text-lg">{title}</div>

        <hr className="border-t border-[#4d515b] my-0.5" />

        {/* Description */}
        <div
          className="text-[#BCB4B4] text-sm sm:text-base font-light overflow-hidden text-ellipsis"
          style={{
            fontFamily: "HelveticaNeueThin, Helvetica Neue, Arial, sans-serif",
            display: "-webkit-box",
            WebkitLineClamp: 4, // max 4 lines
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </div>

        {/* Due Date */}
        <div className="flex items-center gap-2 text-[#A6CFFE] text-sm mt-2">
          <MdCalendarMonth className="text-2xl sm:text-3xl text-[#A6CFFE] flex-shrink-0" />
          <span>
            Due on {shortMonth} {day}, {year}
            <br />
            {time}
          </span>
        </div>
      </div>
    </a>
  );
}

export default ProjectCard;
