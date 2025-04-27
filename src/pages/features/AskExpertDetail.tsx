
import React from 'react';
import PageLayout from '@/components/PageLayout';
import FeatureDetail from '@/components/FeatureDetail';
import { MessageSquare } from 'lucide-react';

const AskExpertDetail = () => {
  return (
    <PageLayout>
      <FeatureDetail
        title="Ask an Expert"
        description="AI-powered chatbot & expert network for crop advice"
        icon={MessageSquare}
        features={[
          "24/7 AI assistance",
          "Connect with agricultural experts",
          "Community knowledge sharing",
          "Personalized recommendations"
        ]}
      />
    </PageLayout>
  );
};

export default AskExpertDetail;
