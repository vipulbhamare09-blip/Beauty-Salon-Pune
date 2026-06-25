export interface SkinConcern {
  id: string;
  issue: string;
  impact: string;
  recommendation: string;
  confidence?: number;
}

export interface SkinRoutineStep {
  step: number;
  name: string;
  description?: string;
}

export interface SkinForecast {
  metric: string;
  improvement: string;
}

export interface SkinMetric {
  name: string;
  score: number;
  status: 'Excellent' | 'Good' | 'Needs Improvement';
}

export interface SkinReportData {
  userImage: string;
  overallScore: number;
  confidenceScore: number;
  metrics: SkinMetric[];
  concerns: SkinConcern[];
  recommendedIngredients: string[];
  avoidedIngredients: string[];
  recommendedProducts: string[];
  routines: {
    morning: SkinRoutineStep[];
    night: SkinRoutineStep[];
    weekly: SkinRoutineStep[];
  };
  forecast: SkinForecast[];
}
