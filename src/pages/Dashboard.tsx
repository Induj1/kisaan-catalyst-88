
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import FarmerProfile from '@/components/FarmerProfile';
import CreditTracker from '@/components/CreditTracker';
import ChatbotWidget from '@/components/ChatbotWidget';
import LocationAccessPopup from '@/components/LocationAccessPopup';
import { Cloud, Tractor, BarChart4, Lightbulb, ShoppingCart, Droplets, Calendar, SlidersHorizontal } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { user, isNewUser, setIsNewUser } = useAuth();
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [language, setLanguage] = useState<'english' | 'hindi' | 'kannada'>('hindi');
  const [creditScore, setCreditScore] = useState(650); // Default credit score
  const [farmerProfile, setFarmerProfile] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // If location not already granted, check if we can get it
    if (!locationGranted && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationGranted(true);
        },
        (error) => {
          console.log("Geolocation error or permission denied:", error);
        }
      );
    }
    
    // If it's a new user, show the location popup
    if (isNewUser) {
      setShowLocationPopup(true);
      // Reset the newUser flag
      setIsNewUser(false);
    }

    // Fetch profile data for the user if they are logged in
    const fetchProfileData = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('farmer_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (!error && data) {
          setCreditScore(data.credit_score);
          setFarmerProfile(data);
        }
      }
    };
    
    fetchProfileData();
  }, [isNewUser, setIsNewUser, user, refreshKey]);

  const toggleContrast = () => {
    setIsHighContrast(!isHighContrast);
    document.documentElement.classList.toggle('high-contrast');
  };

  const handleLocationGranted = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
    setLocationGranted(true);
  };
  
  const handleProfileRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Feature menu items
  const featureItems = [
    {
      icon: Cloud,
      title: language === 'english' ? 'Weather' : language === 'hindi' ? 'मौसम' : 'ಹವಾಮಾನ',
      description: language === 'english' ? 'Check forecasts and alerts' : language === 'hindi' ? 'पूर्वानुमान और अलर्ट देखें' : 'ಮುನ್ಸೂಚನೆಗಳು ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
      route: '/weather',
      color: 'bg-blue-500',
    },
    {
      icon: Tractor,
      title: language === 'english' ? 'Farm Planner' : language === 'hindi' ? 'फार्म प्लानर' : 'ಕೃಷಿ ಯೋಜಕ',
      description: language === 'english' ? 'Plan your farm activities' : language === 'hindi' ? 'अपनी कृषि गतिविधियों की योजना बनाएं' : 'ನಿಮ್ಮ ಕೃಷಿ ಚಟುವಟಿಕೆಗಳನ್ನು ಯೋಜಿಸಿ',
      route: '/farm-planner',
      color: 'bg-green-500',
    },
    {
      icon: BarChart4,
      title: language === 'english' ? 'Market Prices' : language === 'hindi' ? 'बाजार मूल्य' : 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು',
      description: language === 'english' ? 'Check current crop prices' : language === 'hindi' ? 'वर्तमान फसल मूल्य देखें' : 'ಪ್ರಸ್ತುತ ಬೆಳೆ ಬೆಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
      route: '/market-prices',
      color: 'bg-amber-500',
    },
    {
      icon: ShoppingCart,
      title: language === 'english' ? 'Marketplace' : language === 'hindi' ? 'बाज़ार' : 'ಮಾರುಕಟ್ಟೆ',
      description: language === 'english' ? 'Buy and sell products' : language === 'hindi' ? 'उत्पादों को खरीदें और बेचें' : 'ಉತ್ಪನ್ನಗಳನ್ನು ಖರೀದಿಸಿ ಮತ್ತು ಮಾರಾಟ ಮಾಡಿ',
      route: '/marketplace',
      color: 'bg-purple-500',
    },
    {
      icon: Droplets,
      title: language === 'english' ? 'Loans' : language === 'hindi' ? 'ऋण' : 'ಸಾಲಗಳು',
      description: language === 'english' ? 'Apply for agricultural loans' : language === 'hindi' ? 'कृषि ऋण के लिए आवेदन करें' : 'ಕೃಷಿ ಸಾಲಗಳಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
      route: '/loans',
      color: 'bg-teal-500',
    },
    {
      icon: Lightbulb,
      title: language === 'english' ? 'Ask Expert' : language === 'hindi' ? 'विशेषज्ञ से पूछें' : 'ತಜ್ಞರನ್ನು ಕೇಳಿ',
      description: language === 'english' ? 'Get advice from AI assistant' : language === 'hindi' ? 'AI सहायक से सलाह प्राप्त करें' : 'AI ಸಹಾಯಕರಿಂದ ಸಲಹೆ ಪಡೆಯಿರಿ',
      route: '/ask-expert',
      color: 'bg-orange-500',
    },
    {
      icon: Calendar,
      title: language === 'english' ? 'Crop Calendar' : language === 'hindi' ? 'फसल कैलेंडर' : 'ಬೆಳೆ ಕ್ಯಾಲೆಂಡರ್',
      description: language === 'english' ? 'Seasonal planting guide' : language === 'hindi' ? 'मौसमी रोपण मार्गदर्शिका' : 'ಋತುವಿನ ಬೇಸಾಯ ಮಾರ್ಗದರ್ಶಿ',
      route: '/crop-calendar',
      color: 'bg-indigo-500',
    },
    {
      icon: SlidersHorizontal,
      title: language === 'english' ? 'Settings' : language === 'hindi' ? 'सेटिंग्स' : 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
      description: language === 'english' ? 'Manage your preferences' : language === 'hindi' ? 'अपनी प्राथमिकताओं का प्रबंधन करें' : 'ನಿಮ್ಮ ಆದ್ಯತೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ',
      route: '/settings',
      color: 'bg-gray-500',
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isHighContrast ? 'high-contrast' : ''}`}>
      <Header 
        toggleContrast={toggleContrast} 
        isHighContrast={isHighContrast} 
        language={language}
        setLanguage={setLanguage}
      />

      <main className="flex-grow p-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              {language === 'english' 
                ? 'Welcome to KisaanMitra' 
                : language === 'hindi' 
                  ? 'किसानमित्र में आपका स्वागत है' 
                  : 'ಕಿಸಾನ್‌ಮಿತ್ರ ಗೆ ಸುಸ್ವಾಗತ'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'english' 
                ? 'Your personalized farming assistant' 
                : language === 'hindi' 
                  ? 'आपका व्यक्तिगत कृषि सहायक' 
                  : 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಕೃಷಿ ಸಹಾಯಕ'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featureItems.map((item, index) => (
              <Link to={item.route} key={index}>
                <Card className="h-full hover:shadow-md transition-shadow duration-300 border-t-4" style={{ borderTopColor: item.color }}>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color.replace('bg-', 'text-')} mb-4`}>
                        <item.icon size={28} className="text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FarmerProfile 
              user={user} 
              mode="edit" 
              onProfileUpdated={handleProfileRefresh} 
            />
            <CreditTracker 
              creditScore={creditScore}
              onRefresh={handleProfileRefresh}
            />
          </div>
        </div>
      </main>

      <Footer />

      {/* Location Access Popup */}
      <LocationAccessPopup 
        open={showLocationPopup} 
        onOpenChange={setShowLocationPopup}
        onLocationGranted={handleLocationGranted}
      />
    </div>
  );
};

export default Dashboard;
