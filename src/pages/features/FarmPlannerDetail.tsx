
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
        color="bg-green-100"
        iconColor="text-green-500"
        benefits={[
          "Optimize land usage",
          "Plan better crop rotations",
          "Make data-driven decisions",
          "Increase overall yield"
        ]}
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
