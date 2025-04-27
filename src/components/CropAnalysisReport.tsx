
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardWidget from "@/components/DashboardWidget";
import AlertMessage from "@/components/AlertMessage";
import { ArrowLeft, CheckCircle, XCircle, Info, Download, Printer } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportSection {
  title: string;
  content: string[];
  type: "positive" | "improvement" | "suggestion";
}

interface CropReportProps {
  cropType?: string;
}

const CropAnalysisReport: React.FC<CropReportProps> = ({ cropType = "Wheat" }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<{
    cropType: string;
    sections: ReportSection[];
    overallScore: number;
    date: string;
  }>({
    cropType: cropType,
    sections: [],
    overallScore: 0,
    date: new Date().toLocaleDateString(),
  });

  useEffect(() => {
    // Simulate API call to get report data
    const timer = setTimeout(() => {
      // This would be replaced with actual API data in production
      setReportData({
        cropType: cropType,
        sections: [
          {
            title: "What You Did Well",
            content: [
              "Your choice of organic cultivation methods is excellent for soil health.",
              "Using drip irrigation has saved water while providing consistent moisture to plants.",
              "Your seed selection from a certified source ensured good germination rates.",
            ],
            type: "positive",
          },
          {
            title: "Areas for Improvement",
            content: [
              "The timing of pesticide application could be optimized for better results.",
              "Consider increasing spacing between plants for better air circulation.",
              "Soil testing before sowing would help determine exact nutrient requirements.",
            ],
            type: "improvement",
          },
          {
            title: "Recommendations",
            content: [
              "Try crop rotation next season to improve soil fertility and reduce pest pressure.",
              "Consider using neem-based organic pesticides to control common pests.",
              "Implement mulching to conserve soil moisture and suppress weed growth.",
              "Install basic weather monitoring tools for more precise irrigation scheduling.",
            ],
            type: "suggestion",
          },
        ],
        overallScore: 78,
        date: new Date().toLocaleDateString(),
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [cropType]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardWidget
      title="Crop Health Analysis Report"
      description={`Analysis for your ${reportData.cropType} cultivation`}
      icon={Info}
      iconColor="text-blue-600"
      iconBgColor="bg-blue-100"
      actionLabel="Back to Form"
      onActionClick={() => navigate("/crop-analysis")}
      className="print:shadow-none print:border-none"
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Analyzing your cultivation data...</p>
        </div>
      ) : (
        <>
          <div className="print:hidden flex justify-between items-center mb-6">
            <div className="flex items-center">
              <span className="text-lg font-medium mr-2">Overall Health Score:</span>
              <span className={cn("text-3xl font-bold", getScoreColor(reportData.overallScore))}>
                {reportData.overallScore}/100
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" /> Print
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
            </div>
          </div>

          <AlertMessage
            title="Report Generated Successfully"
            message="This analysis is based on the information you provided and best practices for your region."
            type="success"
            className="print:hidden mb-6"
          />

          <div className="space-y-8">
            {reportData.sections.map((section, index) => {
              const SectionIcon = section.type === "positive" ? CheckCircle : section.type === "improvement" ? XCircle : Info;
              const sectionColor = section.type === "positive" ? "text-green-600 bg-green-50" : section.type === "improvement" ? "text-red-600 bg-red-50" : "text-blue-600 bg-blue-50";

              return (
                <Card key={index} className="border-l-4 shadow-md" style={{ borderLeftColor: section.type === "positive" ? "#16a34a" : section.type === "improvement" ? "#dc2626" : "#2563eb" }}>
                  <CardHeader className={cn("pb-2", section.type === "positive" ? "bg-green-50" : section.type === "improvement" ? "bg-red-50" : "bg-blue-50")}>
                    <div className="flex items-center gap-2">
                      <SectionIcon className={section.type === "positive" ? "text-green-600" : section.type === "improvement" ? "text-red-600" : "text-blue-600"} />
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      {section.content.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="block mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold mb-4">Resources & Next Steps</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Training Videos</CardTitle>
                  <CardDescription>Watch expert guidance on implementing these suggestions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Access Video Library</Button>
                </CardContent>
              </Card>
              <Card className="bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Local Resources</CardTitle>
                  <CardDescription>Find suppliers and experts in your area</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">View Local Resources</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button onClick={() => navigate("/crop-analysis")} className="w-full max-w-sm">
              <ArrowLeft size={16} className="mr-2" /> Submit Another Analysis
            </Button>
          </div>

          <div className="mt-8 text-sm text-gray-500 text-center print:mt-16">
            <p>Report generated on {reportData.date}</p>
            <p>KisaanMitra Crop Analysis System</p>
          </div>
        </>
      )}
    </DashboardWidget>
  );
};

export default CropAnalysisReport;
