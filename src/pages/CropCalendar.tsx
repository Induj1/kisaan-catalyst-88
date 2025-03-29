
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Seed, SunIcon, Cloud, Droplets } from 'lucide-react';

const CropCalendar = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [language, setLanguage] = useState<'english' | 'hindi' | 'kannada'>('hindi');

  const toggleContrast = () => {
    setIsHighContrast(!isHighContrast);
    document.documentElement.classList.toggle('high-contrast');
  };

  const seasonalCrops = {
    kharif: [
      { name: 'Rice (धान)', plantingTime: 'June-July', harvestTime: 'November-December', rainfall: 'High' },
      { name: 'Cotton (कपास)', plantingTime: 'May-June', harvestTime: 'November-December', rainfall: 'Medium' },
      { name: 'Maize (मक्का)', plantingTime: 'June-July', harvestTime: 'September-October', rainfall: 'Medium' },
      { name: 'Soybean (सोयाबीन)', plantingTime: 'June-July', harvestTime: 'October', rainfall: 'Medium-High' },
      { name: 'Groundnut (मूंगफली)', plantingTime: 'June-July', harvestTime: 'October-November', rainfall: 'Medium' }
    ],
    rabi: [
      { name: 'Wheat (गेहूं)', plantingTime: 'October-November', harvestTime: 'March-April', irrigation: 'Required' },
      { name: 'Mustard (सरसों)', plantingTime: 'October', harvestTime: 'February', irrigation: 'Medium' },
      { name: 'Gram (चना)', plantingTime: 'October-November', harvestTime: 'February-March', irrigation: 'Low' },
      { name: 'Peas (मटर)', plantingTime: 'November', harvestTime: 'February-March', irrigation: 'Medium' },
      { name: 'Barley (जौ)', plantingTime: 'October-November', harvestTime: 'March-April', irrigation: 'Low-Medium' }
    ],
    zaid: [
      { name: 'Cucumber (खीरा)', plantingTime: 'March', harvestTime: 'May-June', irrigation: 'High' },
      { name: 'Watermelon (तरबूज)', plantingTime: 'February-March', harvestTime: 'May-June', irrigation: 'Medium-High' },
      { name: 'Pumpkin (कद्दू)', plantingTime: 'February-March', harvestTime: 'May-June', irrigation: 'Medium' },
      { name: 'Bitter Gourd (करेला)', plantingTime: 'February-March', harvestTime: 'April-June', irrigation: 'Medium-High' },
      { name: 'Moong Bean (मूंग)', plantingTime: 'March-April', harvestTime: 'May-June', irrigation: 'Low-Medium' }
    ]
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
                ? 'Crop Calendar' 
                : language === 'hindi' 
                  ? 'फसल कैलेंडर' 
                  : 'ಬೆಳೆ ಕ್ಯಾಲೆಂಡರ್'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'english' 
                ? 'Seasonal guide for planting and harvesting crops' 
                : language === 'hindi' 
                  ? 'फसलों के रोपण और कटाई के लिए मौसमी मार्गदर्शिका' 
                  : 'ಬೆಳೆಗಳನ್ನು ನೆಡುವ ಮತ್ತು ಕೊಯ್ಲು ಮಾಡುವ ಋತುವಿನ ಮಾರ್ಗದರ್ಶಿ'}
            </p>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                {language === 'english' 
                  ? 'Seasonal Crops' 
                  : language === 'hindi' 
                    ? 'मौसमी फसलें' 
                    : 'ಋತುವಿನ ಬೆಳೆಗಳು'}
              </CardTitle>
              <CardDescription>
                {language === 'english' 
                  ? 'Plan your farming based on seasons' 
                  : language === 'hindi' 
                    ? 'मौसम के आधार पर अपनी खेती की योजना बनाएं' 
                    : 'ಋತುಗಳ ಆಧಾರದಲ್ಲಿ ನಿಮ್ಮ ಕೃಷಿಯನ್ನು ಯೋಜಿಸಿ'}
              </CardDescription>
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
                
                <TabsContent value="kharif">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Card>
                        <CardHeader className="bg-green-50 dark:bg-green-900/20">
                          <CardTitle className="flex items-center text-lg">
                            <Cloud className="mr-2 h-5 w-5 text-blue-500" />
                            {language === 'english' 
                              ? 'Kharif (Monsoon) Season' 
                              : language === 'hindi' 
                                ? 'खरीफ (मानसून) मौसम' 
                                : 'ಖರೀಫ್ (ಮುಂಗಾರು) ಋತು'}
                          </CardTitle>
                          <CardDescription>
                            {language === 'english' 
                              ? 'June to October (Monsoon crops)' 
                              : language === 'hindi' 
                                ? 'जून से अक्टूबर (मानसून फसलें)' 
                                : 'ಜೂನ್ ನಿಂದ ಅಕ್ಟೋಬರ್ (ಮುಂಗಾರು ಬೆಳೆಗಳು)'}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-4">
                            {seasonalCrops.kharif.map((crop, index) => (
                              <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                                <h4 className="font-medium flex items-center">
                                  <Seed className="mr-2 h-4 w-4 text-green-600" />
                                  {crop.name}
                                </h4>
                                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                  <div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                      {language === 'english' 
                                        ? 'Planting: ' 
                                        : language === 'hindi' 
                                          ? 'रोपण: ' 
                                          : 'ನೆಡುವಿಕೆ: '}
                                      <span className="font-medium">{crop.plantingTime}</span>
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                      {language === 'english' 
                                        ? 'Harvest: ' 
                                        : language === 'hindi' 
                                          ? 'कटाई: ' 
                                          : 'ಕೊಯ್ಲು: '}
                                      <span className="font-medium">{crop.harvestTime}</span>
                                    </p>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  <Droplets className="inline h-4 w-4 text-blue-500 mr-1" />
                                  {language === 'english' 
                                    ? 'Rainfall: ' 
                                    : language === 'hindi' 
                                      ? 'वर्षा: ' 
                                      : 'ಮಳೆ: '}
                                  <span className="font-medium">{crop.rainfall}</span>
                                </p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div>
                      <Card>
                        <CardHeader className="bg-green-50 dark:bg-green-900/20">
                          <CardTitle className="text-lg">
                            {language === 'english' 
                              ? 'Kharif Cultivation Tips' 
                              : language === 'hindi' 
                                ? 'खरीफ खेती के टिप्स' 
                                : 'ಖರೀಫ್ ಕೃಷಿ ಸಲಹೆಗಳು'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                          <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                            <Cloud className="text-blue-500 mt-1" size={20} />
                            <div>
                              <h4 className="font-medium">
                                {language === 'english' 
                                  ? 'Prepare for monsoon' 
                                  : language === 'hindi' 
                                    ? 'मानसून की तैयारी करें' 
                                    : 'ಮುಂಗಾರಿಗೆ ತಯಾರಾಗಿ'}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {language === 'english' 
                                  ? 'Ensure proper drainage to avoid waterlogging.' 
                                  : language === 'hindi' 
                                    ? 'जलभराव से बचने के लिए उचित जल निकासी सुनिश्चित करें।' 
                                    : 'ನೀರು ನಿಂತುಹೋಗುವುದನ್ನು ತಪ್ಪಿಸಲು ಸರಿಯಾದ ಚರಂಡಿ ವ್ಯವಸ್ಥೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                            <SunIcon className="text-amber-500 mt-1" size={20} />
                            <div>
                              <h4 className="font-medium">
                                {language === 'english' 
                                  ? 'Intercropping' 
                                  : language === 'hindi' 
                                    ? 'अंतर-फसल' 
                                    : 'ಅಂತರಬೆಳೆ'}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {language === 'english' 
                                  ? 'Practice intercropping to maximize land use and reduce pest damage.' 
                                  : language === 'hindi' 
                                    ? 'भूमि उपयोग को अधिकतम करने और कीट क्षति को कम करने के लिए अंतर-फसल का अभ्यास करें।' 
                                    : 'ಭೂಮಿ ಬಳಕೆಯನ್ನು ಗರಿಷ್ಠಗೊಳಿಸಲು ಮತ್ತು ಕೀಟ ಹಾನಿಯನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಅಂತರಬೆಳೆಯನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ.'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                            <Seed className="text-green-500 mt-1" size={20} />
                            <div>
                              <h4 className="font-medium">
                                {language === 'english' 
                                  ? 'Seedling protection' 
                                  : language === 'hindi' 
                                    ? 'अंकुर संरक्षण' 
                                    : 'ಸಸಿ ರಕ್ಷಣೆ'}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {language === 'english' 
                                  ? 'Protect young seedlings from heavy rainfall with temporary shelters.' 
                                  : language === 'hindi' 
                                    ? 'अस्थायी आश्रयों के साथ युवा अंकुरों को भारी वर्षा से बचाएं।' 
                                    : 'ತಾತ್ಕಾಲಿಕ ಆಶ್ರಯಗಳೊಂದಿಗೆ ಯುವ ಸಸಿಗಳನ್ನು ಭಾರೀ ಮಳೆಯಿಂದ ರಕ್ಷಿಸಿ.'}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="rabi">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Card>
                        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
                          <CardTitle className="flex items-center text-lg">
                            <SunIcon className="mr-2 h-5 w-5 text-amber-500" />
                            {language === 'english' 
                              ? 'Rabi (Winter) Season' 
                              : language === 'hindi' 
                                ? 'रबी (सर्दी) मौसम' 
                                : 'ರಬಿ (ಚಳಿಗಾಲ) ಋತು'}
                          </CardTitle>
                          <CardDescription>
                            {language === 'english' 
                              ? 'October to March (Winter crops)' 
                              : language === 'hindi' 
                                ? 'अक्टूबर से मार्च (सर्दी की फसलें)' 
                                : 'ಅಕ್ಟೋಬರ್ ನಿಂದ ಮಾರ್ಚ್ (ಚಳಿಗಾಲದ ಬೆಳೆಗಳು)'}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-4">
                            {seasonalCrops.rabi.map((crop, index) => (
                              <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                                <h4 className="font-medium flex items-center">
                                  <Seed className="mr-2 h-4 w-4 text-green-600" />
                                  {crop.name}
                                </h4>
                                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                  <div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                      {language === 'english' 
                                        ? 'Planting: ' 
                                        : language === 'hindi' 
                                          ? 'रोपण: ' 
                                          : 'ನೆಡುವಿಕೆ: '}
                                      <span className="font-medium">{crop.plantingTime}</span>
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                      {language === 'english' 
                                        ? 'Harvest: ' 
                                        : language === 'hindi' 
                                          ? 'कटाई: ' 
                                          : 'ಕೊಯ್ಲು: '}
                                      <span className="font-medium">{crop.harvestTime}</span>
                                    </p>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  <Droplets className="inline h-4 w-4 text-blue-500 mr-1" />
                                  {language === 'english' 
                                    ? 'Irrigation: ' 
                                    : language === 'hindi' 
                                      ? 'सिंचाई: ' 
                                      : 'ನೀರಾವರಿ: '}
                                  <span className="font-medium">{crop.irrigation}</span>
                                </p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div>
                      <Card>
                        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
                          <CardTitle className="text-lg">
                            {language === 'english' 
                              ? 'Rabi Cultivation Tips' 
                              : language === 'hindi' 
                                ? 'रबी खेती के टिप्स' 
                                : 'ರಬಿ ಕೃಷಿ ಸಲಹೆಗಳು'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                          <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                            <Droplets className="text-blue-500 mt-1" size={20} />
                            <div>
                              <h4 className="font-medium">
                                {language === 'english' 
                                  ? 'Irrigation management' 
                                  : language === 'hindi' 
                                    ? 'सिंचाई प्रबंधन' 
                                    : 'ನೀರಾವರಿ ನಿರ್ವಹಣೆ'}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {language === 'english' 
                                  ? 'Plan proper irrigation schedules as rabi crops depend on irrigation.' 
                                  : language === 'hindi' 
                                    ? 'उचित सिंचाई कार्यक्रम की योजना बनाएं क्योंकि रबी फसलें सिंचाई पर निर्भर करती हैं।' 
                                    : 'ರಬಿ ಬೆಳೆಗಳು ನೀರಾವರಿಯ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರುವುದರಿಂದ ಸರಿಯಾದ ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿಗಳನ್ನು ಯೋಜಿಸಿ.'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                            <SunIcon className="text-amber-500 mt-1" size={20} />
                            <div>
                              <h4 className="font-medium">
                                {language === 'english' 
                                  ? 'Frost protection' 
                                  : language === 'hindi' 
                                    ? 'पाला संरक्षण' 
                                    : 'ಮಂಜುಗಡ್ಡೆ ರಕ್ಷಣೆ'}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {language === 'english' 
                                  ? 'Protect crops from frost damage with light irrigation or smoke.' 
                                  : language === 'hindi' 
                                    ? 'हल्की सिंचाई या धुएं के साथ फसलों को पाले के नुकसान से बचाएं।' 
                                    : 'ಹಗುರ ನೀರಾವರಿ ಅಥವಾ ಹೊಗೆಯೊಂದಿಗೆ ಬೆಳೆಗಳನ್ನು ಮಂಜುಗಡ್ಡೆ ಹಾನಿಯಿಂದ ರಕ್ಷಿಸಿ.'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                            <Seed className="text-green-500 mt-1" size={20} />
                            <div>
                              <h4 className="font-medium">
                                {language === 'english' 
                                  ? 'Seed treatment' 
                                  : language === 'hindi' 
                                    ? 'बीज उपचार' 
                                    : 'ಬೀಜ ಚಿಕಿತ್ಸೆ'}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {language === 'english' 
                                  ? 'Treat seeds with fungicides before planting to prevent diseases.' 
                                  : language === 'hindi' 
                                    ? 'रोगों को रोकने के लिए रोपाई से पहले बीजों को कवकनाशकों से उपचारित करें।' 
                                    : 'ರೋಗಗಳನ್ನು ತಡೆಯಲು ನೆಡುವ ಮೊದಲು ಬೀಜಗಳನ್ನು ಶಿಲೀಂಧ್ರನಾಶಕಗಳೊಂದಿಗೆ ಚಿಕಿತ್ಸೆ ಮಾಡಿ.'}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="zaid">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Card>
                        <CardHeader className="bg-amber-50 dark:bg-amber-900/20">
                          <CardTitle className="flex items-center text-lg">
                            <SunIcon className="mr-2 h-5 w-5 text-amber-500" />
                            {language === 'english' 
                              ? 'Zaid (Summer) Season' 
                              : language === 'hindi' 
                                ? 'जायद (गर्मी) मौसम' 
                                : 'ಜೈದ್ (ಬೇಸಿಗೆ) ಋತು'}
                          </CardTitle>
                          <CardDescription>
                            {language === 'english' 
                              ? 'March to June (Summer crops)' 
                              : language === 'hindi' 
                                ? 'मार्च से जून (गर्मी की फसलें)' 
                                : 'ಮಾರ್ಚ್ ನಿಂದ ಜೂನ್ (ಬೇಸಿಗೆ ಬೆಳೆಗಳು)'}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-4">
                            {seasonalCrops.zaid.map((crop, index) => (
                              <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                                <h4 className="font-medium flex items-center">
                                  <Seed className="mr-2 h-4 w-4 text-green-600" />
                                  {crop.name}
                                </h4>
                                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                  <div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                      {language === 'english' 
                                        ? 'Planting: ' 
                                        : language === 'hindi' 
                                          ? 'रोपण: ' 
                                          : 'ನೆಡುವಿಕೆ: '}
                                      <span className="font-medium">{crop.plantingTime}</span>
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                      {language === 'english' 
                                        ? 'Harvest: ' 
                                        : language === 'hindi' 
                                          ? 'कटाई: ' 
                                          : 'ಕೊಯ್ಲು: '}
                                      <span className="font-medium">{crop.harvestTime}</span>
                                    </p>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  <Droplets className="inline h-4 w-4 text-blue-500 mr-1" />
                                  {language === 'english' 
                                    ? 'Irrigation: ' 
                                    : language === 'hindi' 
                                      ? 'सिंचाई: ' 
                                      : 'ನೀರಾವರಿ: '}
                                  <span className="font-medium">{crop.irrigation}</span>
                                </p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div>
                      <Card>
                        <CardHeader className="bg-amber-50 dark:bg-amber-900/20">
                          <CardTitle className="text-lg">
                            {language === 'english' 
                              ? 'Zaid Cultivation Tips' 
                              : language === 'hindi' 
                                ? 'जायद खेती के टिप्स' 
                                : 'ಜೈದ್ ಕೃಷಿ ಸಲಹೆಗಳು'}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                          <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                            <Droplets className="text-blue-500 mt-1" size={20} />
                            <div>
                              <h4 className="font-medium">
                                {language === 'english' 
                                  ? 'Water conservation' 
                                  : language === 'hindi' 
                                    ? 'जल संरक्षण' 
                                    : 'ನೀರಿನ ಸಂರಕ್ಷಣೆ'}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {language === 'english' 
                                  ? 'Use drip irrigation and mulching to conserve water in hot season.' 
                                  : language === 'hindi' 
                                    ? 'गर्म मौसम में पानी बचाने के लिए ड्रिप सिंचाई और मल्चिंग का उपयोग करें।' 
                                    : 'ಬಿಸಿ ಋತುವಿನಲ್ಲಿ ನೀರನ್ನು ಸಂರಕ್ಷಿಸಲು ಹನಿ ನೀರಾವರಿ ಮತ್ತು ಮಲ್ಚಿಂಗ್ ಬಳಸಿ.'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                            <SunIcon className="text-amber-500 mt-1" size={20} />
                            <div>
                              <h4 className="font-medium">
                                {language === 'english' 
                                  ? 'Heat management' 
                                  : language === 'hindi' 
                                    ? 'गर्मी प्रबंधन' 
                                    : 'ಶಾಖ ನಿರ್ವಹಣೆ'}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {language === 'english' 
                                  ? 'Use shade nets or temporary structures to protect sensitive crops from extreme heat.' 
                                  : language === 'hindi' 
                                    ? 'अत्यधिक गर्मी से संवेदनशील फसलों की रक्षा के लिए शेड नेट या अस्थायी संरचनाओं का उपयोग करें।' 
                                    : 'ತೀವ್ರ ಶಾಖದಿಂದ ಸೂಕ್ಷ್ಮ ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಲು ನೆರಳು ಬಲೆಗಳು ಅಥವಾ ತಾತ್ಕಾಲಿಕ ರಚನೆಗಳನ್ನು ಬಳಸಿ.'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                            <Seed className="text-green-500 mt-1" size={20} />
                            <div>
                              <h4 className="font-medium">
                                {language === 'english' 
                                  ? 'Short-duration varieties' 
                                  : language === 'hindi' 
                                    ? 'अल्पावधि किस्में' 
                                    : 'ಅಲ್ಪಾವಧಿ ತಳಿಗಳು'}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {language === 'english' 
                                  ? 'Select short-duration crop varieties that mature quickly before monsoon.' 
                                  : language === 'hindi' 
                                    ? 'अल्पावधि फसल किस्मों का चयन करें जो मानसून से पहले जल्दी परिपक्व हो जाती हैं।' 
                                    : 'ಮುಂಗಾರು ಮುನ್ನ ಬೇಗನೇ ಪಕ್ವವಾಗುವ ಅಲ್ಪಾವಧಿ ಬೆಳೆ ತಳಿಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.'}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CropCalendar;
