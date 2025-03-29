
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveDataWidget from '@/components/LiveDataWidget';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud, Droplets, MapPin, ThermometerSnowflake, Umbrella, Wind } from 'lucide-react';
import LocationAccessPopup from '@/components/LocationAccessPopup';

const Weather = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [language, setLanguage] = useState<'english' | 'hindi' | 'kannada'>('hindi');
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    // Check if we already have location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log("Geolocation error or permission denied:", error);
          // Show popup to request location
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
                ? 'Weather Information' 
                : language === 'hindi' 
                  ? 'मौसम की जानकारी' 
                  : 'ಹವಾಮಾನ ಮಾಹಿತಿ'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'english' 
                ? 'Accurate forecasts to plan your farming activities' 
                : language === 'hindi' 
                  ? 'अपनी कृषि गतिविधियों की योजना बनाने के लिए सटीक पूर्वानुमान' 
                  : 'ನಿಮ್ಮ ಕೃಷಿ ಚಟುವಟಿಕೆಗಳನ್ನು ಯೋಜಿಸಲು ನಿಖರವಾದ ಮುನ್ಸೂಚನೆಗಳು'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <LiveDataWidget 
                widgetType="weather" 
                language={language}
                latitude={latitude}
                longitude={longitude}
                onRequestLocation={handleRequestLocation}
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'english' 
                    ? 'Farming Weather Advisory' 
                    : language === 'hindi' 
                      ? 'कृषि मौसम सलाह' 
                      : 'ಕೃಷಿ ಹವಾಮಾನ ಸಲಹೆ'}
                </CardTitle>
                <CardDescription>
                  {language === 'english' 
                    ? 'Based on current weather conditions' 
                    : language === 'hindi' 
                      ? 'वर्तमान मौसम की स्थिति के आधार पर' 
                      : 'ಪ್ರಸ್ತುತ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳ ಆಧಾರದ ಮೇಲೆ'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <Umbrella className="text-blue-500 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium">
                        {language === 'english' 
                          ? 'Rainfall Advisory' 
                          : language === 'hindi' 
                            ? 'वर्षा सलाह' 
                            : 'ಮಳೆ ಸಲಹೆ'}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'english' 
                          ? 'Light rainfall expected in the next 24 hours. Consider delaying fertilizer application.' 
                          : language === 'hindi' 
                            ? 'अगले 24 घंटों में हल्की बारिश की उम्मीद है। उर्वरक के प्रयोग में देरी पर विचार करें।' 
                            : 'ಮುಂದಿನ 24 ಗಂಟೆಗಳಲ್ಲಿ ಸಣ್ಣ ಮಳೆ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ. ರಸಗೊಬ್ಬರ ಹಾಕುವುದನ್ನು ವಿಳಂಬ ಮಾಡಲು ಪರಿಗಣಿಸಿ.'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <Wind className="text-green-500 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium">
                        {language === 'english' 
                          ? 'Wind Advisory' 
                          : language === 'hindi' 
                            ? 'हवा सलाह' 
                            : 'ಗಾಳಿ ಸಲಹೆ'}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'english' 
                          ? 'Moderate winds expected. Secure any protective coverings for sensitive crops.' 
                          : language === 'hindi' 
                            ? 'मध्यम हवाओं की उम्मीद है। संवेदनशील फसलों के लिए किसी भी सुरक्षात्मक कवरिंग को सुरक्षित करें।' 
                            : 'ಮಧ್ಯಮ ಗಾಳಿಗಳು ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ. ಸೂಕ್ಷ್ಮ ಬೆಳೆಗಳಿಗೆ ಯಾವುದೇ ರಕ್ಷಣಾತ್ಮಕ ಹೊದಿಕೆಗಳನ್ನು ಸುರಕ್ಷಿತಗೊಳಿಸಿ.'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                    <ThermometerSnowflake className="text-amber-500 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium">
                        {language === 'english' 
                          ? 'Temperature Advisory' 
                          : language === 'hindi' 
                            ? 'तापमान सलाह' 
                            : 'ತಾಪಮಾನ ಸಲಹೆ'}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'english' 
                          ? 'Temperature will remain moderate. Good conditions for most crop growth.' 
                          : language === 'hindi' 
                            ? 'तापमान मध्यम रहेगा। अधिकांश फसल वृद्धि के लिए अच्छी स्थिति।' 
                            : 'ತಾಪಮಾನವು ಮಧ್ಯಮವಾಗಿರುತ್ತದೆ. ಹೆಚ್ಚಿನ ಬೆಳೆ ಬೆಳವಣಿಗೆಗೆ ಉತ್ತಮ ಪರಿಸ್ಥಿತಿಗಳು.'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-md">
                    <Droplets className="text-indigo-500 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium">
                        {language === 'english' 
                          ? 'Humidity Advisory' 
                          : language === 'hindi' 
                            ? 'आर्द्रता सलाह' 
                            : 'ಆರ್ದ್ರತೆ ಸಲಹೆ'}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'english' 
                          ? 'High humidity levels expected. Monitor for fungal diseases in rice and wheat crops.' 
                          : language === 'hindi' 
                            ? 'उच्च आर्द्रता स्तर की उम्मीद है। चावल और गेहूं की फसलों में कवक रोगों की निगरानी करें।' 
                            : 'ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆ ಮಟ್ಟಗಳು ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ. ಅಕ್ಕಿ ಮತ್ತು ಗೋಧಿ ಬೆಳೆಗಳಲ್ಲಿ ಶಿಲೀಂಧ್ರ ರೋಗಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {language === 'english' 
                  ? 'Seasonal Forecast' 
                  : language === 'hindi' 
                    ? 'मौसमी पूर्वानुमान' 
                    : 'ಋತುವಿನ ಮುನ್ಸೂಚನೆ'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="kharif">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="kharif">
                    {language === 'english' 
                      ? 'Kharif Season' 
                      : language === 'hindi' 
                        ? 'खरीफ मौसम' 
                        : 'ಖರೀಫ್ ಋತು'}
                  </TabsTrigger>
                  <TabsTrigger value="rabi">
                    {language === 'english' 
                      ? 'Rabi Season' 
                      : language === 'hindi' 
                        ? 'रबी मौसम' 
                        : 'ರಬಿ ಋತು'}
                  </TabsTrigger>
                  <TabsTrigger value="zaid">
                    {language === 'english' 
                      ? 'Zaid Season' 
                      : language === 'hindi' 
                        ? 'जायद मौसम' 
                        : 'ಜೈದ್ ಋತು'}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="kharif" className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <Cloud className="text-blue-500 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium">
                        {language === 'english' 
                          ? 'Monsoon Prediction' 
                          : language === 'hindi' 
                            ? 'मानसून भविष्यवाणी' 
                            : 'ಮುಂಗಾರು ಮುನ್ಸೂಚನೆ'}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'english' 
                          ? 'The monsoon is expected to be normal this year with adequate rainfall across most regions. Plan paddy, cotton and maize planting accordingly.' 
                          : language === 'hindi' 
                            ? 'इस वर्ष मानसून के सामान्य रहने की उम्मीद है, जिसमें अधिकांश क्षेत्रों में पर्याप्त वर्षा होगी। धान, कपास और मक्का की बुवाई की योजना उसी के अनुसार बनाएं।' 
                            : 'ಈ ವರ್ಷ ಮುಂಗಾರು ಸಾಮಾನ್ಯವಾಗಿರುವ ನಿರೀಕ್ಷೆಯಿದೆ, ಹೆಚ್ಚಿನ ಪ್ರದೇಶಗಳಲ್ಲಿ ಸಾಕಷ್ಟು ಮಳೆಯಾಗುತ್ತದೆ. ಭತ್ತ, ಹತ್ತಿ ಮತ್ತು ಮೆಕ್ಕೆಜೋಳ ಬೇಸಾಯವನ್ನು ಅದಕ್ಕೆ ತಕ್ಕಂತೆ ಯೋಜಿಸಿ.'}
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="rabi" className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <Cloud className="text-blue-500 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium">
                        {language === 'english' 
                          ? 'Winter Forecast' 
                          : language === 'hindi' 
                            ? 'सर्दी का पूर्वानुमान' 
                            : 'ಚಳಿಗಾಲದ ಮುನ್ಸೂಚನೆ'}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'english' 
                          ? 'Winter is expected to be colder than usual with moderate rainfall in northern regions. Wheat, mustard and gram crops will benefit from these conditions.' 
                          : language === 'hindi' 
                            ? 'उत्तरी क्षेत्रों में मध्यम वर्षा के साथ सर्दी सामान्य से अधिक ठंडी रहने की उम्मीद है। गेहूं, सरसों और चना की फसलों को इन परिस्थितियों से लाभ होगा।' 
                            : 'ಉತ್ತರ ಪ್ರದೇಶಗಳಲ್ಲಿ ಮಧ್ಯಮ ಮಳೆಯೊಂದಿಗೆ ಚಳಿಗಾಲವು ಸಾಮಾನ್ಯಕ್ಕಿಂತ ತಂಪಾಗಿರುವ ನಿರೀಕ್ಷೆಯಿದೆ. ಗೋಧಿ, ಸಾಸಿವೆ ಮತ್ತು ಕಡಲೆ ಬೆಳೆಗಳು ಈ ಪರಿಸ್ಥಿತಿಗಳಿಂದ ಪ್ರಯೋಜನ ಪಡೆಯುತ್ತವೆ.'}
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="zaid" className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <Cloud className="text-blue-500 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium">
                        {language === 'english' 
                          ? 'Summer Forecast' 
                          : language === 'hindi' 
                            ? 'गर्मी का पूर्वानुमान' 
                            : 'ಬೇಸಿಗೆ ಮುನ್ಸೂಚನೆ'}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'english' 
                          ? 'Summer is likely to be hotter than normal. Ensure adequate irrigation for vegetables and fruits. Consider mulching to reduce water loss.' 
                          : language === 'hindi' 
                            ? 'गर्मी सामान्य से अधिक गर्म होने की संभावना है। सब्जियों और फलों के लिए पर्याप्त सिंचाई सुनिश्चित करें। पानी के नुकसान को कम करने के लिए मल्चिंग पर विचार करें।' 
                            : 'ಬೇಸಿಗೆಯು ಸಾಮಾನ್ಯಕ್ಕಿಂತ ಬಿಸಿಯಾಗಿರುವ ಸಾಧ್ಯತೆಯಿದೆ. ತರಕಾರಿಗಳು ಮತ್ತು ಹಣ್ಣುಗಳಿಗೆ ಸಾಕಷ್ಟು ನೀರಾವರಿಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ. ನೀರಿನ ನಷ್ಟವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮಲ್ಚಿಂಗ್ ಅನ್ನು ಪರಿಗಣಿಸಿ.'}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
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

export default Weather;
