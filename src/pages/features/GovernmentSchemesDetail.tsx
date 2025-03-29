
import React from 'react';
import FeatureDetail from '@/components/FeatureDetail';
import { Calculator } from 'lucide-react';

const GovernmentSchemesDetail = () => {
  return (
    <FeatureDetail
      title="Subsidy Finder"
      description="Discover government schemes for your state and crop"
      icon={Calculator}
      color="bg-red-50"
      iconColor="bg-red-500"
      benefits={[
        "Find relevant government subsidies and programs for your region",
        "Simplify complex application processes with step-by-step guidance",
        "Calculate potential benefits before applying",
        "Stay updated on new schemes and application deadlines"
      ]}
      features={[
        "Comprehensive database of central and state agricultural schemes",
        "Eligibility checker based on your farm profile",
        "Document preparation assistance and checklists",
        "Application tracking system",
        "Notification system for upcoming deadlines and new programs"
      ]}
      demoLink="/government"
    />
  );
};

export default GovernmentSchemesDetail;
