
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import FarmerProfile from '@/components/FarmerProfile';
import CreditTracker from '@/components/CreditTracker';
import LoanApplicationList from '@/components/LoanApplicationList';
import LoanApplicationForm from '@/components/LoanApplicationForm';
import ChatbotWidget from '@/components/ChatbotWidget';
import LiveDataWidget from '@/components/LiveDataWidget';
import MapPlanner from '@/components/MapPlanner';
import LocationAccessPopup from '@/components/LocationAccessPopup';
import { Cloud, Tractor, Map, BarChart4, Lightbulb } from 'lucide-react';

const Dashboard = () => {
  const { user, isNewUser, setIsNewUser } = useAuth();
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [language, setLanguage] = useState<'english' | 'hindi' | 'kannada'>('hindi');

  useEffect(() => {
    // If it's a new user, show the location popup
    if (isNewUser) {
      setShowLocationPopup(true);
      // Reset the newUser flag
      setIsNewUser(false);
    }
  }, [isNewUser, setIsNewUser]);

  const toggleContrast = () => {
    setIsHighContrast(!isHighContrast);
    document.documentElement.classList.toggle('high-contrast');
  };

  const handleLocationGranted = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
    setLocationGranted(true);
  };

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
                  <Cloud className="mr-2" size={20} />
                  {language === 'english' ? 'Weather Forecast' : language === 'hindi' ? 'मौसम का पूर्वानुमान' : 'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ'}
                </CardTitle>
                <CardDescription>
                  {language === 'english' 
                    ? 'Real-time weather updates for your location' 
                    : language === 'hindi' 
                      ? 'आपके स्थान के लिए रीयल-टाइम मौसम अपडेट' 
                      : 'ನಿಮ್ಮ ಸ್ಥಳಕ್ಕೆ ನೈಜ-ಸಮಯದ ಹವಾಮಾನ ನವೀಕರಣಗಳು'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LiveDataWidget widgetType="weather" language={language} />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-green-700 dark:text-green-300">
                  <Tractor className="mr-2" size={20} />
                  {language === 'english' ? 'Farm Planning' : language === 'hindi' ? 'कृषि योजना' : 'ಕೃಷಿ ಯೋಜನೆ'}
                </CardTitle>
                <CardDescription>
                  {language === 'english' 
                    ? 'Plan your farm operations intelligently' 
                    : language === 'hindi' 
                      ? 'अपने कृषि कार्यों की बुद्धिमानी से योजना बनाएं' 
                      : 'ನಿಮ್ಮ ಕೃಷಿ ಕಾರ್ಯಾಚರಣೆಗಳನ್ನು ಬುದ್ಧಿವಂತಿಕೆಯಿಂದ ಯೋಜಿಸಿ'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="h-48 relative overflow-hidden rounded-md bg-green-200/50 dark:bg-green-900/30">
                  <Map className="absolute inset-0 m-auto h-16 w-16 text-green-500/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link to="/farm-planner">
                      <Button className="bg-green-600 hover:bg-green-700">
                        {language === 'english' 
                          ? 'Open Farm Planner' 
                          : language === 'hindi' 
                            ? 'फार्म प्लानर खोलें' 
                            : 'ಕೃಷಿ ಯೋಜಕವನ್ನು ತೆರೆಯಿರಿ'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <p className="text-xs text-green-700 dark:text-green-300">
                  {language === 'english' 
                    ? 'Access AI-powered crop recommendations based on your location and preferences' 
                    : language === 'hindi' 
                      ? 'आपके स्थान और प्राथमिकताओं के आधार पर AI-संचालित फसल अनुशंसाओं तक पहुंचें' 
                      : 'ನಿಮ್ಮ ಸ್ಥಳ ಮತ್ತು ಆದ್ಯತೆಗಳ ಆಧಾರದ ಮೇಲೆ AI-ಪವರ್ಡ್ ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ'}
                </p>
              </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-amber-700 dark:text-amber-300">
                  <BarChart4 className="mr-2" size={20} />
                  {language === 'english' ? 'Market Prices' : language === 'hindi' ? 'बाजार मूल्य' : 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು'}
                </CardTitle>
                <CardDescription>
                  {language === 'english' 
                    ? 'Live market prices from local mandis' 
                    : language === 'hindi' 
                      ? 'स्थानीय मंडियों से लाइव बाजार मूल्य' 
                      : 'ಸ್ಥಳೀಯ ಮಂಡಿಗಳಿಂದ ಲೈವ್ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LiveDataWidget widgetType="mandi" language={language} />
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="profile">
                {language === 'english' ? 'Profile' : language === 'hindi' ? 'प्रोफाइल' : 'ಪ್ರೊಫೈಲ್'}
              </TabsTrigger>
              <TabsTrigger value="loans">
                {language === 'english' ? 'Loans' : language === 'hindi' ? 'ऋण' : 'ಸಾಲಗಳು'}
              </TabsTrigger>
              <TabsTrigger value="chatbot">
                {language === 'english' ? 'Ask Expert' : language === 'hindi' ? 'विशेषज्ञ से पूछें' : 'ತಜ್ಞರನ್ನು ಕೇಳಿ'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FarmerProfile />
                <CreditTracker />
              </div>
            </TabsContent>

            <TabsContent value="loans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LoanApplicationForm />
                <LoanApplicationList />
              </div>
            </TabsContent>

            <TabsContent value="chatbot">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="md:col-span-3">
                  <ChatbotWidget />
                </div>
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Lightbulb className="mr-2 text-amber-500" size={20} />
                        {language === 'english' ? 'Farming Tips' : language === 'hindi' ? 'कृषि संबंधी सुझाव' : 'ಕೃಷಿ ಸಲಹೆಗಳು'}
                      </CardTitle>
                      <CardDescription>
                        {language === 'english' 
                          ? 'Expert recommendations for your farm' 
                          : language === 'hindi' 
                            ? 'आपके खेत के लिए विशेषज्ञ अनुशंसाएँ' 
                            : 'ನಿಮ್ಮ ಕೃಷಿಗೆ ತಜ್ಞರ ಶಿಫಾರಸುಗಳು'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
                          {language === 'english' 
                            ? 'Rotate crops to maintain soil health and prevent pest buildup.' 
                            : language === 'hindi' 
                              ? 'मिट्टी के स्वास्थ्य को बनाए रखने और कीटों के जमाव को रोकने के लिए फसलों का चक्रण करें।' 
                              : 'ಮಣ್ಣಿನ ಆರೋಗ್ಯವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಲು ಮತ್ತು ಕೀಟಗಳ ಸಂಗ್ರಹವನ್ನು ತಡೆಯಲು ಬೆಳೆಗಳನ್ನು ತಿರುಗಿಸಿ.'}
                        </li>
                        <li className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
                          {language === 'english' 
                            ? 'Implement drip irrigation to save water and improve yield.' 
                            : language === 'hindi' 
                              ? 'पानी बचाने और उपज में सुधार के लिए ड्रिप सिंचाई लागू करें।' 
                              : 'ನೀರನ್ನು ಉಳಿಸಲು ಮತ್ತು ಇಳುವರಿಯನ್ನು ಸುಧಾರಿಸಲು ಹನಿ ನೀರಾವರಿಯನ್ನು ಅಳವಡಿಸಿ.'}
                        </li>
                        <li className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
                          {language === 'english' 
                            ? 'Use organic fertilizers to improve soil health long-term.' 
                            : language === 'hindi' 
                              ? 'दीर्घकालिक मिट्टी के स्वास्थ्य में सुधार के लिए जैविक उर्वरकों का उपयोग करें।' 
                              : 'ದೀರ್ಘಾವಧಿಯ ಮಣ್ಣಿನ ಆರೋಗ್ಯವನ್ನು ಸುಧಾರಿಸಲು ಸಾವಯವ ಗೊಬ್ಬರಗಳನ್ನು ಬಳಸಿ.'}
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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
