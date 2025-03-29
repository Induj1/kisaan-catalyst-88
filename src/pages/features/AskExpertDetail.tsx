
import React from 'react';
import FeatureDetail from '@/components/FeatureDetail';
import { MessageSquare } from 'lucide-react';

const AskExpertDetail = () => {
  return (
    <FeatureDetail
      title="AI Advisor"
      description="AI-powered chatbot for precise crop advice"
      icon={MessageSquare}
      color="bg-purple-50"
      iconColor="bg-purple-500"
      benefits={[
        "24/7 access to agricultural expertise without internet connection",
        "Personalized recommendations based on your specific farm conditions",
        "Rapid diagnosis of crop diseases and pest issues",
        "Step-by-step guidance for implementing modern farming techniques"
      ]}
      features={[
        "Voice-enabled interaction in multiple regional languages",
        "Visual recognition of plant diseases using your camera",
        "Offline capability for use in remote areas",
        "Knowledge base built on agricultural research and local farming practices",
        "Connection to live experts for complex issues"
      ]}
      demoLink="/ask-expert"
    />
  );
};

export default AskExpertDetail;
