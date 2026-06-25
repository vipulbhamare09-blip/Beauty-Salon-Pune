import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import Footer from '../sections/Footer';
import SEO from '../components/system/SEO';
import { getAppointments, removeAppointment } from '../services/appointmentService';
import type { Appointment } from '../services/appointmentService';
import { Calendar, Clock, MapPin, Scissors, X } from 'lucide-react';

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    // Sort by newest created first
    const sorted = getAppointments().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setAppointments(sorted);
  }, []);

  const handleCancel = (id: string) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      removeAppointment(id);
      setAppointments(appointments.filter(app => app.id !== id));
    }
  };

  return (
    <div className="bg-salon-light min-h-screen font-poppins flex flex-col">
      <SEO title="My Appointments" description="View and manage your upcoming salon appointments." />
      
      <main className="flex-grow pt-32 pb-20 px-6 lg:px-10 max-w-[1200px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-playfair text-salon-black mb-4">My Appointments</h1>
          <p className="text-salon-gray font-light">Manage all your salon bookings in one place.</p>
        </motion.div>

        {appointments.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
              <Calendar size={32} className="text-salon-gray/50" />
            </div>
            <h2 className="text-2xl font-playfair text-salon-black mb-2">No Appointments Yet</h2>
            <p className="text-salon-gray font-light mb-8 max-w-md">You haven’t booked any salon appointments. Explore our premium salons and schedule your next luxury experience.</p>
            <Link 
              to="/salon-finder"
              className="bg-salon-black text-salon-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-salon-dark transition-colors duration-300"
            >
              Find a Salon
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {appointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-salon-gray/10 relative overflow-hidden group"
                >
                  {/* Status Badge */}
                  <div className={`absolute top-6 right-6 px-3 py-1 text-[10px] uppercase tracking-widest rounded-full ${
                    appointment.status === 'confirmed' ? 'bg-green-50 text-green-600' : 
                    appointment.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 
                    'bg-red-50 text-red-600'
                  }`}>
                    {appointment.status}
                  </div>

                  <div className="flex gap-4 items-start mb-6">
                    {appointment.salonImage ? (
                      <img src={appointment.salonImage} alt={appointment.salonName} className="w-16 h-16 object-cover rounded-xl" />
                    ) : (
                      <div className="w-16 h-16 bg-salon-light rounded-xl flex items-center justify-center">
                        <Calendar className="text-salon-gray/50" size={24} />
                      </div>
                    )}
                    <div className="pr-20">
                      <h3 className="text-lg font-playfair text-salon-black">{appointment.salonName}</h3>
                      <div className="flex items-center text-xs text-salon-gray mt-1">
                        <MapPin size={12} className="mr-1" />
                        {appointment.location}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 bg-salon-light/50 p-4 rounded-xl">
                    <div className="flex items-center text-sm text-salon-black">
                      <Calendar size={16} className="mr-3 text-salon-gray" />
                      {new Date(appointment.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="flex items-center text-sm text-salon-black">
                      <Clock size={16} className="mr-3 text-salon-gray" />
                      {appointment.appointmentTime}
                    </div>
                    <div className="flex items-center text-sm text-salon-black">
                      <Scissors size={16} className="mr-3 text-salon-gray" />
                      {appointment.services.join(', ')}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleCancel(appointment.id)}
                      className="flex-1 py-3 text-[10px] uppercase tracking-widest text-salon-gray hover:text-red-500 border border-salon-gray/20 rounded-xl hover:border-red-200 hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                    >
                      <X size={14} /> Cancel
                    </button>
                    <Link
                      to={`/salon-finder`}
                      className="flex-1 py-3 text-[10px] uppercase tracking-widest text-salon-black border border-salon-black/20 rounded-xl hover:bg-salon-black hover:text-white transition-all text-center flex items-center justify-center"
                    >
                      Rebook
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
