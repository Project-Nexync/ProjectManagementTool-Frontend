import { Twitter, MessageCircle, Github, Facebook, Instagram } from "lucide-react";

const socials = [
  { icon: Twitter, url: "https://twitter.com" },
  { icon: MessageCircle, url: "https://example.com/chat" },
  { icon: Github, url: "https://github.com" },
  { icon: Facebook, url: "https://facebook.com" },
  { icon: Instagram, url: "https://instagram.com" },
];

export default function SocialBar() {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
      {socials.map(({ icon: Icon, url }, i) => (
        <a
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-[#447EB8] rounded-full flex items-center justify-center hover:bg-[#2563a2] transition-colors cursor-pointer shadow-lg"
        >
          <Icon className="w-5 h-5 text-black" />
        </a>
      ))}
    </div>
  );
}
