
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import PageLayout from '@/components/PageLayout';
import LocationAccessPopup from '@/components/LocationAccessPopup';
import { Cloud, Tractor, BarChart4, Lightbulb, ShoppingCart, Droplets, Calendar, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Dashboard = () => {
  const { user, isNewUser, setIsNewUser } = useAuth();
  const { language, translate } = useLanguage();
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    // Check stored location first
    const storedLat = localStorage.getItem('userLatitude');
    const storedLng = localStorage.getItem('userLongitude');
    
    if (storedLat && storedLng) {
      setLatitude(parseFloat(storedLat));
      setLongitude(parseFloat(storedLng));
      setLocationGranted(true);
    } else if (!locationGranted && navigator.geolocation) {
      // If no stored location, try to get it
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLocationGranted(true);
          
          // Store location in localStorage
          localStorage.setItem('userLatitude', position.coords.latitude.toString());
          localStorage.setItem('userLongitude', position.coords.longitude.toString());
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
  }, [isNewUser, setIsNewUser, locationGranted]);

  const handleLocationGranted = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
    setLocationGranted(true);
    
    // Store location in localStorage
    localStorage.setItem('userLatitude', lat.toString());
    localStorage.setItem('userLongitude', lng.toString());
  };

  // Feature menu items
  const featureItems = [
    {
      icon: Cloud,
      title: translate('weather'),
      description: language === 'english' 
        ? 'Check forecasts and alerts' 
        : language === 'hindi' 
          ? 'पूर्वानुमान और अलर्ट देखें' 
          : 'ಮುನ್ಸೂಚನೆಗಳು ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
      route: '/weather',
      color: 'bg-blue-500',
    },
    {
      icon: Tractor,
      title: translate('farmPlanner'),
      description: language === 'english' 
        ? 'Plan your farm activities' 
        : language === 'hindi' 
          ? 'अपनी कृषि गतिविधियों की योजना बनाएं' 
          : 'ನಿಮ್ಮ ಕೃಷಿ ಚಟುವಟಿಕೆಗಳನ್ನು ಯೋಜಿಸಿ',
      route: '/farm-planner',
      color: 'bg-green-500',
    },
    {
      icon: BarChart4,
      title: translate('marketplace'),
      description: language === 'english' 
        ? 'Check current crop prices' 
        : language === 'hindi' 
          ? 'वर्तमान फसल मूल्य देखें' 
          : 'ಪ್ರಸ್ತುತ ಬೆಳೆ ಬೆಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
      route: '/market-prices',
      color: 'bg-amber-500',
    },
    {
      icon: ShoppingCart,
      title: translate('marketplace'),
      description: language === 'english' 
        ? 'Buy and sell products' 
        : language === 'hindi' 
          ? 'उत्पादों को खरीदें और बेचें' 
          : 'ಉತ್ಪನ್ನಗಳನ್ನು ಖರೀದಿಸಿ ಮತ್ತು ಮಾರಾಟ ಮಾಡಿ',
      route: '/marketplace',
      color: 'bg-purple-500',
    },
    {
      icon: Droplets,
      title: translate('loans'),
      description: language === 'english' 
        ? 'Apply for agricultural loans' 
        : language === 'hindi' 
          ? 'कृषि ऋण के लिए आवेदन करें' 
          : 'ಕೃಷಿ ಸಾಲಗಳಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
      route: '/loans',
      color: 'bg-teal-500',
    },
    {
      icon: Lightbulb,
      title: language === 'english' ? 'Ask Expert' : language === 'hindi' ? 'विशेषज्ञ से पूछें' : 'ತಜ್ಞರನ್ನು ಕೇಳಿ',
      description: language === 'english' 
        ? 'Get advice from AI assistant' 
        : language === 'hindi' 
          ? 'AI सहायक से सलाह प्राप्त करें' 
          : 'AI ಸಹಾಯಕರಿಂದ ಸಲಹೆ ಪಡೆಯಿರಿ',
      route: '/ask-expert',
      color: 'bg-orange-500',
    },
    {
      icon: Calendar,
      title: language === 'english' ? 'Crop Calendar' : language === 'hindi' ? 'फसल कैलेंडर' : 'ಬೆಳೆ ಕ್ಯಾಲೆಂಡರ್',
      description: language === 'english' 
        ? 'Seasonal planting guide' 
        : language === 'hindi' 
          ? 'मौसमी रोपण मार्गदर्शिका' 
          : 'ಋತುವಿನ ಬೇಸಾಯ ಮಾರ್ಗದರ್ಶಿ',
      route: '/crop-calendar',
      color: 'bg-indigo-500',
    },
    {
      icon: SlidersHorizontal,
      title: translate('settings'),
      description: language === 'english' 
        ? 'Manage your preferences' 
        : language === 'hindi' 
          ? 'अपनी प्राथमिकताओं का प्रबंधन करें' 
          : 'ನಿಮ್ಮ ಆದ್ಯತೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ',
      route: '/settings',
      color: 'bg-gray-500',
    },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            {translate('welcome')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'english' 
              ? 'Your personalized farming assistant' 
              : language === 'hindi' 
                ? 'आपका व्यक्तिगत कृषि सहायक' 
                : 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಕೃಷಿ ಸಹಾಯಕ'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featureItems.map((item, index) => (
            <Link to={item.route} key={index}>
              <Card className="h-full hover:shadow-md transition-shadow duration-300 border-t-4" style={{ borderTopColor: item.color }}>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color} mb-4`}>
                    <item.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Location Access Popup */}
      <LocationAccessPopup 
        open={showLocationPopup} 
        onOpenChange={setShowLocationPopup}
        onLocationGranted={handleLocationGranted}
      />
    </PageLayout>
  );
};

export default Dashboard;
