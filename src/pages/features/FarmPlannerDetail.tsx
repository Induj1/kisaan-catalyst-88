
import React from 'react';
import PageLayout from '@/components/PageLayout';
import FeatureDetail from '@/components/FeatureDetail';
import { MapPin } from 'lucide-react';

const FarmPlannerDetail = () => {
  return (
    <PageLayout>
      <FeatureDetail
        title="GIS Farm Planner"
        description="Precise land mapping and planning for your crops"
        icon={MapPin}
        features={[
          "Interactive field mapping",
          "Crop rotation planning",
          "Soil analysis integration",
          "Custom plot management"
        ]}
      />
    </PageLayout>
  );
};

export default FarmPlannerDetail;
