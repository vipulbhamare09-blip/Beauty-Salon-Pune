import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FaceAnalysisData {
  faceShape?: string;
  beautyScore?: number;
  symmetryScore?: number;
  strengths?: string[];
  detectedGender?: string;
}

export interface SkinAdvisorData {
  skinType?: string;
  hydrationScore?: number;
  acneScore?: number;
  skinHealthScore?: number;
  detectedConcerns?: string[];
}

export interface HairstyleSimulatorData {
  detectedGender?: string;
  topHairstyleMatches?: { name: string; match: number }[];
  recommendedHairstyles?: string[];
}

export interface EventPlannerData {
  selectedEvent?: string;
  beautyPreferences?: string[];
}

interface BeautyEcosystemState {
  faceAnalysis: FaceAnalysisData | null;
  skinAdvisor: SkinAdvisorData | null;
  hairstyleSimulator: HairstyleSimulatorData | null;
  eventPlanner: EventPlannerData | null;

  setFaceAnalysis: (data: FaceAnalysisData) => void;
  setSkinAdvisor: (data: SkinAdvisorData) => void;
  setHairstyleSimulator: (data: HairstyleSimulatorData) => void;
  setEventPlanner: (data: EventPlannerData) => void;
  clearEcosystem: () => void;
}

export const useBeautyEcosystemStore = create<BeautyEcosystemState>()(
  persist(
    (set) => ({
      faceAnalysis: null,
      skinAdvisor: null,
      hairstyleSimulator: null,
      eventPlanner: null,

      setFaceAnalysis: (data) => set((state) => ({ faceAnalysis: { ...state.faceAnalysis, ...data } })),
      setSkinAdvisor: (data) => set((state) => ({ skinAdvisor: { ...state.skinAdvisor, ...data } })),
      setHairstyleSimulator: (data) => set((state) => ({ hairstyleSimulator: { ...state.hairstyleSimulator, ...data } })),
      setEventPlanner: (data) => set((state) => ({ eventPlanner: { ...state.eventPlanner, ...data } })),
      clearEcosystem: () => set({
        faceAnalysis: null,
        skinAdvisor: null,
        hairstyleSimulator: null,
        eventPlanner: null,
      }),
    }),
    {
      name: 'beauty-ecosystem-memory', // LocalStorage key
    }
  )
);
