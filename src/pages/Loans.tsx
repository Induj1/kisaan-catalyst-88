
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import LoanApplicationForm from '@/components/LoanApplicationForm';
import LoanApplicationList from '@/components/LoanApplicationList';
import CreditTracker from '@/components/CreditTracker';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { InfoIcon, AlertTriangle, BadgeCheck, BanknoteIcon } from 'lucide-react';

const Loans = () => {
  const { user } = useAuth();
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [language, setLanguage] = useState<'english' | 'hindi' | 'kannada'>('hindi');
  const [creditScore, setCreditScore] = useState(650);
  const [refreshKey, setRefreshKey] = useState(0);

  const toggleContrast = () => {
    setIsHighContrast(!isHighContrast);
    document.documentElement.classList.toggle('high-contrast');
  };
  
  const handleProfileRefresh = () => {
    setRefreshKey(prev => prev + 1);
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
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              {language === 'english' 
                ? 'Agricultural Loans' 
                : language === 'hindi' 
                  ? 'कृषि ऋण' 
                  : 'ಕೃಷಿ ಸಾಲಗಳು'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'english' 
                ? 'Apply for and manage your farm loans' 
                : language === 'hindi' 
                  ? 'अपने कृषि ऋणों के लिए आवेदन करें और उनका प्रबंधन करें' 
                  : 'ನಿಮ್ಮ ಕೃಷಿ ಸಾಲಗಳಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="bg-green-50 dark:bg-green-900/20 border-b">
                  <div className="flex items-center">
                    <BanknoteIcon className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                    <CardTitle className="text-xl text-green-700 dark:text-green-400">
                      {language === 'english' 
                        ? 'Loan Eligibility' 
                        : language === 'hindi' 
                          ? 'ऋण पात्रता' 
                          : 'ಸಾಲ ಅರ್ಹತೆ'}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {language === 'english' 
                      ? 'Check your eligibility for agricultural loans' 
                      : language === 'hindi' 
                        ? 'कृषि ऋणों के लिए अपनी पात्रता जांचें' 
                        : 'ಕೃಷಿ ಸಾಲಗಳಿಗೆ ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <CreditTracker 
                    creditScore={creditScore}
                    onRefresh={handleProfileRefresh}
                  />
                  
                  <div className="mt-6">
                    <Alert variant={creditScore >= 600 ? "default" : "destructive"}>
                      {creditScore >= 600 ? (
                        <BadgeCheck className="h-4 w-4" />
                      ) : (
                        <AlertTriangle className="h-4 w-4" />
                      )}
                      <AlertTitle>
                        {creditScore >= 600 ? (
                          language === 'english' 
                            ? 'You are eligible for loans' 
                            : language === 'hindi' 
                              ? 'आप ऋण के लिए पात्र हैं' 
                              : 'ನೀವು ಸಾಲಗಳಿಗೆ ಅರ್ಹರಾಗಿದ್ದೀರಿ'
                        ) : (
                          language === 'english' 
                            ? 'Limited loan eligibility' 
                            : language === 'hindi' 
                              ? 'सीमित ऋण पात्रता' 
                              : 'ಸೀಮಿತ ಸಾಲ ಅರ್ಹತೆ'
                        )}
                      </AlertTitle>
                      <AlertDescription>
                        {creditScore >= 600 ? (
                          language === 'english' 
                            ? 'With your current credit score, you can apply for agricultural loans up to ₹50,000.' 
                            : language === 'hindi' 
                              ? 'आपके वर्तमान क्रेडिट स्कोर के साथ, आप ₹50,000 तक के कृषि ऋणों के लिए आवेदन कर सकते हैं।' 
                              : 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್‌ನೊಂದಿಗೆ, ನೀವು ₹50,000 ವರೆಗೆ ಕೃಷಿ ಸಾಲಗಳಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು.'
                        ) : (
                          language === 'english' 
                            ? 'Your credit score is below our threshold. You can only apply for small loans up to ₹10,000.' 
                            : language === 'hindi' 
                              ? 'आपका क्रेडिट स्कोर हमारी सीमा से कम है। आप केवल ₹10,000 तक के छोटे ऋणों के लिए आवेदन कर सकते हैं।' 
                              : 'ನಿಮ್ಮ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ನಮ್ಮ ಮಿತಿಗಿಂತ ಕಡಿಮೆಯಿದೆ. ನೀವು ₹10,000 ವರೆಗೆ ಮಾತ್ರ ಸಣ್ಣ ಸಾಲಗಳಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು.'
                        )}
                      </AlertDescription>
                    </Alert>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <div className="flex items-start gap-3">
                      <InfoIcon className="text-blue-600 mt-1" size={20} />
                      <div>
                        <h4 className="font-medium text-blue-700 dark:text-blue-400">
                          {language === 'english' 
                            ? 'How to improve your credit score' 
                            : language === 'hindi' 
                              ? 'अपना क्रेडिट स्कोर कैसे सुधारें' 
                              : 'ನಿಮ್ಮ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಅನ್ನು ಹೇಗೆ ಸುಧಾರಿಸುವುದು'}
                        </h4>
                        <ul className="list-disc list-inside text-sm space-y-1 mt-2 text-blue-800 dark:text-blue-300">
                          <li>
                            {language === 'english' 
                              ? 'Complete your profile with valid information' 
                              : language === 'hindi' 
                                ? 'वैध जानकारी के साथ अपनी प्रोफ़ाइल पूरी करें' 
                                : 'ಮಾನ್ಯ ಮಾಹಿತಿಯೊಂದಿಗೆ ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಅನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ'}
                          </li>
                          <li>
                            {language === 'english' 
                              ? 'Make marketplace transactions on the platform' 
                              : language === 'hindi' 
                                ? 'प्लेटफॉर्म पर मार्केटप्लेस लेनदेन करें' 
                                : 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ನಲ್ಲಿ ಮಾರುಕಟ್ಟೆ ವಹಿವಾಟುಗಳನ್ನು ಮಾಡಿ'}
                          </li>
                          <li>
                            {language === 'english' 
                              ? 'Repay existing loans on time' 
                              : language === 'hindi' 
                                ? 'मौजूदा ऋणों का समय पर भुगतान करें' 
                                : 'ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಸಾಲಗಳನ್ನು ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಮರುಪಾವತಿಸಿ'}
                          </li>
                          <li>
                            {language === 'english' 
                              ? 'Maintain regular farming activity records' 
                              : language === 'hindi' 
                                ? 'नियमित कृषि गतिविधि रिकॉर्ड बनाए रखें' 
                                : 'ನಿಯಮಿತ ಕೃಷಿ ಚಟುವಟಿಕೆ ದಾಖಲೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ'}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="h-full">
                <CardHeader className="bg-primary/10 border-b">
                  <CardTitle>
                    {language === 'english' 
                      ? 'Loan Schemes' 
                      : language === 'hindi' 
                        ? 'ऋण योजनाएँ' 
                        : 'ಸಾಲ ಯೋಜನೆಗಳು'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'english' 
                      ? 'Available loan options' 
                      : language === 'hindi' 
                        ? 'उपलब्ध ऋण विकल्प' 
                        : 'ಲಭ್ಯವಿರುವ ಸಾಲದ ಆಯ್ಕೆಗಳು'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-primary">
                        {language === 'english' 
                          ? 'Crop Loan' 
                          : language === 'hindi' 
                            ? 'फसल ऋण' 
                            : 'ಬೆಳೆ ಸಾಲ'}
                      </h4>
                      <p className="text-sm mt-1">
                        {language === 'english' 
                          ? 'Short-term loan for seasonal crops' 
                          : language === 'hindi' 
                            ? 'मौसमी फसलों के लिए अल्पकालिक ऋण' 
                            : 'ಋತುವಿನ ಬೆಳೆಗಳಿಗೆ ಅಲ್ಪಾವಧಿ ಸಾಲ'}
                      </p>
                      <div className="flex justify-between mt-2 text-sm">
                        <span>
                          {language === 'english' 
                            ? 'Interest Rate:' 
                            : language === 'hindi' 
                              ? 'ब्याज दर:' 
                              : 'ಬಡ್ಡಿ ದರ:'}
                        </span>
                        <span className="font-semibold">4%</span>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-primary">
                        {language === 'english' 
                          ? 'Equipment Loan' 
                          : language === 'hindi' 
                            ? 'उपकरण ऋण' 
                            : 'ಉಪಕರಣ ಸಾಲ'}
                      </h4>
                      <p className="text-sm mt-1">
                        {language === 'english' 
                          ? 'For purchasing farm equipment' 
                          : language === 'hindi' 
                            ? 'कृषि उपकरण खरीदने के लिए' 
                            : 'ಕೃಷಿ ಉಪಕರಣಗಳನ್ನು ಖರೀದಿಸಲು'}
                      </p>
                      <div className="flex justify-between mt-2 text-sm">
                        <span>
                          {language === 'english' 
                            ? 'Interest Rate:' 
                            : language === 'hindi' 
                              ? 'ब्याज दर:' 
                              : 'ಬಡ್ಡಿ ದರ:'}
                        </span>
                        <span className="font-semibold">6%</span>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-primary">
                        {language === 'english' 
                          ? 'Land Development Loan' 
                          : language === 'hindi' 
                            ? 'भूमि विकास ऋण' 
                            : 'ಭೂಮಿ ಅಭಿವೃದ್ಧಿ ಸಾಲ'}
                      </h4>
                      <p className="text-sm mt-1">
                        {language === 'english' 
                          ? 'For irrigation and land improvements' 
                          : language === 'hindi' 
                            ? 'सिंचाई और भूमि सुधार के लिए' 
                            : 'ನೀರಾವರಿ ಮತ್ತು ಭೂಮಿ ಸುಧಾರಣೆಗಳಿಗಾಗಿ'}
                      </p>
                      <div className="flex justify-between mt-2 text-sm">
                        <span>
                          {language === 'english' 
                            ? 'Interest Rate:' 
                            : language === 'hindi' 
                              ? 'ब्याज दर:' 
                              : 'ಬಡ್ಡಿ ದರ:'}
                        </span>
                        <span className="font-semibold">5.5%</span>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md bg-white dark:bg-gray-800">
                      <h4 className="font-medium text-primary">
                        {language === 'english' 
                          ? 'Micro Loan' 
                          : language === 'hindi' 
                            ? 'माइक्रो लोन' 
                            : 'ಸಣ್ಣ ಸಾಲ'}
                      </h4>
                      <p className="text-sm mt-1">
                        {language === 'english' 
                          ? 'Small loans for immediate needs' 
                          : language === 'hindi' 
                            ? 'तत्काल जरूरतों के लिए छोटे ऋण' 
                            : 'ತಕ್ಷಣದ ಅಗತ್ಯಗಳಿಗೆ ಸಣ್ಣ ಸಾಲಗಳು'}
                      </p>
                      <div className="flex justify-between mt-2 text-sm">
                        <span>
                          {language === 'english' 
                            ? 'Interest Rate:' 
                            : language === 'hindi' 
                              ? 'ब्याज दर:' 
                              : 'ಬಡ್ಡಿ ದರ:'}
                        </span>
                        <span className="font-semibold">3%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="apply" className="mb-6">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="apply">
                {language === 'english' 
                  ? 'Apply for Loan' 
                  : language === 'hindi' 
                    ? 'ऋण के लिए आवेदन करें' 
                    : 'ಸಾಲಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ'}
              </TabsTrigger>
              <TabsTrigger value="history">
                {language === 'english' 
                  ? 'Loan History' 
                  : language === 'hindi' 
                    ? 'ऋण इतिहास' 
                    : 'ಸಾಲದ ಇತಿಹಾಸ'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="apply">
              <LoanApplicationForm 
                userId={user?.id} 
                creditScore={creditScore} 
              />
            </TabsContent>
            
            <TabsContent value="history">
              <LoanApplicationList 
                userId={user?.id} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Loans;
