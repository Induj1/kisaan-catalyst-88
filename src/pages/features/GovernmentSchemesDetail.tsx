
import React from 'react';
import PageLayout from '@/components/PageLayout';
import FeatureDetail from '@/components/FeatureDetail';
import { Calculator } from 'lucide-react';

const GovernmentSchemesDetail = () => {
  return (
    <PageLayout>
      <FeatureDetail
        title="Subsidy Finder"
        description="Discover and apply for government schemes for your needs"
        icon={Calculator}
        features={[
          "Eligibility checker",
          "Application assistance",
          "Document management",
          "Status tracking"
        ]}
      />
    </PageLayout>
  );
};

export default GovernmentSchemesDetail;
