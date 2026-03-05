import { Github, Facebook, Instagram, MessageCircle } from "lucide-react";
import klerryImage from "../assets/images/klerry.jpg";

export function About() {
  const socials = [
    { name: "GitHub", icon: Github, href: "https://github.com/klerry-dev" },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://web.facebook.com/profile.php?id=61558398203460",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/klerry_creative/",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/255733571676",
    },
  ];

  return (
    <div className="space-y-10 pt-8">
      <div className="flex items-center gap-4 text-left">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
          <img
            src={klerryImage}
            alt="Klerry"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold">Klerry Tumsiime</h1>
          <p className="text-xs text-white/50 font-medium">
            A designer and developer
          </p>
        </div>
      </div>

      <section className="space-y-6 text-white/80 leading-relaxed">
        <p>
          "Hi! I'm a developer based in Tanzania who truly loves the process of
          building things for the web. For me, it's not just about writing code
          that works; it's about crafting digital experiences that feel
          intuitive and look great. I'm a big believer that clean code and
          thoughtful design should always go hand-in-hand to bring an idea to
          life."
        </p>
        <p>
          I contribute to open source, or sharing my knowledge with the
          developer community.
        </p>
      </section>

      <section className="flex flex-wrap gap-x-4 gap-y-2 pt-4">
        {socials.map((social, idx) => (
          <a
            key={social.name}
            href={social.href}
            className="text-sm font-medium text-white/60 hover:text-brand-accent transition-colors flex items-center gap-2"
          >
            {social.name}
            {idx < socials.length - 1 && (
              <span className="text-white/20">/</span>
            )}
          </a>
        ))}
      </section>
    </div>
  );
}
