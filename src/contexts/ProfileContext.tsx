import { createContext, useContext, useState, ReactNode } from "react";
import klerryImage from "../assets/images/klerry.jpg";

interface ProfileData {
  name: string;
  username: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  joinedDate: string;
  profileImage: string;
}

interface ProfileContextType {
  profileData: ProfileData;
  updateProfileData: (data: Partial<ProfileData>) => void;
}

const defaultProfileData: ProfileData = {
  name: "Klerry Tumsiime",
  username: "@klerry_dev",
  title: "Designer & Developer",
  bio: "Hi! I'm a developer based in Tanzania who truly loves the process of building things for the web. For me, it's not just about writing code that works; it's about crafting digital experiences that feel intuitive and look great.",
  email: "klerry@example.com",
  phone: "+255 733 571 676",
  location: "Dar es Salaam, Tanzania",
  website: "https://klerry.dev",
  joinedDate: "January 2024",
  profileImage: klerryImage,
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profileData, setProfileData] =
    useState<ProfileData>(defaultProfileData);

  const updateProfileData = (data: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...data }));
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
