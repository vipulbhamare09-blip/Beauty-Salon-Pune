import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Camera, X } from 'lucide-react';

interface UploadAreaProps {
  onUpload: (imageData: string) => void;
}

export default function UploadArea({ onUpload }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      setStream(mediaStream);
      setIsCameraActive(true);
    } catch (err) {
      console.error("Camera access denied or unavailable", err);
      // Fallback: trigger standard upload if camera fails
      fileInputRef.current?.click();
    }
  };

  useEffect(() => {
    if (isCameraActive && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = async () => {
        try {
          await videoRef.current?.play();
        } catch (e) {
          console.error("Video play failed", e);
        }
      };
    }
  }, [isCameraActive, stream]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
    setStream(null);
    setIsCameraActive(false);
  }, [stream]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        stopCamera();
        onUpload(dataUrl);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        onUpload(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="max-w-2xl mx-auto"
    >
      <input
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {isCameraActive ? (
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-salon-black h-[400px] w-full flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover scale-x-[-1] z-10"
            style={{ display: "block", visibility: "visible", opacity: 1 }}
          />
          <div className="absolute inset-0 border-[3px] border-salon-white/20 m-4 rounded-xl pointer-events-none z-20" />
          
          <button
            onClick={stopCamera}
            className="absolute top-4 right-4 bg-salon-white/10 hover:bg-salon-white/20 backdrop-blur-md p-2 rounded-full text-salon-white transition-colors z-20"
          >
            <X size={20} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
            <button
              onClick={capturePhoto}
              className="bg-salon-white text-salon-black rounded-full p-4 shadow-xl hover:scale-105 transition-transform"
            >
              <Camera size={28} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative group flex flex-col items-center justify-center border-[1px] border-dashed rounded-3xl p-12 transition-all duration-500 overflow-hidden ${
            isDragging
              ? 'border-salon-black bg-salon-black/5 scale-[1.02]'
              : 'border-salon-gray/30 bg-white/50 hover:border-salon-black/50 hover:bg-white shadow-xs hover:shadow-card'
          }`}
        >
          {/* Subtle animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

          <div className="bg-salon-light rounded-full p-6 mb-6 shadow-xs group-hover:scale-110 transition-transform duration-500 text-salon-black">
            <UploadCloud size={40} strokeWidth={1.5} />
          </div>

          <h3 className="text-xl font-medium text-salon-black mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
            Drag & Drop your photo here
          </h3>
          <p className="text-salon-gray text-xs tracking-wider uppercase mb-8 text-center max-w-xs">
            Supports JPG, JPEG, PNG. High resolution recommended.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-3 bg-salon-black text-salon-white text-xs tracking-[0.2em] uppercase hover:bg-salon-dark transition-colors"
            >
              Upload Image
            </button>
            <button
              onClick={startCamera}
              className="px-8 py-3 bg-white text-salon-black border border-salon-black/20 text-xs tracking-[0.2em] uppercase hover:border-salon-black transition-colors flex items-center justify-center gap-2"
            >
              <Camera size={14} />
              Take Photo
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
