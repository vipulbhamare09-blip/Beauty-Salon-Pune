import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Salon } from '../../services/salonService';
import { X, CalendarCheck, CheckCircle } from 'lucide-react';
import { saveAppointment } from '../../services/appointmentService';
import { useNavigate } from 'react-router';

interface Props {
  salon: Salon;
  onClose: () => void;
}

export default function BookingModal({ salon, onClose }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const service = formData.get('service') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;

    saveAppointment({
      id: crypto.randomUUID(),
      salonId: salon.id,
      salonName: salon.name,
      salonImage: salon.imageUrl,
      location: salon.address,
      services: [service],
      appointmentDate: date,
      appointmentTime: time,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    });

    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="absolute inset-0 bg-salon-black/60 backdrop-blur-sm"
        onClick={step === 1 ? onClose : undefined}
      ></motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative z-10"
      >
        {step === 1 ? (
          <>
            <button onClick={onClose} className="absolute top-4 right-4 text-salon-gray hover:text-salon-black">
              <X size={20} />
            </button>
            
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-salon-light rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarCheck size={20} className="text-salon-black" />
              </div>
              <h3 className="text-2xl font-playfair text-salon-black">Book Appointment</h3>
              <p className="text-sm font-light text-salon-gray mt-1">at {salon.name}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-salon-gray mb-1">Service Type</label>
                <select name="service" required className="w-full p-3 bg-salon-light border border-salon-gray/20 rounded-xl text-sm outline-none focus:border-salon-black cursor-pointer">
                  <option value="">Select a service...</option>
                  {salon.services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-salon-gray mb-1">Date</label>
                  <input name="date" type="date" required min={new Date().toISOString().split('T')[0]} className="w-full p-3 bg-salon-light border border-salon-gray/20 rounded-xl text-sm outline-none focus:border-salon-black" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-salon-gray mb-1">Time</label>
                  <select name="time" required className="w-full p-3 bg-salon-light border border-salon-gray/20 rounded-xl text-sm outline-none focus:border-salon-black cursor-pointer">
                    <option value="">Select time...</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-salon-gray mb-1">Special Notes for Stylist</label>
                <textarea rows={3} placeholder="Mention any specific requests or ecosystem recommendations..." className="w-full p-3 bg-salon-light border border-salon-gray/20 rounded-xl text-sm outline-none focus:border-salon-black resize-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-salon-black text-white py-4 rounded-xl text-xs uppercase tracking-widest font-medium mt-4 hover:bg-gray-800 transition-colors">
                Confirm Booking
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500"
            >
              <CheckCircle size={32} />
            </motion.div>
            <h3 className="text-2xl font-playfair text-salon-black mb-2">Appointment booked successfully!</h3>
            <p className="text-sm font-light text-salon-gray mb-6">{salon.name} has confirmed your appointment.</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  onClose();
                  navigate('/my-appointments');
                }}
                className="w-full bg-salon-black text-white py-4 rounded-xl text-xs uppercase tracking-widest font-medium hover:bg-gray-800 transition-colors"
              >
                View My Appointments
              </button>
              <button 
                onClick={onClose}
                className="w-full bg-salon-light text-salon-black border border-salon-gray/20 py-4 rounded-xl text-xs uppercase tracking-widest font-medium hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
