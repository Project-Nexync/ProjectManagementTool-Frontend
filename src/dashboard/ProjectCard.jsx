import { MdCalendarMonth, MdAttachFile } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import DefaultUserIcon from '../assets/usericon.png';

// For demo, add mock values for attachments and unread messages
function ProjectCard({
  title,
  description,
  due,
  time,
  progress,
  innerShadowColor,
  team = [],
  attachments = 0,
  unreadMessages = 0,
  completed = 0,
  total = 0,
}) {
  // Ensure progress is a valid number between 0 and 100, and always show a minimum width for visibility
  let safeProgress = typeof progress === 'number' && !isNaN(progress) ? Math.max(0, Math.min(100, progress)) : 0;
  // For very small progress, show at least 2% width if progress > 0
  let barWidth = safeProgress > 0 && safeProgress < 2 ? 2 : safeProgress;
  // Create a slug for the project link (replace spaces with dashes, lowercase)
  const slug = title ? title.toLowerCase().replace(/\s+/g, '-') : 'project';
  return (
    <a
      href={`/project/${slug}`}
      className="block focus:outline-none"
      style={{ textDecoration: 'none' }}
    >
      <div
        className="bg-[rgba(51,51,51,0.3)] border border-[#505258] shadow-[2px_2px_6px_#23272f,-2px_-2px_6px_#3a3f4b] p-4 rounded-4xl flex flex-col gap-2 w-[300px] h-[300px] transition-shadow duration-300 hover:shadow-[4px_4px_12px_#23272f,-4px_-4px_12px_#3a3f4b] cursor-pointer"
        style={{ boxShadow: `inset -6px -6px 10px 0 ${innerShadowColor || 'rgba(255,255,0,0.25)'}, 2px 2px 6px #23272f, -2px -2px 6px #3a3f4b` }}
      >
        <div className="text-white font-bold text-lg">{title}</div>
        <div className="text-[#BCB4B4] text-m mb-2 font-light" style={{ fontFamily: 'HelveticaNeueThin, Helvetica Neue, Arial, sans-serif' }}>{description}</div>
        <div className="flex items-center gap-2 text-[#A6CFFE] text-sm">
          <MdCalendarMonth className="text-3xl text-[#A6CFFE]" />
            <span>Due on {due}<br />{time}</span>
          </div>
          <div className={`w-full bg-[#1a2233] rounded-full h-3 mb-2 p-0.5 border ${safeProgress === 100 ? 'border-green-500' : 'border-blue-500'} box-border`}>
            <div
              className={`h-full rounded-full ${safeProgress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
              style={{ width: `${barWidth}%` }}
            ></div>
          </div>
          <div className="w-full flex justify-end -mt-3 mb-1">
            <span className={`text-xs ${safeProgress === 100 ? 'text-green-500' : 'text-blue-300'} font-semibold`}>{safeProgress}% completed</span>
          </div>
          {/* normal horizontal line */}
          <hr className="border-t border-[#4d515b] my-2" />
        {/* Add avatars, stats, etc. */}
        <div className="flex items-center mt-0">
          {/* Avatars */}
          <div className="flex -space-x-2">
            {team.map((member, idx) => (
              <img
                key={idx}
                src={member.profilePic || DefaultUserIcon}
                className="w-8 h-8 rounded-full border-2 border-blue-400"
                alt=""
              />
            ))}
          </div>
          <div className="flex items-center gap-4 ml-auto text-gray-300 text-xs">
            <div className="flex items-center gap-1">
              <MdAttachFile className="text-lg" />
              <span>{attachments}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaRegCommentDots className="text-lg" />
              <span>{unreadMessages}</span>
            </div>
            <div className="flex items-center gap-1">
              <BsCheck2All className="text-lg" />
              <span>{completed}/{total}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default ProjectCard;
