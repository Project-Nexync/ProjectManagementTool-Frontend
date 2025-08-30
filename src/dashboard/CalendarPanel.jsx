
// Mock tasks data
const tasks = [
  { name: 'UI design task', due: '2025-07-05', color: 'bg-green-400' },
  { name: 'Mobile responsiveness task', due: '2025-07-25', color: 'bg-yellow-400' },
];

// Import projects array from ProjectCardsGrid (copy for now)
const projects = [
  { title: 'Website Bug Fixing', due: '2025-07-20', color: 'bg-red-400' },
  { title: 'Product Feature Roadmap', due: '2025-07-30', color: 'bg-red-400' },
];

function getDay(dateStr) {
  return parseInt(dateStr.split('-')[2], 10);
}

function getMonth(dateStr) {
  return parseInt(dateStr.split('-')[1], 10);
}

function getYear(dateStr) {
  return parseInt(dateStr.split('-')[0], 10);
}

function getDeadlineMap() {
  // Map: day -> { type: 'task'|'project', label, color }
  const map = {};
  tasks.forEach(t => {
    if (getMonth(t.due) === 7 && getYear(t.due) === 2025) map[getDay(t.due)] = { type: 'task', label: t.name, color: t.color };
  });
  projects.forEach(p => {
    if (getMonth(p.due) === 7 && getYear(p.due) === 2025) map[getDay(p.due)] = { type: 'project', label: p.title, color: p.color };
  });
  return map;
}


import { useState } from 'react';

export default function CalendarPanel() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth()); // 0-indexed
  const [year, setYear] = useState(today.getFullYear());
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const deadlineMap = getDeadlineMap(month, year);

  // Build calendar grid
  const weeks = [];
  let day = 1 - firstDay;
  for (let w = 0; w < 6; w++) {
    const week = [];
    for (let d = 0; d < 7; d++, day++) {
      if (day < 1 || day > daysInMonth) {
        week.push(null);
      } else {
        week.push(day);
      }
    }
    weeks.push(week);
  }

  // Collect legend items
  const legendItems = [];
  Object.entries(deadlineMap).forEach(([d, v]) => {
    legendItems.push({
      day: d,
      label: v.type === 'task' ? `${v.label} is due` : `${v.label} is due`,
      color: v.color,
      type: v.type,
    });
  });
  legendItems.sort((a, b) => a.day - b.day);

  function prevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  }
  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 w-full shadow-[0_4px_30px_rgba(0,0,0,0.6)] border border-white/10 ring-1 ring-white/5">
      <div className="flex items-center justify-between mb-2">
        <button onClick={prevMonth} className="text-xl px-2 hover:text-blue-400">&#60;</button>
        <div className="font-bold text-center">{months[month]} {year}</div>
        <button onClick={nextMonth} className="text-xl px-2 hover:text-blue-400">&#62;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
        {["SUN","MON","TUE","WED","THU","FRI","SAT"].map(d => (
          <div key={d} className="text-gray-400">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {weeks.flat().map((d, i) => {
          const deadline = d && deadlineMap[d];
          return (
            <div key={i} className={`w-8 h-8 flex items-center justify-center rounded-full mx-auto ${deadline ? deadline.color : ''} ${deadline ? 'text-black font-bold' : ''} ${d ? '' : 'opacity-0'}`}>
              {d || ''}
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        {legendItems.length === 0 && <div className="text-gray-400 text-sm">No deadlines this month.</div>}
        {legendItems.map((item, i) => (
          <div key={i} className="flex items-center mb-1 text-sm">
            <span className={`w-3 h-3 rounded-full mr-2 ${item.color}`}></span>
            <span className="mr-2 font-semibold">{item.day}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
