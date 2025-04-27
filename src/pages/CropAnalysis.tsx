
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import CropAnalysisForm from "@/components/CropAnalysisForm";
import CropAnalysisReport from "@/components/CropAnalysisReport";

const CropAnalysis: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isReportPage = location.pathname.includes("/report");
  const reportId = searchParams.get('id');

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {isReportPage ? (
            <CropAnalysisReport />
          ) : (
            <CropAnalysisForm />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default CropAnalysis;
