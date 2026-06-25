import { compareService, type CompareMetrics } from './compareService';

export interface ReportData {
  sessionId: string;
  generatedAt: string;
  user: {
    id: string;
    profileCategory: string;
    photo: string | null;
  };
  scores: {
    overallWellnessIndex: number;
    beautyScore: number;
    skinScore: number;
    transformationScore: number;
    confidenceScore: number;
  };
  faceAnalysis: {
    faceShape: string;
    symmetry: number;
    proportions: string;
    recommendations: string[];
  };
  skinReport: {
    hydration: number;
    pigmentation: number;
    acne: number;
    elasticity: number;
    uvSensitivity: number;
  };
  hairAnalysis: {
    topStyle: string;
    suitability: number;
    concerns: string[];
    styling: string[];
  };
  transformation: {
    beforeImage: string | null;
    afterImage: string | null;
    metrics: CompareMetrics | null;
  };
  actionPlan: {
    morning: string[];
    night: string[];
    weekly: string[];
    avoid: string[];
  };
  concierge: {
    aiSummary: string;
    salonRecommendation: string;
    nextActions: string[];
  };
}

class ReportService {
  public generateReportData(): ReportData {
    // Attempt to pull from compareService (only one persisting to localStorage currently)
    const compareData = compareService.getSavedResults();

    // Calculate Scores
    const baseBeauty = compareData ? 85 + (compareData.metrics.overall.beautyScoreDelta) : 88;
    const skinScore = compareData ? 80 + (compareData.metrics.skin.glow * 0.2) : 84;
    const transformScore = compareData ? compareData.metrics.overall.improvementPercentage : 75;
    const confidenceScore = compareData ? compareData.metrics.facial.confidenceScore : 90;
    
    // Overall Wellness Index
    const overallWellnessIndex = Math.round((baseBeauty * 0.3) + (skinScore * 0.3) + (transformScore * 0.2) + (confidenceScore * 0.2));

    return {
      sessionId: `PB-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      generatedAt: new Date().toLocaleString(),
      user: {
        id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
        profileCategory: overallWellnessIndex > 90 ? "Premium Glow Profile" : "Transformation Ready Profile",
        photo: compareData?.afterImage || null,
      },
      scores: {
        overallWellnessIndex,
        beautyScore: Math.round(baseBeauty),
        skinScore: Math.round(skinScore),
        transformationScore: Math.round(transformScore),
        confidenceScore: Math.round(confidenceScore),
      },
      faceAnalysis: {
        faceShape: "Oval",
        symmetry: compareData ? compareData.metrics.facial.symmetry + 80 : 85,
        proportions: "Golden Ratio 1:1.618 closely matched.",
        recommendations: ["Enhance cheekbone highlights", "Maintain jawline contouring"],
      },
      skinReport: {
        hydration: compareData ? 60 + compareData.metrics.skin.hydration : 75,
        pigmentation: compareData ? 40 + compareData.metrics.skin.pigmentation : 35,
        acne: compareData ? 30 + compareData.metrics.skin.acneVisibility : 15,
        elasticity: 82,
        uvSensitivity: 45,
      },
      hairAnalysis: {
        topStyle: "Classic Fade",
        suitability: 94,
        concerns: ["Dry Scalp", "Mild Frizz"],
        styling: ["Use matte clay for hold", "Argan oil for shine"],
      },
      transformation: {
        beforeImage: compareData?.beforeImage || null,
        afterImage: compareData?.afterImage || null,
        metrics: compareData?.metrics || null,
      },
      actionPlan: {
        morning: ["Gentle Cleanser", "Vitamin C Serum", "SPF 50+ Sunscreen"],
        night: ["Double Cleanse", "Retinol 0.2%", "Rich Ceramide Moisturizer"],
        weekly: ["AHA/BHA Exfoliant", "Hydrating Sheet Mask"],
        avoid: ["Harsh Physical Scrubs", "Alcohol-based Toners"],
      },
      concierge: {
        aiSummary: `Your analysis indicates strong facial symmetry and healthy skin structure. Mild dehydration and pigmentation are the key improvement areas. With consistent skincare and optimized routines, projected improvement over 30 days is 18–24%.`,
        salonRecommendation: "Bellissimo Premium Salon",
        nextActions: ["Book Hydration Facial", "Start Night Routine"],
      }
    };
  }
}

export const reportService = new ReportService();
