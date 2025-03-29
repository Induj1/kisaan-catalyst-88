
import React from 'react';
import FeatureDetail from '@/components/FeatureDetail';
import { MapPin } from 'lucide-react';

const FarmPlannerDetail = () => {
  return (
    <FeatureDetail
      title="GIS Farm Planner"
      description="Precise land mapping and planning for your crops"
      icon={MapPin}
      color="bg-green-50"
      iconColor="bg-green-500"
      benefits={[
        "Optimize crop placement based on soil type and sunlight exposure",
        "Plan irrigation systems for maximum efficiency",
        "Reduce water waste and improve yield through precise planning",
        "Track crop rotation history to maintain soil health"
      ]}
      features={[
        "Satellite imagery integration for accurate field mapping",
        "Soil type analysis and recommendations",
        "Seasonal planning calendar with notifications",
        "Water resource management tools",
        "Crop rotation recommendation system"
      ]}
      demoLink="/farm-planner"
    />
  );
};

export default FarmPlannerDetail;
