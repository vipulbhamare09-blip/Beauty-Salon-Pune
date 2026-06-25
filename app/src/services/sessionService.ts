/**
 * SessionService
 * Centralizes all localStorage interactions for the entire application.
 * Acts as the single source of truth for the user's beauty session data.
 */

export interface UserSession {
  userId?: string;
  faceAnalysis?: any;
  skinAdvisor?: any;
  hairstyleSimulator?: any;
  compareResults?: any;
  eventPlanner?: any;
  salonRecommendations?: any;
  lastUpdated: number;
}

const SESSION_KEY = 'pune_beauty_session_data';

class SessionService {
  private getSession(): UserSession {
    try {
      const data = localStorage.getItem(SESSION_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn("Could not parse session data", e);
    }
    
    return {
      userId: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      lastUpdated: Date.now()
    };
  }

  private saveSession(session: UserSession) {
    session.lastUpdated = Date.now();
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  // --- GETTERS ---
  public getAllData(): UserSession {
    return this.getSession();
  }

  // --- SETTERS ---
  public updateFaceAnalysis(data: any) {
    const session = this.getSession();
    session.faceAnalysis = data;
    this.saveSession(session);
  }

  public updateSkinAdvisor(data: any) {
    const session = this.getSession();
    session.skinAdvisor = data;
    this.saveSession(session);
  }

  public updateHairstyleSimulator(data: any) {
    const session = this.getSession();
    session.hairstyleSimulator = data;
    this.saveSession(session);
  }

  public updateCompareResults(data: any) {
    const session = this.getSession();
    session.compareResults = data;
    this.saveSession(session);
  }

  public updateEventPlanner(data: any) {
    const session = this.getSession();
    session.eventPlanner = data;
    this.saveSession(session);
  }

  public clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }
}

export const sessionService = new SessionService();
