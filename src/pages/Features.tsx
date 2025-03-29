
import React from 'react';
import PageLayout from '@/components/PageLayout';
import FeatureCard from '@/components/FeatureCard';
import { MapPin, CreditCard, Cloud, MessageSquare, Calculator } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const { translate } = useLanguage();
  const navigate = useNavigate();

  const features = [
    {
      title: translate('farmPlanner'),
      description: translate('planFarmActivities'),
      icon: MapPin,
      color: "bg-green-50",
      buttonText: translate('learnMore'),
      route: "/features/farm-planner"
    },
    {
      title: translate('marketplace'),
      description: translate('buyAndSellProducts'),
      icon: CreditCard,
      color: "bg-blue-50",
      buttonText: translate('learnMore'),
      route: "/features/marketplace"
    },
    {
      title: translate('weather'),
      description: translate('checkForecasts'),
      icon: Cloud,
      color: "bg-yellow-50",
      buttonText: translate('viewUpdates'),
      route: "/features/weather"
    },
    {
      title: translate('askExpert'),
      description: translate('getAIAdvice'),
      icon: MessageSquare,
      color: "bg-purple-50",
      buttonText: translate('askQuestions'),
      route: "/features/ask-expert"
    },
    {
      title: translate('government'),
      description: translate('findSchemes'),
      icon: Calculator,
      color: "bg-red-50",
      buttonText: translate('findSchemes'),
      route: "/features/government-schemes"
    },
  ];

  return (
    <PageLayout>
      <section className="bg-gradient-to-b from-primary/10 to-transparent py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              KisaanMitra {translate('features')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {translate('personalizedAssistant')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                color={feature.color}
                buttonText={feature.buttonText}
                onClick={() => navigate(feature.route)}
              />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              {translate('dashboard')}
            </h2>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Simple and Intuitive
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span>
                          Available in multiple languages
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span>
                          Simple interface with voice assistance
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span>
                          Optimized for areas with low internet connectivity
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Works on Multiple Devices
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span>
                          Use on mobile, tablet, and computer
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span>
                          Basic features in offline mode
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">✓</span>
                        <span>
                          SMS alerts for use with little or no internet
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Features;
