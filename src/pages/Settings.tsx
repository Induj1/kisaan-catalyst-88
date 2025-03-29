
import UserSettings from "@/components/UserSettings";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import PageLayout from "@/components/PageLayout";

const Settings = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    language: "english",
    notifications: true,
  });

  const handleProfileUpdate = (updatedProfile: any) => {
    setProfile(updatedProfile);
    // Handle profile update logic here
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <UserSettings 
          profile={profile} 
          onProfileUpdate={handleProfileUpdate} 
        />
      </div>
    </PageLayout>
  );
};

export default Settings;
