import NexyncLogo from '../assets/nexync 2.png';

export default function Logo() {
  return (
    <a href="/dashboard" className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
      <img src={NexyncLogo} alt="Logo" className="h-15 w-15" />
      <span className="font-bebas text-4xl tracking-widest">DASHBOARD</span>
    </a>
  );
}