import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveDataWidget from '@/components/LiveDataWidget';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import { ArrowDown, ArrowUp, BarChart4, RefreshCw, Search, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LocationAccessPopup from '@/components/LocationAccessPopup';

const MarketPrices = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [language, setLanguage] = useState<'english' | 'hindi' | 'kannada'>('hindi');
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log("Geolocation error or permission denied:", error);
          setShowLocationPopup(true);
        }
      );
    }
  }, []);

  const toggleContrast = () => {
    setIsHighContrast(!isHighContrast);
    document.documentElement.classList.toggle('high-contrast');
  };

  const handleLocationGranted = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleRequestLocation = () => {
    setShowLocationPopup(true);
  };

  const wheatPriceData = [
    { date: 'Jan', price: 2100 },
    { date: 'Feb', price: 2050 },
    { date: 'Mar', price: 2000 },
    { date: 'Apr', price: 2150 },
    { date: 'May', price: 2250 },
    { date: 'Jun', price: 2200 },
  ];

  const ricePriceData = [
    { date: 'Jan', price: 3100 },
    { date: 'Feb', price: 3150 },
    { date: 'Mar', price: 3200 },
    { date: 'Apr', price: 3050 },
    { date: 'May', price: 2950 },
    { date: 'Jun', price: 3200 },
  ];

  const cropComparisonData = [
    { name: 'Wheat', local: 2200, national: 2150 },
    { name: 'Rice', local: 3200, national: 3150 },
    { name: 'Potato', local: 1200, national: 1250 },
    { name: 'Onion', local: 1800, national: 1700 },
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
        <div className="container mx-auto max-w-5xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              {language === 'english' 
                ? 'Market Prices' 
                : language === 'hindi' 
                  ? 'बाजार मूल्य' 
                  : 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'english' 
                ? 'Live updates on crop prices from local mandis' 
                : language === 'hindi' 
                  ? 'स्थानीय मंडियों से फसल मूल्यों पर लाइव अपडेट' 
                  : 'ಸ್ಥಳೀಯ ಮಂಡಿಗಳಿಂದ ಬೆಳೆ ಬೆಲೆಗಳ ಲೈವ್ ಅಪ್ಡೇಟ್‌ಗಳು'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <LiveDataWidget 
                widgetType="mandi" 
                language={language}
                latitude={latitude}
                longitude={longitude}
                onRequestLocation={handleRequestLocation}
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>
                    {language === 'english' 
                      ? 'Price Trends' 
                      : language === 'hindi' 
                        ? 'मूल्य रुझान' 
                        : 'ಬೆಲೆ ಪ್ರವೃತ್ತಿಗಳು'}
                  </span>
                  <TrendingUp size={20} />
                </CardTitle>
                <CardDescription>
                  {language === 'english' 
                    ? '6-month price history' 
                    : language === 'hindi' 
                      ? '6 महीने का मूल्य इतिहास' 
                      : '6 ತಿಂಗಳ ಬೆಲೆ ಇತಿಹಾಸ'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="wheat">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="wheat">
                      {language === 'english' 
                        ? 'Wheat' 
                        : language === 'hindi' 
                          ? 'गेहूं' 
                          : 'ಗೋಧಿ'}
                    </TabsTrigger>
                    <TabsTrigger value="rice">
                      {language === 'english' 
                        ? 'Rice' 
                        : language === 'hindi' 
                          ? 'चावल' 
                          : 'ಅಕ್ಕಿ'}
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="wheat">
                    <LineChart 
                      data={wheatPriceData} 
                      index="date" 
                      categories={["price"]} 
                      colors={["emerald"]}
                      valueFormatter={(value) => `₹${value}/q`}
                      className="h-64"
                    />
                  </TabsContent>
                  
                  <TabsContent value="rice">
                    <LineChart 
                      data={ricePriceData} 
                      index="date" 
                      categories={["price"]} 
                      colors={["blue"]}
                      valueFormatter={(value) => `₹${value}/q`}
                      className="h-64"
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>
                  {language === 'english' 
                    ? 'Price Comparison' 
                    : language === 'hindi' 
                      ? 'मूल्य तुलना' 
                      : 'ಬೆಲೆ ಹೋಲಿಕೆ'}
                </span>
                <BarChart4 size={20} />
              </CardTitle>
              <CardDescription>
                {language === 'english' 
                  ? 'Local vs. National Average Prices' 
                  : language === 'hindi' 
                    ? 'स्थानीय बनाम राष्ट्रीय औसत मूल्य' 
                    : 'ಸ್ಥಳೀಯ vs. ರಾಷ್ಟ್ರೀಯ ಸರಾಸರಿ ಬೆಲೆಗಳು'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={cropComparisonData} 
                index="name" 
                categories={["local", "national"]} 
                colors={["indigo", "amber"]}
                valueFormatter={(value) => `₹${value}/q`}
                className="h-80"
              />
              <div className="flex justify-center mt-4 text-sm">
                <div className="flex items-center mr-4">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mr-1"></div>
                  <span>
                    {language === 'english' 
                      ? 'Local Mandi' 
                      : language === 'hindi' 
                        ? 'स्थानीय मंडी' 
                        : 'ಸ್ಥಳೀಯ ಮಂಡಿ'}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mr-1"></div>
                  <span>
                    {language === 'english' 
                      ? 'National Average' 
                      : language === 'hindi' 
                        ? 'राष्ट्रीय औसत' 
                        : 'ರಾಷ್ಟ್ರೀಯ ಸರಾಸರಿ'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'english' 
                  ? 'Search Other Mandis' 
                  : language === 'hindi' 
                    ? 'अन्य मंडियां खोजें' 
                    : 'ಇತರ ಮಂಡಿಗಳನ್ನು ಹುಡುಕಿ'}
              </CardTitle>
              <CardDescription>
                {language === 'english' 
                  ? 'View prices from other locations' 
                  : language === 'hindi' 
                    ? 'अन्य स्थानों से मूल्य देखें' 
                    : 'ಇತರ ಸ್ಥಳಗಳಿಂದ ಬೆಲೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Input 
                  placeholder={
                    language === 'english' 
                      ? 'Search by location or crop...' 
                      : language === 'hindi' 
                        ? 'स्थान या फसल द्वारा खोजें...' 
                        : 'ಸ್ಥಳ ಅಥವಾ ಬೆಳೆಯ ಮೂಲಕ ಹುಡುಕಿ...'
                  } 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="gap-2">
                  <Search size={16} />
                  {language === 'english' 
                    ? 'Search' 
                    : language === 'hindi' 
                      ? 'खोजें' 
                      : 'ಹುಡುಕಿ'}
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  <div>
                    <h4 className="font-medium">Azadpur Mandi, Delhi</h4>
                    <p className="text-sm text-gray-500">Updated 1 hour ago</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <RefreshCw size={16} />
                  </Button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  <div>
                    <h4 className="font-medium">Vashi Market, Mumbai</h4>
                    <p className="text-sm text-gray-500">Updated 2 hours ago</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <RefreshCw size={16} />
                  </Button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                  <div>
                    <h4 className="font-medium">KR Market, Bangalore</h4>
                    <p className="text-sm text-gray-500">Updated 3 hours ago</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <RefreshCw size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
      
      <LocationAccessPopup 
        open={showLocationPopup} 
        onOpenChange={setShowLocationPopup}
        onLocationGranted={handleLocationGranted}
      />
    </div>
  );
};

export default MarketPrices;
