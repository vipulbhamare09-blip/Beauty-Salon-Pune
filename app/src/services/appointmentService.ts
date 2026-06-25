export interface Appointment {
  id: string;
  salonId: string;
  salonName: string;
  salonImage?: string;
  location: string;
  services: string[];
  appointmentDate: string;
  appointmentTime: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

const STORAGE_KEY = 'pune_beauty_appointments';

export const getAppointments = (): Appointment[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Appointment[];
  } catch (error) {
    console.error("Failed to load appointments:", error);
    return [];
  }
};

export const saveAppointment = (appointment: Appointment): boolean => {
  try {
    const existing = getAppointments();
    
    // Duplicate prevention: same salon, date, and time
    const isDuplicate = existing.some(
      (app) => 
        app.salonId === appointment.salonId &&
        app.appointmentDate === appointment.appointmentDate &&
        app.appointmentTime === appointment.appointmentTime
    );

    if (isDuplicate) {
      console.warn("Duplicate appointment detected.");
      return false; // Did not save due to duplicate
    }

    existing.push(appointment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return true;
  } catch (error) {
    console.error("Failed to save appointment:", error);
    return false;
  }
};

export const removeAppointment = (id: string): void => {
  try {
    const existing = getAppointments();
    const updated = existing.filter((app) => app.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to remove appointment:", error);
  }
};

export const updateAppointmentStatus = (id: string, status: Appointment['status']): void => {
  try {
    const existing = getAppointments();
    const updated = existing.map((app) => 
      app.id === id ? { ...app, status } : app
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to update appointment:", error);
  }
};
