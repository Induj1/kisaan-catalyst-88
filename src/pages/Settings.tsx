
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import UserSettings from '@/components/UserSettings';
import { useAuth } from '@/contexts/AuthContext';
import { Settings as SettingsIcon, Bell, Languages, Eye, Database, Phone, LogOut } from 'lucide-react';

const Settings = () => {
  const { user, signOut } = useAuth();
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [language, setLanguage] = useState<'english' | 'hindi' | 'kannada'>('hindi');
  const [notifications, setNotifications] = useState({
    weather: true,
    market: true,
    loans: false,
    system: true,
  });
  const [textSize, setTextSize] = useState(2);
  const [offlineMode, setOfflineMode] = useState(false);

  const toggleContrast = () => {
    setIsHighContrast(!isHighContrast);
    document.documentElement.classList.toggle('high-contrast');
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
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <SettingsIcon className="h-6 w-6" />
              {language === 'english' 
                ? 'Settings' 
                : language === 'hindi' 
                  ? 'सेटिंग्स' 
                  : 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'english' 
                ? 'Manage your app preferences and account settings' 
                : language === 'hindi' 
                  ? 'अपनी ऐप प्राथमिकताएँ और खाता सेटिंग्स प्रबंधित करें' 
                  : 'ನಿಮ್ಮ ಅಪ್ಲಿಕೇಶನ್ ಆದ್ಯತೆಗಳು ಮತ್ತು ಖಾತೆ ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ'}
            </p>
          </div>
          
          <Tabs defaultValue="account">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="account">
                {language === 'english' 
                  ? 'Account' 
                  : language === 'hindi' 
                    ? 'खाता' 
                    : 'ಖಾತೆ'}
              </TabsTrigger>
              <TabsTrigger value="appearance">
                {language === 'english' 
                  ? 'Appearance' 
                  : language === 'hindi' 
                    ? 'उपस्थिति' 
                    : 'ರೂಪ'}
              </TabsTrigger>
              <TabsTrigger value="notifications">
                {language === 'english' 
                  ? 'Notifications' 
                  : language === 'hindi' 
                    ? 'सूचनाएँ' 
                    : 'ಅಧಿಸೂಚನೆಗಳು'}
              </TabsTrigger>
              <TabsTrigger value="advanced">
                {language === 'english' 
                  ? 'Advanced' 
                  : language === 'hindi' 
                    ? 'उन्नत' 
                    : 'ಸುಧಾರಿತ'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'english' 
                        ? 'Profile Settings' 
                        : language === 'hindi' 
                          ? 'प्रोफ़ाइल सेटिंग्स' 
                          : 'ಪ್ರೊಫೈಲ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'english' 
                        ? 'Manage your account information' 
                        : language === 'hindi' 
                          ? 'अपनी खाता जानकारी प्रबंधित करें' 
                          : 'ನಿಮ್ಮ ಖಾತೆ ಮಾಹಿತಿಯನ್ನು ನಿರ್ವಹಿಸಿ'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserSettings />
                    
                    <div className="mt-6 pt-6 border-t">
                      <Button 
                        variant="destructive" 
                        className="w-full sm:w-auto flex items-center gap-2"
                        onClick={() => signOut && signOut()}
                      >
                        <LogOut size={16} />
                        {language === 'english' 
                          ? 'Sign Out' 
                          : language === 'hindi' 
                            ? 'साइन आउट' 
                            : 'ಸೈನ್ ಔಟ್'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="appearance">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      {language === 'english' 
                        ? 'Display Settings' 
                        : language === 'hindi' 
                          ? 'प्रदर्शन सेटिंग्स' 
                          : 'ಪ್ರದರ್ಶನ ಸೆಟ್ಟಿಂಗ್‌ಗಳು'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">
                            {language === 'english' 
                              ? 'High Contrast Mode' 
                              : language === 'hindi' 
                                ? 'उच्च कंट्रास्ट मोड' 
                                : 'ಹೆಚ್ಚಿನ ಕಾಂಟ್ರಾಸ್ಟ್ ಮೋಡ್'}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {language === 'english' 
                              ? 'Enable high contrast for better visibility' 
                              : language === 'hindi' 
                                ? 'बेहतर दृश्यता के लिए उच्च कंट्रास्ट सक्षम करें' 
                                : 'ಉತ್ತಮ ದೃಶ್ಯತೆಗಾಗಿ ಹೆಚ್ಚಿನ ಕಾಂಟ್ರಾಸ್ಟ್ ಅನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ'}
                          </p>
                        </div>
                        <Switch
                          checked={isHighContrast}
                          onCheckedChange={(checked) => {
                            setIsHighContrast(checked);
                            toggleContrast();
                          }}
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="textSize">
                            {language === 'english' 
                              ? 'Text Size' 
                              : language === 'hindi' 
                                ? 'टेक्स्ट का आकार' 
                                : 'ಪಠ್ಯ ಗಾತ್ರ'}
                          </Label>
                          <span className="text-sm">
                            {textSize === 1 
                              ? (language === 'english' ? 'Small' : language === 'hindi' ? 'छोटा' : 'ಚಿಕ್ಕದು') 
                              : textSize === 2 
                                ? (language === 'english' ? 'Medium' : language === 'hindi' ? 'मध्यम' : 'ಮಧ್ಯಮ') 
                                : (language === 'english' ? 'Large' : language === 'hindi' ? 'बड़ा' : 'ದೊಡ್ಡದು')}
                          </span>
                        </div>
                        <Slider
                          id="textSize"
                          min={1}
                          max={3}
                          step={1}
                          value={[textSize]}
                          onValueChange={(value) => setTextSize(value[0])}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">
                            {language === 'english' 
                              ? 'Language' 
                              : language === 'hindi' 
                                ? 'भाषा' 
                                : 'ಭಾಷೆ'}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {language === 'english' 
                              ? 'Choose your preferred language' 
                              : language === 'hindi' 
                                ? 'अपनी पसंदीदा भाषा चुनें' 
                                : 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ'}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant={language === 'english' ? 'default' : 'outline'}
                            onClick={() => setLanguage('english')}
                            className="flex items-center gap-2"
                          >
                            <Languages size={16} />
                            English
                          </Button>
                          <Button
                            variant={language === 'hindi' ? 'default' : 'outline'}
                            onClick={() => setLanguage('hindi')}
                            className="flex items-center gap-2"
                          >
                            <Languages size={16} />
                            हिन्दी
                          </Button>
                          <Button
                            variant={language === 'kannada' ? 'default' : 'outline'}
                            onClick={() => setLanguage('kannada')}
                            className="flex items-center gap-2"
                          >
                            <Languages size={16} />
                            ಕನ್ನಡ
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      {language === 'english' 
                        ? 'Notification Preferences' 
                        : language === 'hindi' 
                          ? 'सूचना प्राथमिकताएँ' 
                          : 'ಅಧಿಸೂಚನೆ ಆದ್ಯತೆಗಳು'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div className="space-y-0.5">
                          <Label htmlFor="weather-notifications">
                            {language === 'english' 
                              ? 'Weather Alerts' 
                              : language === 'hindi' 
                                ? 'मौसम अलर्ट' 
                                : 'ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು'}
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {language === 'english' 
                              ? 'Receive alerts about weather changes' 
                              : language === 'hindi' 
                                ? 'मौसम परिवर्तनों के बारे में अलर्ट प्राप्त करें' 
                                : 'ಹವಾಮಾನ ಬದಲಾವಣೆಗಳ ಬಗ್ಗೆ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಸ್ವೀಕರಿಸಿ'}
                          </p>
                        </div>
                        <Switch
                          id="weather-notifications"
                          checked={notifications.weather}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, weather: checked})
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-t">
                        <div className="space-y-0.5">
                          <Label htmlFor="market-notifications">
                            {language === 'english' 
                              ? 'Market Price Updates' 
                              : language === 'hindi' 
                                ? 'बाजार मूल्य अपडेट' 
                                : 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಅಪ್ಡೇಟ್‌ಗಳು'}
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {language === 'english' 
                              ? 'Get notified about significant price changes' 
                              : language === 'hindi' 
                                ? 'महत्वपूर्ण मूल्य परिवर्तनों के बारे में सूचित किया जाए' 
                                : 'ಗಮನಾರ್ಹ ಬೆಲೆ ಬದಲಾವಣೆಗಳ ಬಗ್ಗೆ ಸೂಚನೆ ಪಡೆಯಿರಿ'}
                          </p>
                        </div>
                        <Switch
                          id="market-notifications"
                          checked={notifications.market}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, market: checked})
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-t">
                        <div className="space-y-0.5">
                          <Label htmlFor="loan-notifications">
                            {language === 'english' 
                              ? 'Loan Updates' 
                              : language === 'hindi' 
                                ? 'ऋण अपडेट' 
                                : 'ಸಾಲದ ಅಪ್ಡೇಟ್‌ಗಳು'}
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {language === 'english' 
                              ? 'Receive notifications about loan applications' 
                              : language === 'hindi' 
                                ? 'ऋण आवेदनों के बारे में सूचनाएं प्राप्त करें' 
                                : 'ಸಾಲದ ಅರ್ಜಿಗಳ ಬಗ್ಗೆ ಅಧಿಸೂಚನೆಗಳನ್ನು ಪಡೆಯಿರಿ'}
                          </p>
                        </div>
                        <Switch
                          id="loan-notifications"
                          checked={notifications.loans}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, loans: checked})
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between py-2 border-t">
                        <div className="space-y-0.5">
                          <Label htmlFor="system-notifications">
                            {language === 'english' 
                              ? 'System Notifications' 
                              : language === 'hindi' 
                                ? 'सिस्टम सूचनाएं' 
                                : 'ಸಿಸ್ಟಮ್ ಅಧಿಸೂಚನೆಗಳು'}
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {language === 'english' 
                              ? 'Updates about the app and important announcements' 
                              : language === 'hindi' 
                                ? 'ऐप और महत्वपूर्ण घोषणाओं के बारे में अपडेट' 
                                : 'ಅಪ್ಲಿಕೇಶನ್ ಮತ್ತು ಮಹತ್ವದ ಪ್ರಕಟಣೆಗಳ ಬಗ್ಗೆ ಅಪ್ಡೇಟ್‌ಗಳು'}
                          </p>
                        </div>
                        <Switch
                          id="system-notifications"
                          checked={notifications.system}
                          onCheckedChange={(checked) => 
                            setNotifications({...notifications, system: checked})
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      {language === 'english' 
                        ? 'Data & Storage' 
                        : language === 'hindi' 
                          ? 'डेटा और स्टोरेज' 
                          : 'ಡೇಟಾ ಮತ್ತು ಸಂಗ್ರಹಣೆ'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div className="space-y-0.5">
                          <Label htmlFor="offline-mode">
                            {language === 'english' 
                              ? 'Offline Mode' 
                              : language === 'hindi' 
                                ? 'ऑफलाइन मोड' 
                                : 'ಆಫ್‌ಲೈನ್ ಮೋಡ್'}
                          </Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {language === 'english' 
                              ? 'Save data for offline use (uses more storage)' 
                              : language === 'hindi' 
                                ? 'ऑफलाइन उपयोग के लिए डेटा सहेजें (अधिक स्टोरेज का उपयोग करता है)' 
                                : 'ಆಫ್‌ಲೈನ್ ಬಳಕೆಗಾಗಿ ಡೇಟಾವನ್ನು ಉಳಿಸಿ (ಹೆಚ್ಚಿನ ಸಂಗ್ರಹಣೆಯನ್ನು ಬಳಸುತ್ತದೆ)'}
                          </p>
                        </div>
                        <Switch
                          id="offline-mode"
                          checked={offlineMode}
                          onCheckedChange={setOfflineMode}
                        />
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Button variant="outline" className="w-full">
                          {language === 'english' 
                            ? 'Clear App Cache' 
                            : language === 'hindi' 
                              ? 'ऐप कैश साफ़ करें' 
                              : 'ಅಪ್ಲಿಕೇಶನ್ ಕ್ಯಾಶೆಯನ್ನು ತೆರವುಗೊಳಿಸಿ'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      {language === 'english' 
                        ? 'Device Settings' 
                        : language === 'hindi' 
                          ? 'डिवाइस सेटिंग्स' 
                          : 'ಸಾಧನ ಸೆಟ್ಟಿಂಗ್‌ಗಳು'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full">
                        {language === 'english' 
                          ? 'Connect to Bluetooth Device' 
                          : language === 'hindi' 
                            ? 'ब्लूटूथ डिवाइस से कनेक्ट करें' 
                            : 'ಬ್ಲೂಟೂತ್ ಸಾಧನಕ್ಕೆ ಸಂಪರ್ಕಿಸಿ'}
                      </Button>
                      
                      <Button variant="outline" className="w-full">
                        {language === 'english' 
                          ? 'Configure Location Services' 
                          : language === 'hindi' 
                            ? 'स्थान सेवाएँ कॉन्फ़िगर करें' 
                            : 'ಸ್ಥಳ ಸೇವೆಗಳನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
