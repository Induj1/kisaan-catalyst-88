import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from '@/components/PageLayout';
import LocationAccessPopup from '@/components/LocationAccessPopup';
import SensorDataWidget from '@/components/SensorDataWidget';
import DeviceConnectionDialog from '@/components/DeviceConnectionDialog';
import { Cloud, Tractor, BarChart4, Lightbulb, ShoppingCart, Droplets, Calendar, SlidersHorizontal, Wifi } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user, isNewUser, setIsNewUser } = useAuth();
  const { translate } = useLanguage();
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [showDeviceDialog, setShowDeviceDialog] = useState(false);
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
      description: translate('checkForecasts'),
      route: '/weather',
      color: 'bg-blue-500',
    },
    {
      icon: Tractor,
      title: translate('farmPlanner'),
      description: translate('planFarmActivities'),
      route: '/farm-planner',
      color: 'bg-green-500',
    },
    {
      icon: BarChart4,
      title: translate('marketplace'),
      description: translate('checkCropPrices'),
      route: '/market-prices',
      color: 'bg-amber-500',
    },
    {
      icon: ShoppingCart,
      title: translate('marketplace'),
      description: translate('buyAndSellProducts'),
      route: '/marketplace',
      color: 'bg-purple-500',
    },
    {
      icon: Droplets,
      title: translate('loans'),
      description: translate('applyForLoans'),
      route: '/loans',
      color: 'bg-teal-500',
    },
    {
      icon: Lightbulb,
      title: translate('askExpert'),
      description: translate('getAIAdvice'),
      route: '/ask-expert',
      color: 'bg-orange-500',
    },
    {
      icon: Calendar,
      title: translate('cropCalendar'),
      description: translate('seasonalPlanting'),
      route: '/crop-calendar',
      color: 'bg-indigo-500',
    },
    {
      icon: SlidersHorizontal,
      title: translate('settings'),
      description: translate('managePreferences'),
      route: '/settings',
      color: 'bg-gray-500',
    },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              {translate('welcome')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {translate('personalizedAssistant')}
            </p>
          </div>
          
          <Button 
            onClick={() => setShowDeviceDialog(true)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Wifi className="mr-2" size={18} />
            Connect Device
          </Button>
        </div>

        {/* Sensor Data Widget */}
        <div className="mb-8">
          <SensorDataWidget />
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

      {/* Device Connection Dialog */}
      <DeviceConnectionDialog
        open={showDeviceDialog}
        onOpenChange={setShowDeviceDialog}
      />
    </PageLayout>
  );
};

export default Dashboard;
