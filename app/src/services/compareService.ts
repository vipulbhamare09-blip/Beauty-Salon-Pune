export interface CompareMetrics {
  skin: {
    hydration: number;
    texture: number;
    glow: number;
    pigmentation: number;
    acneVisibility: number;
  };
  hair: {
    volume: number;
    shine: number;
    frizzReduction: number;
    stylingEnhancement: number;
  };
  facial: {
    symmetry: number;
    brightness: number;
    sharpness: number;
    confidenceScore: number;
  };
  overall: {
    beautyScoreDelta: number;
    improvementPercentage: number;
    category: string;
  };
  alignmentScore: number;
}

export type ValidationStatus = 'idle' | 'validating' | 'valid' | 'warning' | 'error';

class CompareService {
  private readonly STORAGE_KEY = 'salon_compare_results';

  /**
   * Simulates smart image validation (detecting face, lighting, blur).
   */
  public async validateImages(_beforeImage: string, _afterImage: string): Promise<{ status: ValidationStatus; message?: string }> {
    return new Promise(resolve => {
      setTimeout(() => {
        // In a real app, send to backend ML API
        // For simulation, we assume success, but randomly could warn.
        resolve({ status: 'valid' });
      }, 1500);
    });
  }

  /**
   * Simulates the auto-alignment process and returns a mock analysis.
   */
  public async analyzeTransformation(_beforeImage: string, _afterImage: string): Promise<CompareMetrics> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          skin: {
            hydration: 25,
            texture: 18,
            glow: 30,
            pigmentation: -15, // Negative meaning reduction in bad pigmentation
            acneVisibility: -20,
          },
          hair: {
            volume: 20,
            shine: 35,
            frizzReduction: 40,
            stylingEnhancement: 25,
          },
          facial: {
            symmetry: 5,
            brightness: 15,
            sharpness: 10,
            confidenceScore: 95,
          },
          overall: {
            beautyScoreDelta: 12,
            improvementPercentage: 24,
            category: "Premium Makeover",
          },
          alignmentScore: 94
        });
      }, 3000); // 3 second luxury loading
    });
  }

  public saveResults(beforeImage: string, afterImage: string, metrics: CompareMetrics) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ beforeImage, afterImage, metrics }));
    } catch (e) {
      console.warn("Failed to save comparison to local storage", e);
    }
  }

  public getSavedResults(): { beforeImage: string; afterImage: string; metrics: CompareMetrics } | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  public clearSavedResults() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export const compareService = new CompareService();
