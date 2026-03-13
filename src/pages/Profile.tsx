import { useState, useEffect, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Camera,
  Settings,
  LogOut,
  Github,
  Facebook,
  Instagram,
  MessageCircle,
  ExternalLink,
  Heart,
  Share2,
  Bookmark,
  Star,
  Award,
  TrendingUp,
  Plus,
  X,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import { motion } from "motion/react";
import { useProfile } from "../contexts/ProfileContext";

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { profileData, updateProfileData } = useProfile();

  const [stats] = useState({
    projects: 24,
    followers: 1234,
    following: 89,
    likes: 5678,
  });

  const [socials, setSocials] = useState([
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/klerry-dev",
      color: "hover:bg-gray-800",
      id: "github",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://web.facebook.com/profile.php?id=61558398203460",
      color: "hover:bg-blue-600",
      id: "facebook",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/klerry_creative/",
      color: "hover:bg-pink-600",
      id: "instagram",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/255733571676",
      color: "hover:bg-green-600",
      id: "whatsapp",
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to a backend
  };

  const handleInputChange = (field: string, value: string) => {
    updateProfileData({ [field]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfileData({ profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialChange = (id: string, field: string, value: string) => {
    setSocials((prev) =>
      prev.map((social) =>
        social.id === id ? { ...social, [field]: value } : social,
      ),
    );
  };

  const addSocialLink = () => {
    const availablePlatforms = [
      {
        name: "LinkedIn",
        icon: Linkedin,
        color: "hover:bg-blue-700",
        id: "linkedin",
      },
      {
        name: "Twitter",
        icon: Twitter,
        color: "hover:bg-blue-400",
        id: "twitter",
      },
      {
        name: "YouTube",
        icon: Youtube,
        color: "hover:bg-red-600",
        id: "youtube",
      },
    ];

    const existingIds = socials.map((s) => s.id);
    const available = availablePlatforms.filter(
      (p) => !existingIds.includes(p.id),
    );

    if (available.length > 0) {
      const newPlatform = available[0];
      setSocials((prev) => [...prev, { ...newPlatform, href: "" }]);
    }
  };

  const removeSocialLink = (id: string) => {
    setSocials((prev) => prev.filter((social) => social.id !== id));
  };

  return (
    <div className="min-h-screen pt-32 pb-32 bg-brand-black overflow-y-auto">
      <div className="px-6 max-w-md mx-auto space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="relative inline-block mb-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative group cursor-pointer"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-brand-accent shadow-xl relative">
                <img
                  src={profileData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover transition-opacity group-hover:opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus size={24} className="text-white" />
                </div>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {isEditing ?
            <div className="space-y-3">
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="text-2xl font-bold text-white bg-white/10 border border-white/30 rounded-xl outline-none text-center w-full px-4 py-2 focus:border-brand-accent transition-colors"
                placeholder="Your name"
              />
              <input
                type="text"
                value={profileData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="text-lg text-white/90 bg-white/10 border border-white/30 rounded-xl outline-none text-center w-full px-4 py-2 focus:border-brand-accent transition-colors"
                placeholder="Your profession"
              />
              <input
                type="text"
                value={profileData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="text-sm text-white/90 bg-white/10 border border-white/30 rounded-xl outline-none text-center w-full px-4 py-2 focus:border-brand-accent transition-colors"
                placeholder="@username"
              />
            </div>
          : <>
              <h1 className="text-2xl font-bold text-white">
                {profileData.name}
              </h1>
              <p className="text-white/80">{profileData.title}</p>
              <p className="text-white/60 text-sm">{profileData.username}</p>
            </>
          }

          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <div key={social.id} className="relative group">
                  {isEditing && (
                    <button
                      onClick={() => removeSocialLink(social.id)}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <X size={12} />
                    </button>
                  )}
                  <div className={isEditing ? "opacity-75" : ""}>
                    {isEditing ?
                      <input
                        type="url"
                        value={social.href}
                        onChange={(e) =>
                          handleSocialChange(social.id, "href", e.target.value)
                        }
                        className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 transition-all ${social.color} outline-none text-center text-xs`}
                        placeholder="URL"
                      />
                    : <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all ${social.color}`}
                      >
                        <Icon size={18} />
                      </a>
                    }
                  </div>
                </div>
              );
            })}
            {isEditing && (
              <button
                onClick={addSocialLink}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all border-2 border-dashed border-white/30"
              >
                <Plus size={18} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Fixed Edit Button */}
        <div className="fixed top-32 left-6 z-40">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all pill-surface ${
              isEditing ?
                "text-red-400 hover:bg-red-500/20"
              : "text-brand-accent hover:bg-white/10"
            }`}
          >
            {isEditing ?
              <X size={20} />
            : <Edit size={20} />}
          </button>
        </div>

        {/* Save Button - appears when editing */}
        {isEditing && (
          <div className="fixed top-52 left-6 z-40">
            <button
              onClick={handleSave}
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl pill-surface text-brand-accent hover:bg-white/10 transition-all"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
            </button>
          </div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-4"
        >
          {[
            { label: "Projects", value: stats.projects, icon: Award },
            { label: "Followers", value: stats.followers, icon: Heart },
            { label: "Following", value: stats.following, icon: User },
            { label: "Likes", value: stats.likes, icon: Star },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-brand-accent/20">
                  <Icon size={20} className="text-brand-accent" />
                </div>
                <p className="text-xl font-bold text-white">
                  {stat.value.toLocaleString()}
                </p>
                <p className="text-xs text-white/60">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">About</h3>

          {isEditing ?
            <textarea
              value={profileData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 outline-none resize-none p-3 min-h-[100px]"
            />
          : <p className="text-white/80 leading-relaxed">{profileData.bio}</p>}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6 space-y-4"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>

          {[
            {
              icon: Mail,
              label: "Email",
              value: profileData.email,
              editable: true,
            },
            {
              icon: Phone,
              label: "Phone",
              value: profileData.phone,
              editable: true,
            },
            {
              icon: MapPin,
              label: "Location",
              value: profileData.location,
              editable: true,
            },
            {
              icon: ExternalLink,
              label: "Website",
              value: profileData.website,
              editable: true,
            },
            {
              icon: Calendar,
              label: "Joined",
              value: profileData.joinedDate,
              editable: false,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center">
                  <Icon size={18} className="text-brand-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/60">{item.label}</p>
                  {isEditing && item.editable ?
                    <input
                      type={
                        item.label === "Email" ? "email"
                        : item.label === "Website" ?
                          "url"
                        : "text"
                      }
                      value={item.value}
                      onChange={(e) =>
                        handleInputChange(
                          item.label.toLowerCase(),
                          e.target.value,
                        )
                      }
                      className="text-white bg-white/10 border border-white/30 rounded-lg outline-none w-full px-3 py-2 focus:border-brand-accent transition-colors text-sm"
                      placeholder={`Enter ${item.label.toLowerCase()}`}
                    />
                  : <p className="text-white text-sm">{item.value}</p>}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Action Buttons */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3"
          >
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 px-6 py-3 pill-surface border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 pill-surface border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors font-bold"
            >
              Save Changes
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
