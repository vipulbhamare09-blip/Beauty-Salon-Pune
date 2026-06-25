import { useCallback, useRef, useEffect } from 'react';

export function useSuccessSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
      }
    }
  };

  useEffect(() => {
    const handleInteraction = () => initAudio();
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const playSuccessSound = useCallback(() => {
    if (localStorage.getItem('disableSounds') === 'true') return;

    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Very soft crystal chime sound
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.1); // C6

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.05); // Very soft volume
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3); // Fade out

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3); // max 300ms
    } catch (e) {
      console.warn("Could not play success sound", e);
    }
  }, []);

  return playSuccessSound;
}
